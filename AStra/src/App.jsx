import './App.css'

function Show(){
  return <h2>button : </h2>;
}

function Button () {
  return (
    <>
      <Show/>
      <div class ="button">
          <h4><center>Text</center></h4>
      </div>
      <Navigationbar/>
      
    </>    
  );
}

function Navi(){
  return <h2>Navigation bar  : </h2>;
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
          <a href="/Category">Category</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        <li>
          <a href="/Feedback">Feedback</a>
        </li>
      </ul>
    </nav>

    </>    
  );
}

export default Button 




 