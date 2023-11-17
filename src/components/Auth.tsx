import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

import "./Header.css";

const cookie = new Cookies();

const Auth = ({ func }) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookie.set("userToken", result.user.uid);
      console.log(result);
      func(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <main className="mx-auto my-auto  container text-white">
      <div className="row">
        <h1>
          Welcome to{" "}
          <span className="header-logo">
            PASSWORD<span>STASH</span>
          </span>
        </h1>
      </div>
      <div className="row border rounded">
        <div className="col-lg d-flex flex-column   justify-content-center">
          <label htmlFor="signIn" className="mx-auto mb-2">
            Sign in with Google
          </label>
          <button
            id="signin"
            className="btn btn-light mx-auto fw-bolder"
            onClick={signIn}
          >
            <img
              className="px-1"
              src="https://img.icons8.com/color/16/000000/google-logo.png"
            />
            Sign In
          </button>
        </div>
        <div className="col-lg  p-3">
          <p className="p-3 bg-black bg-opacity-25 rounded">
            This website designed to help you store your sensitive information
            in protected way. After login, you'll get 3 text fields for your
            data and one - for secret. On submit your data will be encoded with
            provided with given "secret" and sent to database. Secret word and
            at least one field must be filled to submit. Use given fields on
            your own taste: for "login/password/description", or "name/phone
            number", or any else.
            <br />
            Please, note that this application made for learning purpose and we
            can not guarantee that it is 100% secure.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Auth;
