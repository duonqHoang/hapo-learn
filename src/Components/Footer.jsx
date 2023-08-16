import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Features</Link>
          </li>
          <li>
            <Link to="courses">Courses</Link>
          </li>
          <li>
            <Link to="/">Blog</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/">Contact</Link>
          </li>
          <li>
            <Link to="/">Terms of Use</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
        </ul>
        <div className="hapo">
          <img src="images/Hapo_Learn_white 1.png" alt="Hapo logo" />
          <div className="logo-text">
            Interactive lessons, "on-the-go" {"\n"}practice, peer support.
          </div>
        </div>
        <div className="icons">
          <a href="#">
            <img src="images/fb.png"></img>
          </a>
          <a href="#">
            <img src="images/phone.png"></img>
          </a>
          <a href="#">
            <img src="images/mail.png"></img>
          </a>
        </div>
      </div>
      <div className="rights">© 2020 HapoLearn, Inc. All rights reserved.</div>
    </div>
  );
}
