

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import LoginPage from './Components/LoginPage';
import RegistrationForm from './Components/RegistrationForm';
import RestaurantDonate from './Components/RestaurantDonate';




  function App() {
    return (
      
      
      <BrowserRouter>
        <Routes>
        
          <Route index element={<Home/>}></Route>
          <Route path={'/Home'} element={<Home/>}></Route>
          <Route path={'/Login'} element={<LoginPage/>}></Route>
          <Route path={'/Sign_Up'} element={<RegistrationForm/>}></Route>
          <Route path={'/RestaurantDonate'} element={<RestaurantDonate/>}></Route>
         
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App