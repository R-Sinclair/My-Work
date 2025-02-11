package DataTransferObject;

import Tables.UserType;

public class DTORestaurants {
	String Name;
	String email;
	String password;
	UserType userType;


	
	public DTORestaurants(String Name, String email, String password, Boolean Business, Boolean User) {
		super();
		
		this.Name = Name;
		this.email = email;
		this.password = password;
		this.userType = convertType(Business,User);
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


	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserType convertType(Boolean Business, Boolean User) {
		if(Business==true && User==false) {
			userType = UserType.BUSINESS;
		}
		
		else if(Business==false && User==true) {
			userType = UserType.USER;
		}
		else if(Business==false && User==false) {
			userType = UserType.NONE;
		}
		
		
		
		return userType;
		
		
		
	}

}
