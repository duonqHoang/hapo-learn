import { Collapse } from "react-bootstrap";
import "./Navbar.scss";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navBar">
      <div className="horizontal-bar">
        <div className="navBar__logo">
          <img src="/Hapo_Learn.png" alt="Haposoft logo" />
        </div>
        <ul className="navBar__links">
          <li>HOME</li>
          <div class="greenPill">
            <li>ALL COURSES</li>
          </div>
          <li>LOGIN/REGISTER</li>
          <li>PROFILE</li>
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
