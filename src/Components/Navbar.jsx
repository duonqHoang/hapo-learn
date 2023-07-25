import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navBar">
      <div className="navBar__logo">
        <img src="/Hapo_Learn.png" alt="Haposoft logo" />
      </div>
      <nav>
        <ul className="navBar__links">
          <li>HOME</li>
          <div class="greenPill">
            <li>ALL COURSES</li>
          </div>
          <li>LOGIN/REGISTER</li>
          <li>PROFILE</li>
        </ul>
      </nav>
    </nav>
  );
}
