import "../navbar2/navbarr.css";

export default function Navbarr() {
  return (
    <div className=" container-fluid   parentnav">
      <div className="childnav">
        <div>
          <div>
            <p id="logotxt">ExpenseWise</p>
          </div>
        </div>
        <div className="navitem">
          <button className="navitem2">Logout</button>
        </div>
      </div>
      <div className="blobb"></div>
    </div>
  );
}
