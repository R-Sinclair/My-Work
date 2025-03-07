package DataTransferObject;

public class DTOemail {
    private String toEmail;
    private String subject;
    private String text;

   public DTOemail(String toEmail, String subject, String text) 
   {
	   super();
	   this.toEmail = toEmail;
	   this.subject = subject;
	   this.text = text;
	   
	   }
   
    public String getSubject() {
    	return subject;
    }
    public void setSubject(String subject) 
    {
    	this.subject = subject;
    }
    public String getText() {
    	return text;
    }
    public void setText(String text) 
    {
    	this.text = text;
    }
    public String getToEmail() {
    	return toEmail;
    }
    public void setToEmail(String toEmail) 
    {
    	this.toEmail = toEmail;
    }
   }