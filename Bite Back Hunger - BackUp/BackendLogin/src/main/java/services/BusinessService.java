package services;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Config.JwtUtil;
import RestController.BusinessController;
import Tables.BusinessTable;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import repository.BusinessRepo;

@Service
public class BusinessService {
    
    private static final Logger logger = LoggerFactory.getLogger(BusinessController.class);

   

    @Autowired
    private BusinessRepo businessRepo;

    // @Autowired
    // private PasswordEncoder passwordEncoder;


    @Autowired
   private EmailService emailService;


    @Autowired
    private JwtUtil jwtUtil;
    
    // @Autowired
    // private BCryptPasswordEncoder passwordEncoder;


    public String registerBusiness(BusinessTable business) {
        Optional<BusinessTable> existingBusiness = businessRepo.findByEmail(business.getEmail());
        // business.setPassword(passwordEncoder.encode(business.getPassword()));
        if (existingBusiness.isPresent()) {
            throw new RuntimeException("Email already registered");
        }
    
        // business.setPassword(passwordEncoder.encode(business.getPassword()));
        business.setOtp(generateOtp());
        business.setCreatedAt(LocalDateTime.now());
        business.setUpdatedAt(LocalDateTime.now());
        businessRepo.save(business);
    
        sendOtpEmail(business.getEmail(), business.getOtp());
        return "Registration successful! OTP sent to email ✅";
    }
    
    // public String authenticateAndGetToken(String email, String password) {
    //     // Create a UsernamePasswordAuthenticationToken with provided email and password
    //     UsernamePasswordAuthenticationToken authenticationToken =
    //             new UsernamePasswordAuthenticationToken(email, password);
    
    //     try {
    //         // Authenticate using the AuthenticationManager
    //         Authentication authentication = authenticationManager.authenticate(authenticationToken);
    
    //         // Retrieve the user details from the authentication object
    //         UserDetails userDetails = (UserDetails) authentication.getPrincipal();  // Get user details from authentication
    
    //         // Generate and return the JWT token if credentials are valid
    //         return jwtUtil.generateToken(userDetails);  // Use the userDetails to generate the token
    
    //     } catch (AuthenticationException ex) {
    //         // Handle invalid login credentials
    //         throw new RuntimeException("Invalid credentials", ex);
    //     }
    // }
    
    public String authenticateAndGetToken(String email, String rawPassword) {
        // Fetch the business entity by email
        BusinessTable business = businessRepo.findByEmail(email)
                                              .orElseThrow(() -> new RuntimeException("Business not found"));
    
        // Temporarily bypass password encoding for debugging
        if (rawPassword.equals(business.getPassword())) {
            // If the password matches, generate and return a JWT token
            return jwtUtil.generateToken(business);  // Replace this with your actual JWT generation logic
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
    
    
    

    public BusinessTable saveBusiness(BusinessTable business) {
        // business.setPassword(passwordEncoder.encode(business.getPassword()));
        return businessRepo.save(business);
    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);  // Generate a 6-digit OTP
        return String.valueOf(otp);
    }

    private void sendOtpEmail(String to, String otp) {
        emailService.sendEmail(
            to.trim(),
            "Your OTP Code",
            "Your OTP is: " + otp
        );
    }

    public String verifyOtp(String email, String otp) {
        Optional<BusinessTable> optional = businessRepo.findByEmail(email);
        if (optional.isEmpty()) {
            throw new RuntimeException("Email not found");
        }

        BusinessTable business = optional.get();
        if (business.getOtp().equals(otp)) {
            business.setVerified(true);
            business.setUpdatedAt(LocalDateTime.now());
            businessRepo.save(business);
            return "OTP verified successfully ✅";
        } else {
            return "Invalid OTP ❌";
        }
    }

    // No changes to login method
    // public String login(String email, String password) {
    //     Optional<BusinessTable> businessOpt = businessRepo.findByEmail(email);
    //     if (businessOpt.isEmpty()) {
    //         throw new RuntimeException("Business not found");
    //     }

     

    //     BusinessTable business = businessOpt.get();
        
    //     logger.info("Password entered: " + password);
    //     logger.info("Stored password hash: " + business.getPassword());
    //     if (passwordEncoder.matches(password, business.getPassword())) {
    //         // Password matches, generate JWT token
    //         return generateJwtToken(business);
    //     } else {
    //         throw new RuntimeException("Invalid credentials");
    //     }
        
    //}
    public String login(String email, String password) {
    Optional<BusinessTable> businessOpt = businessRepo.findByEmail(email);
    if (businessOpt.isEmpty()) {
        throw new RuntimeException("Business not found");
    }

    BusinessTable business = businessOpt.get();
    
    // Temporarily log the entered and stored passwords for debugging purposes
    logger.info("Password entered: " + password);
    logger.info("Stored password hash: " + business.getPassword());
    
    // Temporarily compare plain text passwords for debugging
    if (password.equals(business.getPassword())) {
        // Password matches, generate JWT token
        return generateJwtToken(business);
    } else {
        throw new RuntimeException("Invalid credentials");
    }
}


    private String generateJwtToken(BusinessTable business) {
        return Jwts.builder()
                .setSubject(business.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))  // Token valid for 1 hour
                .signWith(SignatureAlgorithm.HS256, "your-secret-key")
                .compact();
    }

    public String initiatePasswordReset(String email) {
        Optional<BusinessTable> businessOpt = businessRepo.findByEmail(email);
        if (businessOpt.isEmpty()) {
            throw new RuntimeException("Business not found");
        }

        BusinessTable business = businessOpt.get();
        String otp = generateOtp();  // ⬅️ generate inline
        business.setOtp(otp);
        business.setUpdatedAt(LocalDateTime.now());
        businessRepo.save(business);

        emailService.sendEmail(
            business.getEmail(),
            "Password Reset OTP",
            "Your password reset OTP is: " + otp
        );
        System.out.println("EMAIL TO SEND: " + business.getEmail());
        System.out.println("OTP TO SEND: " + otp);
;
        return "Password reset OTP sent!";
    }

    public String resetPassword(String email, String otp, String newPassword) {
        Optional<BusinessTable> businessOpt = businessRepo.findByEmail(email);
        if (businessOpt.isEmpty()) {
            throw new RuntimeException("Business not found");
        }

        BusinessTable business = businessOpt.get();
        if (!otp.equals(business.getOtp())) {
            throw new RuntimeException("Invalid OTP ❌");
        }

        business.setPassword(newPassword); // 🔐 use encoder in future
        business.setOtp(null);
        business.setUpdatedAt(LocalDateTime.now());
        businessRepo.save(business);

        return "Password reset successfully ✅";
    }

    public String resendOtp(String email) {
        Optional<BusinessTable> businessOpt = businessRepo.findByEmail(email);
        if (businessOpt.isEmpty()) {
            throw new RuntimeException("Business not found");
        }
    
        BusinessTable business = businessOpt.get();
        String otp = generateOtp(); // 🔄 new OTP
        business.setOtp(otp);
        business.setUpdatedAt(LocalDateTime.now());
        businessRepo.save(business);
    
        emailService.sendEmail(
            business.getEmail(),
            "Your New OTP",
            "Here is your new OTP for verification: " + otp
        );
    
        return "OTP resent successfully!";
    }
    
}