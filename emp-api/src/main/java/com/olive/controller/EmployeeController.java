package com.olive.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.format.annotation.DateTimeFormat;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;

import com.olive.asyncService.EmployeeAsyncService;
import com.olive.dto.ApiResponse;
import com.olive.dto.BulkUploadResponse;
import com.olive.entity.Employee;
import com.olive.entity.UploadJob;
import com.olive.service.IEmployee;
import com.olive.service.JobService;
import com.olive.serviceImpl.EmployeeImpl;

import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EmployeeController {

	@Autowired
	private IEmployee eService;
	
	@Autowired
    private JobService jServ;

	@PostMapping("/createEmployee")
	public ResponseEntity<ApiResponse> addEmployee(@RequestBody Employee emp) {
		Employee employee = eService.addEmployee(emp);

		ApiResponse response = new ApiResponse("Employee created successfully", employee, null);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

	@GetMapping("/employee/{id}")
	public ResponseEntity<ApiResponse> getEmpById(@PathVariable("id") int id) {
		Employee emp = eService.getEmpById(id);
		if (emp == null) {
			return new ResponseEntity<ApiResponse>(
					new ApiResponse("Employee not Found !", null, "Id no ::" + id + " is wrong please Check"),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<ApiResponse>(new ApiResponse("Employee fetched Successfully !!", emp, null),
				HttpStatus.OK);
	}

	
	@GetMapping("/employes")
	public ResponseEntity<ApiResponse> getEmployees(

	        @RequestParam(name = "search", required = false) String search,

	        @RequestParam(name = "status", required = false) Boolean status,

	        @RequestParam(name = "fromDate", required = false) LocalDate fromDate,

	        @RequestParam(name = "toDate", required = false) LocalDate toDate,

	        @RequestParam(name = "page", defaultValue = "0") int page,

	        @RequestParam(name = "size", defaultValue = "5") int size) {

	    Page<Employee> employees = eService.getEmployees(
	            search,
	            status,
	            fromDate,
	            toDate,
	            page,
	            size);

	    return ResponseEntity.ok(
	    		 new ApiResponse("Employees fetched successfully", null, null, employees));
	}
	
	
	           
	

	@PutMapping("/updateEmployeeById")
	public ResponseEntity<ApiResponse> updateEmpDetailsById(@RequestParam("id") int id, @RequestBody Employee emp) {
		String msg = eService.updateEmpDetailsById(id, emp);
		return new ResponseEntity<ApiResponse>(new ApiResponse(msg, null, null), HttpStatus.OK);
	}

	@PostMapping("/createEmployees")
	public String addEmployees(@RequestBody List<Employee> emps) {
		return eService.addEmployees(emps);
	}

	@DeleteMapping("/deleteById/{id}")
	public ResponseEntity<ApiResponse> removeEmployeeBYId(@PathVariable("id") int id) {
		String msg = eService.removeEmployeeBYId(id);
		return new ResponseEntity<ApiResponse>(new ApiResponse(msg, null, null), HttpStatus.OK);
	}
	
	@Autowired
	private EmployeeAsyncService asyncService;

	@PostMapping("/bulkUploadEmployeeExcel")
	public ResponseEntity<BulkUploadResponse> uploadEmployees(
	        @RequestParam("file") MultipartFile file) {

	    String jobId = UUID.randomUUID().toString();

	    jServ.createJob(jobId);

	    try {
	        // SAVE FILE TO TEMP (IMPORTANT FIX)
	        Path tempFile = Files.createTempFile("upload-", ".xls");
	        file.transferTo(tempFile.toFile());

	        asyncService.processExcelAsync(jobId, tempFile.toString());

	    } catch (Exception e) {
	        e.printStackTrace();
	        jServ.updateStatus(jobId, "FAILED");
	    }

	    return ResponseEntity.ok(
	            new BulkUploadResponse(jobId, "PROCESSING"));
	}
	
	
	@GetMapping("/jobStatus/{jobId}")
	public ResponseEntity<BulkUploadResponse> getStatus(@PathVariable("jobId") String jobId) {
		UploadJob status = jServ.getStatus(jobId);
		return new ResponseEntity<BulkUploadResponse>(new BulkUploadResponse(status.getJobId(), status.getStatus()),
				HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/employees/download")
	public void downloadEmployees1(
	        @RequestParam(value = "search", required = false) String search,

	        @RequestParam(value = "status", required = false) Boolean status,

	        @RequestParam(value = "fromDate", required = false)
	        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	        LocalDate fromDate,

	        @RequestParam(value = "toDate", required = false)
	        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
	        LocalDate toDate,

	        HttpServletResponse response) {

	   eService.downloadEmployees(
	            search,
	            status,
	            fromDate,
	            toDate,
	            response);
	}

}
