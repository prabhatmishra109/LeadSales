package com.OdLeadBackendApplication.service;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.OdLeadBackendApplication.model.Lead;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendNewLeadNotification(Lead lead) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(senderEmail);
        message.setTo("pm2440180@gmail.com");

        message.setSubject(
                "New Lead Received - " + lead.getProduct()
        );

        String emailBody =
                "New customer lead received.\n\n" +

                "Customer Details\n" +
                "--------------------------\n" +
                "Name: " + lead.getName() + "\n" +
                "Email: " + lead.getEmail() + "\n" +
                "Phone: " + lead.getPhone() + "\n" +
                "City: " + lead.getCity() + "\n" +
                "Product: " + lead.getProduct() + "\n" +
                "Job Type: " + lead.getJobType() + "\n" +
                "Monthly Income: " + lead.getIncome() + "\n" +
                "EMI: " + lead.getEmi() + "\n" +
//                "Required Amount: " + lead.getRequiredAmount() + "\n" +
                "Consent: " + lead.getConsent() + "\n" +
                "Source: " + lead.getSource() + "\n" +
                "Created At: " + lead.getCreatedAt() + "\n\n" +

                "Please contact the customer for further processing.";

        message.setText(emailBody);

        mailSender.send(message);
    }
}

