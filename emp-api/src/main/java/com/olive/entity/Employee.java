package com.olive.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_emp")
public class Employee {

	@Id
	@SequenceGenerator(name = "emp_seq_gen", sequenceName = "EMP_SEQ", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq_gen")
	@Column(name = "EID")
	private Integer eid;

	@Column(name = "ENAME")
	private String ename;

	@Column(name = "DEPT")
	private String dept;

	@Column(name = "MANAGER")
	private String manager;

	@Column(name = "MOB")
	private String mob;

	@Column(name = "EMAIL")
	private String email;

	@Column(name = "SALARY")
	private String salary;
	
	@Column(name="PASSWORD")
	private String password;
   
	@Column(name="JOINING_DATE")
    private LocalDate joiningDate;
	
	@Column(name="STATUS")
	private Boolean status;
	
	@JsonIgnore
	@Column(name="JOBID")
	private String jobId;
	
	public void setJobId(String jobId) {
	    this.jobId = jobId;
	}
	
	public String getJobId() {
		return jobId;
	}
	
	public void setStatus(Boolean status) {
		 this.status = status;
	}
	
	public Boolean getStatus() {
		return status;
	}
	
	
	public void setPassword(String password) {
		this.password=password;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setJoiningDate(LocalDate joiningdate) {
		this.joiningDate=joiningdate;
	}
	
	public LocalDate getJoiningDate() {
		return joiningDate;
	}

	public Integer getEid() {
		return eid;
	}

	public String getEname() {
		return ename;
	}

	public String getDept() {
		return dept;
	}

	public String getManager() {
		return manager;
	}

	public String getMob() {
		return mob;
	}

	public String getEmail() {
		return email;
	}

	public String getSalary() {
		return salary;
	}

	public void setEid(Integer eid) {
		this.eid = eid;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public void setMob(String mob) {
		this.mob = mob;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setSalary(String salary) {
		this.salary = salary;
	}

	@Override
	public String toString() {
		return "Employee{" + "eid=" + eid + ", ename='" + ename + '\'' + ", dept='" + dept + '\'' + ", manager='"
				+ manager + '\'' + ", mob='" + mob + '\'' + ", email='" + email + '\'' + ", salary='" + salary + '\''
				+ '}';
	}
}