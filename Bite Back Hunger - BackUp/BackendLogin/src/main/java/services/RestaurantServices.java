package services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.RestaurantTable;
import exceptions.ResourceNotFoundException;
import repository.RestaurantRepo;

@Service
public class RestaurantServices {

	@Autowired
   public RestaurantRepo restaurantRepo;
	

   
	public RestaurantServices() {
		super();
	}
	
	

	public List<RestaurantTable> getUsers() {
		return (List<RestaurantTable>) restaurantRepo.findAll();
	}

	public void addUser(RestaurantTable newUser) {
		restaurantRepo.save(newUser);
	}
	
	public Optional<RestaurantTable> findByID(Long id) {
		 return restaurantRepo.findById(id);
	}
	

	public void deleteUser(Long id) {
		RestaurantTable user = restaurantRepo.findById(id)
				  .orElseThrow(() -> new ResourceNotFoundException("Restaurant", "id", id));
		restaurantRepo.delete(user);
	}
	
	public RestaurantTable findByEmail(String email) {
		return restaurantRepo.findByEmail(email);
	}


	public RestaurantTable save(RestaurantTable updatedUser) {
		return restaurantRepo.save(updatedUser);

	}

}
