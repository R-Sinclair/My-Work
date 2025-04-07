package services;

public interface Email {
    void sendPaymentConfirmationEmail(String to, String name, double amount);
} 