package backendApp;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import Tables.RestaurantTable;
import Tables.UserTable;
import repository.DonationRepo;
import repository.RestaurantRepo;
import repository.UserRepo;
import services.EmailService;


@Component
public class Tester implements CommandLineRunner{
	

    @Autowired
    private EmailService emailService;

    @Autowired
    private JavaMailSender mailSender;
    
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
	
		
	/*	   String toEmail = "reuben.sinclair11@gmail.com";
	        String subject = "Test Subject";
	        String body = "Test Body";
	        try {
	            emailService.sendEmail(toEmail, subject, body);
	            System.out.println("Email sent successfully.");
	        } catch (Exception e) {
	            e.printStackTrace();
	           
	        }*/
		
		
		
		
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

