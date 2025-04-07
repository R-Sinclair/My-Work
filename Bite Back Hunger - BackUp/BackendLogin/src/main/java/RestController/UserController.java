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

import DataTransferObject.DataTransfer;
import Tables.UserTable;
import jakarta.validation.Valid;
import services.UserService;


@RestController
@RequestMapping("/NormalUsers")
@CrossOrigin(origins = "*") // Allow all origins for testing
public class UserController {
    @Autowired
	UserService userService;
    
    // This is the password encoder that will hash passwords
    @Autowired
	private PasswordEncoder passwordEncoder;


	 //password encoder is available for password operations
	@Autowired
    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Get All Users
    @GetMapping("/AllUsers")
    public List<UserTable> getUsers() {
        return userService.getUsers();
    }

    /**
     * This endpoint handles user registration
     * 1. Input validation
     * 2. Duplicate email checking
     * 3. Password hashing
     * 4. User creation
     */
    @PostMapping("/AddUser")
    public ResponseEntity<?> addUser(@Valid @RequestBody DataTransfer data, BindingResult result) {
        System.out.println("Received registration request for email: " + data.getEmail());
        
        // Log the received data
        System.out.println("Received data: " + data.toString());
        
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
                System.out.println("Validation error: " + error.getField() + " - " + error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(Map.of("error", "Validation failed: " + errors));
        }

        try {
            // Check if email already exists
            UserTable existingUser = userService.findByEmail(data.getEmail());
            if (existingUser != null) {
                System.out.println("Email already exists: " + data.getEmail());
                return ResponseEntity.badRequest().body(Map.of("error", "Email already exists. Please use a different email."));
            }

            // Hash Password
            String encryptedPassword = passwordEncoder.encode(data.getPassword());
            System.out.println("Password hashed successfully");

            // Create User Object
            UserTable newUser = new UserTable(data.getName(), data.getEmail(), encryptedPassword, data.getUserType());
            System.out.println("User object created successfully");

            // Save User
            userService.addUser(newUser);
            System.out.println("User saved successfully");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "User registered successfully",
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
    
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<UserTable> getUserByEmailGet(@PathVariable String email) {
        UserTable user = userService.findByEmail(email);
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
    public ResponseEntity<String> getUserByEmail(@RequestBody DataTransfer data) {
        if (data.getEmail() == null || data.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password are required");
        }

        // Fetch user by email
        UserTable user = userService.findByEmail(data.getEmail());
        
        // Check if user exists before accessing password
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        System.out.println("Entered Password: " + data.getPassword());
        System.out.println("Stored Encrypted Password: " + user.getPassword());
 
        boolean isMatch = passwordEncoder.matches(data.getPassword(), user.getPassword());
        System.out.println("Password Match Result: " + isMatch);

        if (isMatch) {
            return new ResponseEntity<>("Login Successful!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }
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
  // Hash the new password before saving
                String hashedPassword = passwordEncoder.encode(NewUser.getPassword());
                UpdatedUser.setPassword(hashedPassword);

            UserTable UserObject = userService.save(UpdatedUser);
            return new ResponseEntity<>(UserObject, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
   
}
