package DataTransferObject;


public class DTODonations {

	public Long DonationId;
	public Long RestaurantId;
	public int Code;
	public String Location;
	public Long UserId;


	
	public DTODonations(Long DonationId, Long RestaurantId, int Code, String Location, Long UserId) {
		super();
		this.DonationId = DonationId;
		this.RestaurantId = RestaurantId;
		this.Code = Code;
		this.Location = Location;
		this.UserId= UserId;

	}
	
	public Long getUserId(){
		return UserId;
	}

	public void setUserId(Long UserId){
		this.UserId = UserId;
	}
	
	public Long getDonationId() {
		return DonationId;
	}

	public void setDonationId(Long DonationId) {
		this.DonationId = DonationId;
	}

	public Long getRestaurantId() {
		return RestaurantId;
	}

	public void setRestaurantId(Long RestaurantId) {
		this.RestaurantId = RestaurantId;
	}


	public int getCode() {
		return Code;
	}

	public void setCode(int Code) {
		this.Code = Code;
	}

	public String getLocation() {
		return Location;
	}

	public void setLocation(String Location) {
		this.Location = Location;
	}


}
