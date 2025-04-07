package DataTransferObject;



public class DTORestaurants {
	String Name;
	String email;
	String password;
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
