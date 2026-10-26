package com.olive.asyncService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.olive.service.JobService;
import com.olive.serviceImpl.EmployeeImpl;

@Service
public class EmployeeAsyncService {

    @Autowired
    private EmployeeImpl employeeService;

    @Autowired
    private JobService jSer;
    
    @Autowired
    private EmployeeEmailAsyncService emailJob;

    @Async
    public void processExcelAsync(String jobId, String filePath) {

        System.out.println("ASYNC STARTED : " + jobId);

        try {

            boolean success = employeeService.processExcel(jobId, filePath);

            if (success) {
                jSer.updateStatus(jobId, "COMPLETED");
                System.out.println("Job Completed : " + jobId);
//                emailJob.sendEmailsForJob(jobId); // 🔥 separate job
            } else {
                jSer.updateStatus(jobId, "FAILED");
                System.out.println("Job Failed : " + jobId);
            }

        } catch (Exception e) {

            jSer.updateStatus(jobId, "FAILED");

            System.out.println("Job Failed (Exception): " + jobId);

            e.printStackTrace();
        }
    }
}