package repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tables.Donation;

@Repository
public interface DonationRepo extends CrudRepository<Donation,Long>{

    Optional<Donation> findByRestaurantId(Long restaurantId);
    Optional<Donation> findByUserId(Long id);
	
	
	
}


