package repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import Tables.UserTable;


public interface UserRepo extends JpaRepository<UserTable,Long>{
	UserTable findByEmail(String email);
	Optional<UserTable> findById(Long id);
}
