package com.OdLeadBackendApplication.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.OdLeadBackendApplication.model.Lead;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    List<Lead> findByProduct(String product);

}
