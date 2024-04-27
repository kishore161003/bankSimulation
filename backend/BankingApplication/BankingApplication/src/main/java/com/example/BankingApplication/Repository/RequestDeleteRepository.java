package com.example.BankingApplication.Repository;

import com.example.BankingApplication.Entity.RequestDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RequestDeleteRepository extends JpaRepository<RequestDelete, Long> {
    @Query("select r from RequestDelete r")
    List<Object[]> getAllRequests();
}
