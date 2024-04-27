package com.example.BankingApplication.Entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class RequestDelete {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    private long id;
    private long accNo;

    public RequestDelete() {

    }

    public RequestDelete(long accNo) {
        this.accNo = accNo;
    }

    @Override
    public String toString() {
        return "RequestDelete{" +
                ", accNo=" + accNo +
                '}';
    }
}