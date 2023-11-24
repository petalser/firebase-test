import LogOut from "./LogOut";
import "./Header.css";
import { collection, getDocs, deleteDoc, query, doc } from "firebase/firestore";
import { db } from "../firebase-config";

const Header = ({ func }) => {
  const collectionRef = collection(db, "data");

  const handleClick = async () => {
    try {
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach(async (doc) => {
        try {
          const docRef = doc.ref; // Access the document reference directly
          await deleteDoc(docRef);
          console.log("Document successfully deleted:", doc.id);
        } catch (error) {
          console.error("Error deleting document:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
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
