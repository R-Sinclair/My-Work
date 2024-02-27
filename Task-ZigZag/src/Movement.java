import java.util.Random;
import swiftbot.Underlight;
//Class Two
public class Movement extends QRcode
{
	protected static int speed;
	private static double Tseconds;
	

	public void Speed() 
	{
		Random random = new Random();// this section just randomly generates the speed
		speed = random.nextInt(100 - 60+1)+60;
		double Len = length/2.4;// The reason is is divided by 1.4 is so the length is as accurate as possible in real life
		Tseconds = (Len / speed)*(10);
	}
	public void reverse(int LeftWheel, int RightWheel) throws InterruptedException
	{// this whole section is about the reverse
		Thread.sleep(1000);
		try{
			long blinkTime = System.currentTimeMillis() + (100);
			int[] Grey= {204,204,204};
			while (System.currentTimeMillis()< blinkTime) // this makes it so while reversing the swiftbot blinks grey lights
			{
				swiftBot.startMove(LeftWheel, RightWheel);
				for (int i=1;i<=2;i++) 
				{
					swiftBot.fillUnderlights(Grey);
					Thread.sleep(175);
					swiftBot.disableUnderlights();
					Thread.sleep(175);
				}
			}
			swiftBot.stopMove();
			swiftBot.disableUnderlights();
		}
		catch (Exception e){
			e.printStackTrace();
			System.out.println("Error while reversing swiftbot");
			System.exit(3);
		}
	}

	public void Forward(int underlight[]) throws InterruptedException
	{
		Thread.sleep(1000);
		int RightWheel=speed-2;
		int LeftWheel=speed;
		try{
			swiftBot.fillUnderlights(underlight);
			swiftBot.move(LeftWheel,RightWheel,(int) (Math.floor(Tseconds*1000)));

		}catch (Exception e){
			e.printStackTrace();
			System.out.println("Error while moving swiftbot forward");
			System.exit(3);
		} 
		swiftBot.disableUnderlights();
	}
	public void Turning_Left(int LeftWheel, int RightWheel) throws InterruptedException 
	{
		// turning left
		Thread.sleep(1000);
		try{
			long blinkTime = System.currentTimeMillis() + (100);
			int[] Amber= {255, 0, 191};
			while (System.currentTimeMillis()< blinkTime) 
			{
				swiftBot.startMove(LeftWheel, RightWheel);
				for (int i=1;i<=2;i++) 
				{
					swiftBot.setUnderlight(Underlight.FRONT_LEFT, Amber);
					swiftBot.setUnderlight(Underlight.BACK_LEFT, Amber);
					swiftBot.setUnderlight(Underlight.MIDDLE_LEFT, Amber);
					Thread.sleep(175);
					swiftBot.disableUnderlights();
					Thread.sleep(175);
				}
			}
			swiftBot.stopMove();
			swiftBot.disableUnderlights();
		}catch (Exception e){
			e.printStackTrace();
			System.out.println("Error while turning wheel to the left");
			System.exit(3);
		} 
	}
	public void Turning_Right(int LeftWheel, int RightWheel) throws InterruptedException 
	{
		// turning right
		Thread.sleep(1000);
		try{
			long blinkTime = System.currentTimeMillis() + (100);
			int[] Amber= {255, 0, 191};
			while (System.currentTimeMillis()< blinkTime) 
			{
				swiftBot.startMove(LeftWheel, RightWheel);
				for (int i=1;i<=2;i++) 
				{
					swiftBot.setUnderlight(Underlight.FRONT_RIGHT, Amber);
					swiftBot.setUnderlight(Underlight.BACK_RIGHT, Amber);
					swiftBot.setUnderlight(Underlight.MIDDLE_RIGHT, Amber);
					Thread.sleep(175);
					swiftBot.disableUnderlights();
					Thread.sleep(175);
				}
			}
			swiftBot.stopMove();
			swiftBot.disableUnderlights();
		}catch (Exception e){
			e.printStackTrace();
			System.out.println("Error while turning wheel to the right");
			System.exit(3);
		} 
	}
	
}

