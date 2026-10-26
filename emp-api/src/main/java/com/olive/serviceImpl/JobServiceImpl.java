package com.olive.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.olive.entity.UploadJob;
import com.olive.repository.UploadJobRepository;
import com.olive.service.JobService;

@Service
public class JobServiceImpl implements JobService {

	    @Autowired
	    private UploadJobRepository repo;

	    public void createJob(String jobId) {

	        UploadJob job = new UploadJob();
	        job.setJobId(jobId);
	        job.setStatus("PROCESSING");

	        repo.save(job);
	    }

	    public void updateStatus(String jobId, String status) {

	        UploadJob job = repo.findById(jobId)
	                .orElseThrow();

	        job.setStatus(status);

	        repo.save(job);
	    }

	    public UploadJob getStatus(String jobId) {

	        return repo.findById(jobId)
	                .orElse(null);
	    }

}
