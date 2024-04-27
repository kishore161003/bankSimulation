package com.example.BankingApplication.Entity;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long transactionId;

    @ManyToOne
    @JoinColumn(name = "senderAccno")
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiverAccno")
    private User receiver;

    private long amount;

    private enum Status {
        DISABLED,
        ENABLED
    }

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Status status = Status.ENABLED;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private TransactionType transactionType;

    public enum TransactionType {
        WITHDRAW,
        DEPOSIT,
        TRANSFER
    }

    public Transaction() {

    }

    public Transaction(User sender, User receiver, long amount, TransactionType transactionType) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.transactionType = transactionType;
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "transactionId=" + transactionId +
                ", sender=" + sender +
                ", receiver=" + receiver +
                ", amount=" + amount +
                ", transactionType=" + transactionType +
                '}';
    }
}