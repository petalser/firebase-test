import LogOut from "./LogOut";
import "./Header.css";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Header = ({ func }) => {
  //this handler made for cleaning up the collection
  //TODO: remove this and create description
  const handleClick = async () => {
    const querySnapshot = await getDocs(collection(db, "collectiontest"));
    querySnapshot.forEach((docum) => {
      deleteDoc(doc(db, "collectiontest", docum.id));
    });
  };

  return (
    <header
      className="
    d-flex 
    flex-column 
    flex-lg-row 
    justify-content-center  
    justify-content-lg-around
    bg-black 
    bg-opacity-25"
    >
      <h1 className="header-logo mx-auto mx-lg-0">
        PASSWORD<span>STASH</span>
      </h1>

      <button onClick={handleClick} className="btn btn-light my-2 fw-bolder ">
        INFO
      </button>

      <LogOut func={func} />
    </header>
  );
};

export default Header;
