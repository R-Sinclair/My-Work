package repository;

import Tables.Donations;
import Tables.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    boolean existsByDonationId(Long donationId);
    List<Payment> findByDonationId(Long donationId);
}
