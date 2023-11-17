import React, { useState, useEffect, useRef } from "react";
import { useEncrypt } from "../hooks/useEncrypt";
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
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { db } from "../firebase-config";
import Cookies from "universal-cookie";
// import { Unsubscribe } from "firebase/auth";

const cookie = new Cookies();

const HideDoc = ({ id, collectionRef }) => {
  const docRef = doc(collectionRef, id);
  const mutateDoc = useFirestoreDocumentMutation(docRef, { merge: true });

  return (
    <button onClick={() => mutateDoc.mutate({ hidden: true })}>Hide</button>
  );
};

const Body = () => {
  const [fieldOne, setFieldOne] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [keyWord, setKeyword] = useState("");
  const [passKey, setPassKey] = useState("");
  // const [entries, setEntries] = useState<DocumentData>([]);
  const [visibleOnly, setVisibleOnly] = useState<boolean>(true);

  const [passwort, setPassword] = useState();

  const decrypt = useDecrypt();
  const encrypt = useEncrypt();

  const entriesRef = collection(db, "data");

  const mutateCollection = useFirestoreCollectionMutation(entriesRef);
  const user = cookie.get("userToken");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      user,
      fieldOne: encrypt(fieldOne, keyWord),
      fieldTwo: encrypt(fieldTwo, keyWord),
      fieldThree: encrypt(fieldThree, keyWord),
      hidden: false,
    };

    if (formData) {
      mutateCollection.mutate(formData);
      setFieldOne("");
      setFieldTwo("");
      setFieldThree("");
    }
  };

  const handleHide = (id) => {};

  const handlePassKeySet = (e) => {
    e.preventDefault();
    setPassKey(e.target.inputField.value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mt-3 bg-black bg-opacity-25"
      >
        <div className="m-3 d-flex flex-column">
          <label htmlFor="login" className="htmlForm-label text-white mx-auto">
            Login
          </label>
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
        </div>
        <div className="m-3 d-flex flex-column">
          <label
            htmlFor="password"
            className="htmlForm-label text-white mx-auto"
          >
            Password
          </label>
          <input
            value={fieldTwo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldTwo(e.target.value)
            }
            type="text"
            className="htmlForm-control"
            id="password"
          />
        </div>
        <div className="m-3 d-flex flex-column">
          <label
            htmlFor="description"
            className="htmlForm-label text-white mx-auto"
          >
            Description
          </label>
          <input
            value={fieldThree}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldThree(e.target.value)
            }
            type="text"
            className="htmlForm-control"
            id="description"
          />
        </div>
        <div className="m-3 d-flex flex-column bg-danger">
          <label
            htmlFor="description"
            className="htmlForm-label text-white mx-auto"
          >
            Keyword
          </label>
          <input
            value={keyWord}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            type="text"
            className="htmlForm-control"
            id="keyword"
          />
        </div>

        <button type="submit" className="btn bg-white m-3 fw-bolder">
          SUBMIT
        </button>
      </form>

      <div className="bg-black bg-opacity-25">
        <div className="d-flex justify-content-center">
          <form onSubmit={handlePassKeySet}>
            <div className=" input-group input-group-sm my-auto w-25">
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
          <div className="m-3 d-flex flex-column">
            <label
              htmlFor="login"
              className="htmlForm-label text-white mx-auto"
            >
              Visible only
            </label>
            <input
              checked={visibleOnly}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setVisibleOnly(e.target.checked)
              }
              type="checkbox"
              className="htmlForm-control"
              id="login"
              aria-describedby="emailHelp"
            />
          </div>
        </div>

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
