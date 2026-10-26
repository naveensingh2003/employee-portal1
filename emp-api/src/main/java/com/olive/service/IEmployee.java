package com.olive.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.olive.entity.Employee;

import jakarta.servlet.http.HttpServletResponse;

public interface IEmployee {
	
	public Employee addEmployee(Employee emp);
	public String addEmployees(List<Employee> emps);
	public Employee getEmpById(int id);
	public  Page<Employee> getEmployees(
	        String search,
	        Boolean status,
	        LocalDate fromDate,
	        LocalDate toDate,
	        int page,
	        int size);
	public  String updateEmpDetailsById(int id , Employee emp);
	public String  removeEmployeeBYId(int id);
	public boolean processExcel(String jobId, String filePath);
	public void downloadEmployees(
	        String search,
	        Boolean status,
	        LocalDate fromDate,
	        LocalDate toDate,
	        HttpServletResponse response);

}
