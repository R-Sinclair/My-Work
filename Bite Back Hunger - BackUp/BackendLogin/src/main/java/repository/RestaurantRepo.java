package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Tables.RestaurantTable;

@Repository
public interface RestaurantRepo extends JpaRepository<RestaurantTable,Long>{
	RestaurantTable findByEmail(String email);
	Optional<RestaurantTable> findById(Long id);

}
