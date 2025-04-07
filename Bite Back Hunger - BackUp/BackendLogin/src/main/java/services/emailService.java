package services;

import java.text.NumberFormat;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;


@Service
public class EmailService implements Email {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    @SuppressWarnings("unused")
	public void sendEmail(String toEmail, String subject,String body) 
	{
		
		if (mailSender == null) {
	        throw new IllegalStateException("MailSender bean is not properly configured.");
	    }
		
		SimpleMailMessage message = new SimpleMailMessage();

		message.setFrom("bitebackhunger1@gmail.com");
		message.setTo(toEmail);
		message.setText(body);
		message.setSubject(subject);
		
		  if (message == null) {
		        throw new IllegalArgumentException("Message is null.");
		    }
		
		mailSender.send(message);


	}

    @Override
    @Transactional(readOnly = true)
    public void sendPaymentConfirmationEmail(String to, String name, double amount) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setText(fromEmail, "Bite Back Hunger");
            helper.setTo(to);
            helper.setSubject("Thank You for Your Donation to Bite Back Hunger!");

            String formattedAmount = NumberFormat.getCurrencyInstance(Locale.UK).format(amount);

            String htmlContent = String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background-color: #4b692f; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background-color: #f9f9f9; }
                        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
                        .amount { font-size: 24px; color: #4b692f; font-weight: bold; }
                        .impact-list { background-color: #fff; padding: 15px; border-radius: 5px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Thank You for Your Donation!</h1>
                        </div>
                        <div class="content">
                            <p>Dear %s,</p>
                            <p>Thank you for your generous donation of <span class="amount">%s</span> to Bite Back Hunger. Your support means the world to us and will make a real difference in fighting food insecurity in London.</p>
                            
                            <div class="impact-list">
                                <h3>Your donation will help us:</h3>
                                <ul>
                                    <li>Provide nutritious meals to families in need</li>
                                    <li>Support local food banks with essential supplies</li>
                                    <li>Fund emergency food assistance programs</li>
                                    <li>Create sustainable food security solutions</li>
                                </ul>
                            </div>
                            
                            <p>We'll keep you updated on how your donation is making an impact in our community.</p>
                            
                            <p>If you have any questions about your donation, please don't hesitate to contact us at support@bitebackhunger.org</p>
                            
                            <p>With gratitude,<br>
                            The Bite Back Hunger Team</p>
                        </div>
                        <div class="footer">
                            <p>Bite Back Hunger | Registered Charity in England and Wales<br>
                            This email was sent to %s</p>
                        </div>
                    </div>
                </body>
                </html>
                """, name, formattedAmount, to);

            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
} 