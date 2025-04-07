package services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.Campaign;
import Tables.Donations;
import Tables.Donor;
import jakarta.transaction.Transactional;
import repository.CampaignRepository;
import repository.DonationRepository;
import repository.DonorRepository;

@Service
@Transactional
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private DonorRepository donorRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    public Donations saveDonation(Donations donation) {
        // Fetch the complete donor entity
        if (donation.getDonor() != null && donation.getDonor().getId() != null) {
            Donor donor = donorRepository.findById(donation.getDonor().getId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));
            donation.setDonor(donor);
        }

        // Fetch the complete campaign entity if provided
        if (donation.getCampaign() != null && donation.getCampaign().getId() != null) {
            Campaign campaign = campaignRepository.findById(donation.getCampaign().getId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
            donation.setCampaign(campaign);
        }

        return donationRepository.save(donation);
    }

    public List<Donations> getAllDonations() {
        return donationRepository.findAll();
    }

    public Donations updateDonation(Long id, Donations updatedDonation) {
        Donations existingDonation = donationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found with id: " + id));

        // Update fields
        if (updatedDonation.getAmount() != null) {
            existingDonation.setAmount(updatedDonation.getAmount());
        }
        if (updatedDonation.getPaymentStatus() != null) {
            existingDonation.setPaymentStatus(updatedDonation.getPaymentStatus());
        }
        if (updatedDonation.getPaymentMethod() != null) {
            existingDonation.setPaymentMethod(updatedDonation.getPaymentMethod());
        }

        // Update campaign if provided
        if (updatedDonation.getCampaign() != null && updatedDonation.getCampaign().getId() != null) {
            Campaign campaign = campaignRepository.findById(updatedDonation.getCampaign().getId())
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
            existingDonation.setCampaign(campaign);
        }

        // Update donor if provided
        if (updatedDonation.getDonor() != null && updatedDonation.getDonor().getId() != null) {
            Donor donor = donorRepository.findById(updatedDonation.getDonor().getId())
                .orElseThrow(() -> new RuntimeException("Donor not found"));
            existingDonation.setDonor(donor);
        }

        return donationRepository.save(existingDonation);
    }

    public Donations getDonationById(Long id) {
        return donationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found with id: " + id));
    }
}
