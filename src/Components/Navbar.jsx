import { Collapse } from "react-bootstrap";
import "./Navbar.scss";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navBar">
      <div className="horizontal-bar">
        <div className="navBar__logo">
          <img src="images/Hapo_Learn.png" alt="Haposoft logo" />
        </div>
        <ul className="navBar__links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="courses"
              className={location.pathname.includes("courses") ? "active" : ""}
            >
              ALL COURSES
            </Link>
          </li>
          <li>
            <Link
              to="signIn"
              className={
                /signIn|signUp/.test(location.pathname) ? "active" : ""
              }
            >
              LOGIN/REGISTER
            </Link>
          </li>
          <li>
            <Link
              to="profile"
              className={location.pathname.includes("profile") ? "active" : ""}
            >
              PROFILE
            </Link>
          </li>
        </ul>
        <button onClick={() => setOpen(!open)}>
          {open ? (
            <VscChromeClose style={{ width: "25px" }} />
          ) : (
            <GiHamburgerMenu style={{ width: "25px" }} />
          )}
        </button>
      </div>

      <Collapse in={open}>
        <div>
          <div className="collapsibleNav">
            <ul>
              <li>
                <a href="#">HOME</a>
              </li>
              <li>
                <a className="greenLink" href="#">
                  ALL COURSES
                </a>
              </li>
              <li>
                <a href="#">LIST LESSON</a>
              </li>
              <li>
                <a href="#">LESSON DETAIL</a>
              </li>
              <li>
                <a href="#">LOGIN/REGISTER</a>
              </li>
              <li>
                <a href="#">PROFILE</a>
              </li>
            </ul>
          </div>
        </div>
      </Collapse>
    </nav>
  );
}
