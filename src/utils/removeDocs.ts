import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc } from "firebase/firestore";

const removeDocs = async () => {
  const collectionRef = collection(db, "data");
  try {
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (doc) => {
      try {
        const docRef = doc.ref;
        await deleteDoc(docRef);
        console.log(`Document ${doc.id} successfully deleted`);
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

export default removeDocs;
