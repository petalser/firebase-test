import { useState } from "react";
import { useDecrypt } from "../hooks/useDecrypt";
import {
  collection,
  doc,
  query,
  where,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import {
  useFirestoreQueryData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { db } from "../firebase-config";
import { Unsubscribe } from "firebase/auth";

const HideDoc = ({ id, collectionRef }) => {
  const docRef = doc(collectionRef, id);
  const mutateDoc = useFirestoreDocumentMutation(docRef, { merge: true });

  return (
    <button onClick={() => mutateDoc.mutate({ hidden: true })}>Hide</button>
  );
};

const Body = () => {
  const [passKey, setPassKey] = useState("");
  const [visibleOnly, setVisibleOnly] = useState<boolean>(true);

  const [password, setPassword] = useState();

  const decrypt = useDecrypt();

  const entriesRef = collection(db, "data");

  const { data } = useFirestoreQueryData(["data"], entriesRef, {
    subscribe: true,
    idField: "_id",
  });

  const tableRow = (item) => {
    return (
      <tr key={item._id}>
        <td>
          {passKey === "" ? item.fieldOne : decrypt(item.fieldOne, passKey)}
        </td>
        <td>
          {passKey === "" ? item.fieldTwo : decrypt(item.fieldTwo, passKey)}
        </td>
        <td>
          {passKey === "" ? item.fieldThree : decrypt(item.fieldThree, passKey)}
        </td>
        <td>
          {item.hidden ? null : (
            <HideDoc id={item._id} collectionRef={entriesRef} />
          )}
        </td>
      </tr>
    );
  };
  //   e.preventDefault();
  //   const formData = {
  //     user,
  //     fieldOne: encrypt(fieldOne, keyWord),
  //     fieldTwo: encrypt(fieldTwo, keyWord),
  //     fieldThree: encrypt(fieldThree, keyWord),
  //     hidden: false,
  //   };

  //   if (formData) {
  //     mutateCollection.mutate(formData);
  //     setFieldOne("");
  //     setFieldTwo("");
  //     setFieldThree("");
  //   }
  // };

  const handleHide = (id) => {};

  const handlePassKeySet = (e) => {
    e.preventDefault();
    setPassKey(e.target.inputField.value);
  };
  return (
    <>
      {/* <form
        onSubmit={handleSubmit}
        className="d-grid my-3 mx-auto bg-black bg-opacity-25"
      >
        <div className="row justify-content-center">
          <div className="col-lg-4 p-3">
            <label
              htmlFor="login"
              className="htmlForm-label p-1 d-flex flex-column text-white"
            >
              Login
              <input
                value={fieldOne}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldOne(e.target.value)
                }
                type="text"
                className="htmlForm-control"
                id="login"
                aria-describedby="emailHelp"
              />
            </label>

            <label
              htmlFor="password"
              className="htmlForm-label p-1 d-flex flex-column text-white"
            >
              Password
              <input
                value={fieldTwo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldTwo(e.target.value)
                }
                type="text"
                className="htmlForm-control"
                id="password"
              />
            </label>

            <label
              htmlFor="description"
              className="htmlForm-label p-1 d-flex flex-column text-white"
            >
              Description
              <input
                value={fieldThree}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldThree(e.target.value)
                }
                type="text"
                className="htmlForm-control"
                id="description"
              />
            </label>
          </div>
          <div className="col-lg-4 p-3">
            <label
              htmlFor="description"
              className="htmlForm-label p-1 bg-danger d-flex flex-column text-white"
            >
              Keyword
              <input
                value={keyWord}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setKeyword(e.target.value)
                }
                type="text"
                className="htmlForm-control"
                id="keyword"
              />
            </label>

            <button type="submit" className="btn btn-light mx-2 fw-bolder">
              SUBMIT
            </button>
          </div>
        </div>
      </form> */}

      <div className="bg-black bg-opacity-25 d-flex flex-column">
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
      </div>
    </>
  );
};

export default Body;
