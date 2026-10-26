package com.olive.asyncService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.olive.email.EmailService;
import com.olive.entity.Employee;
import com.olive.repository.IEmployeeRepo;

@Service
public class EmployeeEmailAsyncService {

    @Autowired
    private IEmployeeRepo eRepo;

    @Autowired
    private EmailService emailService;

    @Async
    public void sendEmailsForJob(String jobId) {

        List<Employee> employees = eRepo.findByJobId(jobId);

        System.out.println("EMAILS ONLY FOR JOB: " + jobId);

        for (Employee e : employees) {

            try {
                emailService.sendWelcomeEmail(e);
            } catch (Exception ex) {
                System.out.println("Failed email: " + e.getEmail());
            }
        }
    }
}
