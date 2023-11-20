import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../firebase-config";

const cookie = new Cookies();

const LogOut = ({ func }) => {
  const logOut = async () => {
    await signOut(auth);
    cookie.remove("userToken");
    func(false);
  };
  return (
    // <div className=" p-3 d-flex flex-column ">
    <button
      className="btn btn-light my-2 mx-auto mx-lg-3 fw-bolder"
      onClick={logOut}
    >
      {/* "            col-2 btn btn-light my-auto fw-bolder" */}
      <img
        className="px-1"
        src="https://img.icons8.com/color/16/000000/google-logo.png"
      />
      Log Out
    </button>
    // {/* </div> */}
  );
};

export default LogOut;
