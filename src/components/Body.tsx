import React, { useState, useEffect, useRef } from "react";
import { useEncrypt } from "../hooks/useEncrypt";
import { useDecrypt } from "../hooks/useDecrypt";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase-config";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const Body = () => {
  const [fieldOne, setFieldOne] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [keyWord, setKeyword] = useState("");
  const [passKey, setPassKey] = useState("");
  const [entries, setEntries] = useState<DocumentData>([]);

  const passKeyRef = useRef(null);

  const decrypt = useDecrypt();
  const encrypt = useEncrypt();

  const entriesRef = collection(db, "collectiontest");
  const user = cookie.get("userToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      user,
      fieldOne: encrypt(fieldOne, keyWord),
      fieldTwo: encrypt(fieldTwo, keyWord),
      fieldThree: encrypt(fieldThree, keyWord),
      hidden: false,
    };

    if (formData) {
      await addDoc(entriesRef, formData).then(() => console.log("pushed"));
      setFieldOne("");
      setFieldTwo("");
      setFieldThree("");
    }
  };

  useEffect(() => {
    const queries = query(entriesRef, where("user", "==", user));

    // Initialize an empty array with the specified type
    const tempV: DocumentData[] = [];

    const unsubscribe = onSnapshot(queries, (snapShot) => {
      snapShot.forEach((doc) => {
        tempV.push(doc.data() as DocumentData);
      });

      // Update the state with the new entries
      setEntries(tempV);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-center mt-3"
        style={{ backgroundColor: " rgba(0, 0, 0, 0.2)" }}
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
      <input type="text" ref={passKeyRef} />
      <button onClick={() => setPassKey(passKeyRef.current.value)}>Go</button>
      <ul>
        {entries.map((item: DocumentData, index: number) => (
          <li key={index} className="text-white">
            <p>
              {passKey === "" ? item.fieldOne : decrypt(item.fieldOne, passKey)}
            </p>
            <p>
              {passKey === "" ? item.fieldTwo : decrypt(item.fieldTwo, passKey)}
            </p>
            <p>
              {passKey === ""
                ? item.fieldThree
                : decrypt(item.fieldThree, passKey)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Body;
