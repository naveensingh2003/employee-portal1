package com.olive.service;

import com.olive.entity.UploadJob;

public interface JobService {
	
        public void createJob(String jobId);
	    public void updateStatus(String jobId, String status);
        public UploadJob getStatus(String jobId);

}
