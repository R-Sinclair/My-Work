package RestController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Tables.Donor;
import services.DonorService;

@RestController
@RequestMapping("/api/users")
public class DonorController {

    @Autowired
    private DonorService donorService;

    @PostMapping
    public ResponseEntity<?> registerDonor(@RequestBody Donor donor) {
        try {
            Donor savedDonor = donorService.saveDonor(donor);
            return ResponseEntity.ok(savedDonor);
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonorById(@PathVariable Long id) {
        try {
            Donor donor = donorService.getDonorById(id);
            if (donor != null) {
                return ResponseEntity.ok(donor);
            }
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Donor not found"));
        } catch (RuntimeException e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
}
