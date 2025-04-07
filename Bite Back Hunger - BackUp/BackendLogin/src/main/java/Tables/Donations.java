package Tables;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "CrowdFund")
public class Donations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference(value = "donor-donation")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private Donor donor;

    private BigDecimal amount;
    private String paymentStatus;
    private String paymentMethod;

    @JsonBackReference(value = "campaign-donation")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @JsonManagedReference(value = "donation-payment")
    @OneToMany(mappedBy = "donation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Payment> payments = new ArrayList<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public void addPayment(Payment payment) {
        payments.add(payment);
        payment.setDonation(this);
    }

    // Helper methods to get donor and campaign details without causing lazy loading issues
    @Transient
    public String getDonorName() {
        return donor != null ? donor.getTitle() + " " + donor.getFirstName() + " " + donor.getLastName() : null;
    }

    @Transient
    public String getDonorEmail() {
        return donor != null ? donor.getEmail() : null;
    }

    @Transient
    public String getCampaignName() {
        return campaign != null ? campaign.getName() : "General";
    }
}