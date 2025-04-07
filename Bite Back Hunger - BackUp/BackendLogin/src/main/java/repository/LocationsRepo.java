package repository;

import Tables.locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationsRepo extends JpaRepository<locations, String> {}