import "../LandingPage/Landingpage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="Lpage">
      {/* Navbar */}
      <div className="Navbar">
        <p id="logotxt">ExpenseWise</p>
        <div id="navitems">
          {/* SignUp Button */}
          <button id="Signupbtn">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                margin: "25px",
              }}
              to="/signup"
            >
              SignUp
            </Link>
          </button>

          {/* SignIn Button */}
          <button id="Signinbtn">
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                margin: "30px",
              }}
              to="/Login"
            >
              LoginIn
            </Link>
          </button>

          {/* Download App Buttons optional */}
          {/* <p className="btn" id="down" aria-label="Download App">
            <i className="bi bi-google-play"></i>
            {" | "}
            <i className="bi bi-apple"></i> Download app
          </p> */}
        </div>

        {/* Hamburger Menu */}
        <i className="bi bi-list" id="ham" aria-label="Menu"></i>
      </div>

      {/* Hero Section */}
      <div className="head">
        <h1 className="txt">
          Navigate Your Financial Journey with <br />
          Confidence and Clarity
        </h1>
        <p className="txt1">
          Reduce your financial worries and focus on achieving stability with
          <br />
          our intuitive AI expense tracker designed for your needs.
        </p>
        <p className="btn" id="down3" aria-label="Download App">
          <i className="bi bi-google-play"></i>
          {" | "}
          <i className="bi bi-apple"></i> Download app
        </p>
      </div>
    </div>
  );
}
