  package com.olive.dto;

import java.util.List;

import org.springframework.data.domain.Page;

import com.olive.entity.Employee;

public class ApiResponse {

    private String message;
    private Object data;
    private String error;
    private List<Employee> emps;
    private Page<Employee> page;

    public ApiResponse() {
    }

    public ApiResponse(String message, Object data, String error) {
        this.message = message;
        this.data = data;
        this.error = error;
    }
    
    
    
    public ApiResponse(String message, Object data, String error , List<Employee> emps) {
        this.message = message;
        this.data = data;
        this.error = error;
        this.emps=emps;
    }
    
    public ApiResponse(String message, Object data, String error , Page<Employee> page) {
        this.message = message;
        this.data = data;
        this.error = error;
        this.page=page;
    }
    
    
    
    public Page<Employee> getPage() {
		return page;
	}

	public void setPage(Page<Employee> page) {
		this.page = page;
	}

	public void setEmps(List<Employee> emps) {
    	this.emps=emps;
    } 
    
    public List<Employee> getEmps(){
    	return emps;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}