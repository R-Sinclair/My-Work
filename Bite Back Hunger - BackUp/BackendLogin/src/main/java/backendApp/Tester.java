package backendApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import Tables.Completed;
import Tables.Donation;
import Tables.RestaurantTable;
import Tables.UserTable;
import repository.DonationRepo;
import repository.RestaurantRepo;
import repository.UserRepo;


@Component
public class Tester implements CommandLineRunner{
	
	 
	private UserRepo userRepo;
	private RestaurantRepo restaurantRepo;
	private DonationRepo donationRepo;
	RestaurantTable rest;
	UserTable user;

	@Autowired
    public Tester(UserRepo userRepo, RestaurantRepo restaurantRepo, DonationRepo donationRepo) {
        this.userRepo = userRepo;
        this.restaurantRepo = restaurantRepo;
		this.donationRepo = donationRepo;
    }

	

	
	@Override
	 public void run(String... args) throws Exception {
		userRepo.deleteAll();
		restaurantRepo.deleteAll();
		donationRepo.deleteAll();
	
		
		
		
		
		UserTable Alice = new UserTable("Alice hey","alice@sample.com", "alice_pass", "USER");
		userRepo.save(Alice);
		
		UserTable Carol = new UserTable("Carol hey","carol@sample.com", "carol_pass", "USER");
		userRepo.save(Carol);		

		RestaurantTable Altti = new RestaurantTable("Altti hey", "altti@sample.com", "altti_pass", "BUSINESS");
		restaurantRepo.save(Altti);

		RestaurantTable Bern = new RestaurantTable("Bern hey", "Bern@sample.com", "bern_pass", "BUSINESS");
		restaurantRepo.save(Bern);
		

		for (UserTable user : userRepo.findAll()) {
            System.out.println(user.toString());

		
        }
		for (RestaurantTable user : restaurantRepo.findAll()) {
            System.out.println(user.toString());
        }
		
		
	

	}
}

