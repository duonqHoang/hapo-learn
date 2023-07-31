import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Features</a>
          </li>
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
        <ul>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">FAQ</a>
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
