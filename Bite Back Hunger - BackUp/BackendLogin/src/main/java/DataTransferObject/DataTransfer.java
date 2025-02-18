package DataTransferObject;


public class DataTransfer {
	String name;
	String email;
	String password;
	String userType;

	
	public DataTransfer(String name, String email, String password, String userType ) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.userType = userType;
	}
	
	
	
	public String getName() {
		return name;
	}

	public void setlastName(String name) {
		this.name = name;
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
