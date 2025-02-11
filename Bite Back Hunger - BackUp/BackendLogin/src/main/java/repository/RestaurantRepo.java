package repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tables.RestaurantTable;

@Repository
public interface RestaurantRepo extends CrudRepository<RestaurantTable,Long>{
	RestaurantTable findByEmail(String email);
	Optional<RestaurantTable> findById(Long id);
}
