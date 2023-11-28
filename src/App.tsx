import Auth from "./components/Auth";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";
import Info from "./components/Info";
import { AppProvider } from "./components/ContextProvider";
import { useAppContext } from "./hooks/useAppContext";
import Footer from "./components/Footer";

function App() {
  const { showInfo, isLoggedIn } = useAppContext();

  return (
    <>
      {isLoggedIn ? (
        <main>
          <Header />
          {showInfo ? (
            <Info />
          ) : (
            <>
              <Form />
              <Body />
            </>
          )}
          <Footer />
        </main>
      ) : (
        <Auth />
      )}
    </>
  );
}

const Root = () => {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
};

export default Root;
