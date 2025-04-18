package backendApp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import services.LocationsService;

@SpringBootApplication
@EnableJpaAuditing
@EntityScan("Tables")
@EnableJpaRepositories("repository")
@ComponentScan("repository")
@ComponentScan("RestController")
@ComponentScan("services")
@ComponentScan("backendapp")
@ComponentScan("Config")
public class BackendLoginApp {

	public static void main(String[] args) {
		SpringApplication.run(BackendLoginApp.class, args);
	}
	
@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				.allowedMethods("GET","POST","PUT","DELETE","PATCH")
				.allowedOrigins("http://localhost:5173");
				
			}
		};
	}


    // Add the CommandLineRunner bean here
    @Bean
    public CommandLineRunner run(LocationsService locationsService) {
        return args -> {
            locationsService.addInitialLocations();
        };
    }
}