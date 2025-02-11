package Tables;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

	@Entity
	@Table(name = "RestaurantTable")
	@EntityListeners(AuditingEntityListener.class)
	public class RestaurantTable implements Serializable {
		private static final long serialVersionUID = 1L;

		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long id;
		
		@Column
		private String name;
		
		@NotBlank
		@Column(unique=true)
		String email;
		
		@NotBlank
		String password;
		
		@Enumerated(EnumType.STRING) 
		@Column(nullable = false)
		UserType userType;
		
		@Column(nullable = false, updatable = false)
		@Temporal(TemporalType.TIMESTAMP)
		@CreatedDate
		private Date createdAt;

		@Column(nullable = false)
		@Temporal(TemporalType.TIMESTAMP)
		@LastModifiedDate
		private Date updatedAt;
		
		
		 

		public RestaurantTable() {
				super();
				
		}
			
		 
		 public RestaurantTable(String name, String email, String password, UserType userType) {
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


		public UserType getUserType() {
			return userType;
		}


		public void setUserType(UserType userType) {
			this.userType = userType;
		}



		@Override
		public String toString() {
			return "Restaurant User [id=" + id + ", name=" + name +", email=" + email + ", password=" + password + ", userType="
					+ userType + "]";
		}
		
		
	}



