package backendApp;

import repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Component;

import Tables.*;


@Component
public class Tester implements CommandLineRunner{
	
	@Autowired 
	public UserRepo userRepo;

	
	@Override
	 public void run(String... args) throws Exception {
		userRepo.deleteAll();
		
		
		
		UserTable Bob = new UserTable("Bob","hey","bob@sample.com", "bob_pass", UserType.BUSINESS);
		userRepo.save(Bob);
		
		UserTable Alice = new UserTable("Alice", "hey","alice@sample.com", "alice_pass", UserType.USER);
		userRepo.save(Alice);
		
		UserTable Carol = new UserTable("Carol", "hey","carol@sample.com", "carol_pass", UserType.BUSINESS);
		userRepo.save(Carol);		

		UserTable Altti = new UserTable("Altti","hey", "altti@sample.com", "altti_pass", UserType.USER);
		userRepo.save(Altti);

		//print all users
		for (UserTable user : userRepo.findAll()) {
            System.out.println(user.toString());
        }
		
	

	}
}

