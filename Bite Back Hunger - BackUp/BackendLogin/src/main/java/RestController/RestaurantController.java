package RestController;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import jakarta.validation.Valid;
import services.RestaurantServices;

// secure registration and login functionality using Spring Security

@RestController
@RequestMapping("/Restaurant")
@CrossOrigin(origins = "*") // Add CORS support
public class RestaurantController {
    @Autowired
	RestaurantServices restaurantService;
    
    // This is the password encoder that will hash passwords
    @Autowired
	private PasswordEncoder passwordEncoder;

//password encoder is available for password operations
	@Autowired
    public RestaurantController(RestaurantServices restaurantService, PasswordEncoder passwordEncoder) {
        this.restaurantService = restaurantService;
        this.passwordEncoder = passwordEncoder;
    }

    // Get All Users
    @GetMapping("/AllUsers")
    public List<RestaurantTable> getUsers() {
        return restaurantService.getUsers();
    }

    /**
     * This endpoint handles user registration
     * 1. Input validation
     * 2. Duplicate email checking
     * 3. Password hashing
     * 4. User creation
     */
    @PostMapping("/AddUser")
    public ResponseEntity<?> addUser(@Valid @RequestBody DTORestaurants data, BindingResult result) {
        System.out.println("Received restaurant registration request for: " + data.getEmail());
        
        // Check for validation errors (e.g., invalid email format, password too short)
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
                System.out.println("Validation error: " + error.getField() + " - " + error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Validation failed: " + errors));
        }

        try {
            // Check if email already exists to prevent duplicate accounts
            RestaurantTable existingUser = restaurantService.findByEmail(data.getEmail());
            if (existingUser != null) {
                System.out.println("Email already exists: " + data.getEmail());
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists. Please use a different email."));
            }

            // Hash the password before storing it
            // This ensures the original password is never stored in the database
            String encryptedPassword = passwordEncoder.encode(data.getPassword());
            System.out.println("Password hashed successfully");

            // Create new user with the hashed password
            RestaurantTable newUser = new RestaurantTable(data.getName(), data.getEmail(), encryptedPassword, data.getUserType());
            System.out.println("Restaurant user object created successfully");

            // Save the user to the database
            restaurantService.addUser(newUser);
            System.out.println("Restaurant user saved successfully");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Restaurant registered successfully",
                "user", newUser
            ));
        } catch (DataIntegrityViolationException ex) {
            System.out.println("Database error: " + ex.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists. Please use a different email."));
        } catch (Exception ex) {
            System.out.println("Unexpected error during registration: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.internalServerError().body(Map.of("error", "Registration failed: " + ex.getMessage()));
        }
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
    
    // Get User by Email
    @GetMapping("/email/{email}")
    public ResponseEntity<RestaurantTable> getUserByEmail(@PathVariable String email) {
        RestaurantTable user = restaurantService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.notFound().build();
    }
    
    /**
     * This endpoint handles user login
     * 1. Input validation
     * 2. User lookup
     * 3. Secure password matching
     */
    @PostMapping("/findByEmail")
    public ResponseEntity<?> loginUser(@RequestBody DTORestaurants data) {
        // Check if email and password are provided
        if (data.getEmail() == null || data.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }

        // Find user by email
        RestaurantTable user = restaurantService.findByEmail(data.getEmail());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "User not found"));
        }

        // Securely compare the entered password with the stored hash
        // This is where Spring Security's password matching happens
        boolean isMatch = passwordEncoder.matches(data.getPassword(), user.getPassword());
        System.out.println("Password Match Result: " + isMatch);

        if (isMatch) {
            return ResponseEntity.ok("Login Successful!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
    }
    

    @PutMapping("/Update/{email}")
    public ResponseEntity<RestaurantTable> UpdateUserByEmail(@PathVariable(value = "email") String email, @RequestBody DTORestaurants NewUser) {
        Optional<RestaurantTable> OldUser = Optional.ofNullable(restaurantService.findByEmail(email));
        if (OldUser.isPresent()) {
            RestaurantTable UpdatedUser = OldUser.get();
            
            // Only update fields that are provided
			UpdatedUser.setEmail(NewUser.getEmail());
			UpdatedUser.setName(NewUser.getName());
			
            
          
                // Hash the new password before saving
                String hashedPassword = passwordEncoder.encode(NewUser.getPassword());
                UpdatedUser.setPassword(hashedPassword);
            
            
            RestaurantTable savedUser = restaurantService.save(UpdatedUser);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   
}