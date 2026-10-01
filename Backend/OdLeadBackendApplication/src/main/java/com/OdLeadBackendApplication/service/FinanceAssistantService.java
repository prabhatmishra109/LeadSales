package com.OdLeadBackendApplication.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class FinanceAssistantService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.model:gemini-3.5-flash-lite"
    		+ "}")
    private String geminiModel;

    private final RestClient restClient;

    public FinanceAssistantService() {
        this.restClient = RestClient.create();
    }

    public String getAnswer(String question) {

        if (question == null || question.isBlank()) {
            return "Please enter your question.";
        }

        String prompt = """
                You are a Finance Assistant for a website that provides
                information about Overdraft (OD) and Personal Loans.

                Answer the customer's exact question directly.

                LANGUAGE:
                - Use very simple English or Hinglish.
                - If the customer asks in Hindi or Hinglish, answer in Hinglish.
                - Keep the answer short and easy to understand.

                FORMATTING RULES:
                - Return ONLY plain text.
                - NEVER use Markdown.
                - NEVER use asterisks.
                - NEVER use double asterisks.
                - NEVER use hashtags.
                - NEVER use bullet symbols.
                - NEVER use headings with special characters.
                - Do not use bold or italic formatting.
                - If multiple points are needed, use simple numbered lines like:
                  1. First point
                  2. Second point
                  3. Third point
                - Do not add unnecessary information.
                - Do not repeat the customer's question.

                FINANCE RULES:
                - Explain OD and Personal Loan in simple language.
                - Never guarantee loan approval.
                - Never say that a customer is definitely eligible.
                - Never invent interest rates, fees, limits, tenure,
                  eligibility rules or lender policies.
                - If exact lender-specific information is not available,
                  say that it depends on the lender.
                - Never ask for OTP, PIN, CVV, password or banking credentials.
                - Never tell a customer to pay money to guarantee approval.
                - Final approval is decided by the lender after verification.

                BASIC KNOWLEDGE:

                Overdraft:
                An overdraft is a credit facility where a lender provides
                an approved credit limit. The customer can use money within
                that limit according to the lender's terms. Interest and
                charges depend on the lender.

                Personal Loan:
                A personal loan is generally an unsecured loan where a
                lender sanctions a specific amount. The customer normally
                repays it through scheduled EMIs. Exact terms depend on
                the lender.

                OD vs Personal Loan:
                OD usually provides an approved credit limit that can be
                used according to the facility terms. A personal loan
                generally provides a sanctioned loan amount that is repaid
                through scheduled EMIs.

                Eligibility:
                Eligibility may depend on income, employment or business
                profile, existing obligations, credit history, age,
                location and lender policy.

                Documents:
                Documents may include identity proof, address proof,
                income documents and banking-related documents depending
                on the lender and applicant profile.

                Credit Score:
                Credit history or credit score may be considered by a lender
                while assessing an application. Requirements vary by lender.

                IMPORTANT:
                Give only the information needed to answer the customer's
                question.

                If the customer asks "What is OD?", explain only what OD is.

                If the customer asks "How does OD work?", explain only how
                OD works.

                If the customer asks "What documents are required?", explain
                only the documents.

                If the customer asks about eligibility, explain the common
                factors but do not guarantee eligibility.

                If the question is unrelated to OD or Personal Loan, politely
                say that you mainly help with OD and Personal Loan questions.

                FINAL DISCLAIMER:
                Information provided by this assistant is general information
                only. Final eligibility, interest rate, charges, limit and
                approval depend on lender policies and verification.

                CUSTOMER QUESTION:
                %s
                """.formatted(question);

        try {

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/"
                    + geminiModel
                    + ":generateContent?key="
                    + geminiApiKey;

            Map<String, Object> requestBody = Map.of(
                    "contents",
                    List.of(
                            Map.of(
                                    "parts",
                                    List.of(
                                            Map.of(
                                                    "text",
                                                    prompt
                                            )
                                    )
                            )
                    )
            );

            Map<?, ?> response = restClient
                    .post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            return extractAnswer(response);

        } catch (Exception e) {

            e.printStackTrace();

            return "Sorry, Finance Assistant abhi available nahi hai. Please try again.";
        }
    }

    private String extractAnswer(Map<?, ?> response) {

        try {

            if (response == null) {
                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object candidatesObject = response.get("candidates");

            if (!(candidatesObject instanceof List<?> candidates)
                    || candidates.isEmpty()) {

                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object candidateObject = candidates.get(0);

            if (!(candidateObject instanceof Map<?, ?> candidate)) {
                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object contentObject = candidate.get("content");

            if (!(contentObject instanceof Map<?, ?> content)) {
                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object partsObject = content.get("parts");

            if (!(partsObject instanceof List<?> parts)
                    || parts.isEmpty()) {

                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object firstPartObject = parts.get(0);

            if (!(firstPartObject instanceof Map<?, ?> firstPart)) {
                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            Object text = firstPart.get("text");

            if (text == null) {
                return "Sorry, mujhe abhi answer nahi mil paya.";
            }

            return text.toString();

        } catch (Exception e) {

            e.printStackTrace();

            return "Sorry, Finance Assistant answer process nahi kar pa raha hai.";
        }
    }
}