package DataTransferObject;

import Tables.UserType;

public class DataTransfer {
	String lastName;
	String email;
	String password;
	UserType userType;
	String firstName;
	String name;
	
	public DataTransfer(String firstName,String lastName,String name, String email, String password, Boolean Business, Boolean User) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.name = name;
		this.userType = convertType(Business,User);
	}
	
	public String getfirstName() {
		return firstName;
	}

	public void setfirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getlastName() {
		return lastName;
	}

	public void setlastName(String lastName) {
		this.lastName = lastName;
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
