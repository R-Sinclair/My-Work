package RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import DataTransferObject.DTOemail;
import services.EmailService;


@RestController
@RequestMapping("/email")
public class emailController {

    @Autowired
    private EmailService emailservice;

    @PostMapping("/send")
    public String sendEmail(@RequestBody DTOemail emailRequest) {
        try {
           
			emailservice.sendEmail(emailRequest.getToEmail(), emailRequest.getSubject(), emailRequest.getText());
            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email.";
        }
    }
}
