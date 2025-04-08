import './App.css'




function Navi(){
  return <h2>First Navigation bar  : </h2>;
}

function Navig(){
  return <h2>Second Navigation bar  : </h2>;
}




function Navigationbar () {
  return (
    <>
    <Navi/>
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">Logo</a> 
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Category">Account</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/Feedback">Feedback</a>
        </li>
      </ul>
    </nav>
    <Navig/>
    <nav className="Navbar">
      <div className="Navbar-logo">
        <a href="/">Logo</a> 
      </div>
      <ul className="Navbar-links">
      <li class="dropdown">
             <a href="/General">General</a>
        <ul class="dropdown-content">
          <li><a href="#">Language</a></li>
          <li><a href="#">Text-Size</a></li>
        </ul>
        </li>
        <li class="dropdown">
             <a href="/Category">Category</a>
        <ul class="dropdown-content">
          <li><a href="#">Kitchen accessories</a></li>
          <li><a href="#">Door accessories</a></li>
          <li><a href="#">Living-room accessories</a></li>
          <li><a href="#">Garden accessories</a></li>
        </ul>
        </li>
        <li class="dropdown">
             <a href="/Account">Account</a>
        <ul class="dropdown-content">
          <li><a href="#">Sign in</a></li>
          <li><a href="#">Login</a></li>
          <li><a href="#">Credit</a></li>
        </ul>
        </li>
      </ul>
    </nav>
    </>    
  );
}

export default Navigationbar 




 