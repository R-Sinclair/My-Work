import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import swiftbot.*;
//Class Three
public class Main extends Movement {
	private static String Ending;
	private static int Journeys;
	public static String input2 = "";

	public static void main(String[] args) throws InterruptedException, IOException 
	{
		Movement obj = new Movement();
		String reset = "\u001B[0m";// changing the text colour
		String purple = "\u001B[35m";
		String blue = "\u001B[34m";
		
		System.out.println(purple+" ________   __    _______  ________      ___       _______ \r\n"
				+ "|       /  |  |  /  _____||       /     /   \\     /  _____|\r\n"
				+ "`---/  /   |  | |  |  __  `---/  /     /  ^  \\   |  |  __  \r\n"
				+ "   /  /    |  | |  | |_ |    /  /     /  /_\\  \\  |  | |_ | \r\n"
				+ "  /  /----.|  | |  |__| |   /  /----./  _____  \\ |  |__| | \r\n"
				+ " /________||__|  \\______|  /________/__/     \\__\\ \\______| \r\n"
				+ "                                                          ");

		System.out.println(purple+"\r\nWelcome "+blue+ "to "+ purple+"SwiftBots "+blue+"Zigzag!!!!\r\n"+reset
				+ "\r\n"
				+ "Please go too QR.io and click on the text functions.\r\n"
				+ "\r\n"
				+ "Please enter in first the length in centimeters of each "
				+ "section from 15-85cm. After which you add a comma then add the  "
				+ "sections which should not exceed 12 and be even. For example, if "
				+ "I wanted each section to be 28cm and have 4 sections,  "
				+ "I would type '28,4' into the qr code website.");
		// this allows for the user to press the button a and x in the swift Bot 

		waiting();// calling the waiting method
		QRcodeScan();// calling the QRcodeScan method after the waiting method is finished

		long Start =System.currentTimeMillis();// This starts the timer of the program

		int Blue []= {0,255,0};// underlight array
		int Green[] = {0,0,255};
		obj.Speed();	   
		System.out.println("\r\nOn the move...");
		
		for(int i=1;i<=(sections/2);i++)
		{
			obj.Forward(Green);
			obj.Turning_Left(0,95);// turning left
			obj.Forward(Blue);
			obj.Turning_Right(95,0);//turning right
		}
		obj.reverse(95,0);

		for(int i=1;i<=(sections/2);i++)
		{
			obj.Forward(Blue);
			obj.Turning_Right(95,0);// turning right
			obj.Forward(Green);
			obj.Turning_Left(0,95);//turning left
		}
		obj.reverse(0,95);
		
		long End = System.currentTimeMillis();// this stops the timer of how long the zigzag took
		DisplayFile(End,Start);// this run the DisplayFile method with the times for the swiftbot being in the parameters
		Count();// This starts the count method which houses the number of journeys
		Ending();//the options for the user at the end of the zigzag
	}

	public static void DisplayFile(long End,long Start) throws IOException 
	{// this methods writes all the necessary information required in the requirement specification to a file
		String yellow = "\u001B[33m";//these change the colour of the text ANSI code
		String reset = "\u001B[0m";
		
		double Timer =  (double) (End - Start)/1000; 
		int Straight = (int) (Math.sqrt(2)* length * sections)/2;
		int Path = length * sections;
		FileWriter writehandle = new FileWriter("/home/pi/Documents/Info.txt");// this sets where the file your writing too is found

		BufferedWriter ZigZag = new BufferedWriter(writehandle);

		System.out.println("The time taken to complete the ZigZag was "+yellow+Timer+reset + " seconds");
		// this is the code which writes the important things to a file
		ZigZag.write("The information of the last ZigZag was ");
		ZigZag.newLine();
		ZigZag.write("The Length of each section was "+length+"cm");
		ZigZag.newLine();
		ZigZag.write("The Amount of sections in the zigzag was "+sections);
		ZigZag.newLine();
		ZigZag.write("The randomly generated speed was "+speed);
		ZigZag.newLine();
		ZigZag.write("The Amount of distance travelled was "+Path+"cm");
		ZigZag.newLine();
		ZigZag.write("The Straight line path was "+Straight+"cm");
		ZigZag.newLine();
		ZigZag.write("The Duartion of the ZigZag is "+ Timer + "seconds");

		ZigZag.close();
		writehandle.close();
	}
	public static void Count()
	{
		// This whole method is just putting important details into a file

		// This part is just adding the count every time a journey is complete
		try (BufferedReader reader = new BufferedReader(new FileReader("/home/pi/Documents/Journeys.txt"))) {
			String Count = reader.readLine();
			Journeys = Integer.parseInt(Count) ;
		}
		catch (IOException | NumberFormatException e)
		{
			System.out.println("File not found"); 
			System.exit(0);
		}

		Journeys++;// this add the journey every time


		try (BufferedWriter writer = new BufferedWriter(new FileWriter("/home/pi/Documents/Journeys.txt"))) {
			writer.write(String.valueOf(Journeys));
		} catch (IOException e) {

			e.printStackTrace();
		}
	}
	public static void Ending()
	{
		String black = "\u001B[30m";// 
		String reset = "\u001B[0m";// changing the text colour
		String purple = "\u001B[35m";
		String blue = "\u001B[34m";
		String cyanB = "\u001B[46m";// this specific code changes the the background to cyan
		String yellow = "\u001B[33m";
		System.out.println(yellow+"ZigZag Complete :) \r\n"+reset);// this is the end of the success path and the ending statements printed
		System.out.println("Press the "+cyanB +black+"'X'"+reset+" Button to see how many journeys you've complete and terminate the program.");
		System.out.println("If need, Press the "+cyanB +black+"'Y'"+reset+" Button to Reset the amount of completed journeys.");
		System.out.println("Or Press the Button "+cyanB +black+"'B'"+reset+" to restart and do another ZigZag.");
		input2="";
		try 
		{
			swiftBot.setButtonLight(Button.Y, true);
			swiftBot.setButtonLight(Button.X, true);
			swiftBot.setButtonLight(Button.B, true);
			swiftBot.enableButton(Button.Y, () -> {// while button Y is lit up the user can reset the amount of journeys

				Journeys=1;

				try (BufferedWriter writer = new BufferedWriter(new FileWriter("/home/pi/Documents/Journeys.txt"))) {
					writer.write(String.valueOf(Journeys));// the above line is where the number for the number of journeys is stored
					System.out.println(yellow+"\r\nJourneys has been reset"+reset);
				} 
				catch (IOException e)
				{
					System.out.println("Can't Write in file please try again");
				}
				swiftBot.disableButton(Button.Y);
				swiftBot.setButtonLight(Button.Y, false);
			});
			swiftBot.enableButton(Button.B, () -> {// while button B is lit up the user can Restart
				swiftBot.disableAllButtons();
				swiftBot.disableButtonLights();
				input2="Restarting";
				swiftBot.disableUnderlights();
				try {

					main(null);// the main parameters are null as i dont want to change the parameters when calling the main again
				} catch (NumberFormatException | InterruptedException | IOException e) {
					e.printStackTrace();
				}
			});

			swiftBot.enableButton(Button.X, () -> {// This path leads to the termination of the program if the X button is pressed
				System.out.println("\r\nThe number of journeys completed is "+ yellow+Journeys+ reset);
				swiftBot.disableAllButtons();
				Ending = "Ending Game in";
				input2= Ending.toString();
				System.out.println(Ending);

				for (int i=5;i>=1;i--) 
				{
					System.out.print(i+"...");
					try
					{
						Thread.sleep(1000);
					}catch (InterruptedException e) 
					{
						e.printStackTrace();
					}
				}
				System.out.println(purple+"\r\nHope "+blue+ "you'll "+ purple+"play "+blue+"again "+purple+"soon :)"+reset);
				swiftBot.disableButtonLights();
				swiftBot.disableUnderlights();
				System.exit(1);
			});
		}catch (Exception e) 
		{
			System.out.println("An error has occured with The X Button");
		}
	}
}