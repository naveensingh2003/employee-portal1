

package com.olive.email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.olive.entity.Employee;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(Employee emp) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emp.getEmail());
        message.setSubject("Welcome to Onboard OlivCrypto Company 🎉");

        message.setText(
            "Hello " + emp.getEname() + ",\n\n" +
            "Your account has been created successfully.\n" +
//            "Email: " + emp.getEmail() + "\n" +
            "Thanks,\nHR Team"
        );

        mailSender.send(message);
    }
}