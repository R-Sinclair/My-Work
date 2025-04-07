package RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import DataTransferObject.DTOemail;
import services.emailService;


@RestController
@RequestMapping("/email")
public class emailController {

    @Autowired
    private emailService emailservice;

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
