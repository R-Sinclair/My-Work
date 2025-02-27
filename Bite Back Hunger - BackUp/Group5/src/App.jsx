

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import LoginPage from './Components/LoginPage';
import RegistrationForm from './Components/RegistrationForm';
import RestaurantDonate from './Donations/RestaurantDonate';
import UserLayout from './Components/UserLayout';
import UHomePage from './Components/UHomePage';
import RHomePage from './Components/RHomePage';
import UserDonate from './Donations/UserDonate';
import DonationRSide from './Donations/DonationRSide';
import DonationUSide from './Donations/DonationUSide';
import ReportPage from './Components/ReportPage';




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
          <Route path={'/Reportpage'} element={<ReportPage/>}></Route>
          
          
         
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App