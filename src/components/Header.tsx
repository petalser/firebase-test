import LogOut from "./LogOut";
import { useAppContext } from "../hooks/useAppContext";
import "./Header.css";

const Header = () => {
  const { showInfo, setShowInfo } = useAppContext();

  return (
    <header
      className="
    d-flex 
    flex-column 
    flex-lg-row 
    justify-content-center  
    justify-content-lg-around
    bg-black 
    bg-opacity-25
    mb-3"
    >
      <h1 className="header-logo mx-auto mx-lg-0">
        PASSWORD<span>STASH</span>
      </h1>
      {!showInfo && (
        <div className="d-flex">
          <button
            onClick={() => setShowInfo(true)}
            className="btn btn-light my-2 mx-auto mx-lg-3 fw-bolder"
          >
            INFO
          </button>
          <LogOut />
        </div>
      )}
    </header>
  );
};

export default Header;
