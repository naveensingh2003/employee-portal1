package com.olive.scheduler;


import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ExecutorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.olive.email.EmailService;
import com.olive.entity.EmailQueue;
import com.olive.entity.Employee;
import com.olive.repository.EmailQueueRepository;

@Service
public class EmailSchedulerService {

    @Autowired
    private EmailQueueRepository emailQueueRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ExecutorService emailExecutor;

   // @Scheduled(fixedDelay = 60000)
    public void processPendingEmails() {
    	
    	 System.out.println("Scheduler triggered at : " + LocalDateTime.now());

        List<EmailQueue> pendingEmails =
                emailQueueRepo
                        .findTop10ByStatusAndRetryCountLessThanOrderByIdAsc(
                                "PENDING",
                                3
                        );
        
        System.out.println("Pending Emails : " + pendingEmails.size());

        if (pendingEmails.isEmpty()) {
            return;
        }

        System.out.println("Processing Emails : " + pendingEmails.size());

        for (EmailQueue queue : pendingEmails) {

            emailExecutor.submit(() -> sendEmail(queue));

        }
    }

    private void sendEmail(EmailQueue queue) {

        try {

            Employee emp = new Employee();

            emp.setEmail(queue.getEmail());
            emp.setEname(queue.getEmployeeName());

            emailService.sendWelcomeEmail(emp);

            queue.setStatus("SENT");
            queue.setSentAt(LocalDateTime.now());
            queue.setErrorMessage(null);

            emailQueueRepo.save(queue);

        } catch (Exception e) {

            Integer retryCount = queue.getRetryCount();

            if (retryCount == null) {
                retryCount = 0;
            }

            retryCount++;

            queue.setRetryCount(retryCount);

            queue.setErrorMessage(e.getMessage());

            if (retryCount >= 3) {

                queue.setStatus("FAILED");

            } else {

                queue.setStatus("PENDING");
            }

            emailQueueRepo.save(queue);

            e.printStackTrace();
        }
    }
}