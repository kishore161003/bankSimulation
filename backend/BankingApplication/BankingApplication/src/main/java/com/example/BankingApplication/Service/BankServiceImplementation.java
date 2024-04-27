package com.example.BankingApplication.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.BankingApplication.Entity.Transaction;
import com.example.BankingApplication.Entity.User;
import com.example.BankingApplication.Entity.Transaction.TransactionType;
import com.example.BankingApplication.Repository.UserRepository;
import com.example.BankingApplication.Repository.TransactionRepository;
import com.example.BankingApplication.Entity.RequestCreate;
import com.example.BankingApplication.Entity.RequestDelete;
import com.example.BankingApplication.Repository.RequestCreateRepository;
import com.example.BankingApplication.Repository.RequestDeleteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class BankServiceImplementation implements BankService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RequestCreateRepository rcRepository;

    @Autowired
    private RequestDeleteRepository rdRepository;

    @Override
    public Optional<User> getAccount(Long accNo) {
        return userRepository.findById(accNo);
    }

    @Override
    public String deposit(Long accNo, Long balance) {
        User user = userRepository.findById(accNo).get();
        user.setBalance(user.getBalance() + balance);
        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setSender(user);
        transaction.setReceiver(user);
        transaction.setAmount(balance);
        transaction.setTransactionType(TransactionType.DEPOSIT);
        transactionRepository.save(transaction);

        return "Deposit successful";
    }

    @Override
    public String withdraw(Long accNo, Long balance) {
        User user = userRepository.findById(accNo).get();
        if (user.getBalance() < balance) {
            return "Insufficient balance";
        }
        user.setBalance(user.getBalance() - balance);
        userRepository.save(user);

        Transaction transaction = new Transaction();
        transaction.setSender(user);
        transaction.setReceiver(user);
        transaction.setAmount(balance);
        transaction.setTransactionType(TransactionType.WITHDRAW);
        transactionRepository.save(transaction);
        return "Withdraw successful";
    }

    @Override
    public String transfer(Long senderAccNo, Long receiverAccNo, Long balance) {
        User sender = userRepository.findById(senderAccNo).get();
        if (sender.getBalance() < balance) {
            return "Insufficient balance";
        }
        User receiver = userRepository.findById(receiverAccNo).get();
        sender.setBalance(sender.getBalance() - balance);
        receiver.setBalance(receiver.getBalance() + balance);
        userRepository.save(sender);
        userRepository.save(receiver);

        Transaction transaction = new Transaction();
        transaction.setSender(sender);
        transaction.setReceiver(receiver);
        transaction.setAmount(balance);
        transaction.setTransactionType(TransactionType.TRANSFER);
        transactionRepository.save(transaction);
        return "Transfer successful";
    }

    @Override
    public List<Object[]> getTransactionHistory(Long account_no) {
        return transactionRepository.getTransactionHistory(account_no);
    }

    @Override
    public RequestCreate createAccountRequest(RequestCreate request) {
        System.out.println(request);
        return rcRepository.save(request);
    }

    @Override
    public String deleteAccount(Long accno) {
        userRepository.deleteById(accno);
        return "Account deleted successfully";
    }

    @Override
    public RequestDelete deleteAccountRequest(Long accno) {
        RequestDelete rd = new RequestDelete();
        rd.setAccNo(accno);
        rdRepository.save(rd);
        return rd;
    }

    @Override
    public List<Object[]> getAllCreateRequests() {
        return rcRepository.getAllRequests();
    }

    @Override
    public List<Object[]> getAllDeleteRequests() {
        return rdRepository.getAllRequests();
    }

    @Override
    public boolean insertAcceptedUser(String name, long phoneNo, String passWord, long initialAmount, String PIN) {
        User user = new User();
        user.setName(name);
        user.setPhoneNo(phoneNo);
        user.setPassWord(passWord);
        user.setBalance(initialAmount);
        user.setPIN(PIN);
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateFields(long userId, String name, String password, String PIN) {
        User user = userRepository.findById(userId).get();
        user.setName(name);
        user.setPassWord(password);
        user.setPIN(PIN);
        userRepository.save(user);
        return true;
    }

    @Override
    public RequestCreate getCreateRequest(Long phoneno) {
        return rcRepository.findByPhoneNo(phoneno).get();
    }

    @Override
    public boolean deleteCreateRequest(long id) {
        rcRepository.deleteById(id);
        return true;
    }

    @Override
    public boolean deleteDeleteRequest(long id) {
        rdRepository.deleteById(id);
        return true;
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return (List<Transaction>) transactionRepository.findAll();
    }

    @Override
    public User logIn(String no, String pass) {

        long phnno = (long) Long.parseLong(no);
        List<User> accList = userRepository.findByPhno(phnno);
        String password = accList.get(0).getPassWord();
        if (pass.equals(password))
            return accList.get(0);
        return null;
    }
}
