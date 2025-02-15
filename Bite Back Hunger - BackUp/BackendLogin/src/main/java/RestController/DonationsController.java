package RestController;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import DataTransferObject.DTODonations;
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
                "".equals(data.getLocation()) 
			) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	Donation newDonation = new Donation(data.getDonationId(),data.getRestaurantId(), data.getCode(),
    			data.getLocation(), data.getUserId());
    	donationServices.addUser(newDonation);
    	return new ResponseEntity<>(Optional.ofNullable(newDonation),HttpStatus.CREATED);

    }
    
    //Get User by ID
    @GetMapping("/Donation/{id}")
    public ResponseEntity<Donation>getDonationById(@PathVariable(value = "id") long id) {
    	Optional<Donation> Donation = donationServices.findById(id);
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
   
    @DeleteMapping("/Donation/{id}")
    public ResponseEntity<Donation>  deleteDonation(@RequestParam Long donationId) {
        donationServices.deleteDonation(donationId);
        String Deleted = "User Deleted"; 
        return new ResponseEntity<>( HttpStatus.OK);
    }
    
    @GetMapping("/Donation/findByRestaurantId")
    public ResponseEntity<Donation> getUserByRestaurantId(@RequestParam Long restaurantId) {
    	Optional<Donation> Donation = donationServices.findByRestaurantId(restaurantId);
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/Donation/findByUserId")
    public ResponseEntity<Donation> getUserByUserId(@RequestParam Long userId) {
    	Optional<Donation> Donation = (donationServices.findByUserId(userId));
		if (Donation.isPresent())
		{
			return new ResponseEntity<>(Donation.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        
    }

    @PutMapping ("/UpdateDonationById/{id}")
	public ResponseEntity<Donation> UpdateUserById (@RequestParam Long donationId, @RequestBody Donation NewDonation) 
	{
		Optional<Donation> OldDonation = donationServices.findById(donationId);
		if (OldDonation.isPresent())
		{
			Donation UpdatedDonation = OldDonation.get();
			UpdatedDonation.setUserId(NewDonation.getUserId());
			UpdatedDonation.setLocation(NewDonation.getLocation());
			
			Donation DonationObject = donationServices.save(UpdatedDonation);
			
			return new ResponseEntity<>(DonationObject, HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
   
}
