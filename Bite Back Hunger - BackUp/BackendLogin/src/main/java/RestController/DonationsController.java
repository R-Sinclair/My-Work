package RestController;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DataTransferObject.DTODonations;
import Tables.Completed;
import Tables.Donation;
import services.DonationServices;

@RestController
@RequestMapping("/Donations")
public class DonationsController {
    @Autowired
    DonationServices donationServices;
    
    // Get All Users
    @GetMapping("/AllDonations")
    public List<Donation> getDonations() {
        return donationServices.getDonations();
    }


    //Post a User
    @PostMapping("/AddDonations")
    public ResponseEntity<Optional<Donation>> addDonations(@RequestBody DTODonations data) {
    	
    	if (data.getDonationId()==0 ||
    			data.getRestaurantId()==null ||
    		data.getCode()==0 ||
			data.getCompletedTask() == Completed.NONE||
                "".equals(data.getLocation()) 
			) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	Donation newDonation = new Donation(data.getDonationId(),data.getRestaurantId(), data.getCode(),
    			data.getLocation(),data.getPickUp(), data.getUserId(), data.getCompletedTask(), data.getName());
    	donationServices.addUser(newDonation);
    	return new ResponseEntity<>(Optional.ofNullable(newDonation),HttpStatus.CREATED);

    }
    
    
    @GetMapping("/findById/{id}")
    public ResponseEntity<Donation>getDonationById(@PathVariable(value = "id") long id) {
    	Optional<Donation> Donation = donationServices.findById(id);
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
   
    @DeleteMapping("/delete/{donationId}")
    public ResponseEntity<Donation>  deleteDonationByDonationId(@PathVariable(value = "donationId") int donationId) {
        donationServices.deleteDonationByDonationId(donationId);
        String Deleted = "User Deleted"; 
        return new ResponseEntity<>( HttpStatus.OK);
    }
    
    @GetMapping("/findByRestaurantId/{restaurantId}")
    public ResponseEntity<Donation> getUserByRestaurantId(@PathVariable(value = "restaurantId") long restaurantId) {
    	Optional<Donation> Donation = donationServices.findByRestaurantId(restaurantId);
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findByUserId/{userId}")
    public ResponseEntity<Donation> getByUserId(@PathVariable(value = "userId") long userId) {
    	Optional<Donation> Donation = (donationServices.findByUserId(userId));
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }

	@GetMapping("/findByDonationId/{donationId}")
    public ResponseEntity<Donation> getByDonationId(@PathVariable(value = "donationId") int donationId) {
    	Optional<Donation> Donation = (donationServices.findByDonationId(donationId));
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }


    @PatchMapping ("/UpdateDonationById/{donationId}")
	public ResponseEntity<Donation> UpdateUserById (@PathVariable(value = "donationId") int donationId, @RequestBody Donation NewDonation) 
	{
		Optional<Donation> OldDonation = donationServices.findByDonationId(donationId);
		if (OldDonation.isPresent())
		{
			Donation UpdatedDonation = OldDonation.get();
			if (UpdatedDonation.getUserId() == null) {
                UpdatedDonation.setUserId(UpdatedDonation.getUserId());
            }
            if (UpdatedDonation.getCompletedTask() != null) {
                UpdatedDonation.setCompletedTask(UpdatedDonation.getCompletedTask());
            }
			Donation DonationObject = donationServices.save(UpdatedDonation);
			
			return new ResponseEntity<>(DonationObject, HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
   
}
