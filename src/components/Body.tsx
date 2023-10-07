import React, { useState } from "react";
import { useEncrypt } from "../hooks/useEncrypt";
import { useDecrypt } from "../hooks/useDecrypt";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const Body = () => {
  const [fieldOne, setFieldOne] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [keyWord, setKeyword] = useState("");

  const entriesRef = collection(db, "collectiontest");

  const decrypt = useDecrypt();
  const encrypt = useEncrypt();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      fieldOne: encrypt(fieldOne, keyWord),
      fieldTwo: encrypt(fieldTwo, keyWord),
      fieldThree: encrypt(fieldThree, keyWord),
    };

    if (formData) {
      await addDoc(entriesRef, formData).then(() => console.log("pushed"));
      setFieldOne("");
      setFieldTwo("");
      setFieldThree("");
    }
  };
  return (
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
        <label htmlFor="password" className="htmlForm-label text-white mx-auto">
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
  );
};

export default Body;
