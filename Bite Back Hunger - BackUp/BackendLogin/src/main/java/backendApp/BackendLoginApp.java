package backendApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaAuditing
@EntityScan("Tables")
@EnableJpaRepositories("repository")
@ComponentScan("repository")
@ComponentScan("RestController")
@ComponentScan("services")
@ComponentScan("backendapp")
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
				.allowedOrigins("http://localhost:5173");
			}
		};
	}

}
