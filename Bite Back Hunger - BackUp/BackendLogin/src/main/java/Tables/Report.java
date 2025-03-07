package Tables;

import jakarta.persistence.*;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String issueType;
    private String description;
    private String donationId;

    public Report() {}

    public Report(String issueType, String description, String donationId) {
        this.issueType = issueType;
        this.description = description;
        this.donationId = donationId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getDonationId() { return donationId; }
    public void setDonationId(String donationId) { this.donationId = donationId; }

    public String getIssueType() { return issueType; }
    public void setIssueType(String issueType) { this.issueType = issueType; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
