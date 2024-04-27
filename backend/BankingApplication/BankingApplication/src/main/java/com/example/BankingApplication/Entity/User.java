package com.example.BankingApplication.Entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "accno_sequence")
    @SequenceGenerator(name = "accno_sequence", sequenceName = "accno_sequence", initialValue = 1000000, allocationSize = 1)
    private long accNo;
    private String name;
    private long phno;
    private String passWord;
    private long balance;
    private String PIN;

    public User() {

    }

    public enum RequestStatus {
        ACCEPTED,
        PENDING,
        REJECTED
    }

    public User(String name, long phno, String passWord, long balance) {
        this.name = name;
        this.phno = phno;
        this.passWord = passWord;
        this.balance = balance;
    }

    public void setPhoneNo(long phoneNo) {
        this.phno = phoneNo;
    }

    public void setInitialAmount(long initialAmount) {
        this.balance = initialAmount;
    }

    @Override
    public String toString() {
        return "Account{" +
                "accNo=" + accNo +
                ", name='" + name + '\'' +
                ", phno=" + phno +
                ", passWord='" + passWord + '\'' +
                ", balance=" + balance +
                '}';
    }

}