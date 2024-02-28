import java.awt.image.BufferedImage;
import swiftbot.Button;
import swiftbot.SwiftBotAPI;
//Class One
public class QRcode
{
	public static final SwiftBotAPI swiftBot = new SwiftBotAPI();
	private static String decodedText = "";
	protected static int sections = 0;
	protected static int length = 0;
	private static String A;
	private static String input = "";
	
	static void QRcodeScan() throws InterruptedException, NumberFormatException 
	{
		String red = "\u001B[31m";//these change the colour of the text ANSI code
		String reset = "\u001B[0m";
		System.out.println("\r\nTaking a capture in 5 seconds..");
		boolean Scan =false;
		while (Scan!= true)
		{			
			try{ 
				BufferedImage img = swiftBot.getQRImage();// this process is the robot getting the Qr code and attempting to make it into a string
				for (int i=5;i>=1;i--) // this loop is for the count down before taking the picture
				{
					Thread.sleep(1000);// this makes it so there is a one second gap inbetween printing numbers
					System.out.print(i+ "...");
				}
				decodedText = swiftBot.decodeQRImage(img);
				if(decodedText.isEmpty())
				{
					System.out.println(red+ "\rQR code not successful"+ reset);
					int[] Red= {255, 0, 0};
					swiftBot.fillUnderlights(Red);// if not Qr code is detected  the underlight flashes red for 500milliseconds
					Thread.sleep(500);
					swiftBot.disableUnderlights();
				}
				else
				{
					int Green[]= {0,0,255};
					swiftBot.fillUnderlights(Green);// if a Qr code id detected the undelight flashes green to let you know it succeded
					Thread.sleep(500);
					swiftBot.disableUnderlights();

					System.out.println("\r\nThe QR code is "+ decodedText);
					Scan = true;// this breaks out of the while loop if a qr code is detected
					break;
				}
			}catch(IllegalArgumentException | InterruptedException e){
				e.printStackTrace(); }
		}
		QRcodeValid();
	}
	public static void QRcodeValid() throws NumberFormatException, InterruptedException {
		String green = "\u001B[32m";//these change the colour of the text ANSI code
		String reset = "\u001B[0m";
		String yellow = "\u001B[33m";
		String red = "\u001B[31m";
		try {
			String[] parts = decodedText.split(",");// lines 247 to 252 are about getting the decoded string and making it into integers with seperate variables
			int[] S_L = new int[parts.length];// this splits the strings into two arrays
			for (int i = 0; i < parts.length; i++) {
				S_L[i] = Integer.parseInt(parts[i]);// This converts the string into an integer
				length = S_L[0];
				sections = S_L[1];
			}
			// this is where the error handling happens
			if (((sections<=12) &&(sections % 2 == 0)&& (sections >=2)) &&((length >=15) && (length <=85)))// Succession path
			{
				System.out.println(green+ "\r\nInput Accepted!!!"+ reset);
				System.out.println("The"+ green+" Length "+reset+"of each Section is: " +green+length+"cm"+reset);
				System.out.println("The Number of"+green+" Sections"+reset+" is: " +green+sections+reset);
				Thread.sleep(1000);
				System.out.println(yellow+"\r\nBeginning ZigZag :) "+reset);
				System.out.println("starting in ");
				try {
					int LightBlue[]= {0,255,255};//light blue
					for (int i=5;i>=1;i--) {// count down to the game starting
						System.out.print (i+ "...");
						swiftBot.fillUnderlights(LightBlue);
						Thread.sleep(500);
						swiftBot.disableUnderlights();
						Thread.sleep(500);
					}
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			} 
			else if (((sections>12) || (sections % 2 != 0) || (sections <2)) && ((length>85) || (length<15)))// section for if both section and length are not met
			{
				System.out.println(red+"\r\nBoth the Length and Section given lie outside of the parameters."+reset);
				waiting();
				QRcodeScan();
			}
			else if ((sections>12) || (sections % 2 != 0) || (sections <2))// section for if parameter for sections are not met
			{
				System.out.println(red+"\r\nYour Section input lie outside of the parameters."+reset);
				waiting();
				QRcodeScan();
			}
			else if ((length>85) ||(length<15))// Section if the parameters for length are not met 
			{
				System.out.println(red+"\r\nYour Length input lie outside of the parameters."+reset);
				waiting();
				QRcodeScan();
			}
		}catch(NumberFormatException e)
		{// This catches any exceptions such as input letters or when the numbers are too big
			System.out.println(red+"\r\nPlease follow the format as specificied above."+reset);
			waiting();
			QRcodeScan();
		}catch(ArrayIndexOutOfBoundsException e)
		{// This catches any exceptions such as input letters or when the numbers are too big
			System.out.println(red+"\r\nPlease follow the format as specificied above."+reset);
			waiting();
			QRcodeScan();
		}
	}
	public static void waiting() 
	{
		String black = "\u001B[30m";
		String reset = "\u001B[0m";// changing the text colour
		String cyanB = "\u001B[46m";
		String purple = "\u001B[35m";
		String blue = "\u001B[34m";
		input="";// this whole method is the period if the program is waiting for a button to be pressed
		System.out.println("\r\nPress the "+cyanB+black+"'A'"+reset+" Button to start scanning. ");
		System.out.println("Press the "+cyanB+black+"'X'"+reset+" Button to end the program. ");
		try{

			swiftBot.enableButton(Button.A, () -> {
				A = "Button A Pressed. ";
				input = A.toString();// this will make the variable input = to A making it not an empty string
				swiftBot.disableAllButtons();
			});   
			swiftBot.enableButton(Button.X, () -> {// if X is pressed then the program terminates
				System.out.println(blue+"\r\nTerminating "+purple+"Program. "+blue+"Bye Bye "+purple+":( "+reset);
				swiftBot.disableButtonLights();
				swiftBot.disableAllButtons();
				swiftBot.disableUnderlights();
				System.exit(1);
			});   
		}
		catch (Exception e1) 
		{
			System.out.println("End");
			System.exit(2);
		}

		while (input.equals(""))// this loop is only active if Input is an empty string 
		{
			int ColoursWaiting[][]= {
					{199,169,252},//light green
					{255,255,0},//purple
					{128,128,128}//idk
			};
			try{
				swiftBot.setButtonLight(Button.A, true);// while the input string is pressed because A or X hasn't been pressed
				swiftBot.setButtonLight(Button.X, true);// the button lights turn on and the program iterates through three colours
				for(int[] i: ColoursWaiting){
					swiftBot.fillUnderlights(i);
					Thread.sleep(1000);
				}
			}catch(Exception e1)
			{System.out.println("End");}
		}
		swiftBot.setButtonLight(Button.A, false);// once broken through the loop this turns off the buttons lights and underlights
		swiftBot.setButtonLight(Button.X, false);
		swiftBot.disableUnderlights();
	}
}
