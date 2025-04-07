package DataTransferObject;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DTORestaurants {
	@NotBlank(message = "Name is required")
	String Name;

	@Column(nullable = false, length = 50) // Not null, max length 50
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
	String email;

	
    @Column(nullable = false) // Not null
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
	String password;

	
    @Column(nullable = false, length = 20) // Not null, max length 20
    @NotBlank(message = "User type is required")
	String userType;


	
	public DTORestaurants(String Name, String email, String password,String userType) {
		super();
		
		this.Name = Name;
		this.email = email;
		this.password = password;
		this.userType = userType;
	}
	
	
	
	public String getName() {
		return Name;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}



}
