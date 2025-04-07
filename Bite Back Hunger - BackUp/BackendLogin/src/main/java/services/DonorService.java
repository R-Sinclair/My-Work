package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Tables.Donor;
import jakarta.transaction.Transactional;
import repository.DonorRepository;

@Service
@Transactional
public class DonorService {

    @Autowired
    private DonorRepository donorRepository;

    public Donor saveDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public Donor getDonorById(Long id) {
        return donorRepository.findById(id).orElse(null);
    }
}
