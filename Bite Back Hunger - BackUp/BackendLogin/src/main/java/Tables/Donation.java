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
@Table(name = "Donations")
@EntityListeners(AuditingEntityListener.class)

public class Donation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "Donation_id")
	public int donationId;
	
	@Column(name = "Restaurant_id")
	public Long restaurantId;
	
	@Column(nullable = true, updatable= true, name = "User_id")
	public Long userId;
	
	@Column(name = "Code")
	public int code;

	@Column(name = "Location")
	public String location;

	@Enumerated(EnumType.STRING) 
		@Column(nullable = false)
		Completed completed;
	
	@Column(nullable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@CreatedDate
	private Date createdAt;

	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	@LastModifiedDate
	private Date updatedAt;

	
	
	 

	public Donation() {
		super();
		
}

		
	 
	 public Donation( int donationId, Long restaurantId, int code, String location, Long userId, Completed completed) {
		super();
		this.donationId =  donationId;
		this.restaurantId=  restaurantId;
		this.code = code;
        this.location = location;
		this.userId = userId;
		this.completed = completed;
	}
	
	public Long getId(){
		return id;
	}
	public void setId(Long id){
		this.id = id;
	}

	public Long getUserId(){
		return userId;
	}
	public void setUserId(Long userId){
		this.userId = userId;
	}
    public String getLocation(){
        return location;
    }
    public void setLocation(String location)
    {
        this.location = location;
    }
	
	public Completed getCompletedTask() {
		return completed;
	}


	public void setCompletedTask(Completed completed) {
		this.completed = completed;
	}


	
	public int getDonationID() {
		return donationId;
	}

	public void setDonationId(int donationId) {
		this.donationId = donationId;
	}

	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		  this.code = code;
	}
	
	public Long getRestaurantID() {
		return restaurantId;
	}

	public void setRestaurantId(Long restaurantId) {
		this.restaurantId = restaurantId;
	}
	

	

	@Override
	public String toString() {
		return "Donation Table [Donation id=" + donationId + ", RestaurantID=" + restaurantId +  ", Location=" + location +", Code=" + code + ", User Id"+userId+ "Task status "+ completed+"]";
	}
	
	
}


