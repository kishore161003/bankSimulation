package com.example.BankingApplication.Entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Entity
@Getter
@Setter
@RequestMapping("/api/insert")
public class RequestCreate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private long phoneNo;
    private String name;
    private String passWord;
    private long initialAmount;
    private String PIN;

    public RequestCreate() {

    }

    public RequestCreate(String name, long phoneNo, String passWord, long initialAmount, String PIN) {

        this.phoneNo = phoneNo;
        this.name = name;
        this.passWord = passWord;
        this.initialAmount = initialAmount;
        this.PIN = PIN;
    }

    @Override
    public String toString() {
        return "{" +
                ", phoneNo=" + phoneNo +
                ", name='" + name + '\'' +
                ", passWord='" + passWord + '\'' +
                ", initialAmount=" + initialAmount +
                '}';

    }
}