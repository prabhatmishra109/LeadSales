package com.OdLeadBackendApplication.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.OdLeadBackendApplication.service.FinanceAssistantService;

@RestController
@RequestMapping("/api/assistant")
@CrossOrigin(origins = "http://localhost:5173")
public class AssistantController {

    private final FinanceAssistantService assistantService;

    public AssistantController(
            FinanceAssistantService assistantService) {

        this.assistantService = assistantService;
    }

    @PostMapping("/ask")
    public ResponseEntity<Map<String, String>> askQuestion(
            @RequestBody Map<String, String> request) {

        String question = request.get("question");

        if (question == null || question.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "answer",
                            "Please enter your question."
                    ));
        }

        String answer =
                assistantService.getAnswer(question);

        return ResponseEntity.ok(
                Map.of("answer", answer)
        );
    }
}