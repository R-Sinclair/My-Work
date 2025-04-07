
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import LoginPage from './SignUp/Login/LoginPage';
import RegistrationForm from './SignUp/Login/RegistrationForm';
import RestaurantDonate from './Donations/RestaurantDonate';
import UserDonate from './Donations/UserDonate';
import DonationRSide from './Donations/DonationRSide';
import DonationUSide from './Donations/DonationUSide';
import RewardPage from './Pages/lin reward page';
import ReportPage from './Pages/new-report-page - faisa';
import SignInHome from './Home/SignInHome';
import Tasks from './Components/Tasks';
import Charities from './Pages/ikhra-foodbanks';
import AboutUs from './Pages/AboutUs';
import ProfilePage from './Pages/ProfilePage-ikhra';
import Maps from './Karim/map';
import DonationList from './David/DonationList';
import CampaignList from './David/CampaignList';
import DonatePage from './David/Donation';
import Donation1 from './David/Donation1';
import Donation2 from './David/Donation2';
import ResetPassword from './Forgot_Password/ResetPassword';
import ResetPasswordRequest from './Forgot_Password/ResetPasswordRequest';
import OTPVerification from './Components/OTPVerification';








  function App() {

   
    return (
      
      
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path={'/Home'} element={<Home/>}></Route>
          <Route path={'/Login'} element={<LoginPage/>}></Route>
          <Route path={'/Sign_Up'} element={<RegistrationForm/>}></Route>
          <Route path={'/RestaurantDonate'} element={<RestaurantDonate/>}></Route>
          <Route path={'/UserDonate'} element={<UserDonate/>}></Route>
          <Route path={'/DonationRSide'} element={<DonationRSide/>}></Route>
          <Route path={'/DonationUSide'} element={<DonationUSide/>}></Route>
          <Route path={'/Reward'} element={<RewardPage/>}></Route>
          <Route path={'/Report'} element={<ReportPage/>}></Route>
          <Route path={'/SignInHome'} element={<SignInHome/>}></Route>
          <Route path={'/Tasks'} element={<Tasks/>}></Route>
          <Route path={'/Charities'} element={<Charities/>}></Route>
          <Route path={'/Map'} element={<Maps/>}></Route>
          <Route path={'/AboutUs'} element={<AboutUs/>}></Route>
          <Route path={'/Profile'} element={<ProfilePage/>}></Route>
            <Route path="/campaigns" element={<CampaignList/>} />
            <Route path="/donation" element={<DonatePage/>} />
            <Route path="/donation1" element={<Donation1/>} />
            <Route path="/donation2" element={<Donation2/>} />
            <Route path="/donations" element={<DonationList/>} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/reset-password-request" element={<ResetPasswordRequest/>} />
            <Route path="/otp" element={<OTPVerification/>} />

        </Routes>
        <ToastContainer />
      </BrowserRouter>
      
    )
  }
  
  export default App