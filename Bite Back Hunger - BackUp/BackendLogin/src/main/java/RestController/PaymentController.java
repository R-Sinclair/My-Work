package RestController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DataTransferObject.DonationDTO;
import Tables.Payment;
import services.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest request) {
        try {

            DonationDTO donation = new DonationDTO();
            donation.setDonationId(request.getDonationId());
            donation.setUserName(request.getUserName());
            donation.setUserEmail(request.getUserEmail());
            donation.setAmount(request.getAmount());
            Payment payment = paymentService.processPayment(donation );
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

//    @PostMapping
//    public ResponseEntity<?> createPayment(@RequestBody Payment payment) {
//        try {
//            Payment savedPayment = paymentService.savePayment(payment);
//            return ResponseEntity.ok(savedPayment);
//        } catch (RuntimeException e) {
//            if (e.getMessage().contains("Payment already exists")) {
//                return ResponseEntity
//                    .status(HttpStatus.CONFLICT)
//                    .body(Map.of("error", e.getMessage()));
//            }
//            return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .body(Map.of("error", e.getMessage()));
//        }
//    }

    @GetMapping("/donation/{donationId}")
    public ResponseEntity<List<Payment>> getPaymentsByDonationId(@PathVariable Long donationId) {
        List<Payment> payments = paymentService.getPaymentsByDonationId(donationId);
        return ResponseEntity.ok(payments);
    }
}

// Request DTO for payment processing
class PaymentRequest {
    private String userEmail;
    private String userName;
    private double amount;
    private Long donationId;
    private PaymentDetails paymentDetails;

    // Getters and setters
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
    
    public Long getDonationId() { return donationId; }
    public void setDonationId(Long donationId) { this.donationId = donationId; }
    
    public PaymentDetails getPaymentDetails() { return paymentDetails; }
    public void setPaymentDetails(PaymentDetails paymentDetails) { this.paymentDetails = paymentDetails; }
}

class PaymentDetails {
    private String accountHolder;
    private String bankName;
    private String accountNumber;
    private String sortCode;
    private String scheduledDate;

    // Getters and setters
    public String getAccountHolder() { return accountHolder; }
    public void setAccountHolder(String accountHolder) { this.accountHolder = accountHolder; }
    
    public String getBankName() { return bankName; }
    public void setBankName(String bankName) { this.bankName = bankName; }
    
    public String getAccountNumber() { return accountNumber; }
    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    
    public String getSortCode() { return sortCode; }
    public void setSortCode(String sortCode) { this.sortCode = sortCode; }
    
    public String getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(String scheduledDate) { this.scheduledDate = scheduledDate; }
}


