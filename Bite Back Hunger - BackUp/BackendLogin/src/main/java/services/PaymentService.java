package services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import DataTransferObject.DonationDTO;
import Tables.Donations;
import Tables.Payment;
import repository.DonationRepository;
import repository.PaymentRepository;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private DonationRepository donationRepository;

  
    @Autowired
    private EmailService emailServiceImpl;

    @Transactional
    public Payment processPayment(DonationDTO Donation) {
        // Find the donation
        Donations donation = donationRepository.findById(Donation.getDonationId())
                .orElseThrow(() -> new RuntimeException("Donation not found"));

        // Create new payment
        Payment payment = new Payment();
        payment.setDonation(donation);
        payment.setAmount(BigDecimal.valueOf(Donation.getAmount()));
        payment.setStatus("COMPLETED");
        payment.setPaymentMethod("ONLINE");
        payment.setTransactionId(generateTransactionId());
        payment.setCreatedAt(LocalDateTime.now());

        // Validate payment amount
        validatePaymentAmount(donation, payment.getAmount());

        // Save payment and update donation
        donation.addPayment(payment);
        emailServiceImpl.sendPaymentConfirmationEmail(Donation.getUserEmail(), donation.getDonorName(), Donation.getAmount());
        updateDonationStatus(donation);
        Payment savedPayment = paymentRepository.save(payment);

        // Send confirmation email

        return savedPayment;
    }

    private void validatePaymentAmount(Donations donation, BigDecimal paymentAmount) {
        // Calculate total amount paid so far
        BigDecimal totalPaid = donation.getPayments().stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Add the new payment amount
        totalPaid = totalPaid.add(paymentAmount);

        // Check if total paid would exceed donation amount
        if (totalPaid.compareTo(donation.getAmount()) > 0) {
            throw new RuntimeException("Payment amount exceeds remaining donation amount");
        }
    }

    private void updateDonationStatus(Donations donation) {
        BigDecimal totalPaid = donation.getPayments().stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (totalPaid.compareTo(donation.getAmount()) == 0) {
            donation.setPaymentStatus("COMPLETED");
        } else if (totalPaid.compareTo(BigDecimal.ZERO) > 0) {
            donation.setPaymentStatus("PARTIALLY_PAID");
        }

        donationRepository.save(donation);
    }

    private String generateTransactionId() {
        return "TXN" + System.currentTimeMillis();
    }

    public List<Payment> getPaymentsByDonationId(Long donationId) {
        return paymentRepository.findByDonationId(donationId);
    }
} 