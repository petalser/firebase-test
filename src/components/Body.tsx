import { useState } from "react";
import { useDecrypt } from "../hooks/useDecrypt";
import {
  collection,
  doc,
  where,
  DocumentData,
  CollectionReference,
  query,
} from "firebase/firestore";
import {
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { db } from "../firebase-config";
import Cookies from "universal-cookie";

const cookie = new Cookies();

interface IHideButton {
  id: string;
  collectionRef: CollectionReference;
}

const HideButton: React.FC<IHideButton> = ({ id, collectionRef }) => {
  const docRef = doc(collectionRef, id);
  const mutateDoc = useFirestoreDocumentMutation(docRef, { merge: true });

  return (
    <button onClick={() => mutateDoc.mutate({ hidden: true })}>Hide</button>
  );
};

const Body = () => {
  const [inputValue, setinputValue] = useState("");
  const [passKey, setPassKey] = useState("");
  const [visibleOnly, setVisibleOnly] = useState<boolean>(true);

  const decrypt = useDecrypt();

  const uid = cookie.get("userToken");
  const entriesRef: CollectionReference = collection(db, "data");
  const queryRef = query(entriesRef, where("user", "==", uid));

  const { data } = useFirestoreQueryData(["data"], queryRef, {
    subscribe: true,
    idField: "_id",
  });

  //returns markup (table row with 3 pre-filled table cells)
  const tableRow = (item: DocumentData) => {
    return (
      <tr key={item._id}>
        <td className="text-break">
          {passKey === "" ? item.fieldOne : decrypt(item.fieldOne, passKey)}
        </td>
        <td className="text-break">
          {passKey === "" ? item.fieldTwo : decrypt(item.fieldTwo, passKey)}
        </td>
        <td className="text-break">
          {passKey === "" ? item.fieldThree : decrypt(item.fieldThree, passKey)}
        </td>
        <td>
          {item.hidden ? null : (
            <HideButton id={item._id} collectionRef={entriesRef} />
          )}
        </td>
      </tr>
    );
  };

  const handlePassKeySet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPassKey(inputValue);
  };

  return (
    <section className="bg-black bg-opacity-25 d-flex flex-column mb-3">
      <form
        onSubmit={handlePassKeySet}
        className="d-flex justify-content-center"
      >
        <div className=" input-group input-group-sm my-auto d-flex w-25">
          <span className="input-group-text">KEY</span>
          <input
            className="form-control"
            type="text"
            name="inputField"
            placeholder="Your secret key"
            onChange={(e) => {
              setinputValue(e.target.value);
            }}
          />
        </div>
        <button className="btn btn-sm bg-white m-3 fw-bolder" type="submit">
          DECODE
        </button>
      </form>

      <label
        htmlFor="toggleVisibility"
        className="htmlForm-label text-white mx-auto"
      >
        Visible only{" "}
        <input
          checked={visibleOnly}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVisibleOnly(e.target.checked)
          }
          type="checkbox"
          className="htmlForm-control"
          id="toggleVisibility"
          aria-describedby="emailHelp"
        />
      </label>

      <table className="table table-primary table-striped">
        <thead>
          <tr className="table-info">
            <th scope="col">First field</th>
            <th scope="col">Second field</th>
            <th scope="col">Third field</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visibleOnly
            ? data
                ?.filter((item) => item.hidden === false)
                .map((item: DocumentData) => tableRow(item))
            : data?.map((item: DocumentData) => tableRow(item))}
        </tbody>
      </table>
    </section>
  );
};

export default Body;
