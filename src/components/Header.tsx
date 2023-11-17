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
    <div className="header bg-black bg-opacity-25">
      <h1 className="header-logo my-auto">
        PASSWORD<span>STASH</span>
      </h1>
      <button
        onClick={handleClick}
        className=" btn btn-light my-auto fw-bolder"
      >
        INFO
      </button>
      <LogOut func={func} />
    </div>
  );
};

export default Header;
