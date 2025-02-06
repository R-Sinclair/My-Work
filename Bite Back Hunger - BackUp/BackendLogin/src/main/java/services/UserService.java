package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.UserTable;
import exceptions.ResourceNotFoundException;
import repository.UserRepo;

@Service
public class UserService {
	@Autowired
   public UserRepo userRepo;
	
	public UserService() {
		super();
	}
	

	public List<UserTable> getUsers() {
		return (List<UserTable>) userRepo.findAll();
	}

	public void addUser(UserTable newUser) {
		userRepo.save(newUser);
	}
	
	public Optional<UserTable> findByID(Long id) {
		 return userRepo.findById(id);
	}
	
	public void deleteUser(Long id) {
		UserTable user = userRepo.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		userRepo.delete(user);
	}
	
	public UserTable findByEmail(String email) {
		return userRepo.findByEmail(email);
	}


	public UserTable save(UserTable updatedUser) {
		return userRepo.save(updatedUser);

	}

}
