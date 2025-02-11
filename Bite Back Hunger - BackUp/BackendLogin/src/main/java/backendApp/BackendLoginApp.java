package backendApp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

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
	public CommandLineRunner commandLineRunner(ApplicationContext ctx) 
	{return args-> {System.out.println("Let's inspect the beans provided by Spring Boot:");};}
		
	 

}
