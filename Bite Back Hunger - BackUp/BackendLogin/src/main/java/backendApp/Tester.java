package backendApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import Tables.RestaurantTable;
import Tables.UserTable;
import  Tables.UserType;
import repository.RestaurantRepo;
import repository.UserRepo;


@Component
public class Tester implements CommandLineRunner{
	
	 
	private UserRepo userRepo;
	private RestaurantRepo restaurantRepo;

	@Autowired
    public Tester(UserRepo userRepo, RestaurantRepo restaurantRepo) {
        this.userRepo = userRepo;
        this.restaurantRepo = restaurantRepo;
    }

	

	
	@Override
	 public void run(String... args) throws Exception {
		userRepo.deleteAll();
		restaurantRepo.deleteAll();
		
	
		
		
		
		
		UserTable Alice = new UserTable("Alice", "hey","alice@sample.com", "alice_pass", UserType.USER);
		userRepo.save(Alice);
		
		UserTable Carol = new UserTable("Carol", "hey","carol@sample.com", "carol_pass", UserType.BUSINESS);
		userRepo.save(Carol);		

		UserTable Altti = new UserTable("Altti","hey", "altti@sample.com", "altti_pass", UserType.USER);
		userRepo.save(Altti);

		RestaurantTable Bern = new RestaurantTable("hey", "altti@sample.com", "altti_pass", UserType.BUSINESS);
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

