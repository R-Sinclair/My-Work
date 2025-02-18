package backendApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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

		UserTable Altti = new UserTable("Altti hey", "altti@sample.com", "altti_pass", "USER");
		userRepo.save(Altti);

		RestaurantTable Bern = new RestaurantTable("hey", "altti@sample.com", "altti_pass", "BUSINESS");
		restaurantRepo.save(Bern);

		//print all users
		for (UserTable user : userRepo.findAll()) {
            System.out.println(user.toString());

		
        }
		for (RestaurantTable user : restaurantRepo.findAll()) {
            System.out.println(user.toString());
        }
		
		
	

	}
}

