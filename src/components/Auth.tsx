import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const Auth = ({ func }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("userToken", result.user.refreshToken);
      func(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto my-auto p-3 d-flex flex-column border rounded">
      <p className="text-white mx-auto">Sign in with Google</p>
      <button className="btn bg-white mx-auto fw-bolder" onClick={signIn}>
        <img
          className="px-1"
          src="https://img.icons8.com/color/16/000000/google-logo.png"
        />
        Sign In
      </button>
    </div>
  );
};

export default Auth;
