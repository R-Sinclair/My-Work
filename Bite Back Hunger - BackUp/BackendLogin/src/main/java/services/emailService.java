package services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class emailService {

	@Autowired
	private JavaMailSender mailSender;
	
	@SuppressWarnings("unused")
	public void sendEmail(String toEmail, String subject,String body) 
	{
		
		if (mailSender == null) {
	        throw new IllegalStateException("MailSender bean is not properly configured.");
	    }
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("sinclairrsn1@gmail.com");
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		  if (message == null) {
		        throw new IllegalArgumentException("Message is null.");
		    }
		
		mailSender.send(message);
	}
}
