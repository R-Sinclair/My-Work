// package Tables;

// import java.io.Serializable;
// import java.util.Date;

// import org.springframework.data.annotation.CreatedDate;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import jakarta.persistence.Column;
// import jakarta.persistence.Entity;
// import jakarta.persistence.EntityListeners;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;
// import jakarta.persistence.Temporal;
// import jakarta.persistence.TemporalType;


// @Entity
// @Table(name = "NormalUser")
// @EntityListeners(AuditingEntityListener.class)
// public class UserTable implements Serializable {
// 	private static final long serialVersionUID = 1L;

// 	@Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
// 	private Long id;
	
// 	@Column
// 	private String name;
	
	
// 	@NotBlank
// 	@Column(unique=true)
// 	String email;
	
// 	@NotBlank
// 	String password;
	
 
// 	@Column(nullable = false)
// 	String userType;
	
// 	@Column(nullable = false, updatable = false)
// 	@Temporal(TemporalType.TIMESTAMP)
// 	@CreatedDate
// 	private Date createdAt;

// 	@Column(nullable = false)
// 	@Temporal(TemporalType.TIMESTAMP)
// 	@LastModifiedDate
// 	private Date updatedAt;
	
	
	 

// 	public UserTable() {
// 			super();
// 			// Auto-generated constructor stub
// 	}
		
	 
// 	 public UserTable(String name, String email, String password, String userType) {
// 		super();
// 		this.name = name;
// 		this.email = email;
// 		this.password = password;
// 		this.userType = userType;
// 	}
	
	
// 	public Long getId() {
// 		return id;
// 	}

// 	public void setId(Long id) {
// 		this.id = id;
// 	}

// 	public String getEmail() {
// 		return email;
// 	}

// 	public void setEmail(String email) {
// 		this.email = email;
// 	}


// 	public String getName() {
// 		return name;
// 	}


// 	public void setName(String name) {
// 		this.name = name;
// 	}
	



// 	public String getPassword() {
// 		return password;
// 	}


// 	public void setPassword(String password) {
// 		this.password = password;
// 	}


// 	public String getUserType() {
// 		return userType;
// 	}


// 	public void setUserType(String userType) {
// 		this.userType = userType;
// 	}



// 	@Override
// 	public String toString() {
// 		return "User [id=" + id  +  ",  name=" + name +", email=" + email + ", password=" + password + ", userType="
// 				+ userType + "]";
// 	}
	
	
// }
package Tables;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
// import jakarta.persistence.EnumType;
// import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
// import jakarta.validation.constraints.NotNull;

 
@Entity
@Table(name = "NormalUser")

@EntityListeners(AuditingEntityListener.class)
public class UserTable implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 50) // Not null, max length 50
    @NotBlank(message = "Name is required") // Ensures input validation
	private String name;
	
	
	@NotBlank
	@Column(unique=true)
	String email;
	
    @Column(nullable = false) // Not null
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
	String password;
	
 
    @Column(nullable = false, length = 20) // Not null, max length 20
    @NotBlank(message = "User type is required")
	String userType;
	
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;
	
	
	 

	public UserTable() {
			super();
			// Auto-generated constructor stub
	}
		
	 
	 public UserTable(String name, String email, String password, String userType) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.userType = userType;
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}
	



	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getUserType() {
		return userType;
	}


	public void setUserType(String userType) {
		this.userType = userType;
	}



	@
	Override
	public String toString() {
		return "User [id=" + id  +  ",  name=" + name +", email=" + email + ", password=" + password + ", userType="
				+ userType + "]";
	}
	
	
}
