package Config;

import java.io.IOException;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * This filter handles CSRF (Cross-Site Request Forgery) protection
 * It ensures that requests come from legitimate sources
 */
public class CsrfCookieFilter extends OncePerRequestFilter {
    
    /**
     * This method is called for each request
     * It:
     * 1. Gets the CSRF token from the request
     * 2. Ensures the token is properly loaded
     * 3. Continues the request chain
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        // Get the CSRF token from the request
        CsrfToken csrfToken = (CsrfToken) request.getAttribute("_csrf");
        
        // Ensure the token is loaded (this will create a cookie if needed)
        csrfToken.getToken();

        // Continue with the request
        filterChain.doFilter(request, response);
    }
}