import { Collapse } from "react-bootstrap";
import "./Navbar.scss";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../Store/user-action";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const isAuth = useSelector((state) => state.user.isAuthenticated);

  const handleLogout = async () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <nav className="navBar">
      <div className="horizontal-bar">
        <div
          className="navBar__logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/Hapo_Learn.png" alt="Haposoft logo" />
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
          {!isAuth && (
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
          )}
          {isAuth && (
            <li className="sign-out-btn" onClick={handleLogout}>
              SIGN OUT
            </li>
          )}
          {isAuth && (
            <li>
              <Link
                to="profile"
                className={
                  location.pathname.includes("profile") ? "active" : ""
                }
              >
                PROFILE
              </Link>
            </li>
          )}
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
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="courses">ALL COURSES</Link>
              </li>
              <li>
                <Link>LIST LESSON</Link>
              </li>
              <li>
                <Link>LESSON DETAIL</Link>
              </li>
              {!isAuth && (
                <li>
                  <Link to="signIn">LOGIN/REGISTER</Link>
                </li>
              )}
              <li>
                <Link to="profile">PROFILE</Link>
              </li>
              {isAuth && (
                <li className="sign-out-btn" onClick={handleLogout}>
                  SIGN OUT
                </li>
              )}
            </ul>
          </div>
        </div>
      </Collapse>
    </nav>
  );
}
