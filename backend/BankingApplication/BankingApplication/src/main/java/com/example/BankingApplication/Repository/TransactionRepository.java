package com.example.BankingApplication.Repository;

import com.example.BankingApplication.Entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    @Query("select t from Transaction t where t.sender.accNo = :account_no or t.receiver.accNo = :account_no")
    List<Object[]> getTransactionHistory(@Param("account_no") Long account_no);

}