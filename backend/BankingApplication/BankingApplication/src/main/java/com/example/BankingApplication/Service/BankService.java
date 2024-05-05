package com.example.BankingApplication.Service;

import com.example.BankingApplication.Entity.RequestCreate;
import com.example.BankingApplication.Entity.RequestDelete;
import com.example.BankingApplication.Entity.Transaction;
import com.example.BankingApplication.Entity.User;

import java.util.List;
import java.util.Optional;

public interface BankService {
    Optional<User> getAccount(Long accNo);

    String deposit(Long accNo, Long balance);

    String withdraw(Long accNo, Long balance);

    String transfer(Long senderAccNo, Long receiverAccNo, Long balance);

    List<Object[]> getTransactionHistory(Long account_no);

    RequestCreate createAccountRequest(RequestCreate request);

    RequestDelete deleteAccountRequest(Long accno);

    String deleteAccount(Long accno);

    List<RequestCreate> getAllCreateRequests();

    List<Object[]> getAllDeleteRequests();

    RequestCreate getCreateRequest(Long phoneno);

    boolean deleteCreateRequest(long id);

    boolean deleteDeleteRequest(long id);

    List<User> getAllUsers();

    List<Transaction> getAllTransactions();

    boolean insertAcceptedUser(String name, long phoneNo, String passWord, long initialAmount, String PIN, String date);

    boolean updateFields(long userId, String name, String password, String PIN);

    User logIn(String no, String pass);

}
