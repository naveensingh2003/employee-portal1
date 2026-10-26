package com.olive.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name="tbl_status")
@Data
public class UploadJob {

    @Id
    @Column(name = "JOB_ID")
    private String jobId;
    @Column(name = "JOB_Status")
    private String status; // PROCESSING, COMPLETED, FAILED
    @Column(name = "JOB_TOTALRECORDS")
    private int totalRecords;
    @Column(name = "JOB_PROCESSEDRECORD")
    private int processedRecords;
	
    
    public UploadJob() {}
    
    public UploadJob(String jobId, String status, int totalRecords, int processedRecords) {
		super();
		this.jobId = jobId;
		this.status = status;
		this.totalRecords = totalRecords;
		this.processedRecords = processedRecords;
	}
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(int totalRecords) {
		this.totalRecords = totalRecords;
	}
	public int getProcessedRecords() {
		return processedRecords;
	}
	public void setProcessedRecords(int processedRecords) {
		this.processedRecords = processedRecords;
	}
    
    
    
}
