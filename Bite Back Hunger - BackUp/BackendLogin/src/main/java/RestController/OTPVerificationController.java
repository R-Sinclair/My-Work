package RestController;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import services.BusinessService;

@RestController
@RequestMapping("/otp")
@CrossOrigin(origins = "http://localhost:5173")
public class OTPVerificationController {

    @Autowired
    private BusinessService businessService;

    @PostMapping("/verify")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody Map<String, String> payload) {
        Map<String, String> response = new HashMap<>();
        String email = payload.get("email");
        String otp = payload.get("otp");

        if (email == null || otp == null || email.isEmpty() || otp.isEmpty()) {
            response.put("error", "Email and OTP are required.");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            String result = businessService.verifyOtp(email, otp);
            if (result.equals("OTP verified successfully ✅")) {
                response.put("message", result);
                return ResponseEntity.ok(response);
            } else {
                response.put("error", result);
                return ResponseEntity.badRequest().body(response);
            }
        } catch (RuntimeException e) {
            // Catch exceptions (like "Email not found") and return a 400 error response
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
