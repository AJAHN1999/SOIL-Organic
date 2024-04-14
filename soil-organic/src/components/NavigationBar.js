import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../hooks/context";

function NavigationBar() {
  let { currentloggedInUser, signOut } = useContext(UserContext);
  console.log(currentloggedInUser);
  return currentloggedInUser == null ? (
    <>
      <nav>
        <ul
          className="flex space-x-4 justify-center py-5 gap-5"
          style={{ fontSize: "1.2rem", fontWeight: "bolder" }}
        >
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* <li><Link to="/signup">Sign Up</Link></li> */}
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
          {/* <li><Link to="/profile">Profile</Link></li> */}
          <li>
            <Link to="/specials">Specials</Link>
          </li>
        </ul>
      </nav>
    </>
  ) : (
    <nav>
      <ul
        className="flex space-x-4 justify-center py-5 gap-5"
        style={{ fontSize: "1.2rem", fontWeight: "bolder" }}
      >
        <li>
          <Link to="/">Hi,{currentloggedInUser}</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/specials">Specials</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <button onClick={signOut}> Sign Out</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
