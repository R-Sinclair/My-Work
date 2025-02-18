
package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.Donation;
import exceptions.ResourceNotFoundException;
import repository.DonationRepo;

@Service
public class DonationServices {

	@Autowired
   private DonationRepo donationRepo;
	
	public DonationServices() {
		super();
	}
	
	public List<Donation> getDonations() {
		return (List<Donation>) donationRepo.findAll();
	}


	public void addUser(Donation newDonation) {
		donationRepo.save(newDonation);
	}
	
	public Optional<Donation> findByDonationId(int donationId) {
		 return donationRepo.findByDonationId(donationId);
	}
	
	public Optional<Donation> findById(Long id) {
		return donationRepo.findById(id);
   }
   
	public Optional<Donation> findByRestaurantId(Long restaurantId) {
		 return donationRepo.findByRestaurantId(restaurantId);
	}
	
	public Optional<Donation> findByUserId(Long userId) {
		 return donationRepo.findByUserId(userId);
	}


   
   
	
	public void deleteDonation(Long id) {
		Donation donation = donationRepo.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("Donation", "id", id));
		donationRepo.delete(donation);
	}

	public Donation save(Donation updatedDonation) {
		return donationRepo.save(updatedDonation);

	}
	


	

}

