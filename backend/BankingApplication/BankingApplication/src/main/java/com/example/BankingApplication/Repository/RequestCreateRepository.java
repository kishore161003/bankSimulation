package com.example.BankingApplication.Repository;

import com.example.BankingApplication.Entity.RequestCreate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

import java.util.Optional;

public interface RequestCreateRepository extends JpaRepository<RequestCreate, Long> {
    @Query("select r from RequestCreate r")
    List<Object[]> getAllRequests();

    Optional<RequestCreate> findByPhoneNo(Long phoneNo);
}
