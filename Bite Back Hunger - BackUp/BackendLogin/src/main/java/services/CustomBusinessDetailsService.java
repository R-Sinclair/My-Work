package services;

import Tables.BusinessTable;

import java.util.ArrayList;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import repository.BusinessRepo;

@Service
public class CustomBusinessDetailsService implements UserDetailsService {

    @Autowired
    private BusinessRepo businessRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<BusinessTable> business = businessRepo.findByEmail(username);
       
        if (business.isPresent()) {
            return new org.springframework.security.core.userdetails.User(
                    business.get().getEmail(),
                    business.get().getPassword(),
                    new ArrayList<>() // Add roles/authorities here
            );
        } else {
            throw new UsernameNotFoundException("Business not found with email: " + username);
        }
    }
}
