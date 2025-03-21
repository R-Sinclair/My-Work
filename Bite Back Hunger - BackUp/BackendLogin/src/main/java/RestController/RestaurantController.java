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
import org.springframework.web.bind.annotation.RestController;

import DataTransferObject.DTORestaurants;
import Tables.RestaurantTable;
import services.RestaurantServices;

@RestController
@RequestMapping("/Restaurant")
public class RestaurantController {
    @Autowired
	RestaurantServices restaurantService;
    
    // Get All Users
    @GetMapping("/AllUsers")
    public List<RestaurantTable> getUsers() {
        return restaurantService.getUsers();
    }


    //Post a User
    @PostMapping("/AddUser")
    public ResponseEntity<Optional<RestaurantTable>> addUser(@RequestBody DTORestaurants data) {
    	
    	if (
    		data.getName()==null ||
    		data.getEmail()==null ||
    		data.getPassword()==null ||
    		data.getUserType() == null) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	RestaurantTable newUser = new RestaurantTable(data.getName(), data.getEmail(),
    			data.getPassword(), data.getUserType());
    	restaurantService.addUser(newUser);
    	return new ResponseEntity<>(Optional.ofNullable(newUser),HttpStatus.CREATED);

    }
    
    //Get User by ID
    @GetMapping("/id/{id}")
    public ResponseEntity<RestaurantTable>getUserById(@PathVariable(value = "id") long id) {
    	Optional<RestaurantTable> user1 = restaurantService.findByID(id);
		if (user1.isPresent())
		{
			return new ResponseEntity<>(user1.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
    //Delete a User by ID
    @DeleteMapping("/id/{id}")
    public ResponseEntity<RestaurantTable>  deleteUser(@PathVariable(value = "id") long id) {
    	restaurantService.deleteUser(id);
        String Deleted = "User Deleted"; 
        return new ResponseEntity<>( HttpStatus.OK);
    }
    
    //Get User by Email
    @GetMapping("/email/{email}")
    public ResponseEntity<RestaurantTable> getUserByEmail(@PathVariable(value = "email") String email) {
    	Optional<RestaurantTable> user1 = Optional.ofNullable(restaurantService.findByEmail(email));
		if (user1.isPresent())
		{
			return new ResponseEntity<>(user1.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping ("/Update/{email}")
	public ResponseEntity<RestaurantTable> UpdateUserByEmail (@PathVariable (value ="email") String email, @RequestBody RestaurantTable NewUser) 
	{
		Optional<RestaurantTable> OldUser = Optional.ofNullable(restaurantService.findByEmail(email));
		if (OldUser.isPresent())
		{
			RestaurantTable UpdatedUser = OldUser.get();
			UpdatedUser.setEmail(NewUser.getEmail());
			UpdatedUser.setName(NewUser.getName());
			UpdatedUser.setPassword(NewUser.getPassword());
			
			RestaurantTable UserObject = restaurantService.save(UpdatedUser);
			
			return new ResponseEntity<>(UserObject, HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
   
}
