import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Form from "./components/Form";
import Body from "./components/Body";
import Cookies from "universal-cookie";

const cookie = new Cookies();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (cookie.get("userToken")) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <main>
          <Header func={setIsLoggedIn} />
          <Form />
          <Body />
        </main>
      ) : (
        <Auth func={setIsLoggedIn} />
      )}
    </>
  );
}

export default App;
