
package com.OdLeadBackendApplication.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class LeadRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$",
        message = "Enter a valid 10-digit Indian mobile number"
    )
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Product is required")
    private String product;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotNull(message = "Income is required")
    @Positive(message = "Income must be greater than 0")
    private Double income;

    @PositiveOrZero(message = "EMI cannot be negative")
    private Double emi;
//
//    @NotNull(message = "Required amount is required")
//    @Positive(message = "Required amount must be greater than 0")
//    private Double requiredAmount;

    @NotNull(message = "Consent is required")
    @AssertTrue(message = "Consent is required")
    private Boolean consent;

    private String source;

    public LeadRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }

//    public Double getRequiredAmount() {
//        return requiredAmount;
//    }
//
//    public void setRequiredAmount(Double requiredAmount) {
//        this.requiredAmount = requiredAmount;
//    }

    public Boolean getConsent() {
        return consent;
    }

    public void setConsent(Boolean consent) {
        this.consent = consent;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}

