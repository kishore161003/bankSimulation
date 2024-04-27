package com.example.BankingApplication.Controller;

import com.example.BankingApplication.Entity.RequestCreate;
import com.example.BankingApplication.Entity.User;
import com.example.BankingApplication.Service.BankService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping("/{id}/deposit/{amount}")
    public ResponseEntity<String> deposit(@PathVariable long id, @PathVariable long amount) {
        bankService.deposit(id, amount);
        return ResponseEntity.ok("Deposit successful");
    }

    @PostMapping("/{id}/withdraw/{amount}")
    public ResponseEntity<String> withdraw(@PathVariable long id, @PathVariable long amount) {
        String response = bankService.withdraw(id, amount);
        if (response.equals("Insufficient balance")) {
            return ResponseEntity.badRequest().body("Insufficient balance");
        }
        return ResponseEntity.ok("Withdraw successful");
    }

    @PostMapping("/{id}/transfer/{receiverId}/{amount}")
    public ResponseEntity<String> transfer(@PathVariable long id, @PathVariable long receiverId,
            @PathVariable long amount) {
        String response = bankService.transfer(id, receiverId, amount);
        if (response.equals("Insufficient balance")) {
            return ResponseEntity.badRequest().body("Insufficient balance");
        }
        return ResponseEntity.ok("Transfer successful");
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getAccount(@PathVariable long id) {
        return ResponseEntity.ok(bankService.getAccount(id).get());
    }

    @PostMapping("/{no}/{status}")
    public ResponseEntity<String> insertAcceptedUsers(@PathVariable String no, @PathVariable String status) {
        Long phone = Long.parseLong(no);
        boolean inserted = false;
        if (status.equals("Accepted")) {
            RequestCreate request = bankService.getCreateRequest(phone);
            inserted = bankService.insertAcceptedUser(request.getName(), request.getPhoneNo(), request.getPassWord(),
                    request.getInitialAmount(), request.getPIN());

            bankService.deleteCreateRequest(request.getId());
            if (inserted) {
                return ResponseEntity.ok("User inserted successfully");
            } else {
                return ResponseEntity.badRequest().body("Failed to insert user");
            }
        } else {
            return ResponseEntity.badRequest().body("Request is not accepted");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<Object> getAllUsers() {
        return ResponseEntity.ok(bankService.getAllUsers());
    }

    @GetMapping("/{id}/transactions")
    public ResponseEntity<Object> getTransactionHistory(@PathVariable long id) {
        return ResponseEntity.ok(bankService.getTransactionHistory(id));
    }

    @GetMapping("/transactions")
    public ResponseEntity<Object> getAllTransactions() {
        return ResponseEntity.ok(bankService.getAllTransactions());
    }

    @GetMapping("/createRequests")
    public ResponseEntity<Object> getAllCreateRequests() {
        return ResponseEntity.ok(bankService.getAllCreateRequests());
    }

    @GetMapping("/deleteRequests")
    public ResponseEntity<Object> getAllDeleteRequests() {
        return ResponseEntity.ok(bankService.getAllDeleteRequests());
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteAccount(@PathVariable long id) {
        return ResponseEntity.ok(bankService.deleteAccount(id));
    }

    @DeleteMapping("/{id}/deleteRequest/{accno}/{status}")
    public ResponseEntity<String> deleteAccountRequestByUser(@PathVariable long id, @PathVariable long accno,
            @PathVariable String status) {

        bankService.deleteDeleteRequest(id);

        if (status.equals("Accepted")) {
            bankService.deleteAccount(accno);
            return ResponseEntity.ok("Request deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to delete request");
        }
    }

    @PostMapping("/{id}/deleteRequest")
    public ResponseEntity<Object> deleteAccountRequest(@PathVariable long id) {
        return ResponseEntity.ok(bankService.deleteAccountRequest(id));
    }

    @PostMapping("/createRequest")
    public ResponseEntity<Object> createAccountRequest(@RequestBody RequestCreate request) {
        return ResponseEntity.ok(bankService.createAccountRequest(request));
    }

    @PostMapping("/{id}/update")
    public ResponseEntity<String> updateFields(@PathVariable long id,
            @RequestBody User user) {
        boolean updated = bankService.updateFields(id, user.getName(), user.getPassWord(), user.getPIN());
        if (updated) {
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update user");
        }
    }

    @PostMapping("/login/{no}/{pass}")
    public User logIn(@PathVariable String no, @PathVariable String pass) {
        return bankService.logIn(no, pass);
    }

}