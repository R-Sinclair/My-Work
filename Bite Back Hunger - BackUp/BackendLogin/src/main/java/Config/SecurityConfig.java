package Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRequestAttributeHandler;


 //configures how the application handles security, authentication, and authorization
@Configuration
@EnableWebSecurity 
public class SecurityConfig {

// method determines which URLs are protected and how they are protected

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Configure CSRF protection
            .csrf(csrf -> csrf
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .csrfTokenRequestHandler(new CsrfTokenRequestAttributeHandler())
                .ignoringRequestMatchers(
                    "/NormalUsers/findByEmail", 
                    "/Restaurant/findByEmail", 
                    "/h2-console/**",
                    "/NormalUsers/**",
                    "/Restaurant/**",
                    "/email/**",
                    "/api/donations/**",
                    "/reports/**",
                    "/api/users/**",
                    "/api/payments/**",
                    "/api/campaigns/**",
                    "/Donations/**",
                    "/business/**",
                    "/locations/**",
                    "/Restaurant/Update/**",
                    "/NormalUsers/Update/**",
                    "/otp/**",
                    "/csrf-token" // Add CSRF token endpoint
                )  // Ignore CSRF for login, registration, update, and H2 console
            )
            
            // Configure which URLs are accessible
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/h2-console/**").permitAll()  // Allow H2 console access
                .requestMatchers("/NormalUsers/**").permitAll()  // Allow all normal user endpoints
                .requestMatchers("/Restaurant/**").permitAll()   // Allow all restaurant endpoints
                .requestMatchers("/locations/**").permitAll() 
                .requestMatchers("/business/**").permitAll() 
                .requestMatchers("/NormalUsers/Update/**").permitAll() 
                .requestMatchers("/Restaurant/*Update/**").permitAll() 
                .requestMatchers("/Donations/**").permitAll() 
                .requestMatchers("/reports/**").permitAll() 
                .requestMatchers("/api/donations/**").permitAll() 
                .requestMatchers("/api/users/**").permitAll() 
                .requestMatchers("/api/campaigns/**").permitAll() 
                .requestMatchers("/api/payments/**").permitAll() 
                .requestMatchers("/email/**").permitAll()        // Allow email endpoints
                .requestMatchers("/csrf-token").permitAll()    
                .requestMatchers("/otp/**").permitAll()   // Allow CSRF token endpoint
                .requestMatchers("/**").permitAll()              // Allow all other requests for testing
            )
            
            // Allow H2 console to be accessed (needed for development)
            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable())
            );

        return http.build();
    }

//BCryptPasswordEncoder to create secure password hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
