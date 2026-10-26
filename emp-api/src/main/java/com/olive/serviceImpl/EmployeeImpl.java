package com.olive.serviceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;



import java.io.File;
import java.io.IOException;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.olive.entity.EmailQueue;
import com.olive.entity.Employee;
import com.olive.repository.EmailQueueRepository;
import com.olive.repository.IEmployeeRepo;
import com.olive.service.JobService;

import jakarta.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.olive.asyncService.EmployeeAsyncService;
import com.olive.email.EmailService;
import com.olive.entity.Employee;
import com.olive.repository.IEmployeeRepo;
import com.olive.service.IEmployee;
import com.olive.service.JobService;

@Service
public class EmployeeImpl implements IEmployee {

	@Autowired
	private IEmployeeRepo eRepo;
	
	@Autowired
	private EmailQueueRepository emailQueueRepo;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private JobService jServ;

	@Override
	public Employee addEmployee(Employee emp) {
		Employee e = eRepo.save(emp);
//		emailService.sendWelcomeEmail(e);  email send commented tempororally
		return e;
	}

	@Override
	public Employee getEmpById(int id) {
		Optional<Employee> byId = eRepo.findById(id);
		if (byId.isPresent()) {
			return byId.get();
		}
		return null;
	}

	@Override
	public Page<Employee> getEmployees(
	        String search,
	        Boolean status,
	        LocalDate fromDate,
	        LocalDate toDate,
	        int page,
	        int size) {

	    Pageable pageable = PageRequest.of(page, size);
	    
//	    System.out.println("Search = " + search);

	    Specification<Employee> spec = (root, query, cb) -> cb.conjunction();

	    if (search != null && !search.isBlank()) {
	        spec = spec.and((root, query, cb) ->
	                cb.equal(
	                        cb.lower(root.get("ename")),
	                        search.toLowerCase().trim()
	                ));
	    }

	    if (status != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.equal(root.get("status"), status));
	    }

	    if (fromDate != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.greaterThanOrEqualTo(
	                        root.get("joiningDate"),
	                        fromDate));
	    }

	    if (toDate != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.lessThanOrEqualTo(
	                        root.get("joiningDate"),
	                        toDate));
	    }
	    
	    Page<Employee> result = eRepo.findAll(spec, pageable);
	    
//	    System.out.println("Total found = " + result.getTotalElements());

	    return result;
	}
	
	
	
	
	

	@Override
	public String updateEmpDetailsById(int id, Employee emp) {
		Optional<Employee> empById = eRepo.findById(id);
		if (!empById.isPresent()) {
			return "Employee is not found with this id:: " + id;
		} else {
			Employee employee = empById.get();
			employee.setEname(emp.getEname());
			employee.setManager(emp.getManager());
			employee.setEmail(emp.getEmail());
			employee.setMob(emp.getMob());
			employee.setPassword(emp.getPassword());
			employee.setJoiningDate(emp.getJoiningDate());
			employee.setSalary(emp.getSalary());
			employee.setStatus(emp.getStatus());
			System.out.println("*********************************");
			System.out.println("Password from request: " + emp.getPassword());

			Employee eSave = eRepo.save(employee);

			return "Employee Named :" + eSave.getEname() + " Details Updated Successfully !!";
		}

	}

	@Override
	public String addEmployees(List<Employee> emps) {
		List<Employee> saveAll = eRepo.saveAll(emps);
		for(Employee e : saveAll) {
		    try {
		        emailService.sendWelcomeEmail(e);
		    } catch(Exception ex) {
		        System.out.println(
		            "Failed to send mail to : " + e.getEmail()
		        );
		    }
		}
		return "Employees Saved Successfully !!";
	}
	
	
	 

	@Override
	public String removeEmployeeBYId(int id) {
		Optional<Employee> eById = eRepo.findById(id);
		if (!eById.isPresent()) {
			return "Employee with ID: " + id + " is Not found for Delete Please check the ID";
		} else {
			eRepo.deleteById(id);
			return "Employee with Id no:: " + id + " is deleted Successfully !!";
		}

	}
	
	
	private boolean isRowEmpty(Row row) {

	    if (row == null) return true;

	    for (int cellNum = row.getFirstCellNum(); cellNum < row.getLastCellNum(); cellNum++) {

	        Cell cell = row.getCell(cellNum);

	        if (cell != null &&
	                cell.getCellType() != CellType.BLANK &&
	                !cell.toString().trim().isEmpty()) {
	            return false;
	        }
	    }

	    return true;
	}

	@Override
	public boolean processExcel(String jobId, String filePath) {

	    long startTime = System.currentTimeMillis();
	    boolean hasError = false;

	    try (Workbook workbook =
	                 WorkbookFactory.create(new File(filePath))) {

	        Sheet sheet = workbook.getSheetAt(0);
	        DataFormatter formatter = new DataFormatter();

	        List<Employee> employees = new ArrayList<>();

	        boolean header = true;

	        for (Row row : sheet) {

	            if (header) {
	                header = false;
	                continue;
	            }

	            if (row == null) {
	                continue;
	            }

	            Employee emp = new Employee();

	            emp.setJobId(jobId);

	            emp.setDept(formatter.formatCellValue(row.getCell(0)));
	            emp.setEmail(formatter.formatCellValue(row.getCell(1)));
	            emp.setEname(formatter.formatCellValue(row.getCell(2)));

	            // DATE SAFE HANDLING
	            Cell cell = row.getCell(3);
	            LocalDate joiningDate = null;

	            if (row.getRowNum() < 5) {
	                System.out.println("ROW = " + row.getRowNum());
	                System.out.println("CELL VALUE = " + cell);
	            }

	            if (cell != null) {

	                try {

	                    if (cell.getCellType() == CellType.NUMERIC) {

	                        if (DateUtil.isCellDateFormatted(cell)) {
	                            joiningDate = cell.getLocalDateTimeCellValue()
	                                              .toLocalDate();
	                        }

	                    } else {

	                        String value = cell.toString().trim();

	                        DateTimeFormatter formatter1 =
	                                DateTimeFormatter.ofPattern("M/d/yyyy");

	                        joiningDate =
	                                LocalDate.parse(value, formatter1);
	                    }

	                } catch (Exception e) {
	                    joiningDate = null;
	                }
	            }

	            emp.setJoiningDate(joiningDate);

	            emp.setManager(formatter.formatCellValue(row.getCell(4)));
	            emp.setMob(formatter.formatCellValue(row.getCell(5)));
	            emp.setPassword(formatter.formatCellValue(row.getCell(6)));
	            emp.setSalary(formatter.formatCellValue(row.getCell(7)));

	            String status =
	                    formatter.formatCellValue(row.getCell(8));

	            emp.setStatus(
	                    "1".equals(status)
	                    || "true".equalsIgnoreCase(status)
	                    || "active".equalsIgnoreCase(status)
	            );

	            employees.add(emp);

	            // Save every 1000 records
	            if (employees.size() == 1000) {

	                saveEmployeeBatch(employees, jobId);

	                employees.clear();
	            }
	        }

	        // Save remaining records
	        if (!employees.isEmpty()) {

	            saveEmployeeBatch(employees, jobId);

	            employees.clear();
	        }

	    } catch (Exception e) {

	        hasError = true;

	        e.printStackTrace();
	    }

	    jServ.updateStatus(
	            jobId,
	            hasError ? "FAILED" : "COMPLETED"
	    );

	    System.out.println(
	            "TIME TAKEN: "
	            + (System.currentTimeMillis() - startTime) / 1000.0
	            + " sec"
	    );

	    return !hasError;
	}
	
	private void saveEmployeeBatch(List<Employee> batch, String jobId) {

		eRepo.saveAll(batch);
		eRepo.flush();

		List<EmailQueue> emailTasks = new ArrayList<>();

		for (Employee emp : batch) {

			EmailQueue queue = new EmailQueue();

			queue.setEmail(emp.getEmail());
			queue.setEmployeeName(emp.getEname());
			queue.setJobId(jobId);

			queue.setStatus("PENDING");
			queue.setRetryCount(0);

			queue.setCreatedAt(LocalDateTime.now());

			emailTasks.add(queue);
		}

		emailQueueRepo.saveAll(emailTasks);
	}

	@Override
	public void downloadEmployees(String search, Boolean status, LocalDate fromDate, LocalDate toDate,
			HttpServletResponse response) {
	    
		
		Specification<Employee> spec = (root, query, cb) -> cb.conjunction();

	    if (search != null && !search.isBlank()) {
	        spec = spec.and((root, query, cb) ->
	                cb.equal(
	                        cb.lower(root.get("ename")),
	                        search.toLowerCase().trim()
	                ));
	    }

	    if (status != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.equal(root.get("status"), status));
	    }

	    if (fromDate != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.greaterThanOrEqualTo(
	                        root.get("joiningDate"),
	                        fromDate));
	    }

	    if (toDate != null) {
	        spec = spec.and((root, query, cb) ->
	                cb.lessThanOrEqualTo(
	                        root.get("joiningDate"),
	                        toDate));
	    }

	    List<Employee> employees = eRepo.findAll(spec);

	    try {

	        XSSFWorkbook workbook = new XSSFWorkbook();

	        XSSFSheet sheet = workbook.createSheet("Employees");

	        Row header = sheet.createRow(0);

	        header.createCell(0).setCellValue("EID");
	        header.createCell(1).setCellValue("Name");
	        header.createCell(2).setCellValue("Email");
	        header.createCell(3).setCellValue("Department");
	        header.createCell(4).setCellValue("Manager");
	        header.createCell(5).setCellValue("Joining Date");
	        header.createCell(6).setCellValue("Status");

	        int rowNum = 1;

	        for (Employee emp : employees) {

	            Row row = sheet.createRow(rowNum++);

	            row.createCell(0).setCellValue(emp.getEid());
	            row.createCell(1).setCellValue(emp.getEname());
	            row.createCell(2).setCellValue(emp.getEmail());
	            row.createCell(3).setCellValue(emp.getDept());
	            row.createCell(4).setCellValue(emp.getManager());
	            row.createCell(5).setCellValue(
	                    emp.getJoiningDate().toString());

	            row.createCell(6).setCellValue(
	                    emp.getStatus() ? "Active" : "Inactive");
	        }

	        response.setContentType(
	                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

	        response.setHeader(
	                "Content-Disposition",
	                "attachment; filename=employees.xlsx");

	        workbook.write(response.getOutputStream());

	        workbook.close();

	    } catch (IOException e) {
	        throw new RuntimeException(e);
	    }
		
	}

	

	

}
