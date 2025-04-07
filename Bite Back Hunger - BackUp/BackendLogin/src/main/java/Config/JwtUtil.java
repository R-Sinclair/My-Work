package Config;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import Tables.BusinessTable;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {



    @Value("${jwt.secret}")
    private String secretKey;  // Secret key from application.properties

    @Value("${jwt.expiration}")
    private long expirationTime;  // Token expiration time from application.properties

    // Generate token for BusinessTable object (business user)
    public String generateToken(BusinessTable business) {
        // Check if secretKey is null to catch the case where it's not injected properly
        if (secretKey == null) {
            throw new RuntimeException("Secret key is missing in application.properties");
        }

        // Ensure that the secret key has enough length (HS256 requires at least 256 bits / 32 bytes)
        if (secretKey.length() < 32) {
            throw new RuntimeException("Secret key is too short, must be at least 32 characters long.");
        }

        // Create a SecretKeySpec using the provided secret key (ensure key is long enough)
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), SignatureAlgorithm.HS256.getJcaName());

        // Create and return the JWT token using the SecretKeySpec
        return Jwts.builder()
                .setSubject(business.getEmail())  // Set the subject (email) in the JWT
                .setIssuedAt(new Date())  // Set the issue date of the JWT
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))  // Set expiration time of the JWT
                .signWith(keySpec)  // Use the keySpec for signing the JWT
                .compact();  // Build and return the JWT token
    }

    // Extract username from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        // Check if username matches and the token is not expired
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Extract claim from token
    public <T> T extractClaim(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.resolve(claims);
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())  // Use the secret key here
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // This method is used to extract the email from the token
    public String getEmailFromToken(String token) {
        return extractUsername(token);  // Return username (email) from the token
    }
}
