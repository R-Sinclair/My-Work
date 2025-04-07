package repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import Tables.BusinessTable;

@Repository
public interface BusinessRepo extends JpaRepository<BusinessTable, Long> 
{
    Optional<BusinessTable> findByMobileNumber(String mobileNumber);
    Optional<BusinessTable> findByEmail(String email);
    
    boolean existsByEmail(String email);  
}

    

