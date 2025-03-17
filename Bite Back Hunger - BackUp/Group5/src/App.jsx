

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import LoginPage from './SignUp/Login/LoginPage';
import RegistrationForm from './SignUp/Login/RegistrationForm';
import RestaurantDonate from './Donations/RestaurantDonate';
import UHomePage from './Pages/UHomePage';
import RHomePage from './Pages/RHomePage';
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
          <Route path={'/UHomePage'} element={<UHomePage/>}></Route>
          <Route path={'/RHomePage'} element={<RHomePage/>}></Route>
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
          
   
          
          
         
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App