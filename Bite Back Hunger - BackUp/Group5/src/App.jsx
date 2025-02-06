
import './App.css'
import Layout from './Components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



  function App() {
    return (
      
      
      <BrowserRouter>
        <Routes>
        
          <Route index element={<Layout/>}></Route>
          
        </Routes>
      </BrowserRouter>
    )
  }
  
  export default App