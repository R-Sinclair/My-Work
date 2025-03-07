package RestController;

import Tables.Donation;
import Tables.Report;
import repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @GetMapping("/all")
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
    @GetMapping("/donationid")
    public List<Report> getReportByDonationId(@PathVariable(value = "donationId") String donationId) {
		return reportRepository.findReportByDonationId(donationId);
        
    }

    @PostMapping
    public Report createReport(@RequestBody Report report) {
        return reportRepository.save(report);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        reportRepository.deleteById(id);
    }
}
