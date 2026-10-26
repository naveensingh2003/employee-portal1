package com.olive.dto;

public class BulkUploadResponse {
	
	private String jobId;
    private String status;
    
    public BulkUploadResponse() {}
    
	public BulkUploadResponse(String jobId, String status) {
		super();
		this.jobId = jobId;
		this.status = status;
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
	
	

}
