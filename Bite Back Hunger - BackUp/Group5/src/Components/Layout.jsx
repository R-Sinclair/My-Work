

export default function Layout (){

return (  
  
    <div className="navbar">
      <div className="auth-buttons">
        <a href="Components/LoginPage.jsx" className="auth-button" style={{ background: 'darkgreen', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }}>
          Login
        </a>
        <a href="Components/RegistrationForm.jsx" className="auth-button" style={{ background: 'white', color: 'black', border: '2px solid black', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none' }}>
          Sign Up
        </a>
      </div>
      <a href="#">Home</a>
      <div className="dropdown">
        <a href="#" className="dropbtn">Support Us</a>
        <div className="dropdown-content">
          <a href="#donate-food">Donate Food</a>
          <a href="#donate-money">Donate Money</a>
        </div>
      </div>
      <a href="#news">News</a>
      <a href="#find-shelters">Find Shelters</a>
      <input type="text" className="search-bar" placeholder="Search..." />
    </div>)}