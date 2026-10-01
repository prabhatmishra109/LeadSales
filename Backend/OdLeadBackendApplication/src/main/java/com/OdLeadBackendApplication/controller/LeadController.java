package com.OdLeadBackendApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.OdLeadBackendApplication.dto.LeadRequest;
import com.OdLeadBackendApplication.model.Lead;
import com.OdLeadBackendApplication.repo.LeadRepository;
import com.OdLeadBackendApplication.service.EmailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadRepository leadRepository;
    private final EmailService emailService;

    @Value("${admin.key}")
    private String adminKey;

    public LeadController(
            LeadRepository leadRepository,
            EmailService emailService) {

        this.leadRepository = leadRepository;
        this.emailService = emailService;
    }

    // SAVE LEAD
    @PostMapping
    public ResponseEntity<Lead> createLead(
            @Valid @RequestBody LeadRequest request) {

        Lead lead = new Lead();

        lead.setName(request.getName());
        lead.setPhone(request.getPhone());
        lead.setEmail(request.getEmail());
        lead.setCity(request.getCity());
        lead.setProduct(request.getProduct());
        lead.setJobType(request.getJobType());
        lead.setIncome(request.getIncome());
        lead.setEmi(request.getEmi());
//        lead.setRequiredAmount(request.getRequiredAmount());
        lead.setConsent(request.getConsent());
        lead.setSource(request.getSource());

        // Save lead in MySQL
        Lead savedLead = leadRepository.save(lead);

        // Send email notification
        emailService.sendNewLeadNotification(savedLead);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedLead);
    }

    // GET ALL LEADS
    @GetMapping
    public ResponseEntity<?> getLeads(
            @RequestHeader(value = "X-ADMIN-KEY", required = false)
            String key,

            @RequestParam(required = false)
            String product) {

        if (key == null || !key.equals(adminKey)) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid admin key");
        }

        List<Lead> leads;

        if (product != null && !product.isBlank()) {

            leads = leadRepository.findByProduct(product);

        } else {

            leads = leadRepository.findAll();
        }

        return ResponseEntity.ok(leads);
    }
}