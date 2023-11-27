import { useAppContext } from "../hooks/useAppContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const LogOut = () => {
  const { setIsLoggedIn } = useAppContext();

  const handleClick = async () => {
    await signOut(auth);
    cookie.remove("userToken");
    setIsLoggedIn(false);
  };
  return (
    <button
      className="btn btn-light my-2 mx-auto mx-lg-3 fw-bolder"
      onClick={handleClick}
    >
      <img
        className="px-1"
        src="https://img.icons8.com/color/16/000000/google-logo.png"
      />
      Log Out
    </button>
  );
};

export default LogOut;
