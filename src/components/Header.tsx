import LogOut from "./LogOut";
// import Auth from "./Auth"
import "./Header.css";

const Header = ({ func }) => {
  return (
    <div className="header">
      <h1 className="header-logo my-auto">
        PASSWORD<span>STASH</span>
      </h1>
      <button className=" btn bg-white my-auto fw-bolder">INFO</button>
      <LogOut func={func} />
    </div>
  );
};

export default Header;
