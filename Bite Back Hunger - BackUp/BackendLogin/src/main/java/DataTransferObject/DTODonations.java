package DataTransferObject;

import Tables.Completed;

public class DTODonations {

    public int DonationId;
    public Long RestaurantId;
    public int Code;
    public String Location;
    public Long UserId;
    public Completed completed;

    // Constructor with simplified logic
    public DTODonations(int DonationId, Long RestaurantId, int Code, String Location, Long UserId, Boolean isCompleted) {
        super();
        this.DonationId = DonationId;
        this.RestaurantId = RestaurantId;
        this.Code = Code;
        this.Location = Location;
        this.UserId = UserId;
        this.completed = convertType(isCompleted);
    }

 
    public Long getUserId() {
        return UserId;
    }

    public void setUserId(Long UserId) {
        this.UserId = UserId;
    }

    public int getDonationId() {
        return DonationId;
    }

    public void setDonationId(int DonationId) {
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

  
    public Completed getCompletedTask() {
        return completed;
    }

    public void setCompletedTask(Completed completed) {
        this.completed = completed;
    }

   
    public Completed convertType(Boolean isCompleted) {
        if (isCompleted == null) {
            return Completed.NONE;  
        }
        
        if (isCompleted) {
            return Completed.COMPLETEDTASK;  
        } else {
            return Completed.UNCOMPLETEDTASK;  
        }
    }
}
