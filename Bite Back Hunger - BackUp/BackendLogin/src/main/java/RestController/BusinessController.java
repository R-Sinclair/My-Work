// src/main/java/RestController/BusinessController.java
package RestController;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Tables.BusinessTable;
import jakarta.validation.Valid;
import model.JwtResponse;
import services.BusinessService;

@RestController
@RequestMapping("/business")
@CrossOrigin(origins = "*")
public class BusinessController {

    private static final Logger logger = LoggerFactory.getLogger(BusinessController.class);

    @Autowired
    private BusinessService businessService;

    @PostMapping("/register")
    public ResponseEntity<?> registerBusiness(@Valid @RequestBody BusinessTable business) {
        logger.info("Received registration request for email: {}", business.getEmail());
        try {
            businessService.registerBusiness(business);
            logger.info("Registration successful for {}", business.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Registration successful! OTP sent to email ✅"));
        } catch (RuntimeException e) {
            logger.error("Registration failed for {}: {}", business.getEmail(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        logger.info("Verifying OTP for {}", email);
        try {
            String result = businessService.verifyOtp(email, otp);
            if ("OTP verified successfully ✅".equals(result)) {
                return ResponseEntity.ok(Map.of("message", result));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Invalid OTP ❌"));
            }
        } catch (RuntimeException e) {
            logger.error("OTP verification failed for {}: {}", email, e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody BusinessTable business) {
        logger.info("Login attempt for email: {}", business.getEmail());
        try {
            String token = businessService.authenticateAndGetToken(business.getEmail(), business.getPassword());
            return ResponseEntity.ok(new JwtResponse(token));
        } catch (Exception ex) {
            logger.error("Login failed for {}: {}", business.getEmail(), ex.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Invalid credentials ❌"));
        }
    }

    @PostMapping("/reset-password-request")
    public ResponseEntity<?> sendResetOtp(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        try {
            String message = businessService.initiatePasswordReset(email);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> req) {
        String email = req.get("email");
        String otp = req.get("otp");
        String newPassword = req.get("newPassword");
        try {
            String message = businessService.resetPassword(email, otp, newPassword);
            return ResponseEntity.ok(Map.of("message", message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/resend-otp")
public ResponseEntity<?> resendOtp(@RequestBody Map<String, String> req) {
    String email = req.get("email");
    try {
        String message = businessService.resendOtp(email);
        return ResponseEntity.ok(Map.of("message", message));
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
}

}
