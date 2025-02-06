package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import Tables.RestaurantTable;
import Tables.UserTable;


public interface RestaurantRepo extends JpaRepository<RestaurantTable,Long>{
	RestaurantTable findByEmail(String email);
	Optional<RestaurantTable> findById(Long id);
}
