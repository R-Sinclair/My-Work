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

import DataTransferObject.DataTransfer;
import Tables.UserTable;
import services.UserService;

@RestController
@RequestMapping("/NormalUsers")
public class UserController {
    @Autowired
	UserService userService;
    
    // Get All Users
    @GetMapping("/AllUsers")
    public List<UserTable> getUsers() {
        return userService.getUsers();
    }


    //Post a User
    @PostMapping("/AddUser")
    public ResponseEntity<Optional<UserTable>> addUser(@RequestBody DataTransfer data) {
    	
    	if (data.getName()==null ||
    		data.getEmail()==null ||
    		data.getPassword()==null ||
    		data.getUserType() == null) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	UserTable newUser = new UserTable(data.getName(), data.getEmail(),
    			data.getPassword(), data.getUserType());
    	userService.addUser(newUser);
    	return new ResponseEntity<>(Optional.ofNullable(newUser),HttpStatus.CREATED);

    }
    
    //Get User by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserTable>getUserById(@PathVariable(value = "id") long id) {
    	Optional<UserTable> user1 = userService.findByID(id);
		if (user1.isPresent())
		{
			return new ResponseEntity<>(user1.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
    //Delete a User by ID
    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<UserTable>  deleteUser(@PathVariable(value = "id") long id) {
        userService.deleteUser(id);
        String Deleted = "User Deleted"; 
        return new ResponseEntity<>( HttpStatus.OK);
    }
    
    //Get User by Email
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<UserTable> getUserByEmail(@PathVariable(value = "email") String email) {
    	Optional<UserTable> user1 = Optional.ofNullable(userService.findByEmail(email));
		if (user1.isPresent())
		{
			return new ResponseEntity<>(user1.get(), HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping ("/Update/{email}")
	public ResponseEntity<UserTable> UpdateUserByEmail (@PathVariable (value ="email") String email, @RequestBody UserTable NewUser) 
	{
		Optional<UserTable> OldUser = Optional.ofNullable(userService.findByEmail(email));
		if (OldUser.isPresent())
		{
			UserTable UpdatedUser = OldUser.get();
			UpdatedUser.setEmail(NewUser.getEmail());
			UpdatedUser.setName(NewUser.getName());
			UpdatedUser.setPassword(NewUser.getPassword());
			
			UserTable UserObject = userService.save(UpdatedUser);
			
			return new ResponseEntity<>(UserObject, HttpStatus.OK);

			}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
   
}
