package repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Tables.UserTable;

@Repository
public interface UserRepo extends CrudRepository<UserTable,Long>{
	UserTable findByEmail(String email);
	Optional<UserTable> findById(Long id);
}
