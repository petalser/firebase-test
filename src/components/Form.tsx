import { useEncrypt } from "../hooks/useEncrypt";
import { useState } from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { DocumentData, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const Form = () => {
  const [fieldOne, setFieldOne] = useState("");
  const [fieldTwo, setFieldTwo] = useState("");
  const [fieldThree, setFieldThree] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywordIsTooShort, setKeywordIsTooShort] = useState(false);

  const entriesRef = collection(db, "data");

  const mutateCollection = useFirestoreCollectionMutation(entriesRef);

  const encrypt = useEncrypt();

  const user = cookie.get("userToken");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: DocumentData = {
      user,
      fieldOne: encrypt(fieldOne, keyword),
      fieldTwo: encrypt(fieldTwo, keyword),
      fieldThree: encrypt(fieldThree, keyword),
      hidden: false,
    };

    if (fieldOne === "" && fieldTwo === "" && fieldThree === "") {
      alert("Please, fill in at least one field");
    }

    const mutation = (data: DocumentData) => {
      mutateCollection.mutate(data);
      setFieldOne("");
      setFieldTwo("");
      setFieldThree("");
    };

    keyword.length > 3
      ? (mutation(formData), setKeywordIsTooShort(false))
      : setKeywordIsTooShort(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-grid mb-3 mx-auto bg-black bg-opacity-25"
    >
      <div className="row justify-content-center">
        <div className="col-lg-4 p-3">
          <label
            htmlFor="login"
            className="htmlForm-label p-1 d-flex flex-column text-white"
          >
            Field 1 (e.g. login, email, etc.)
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
            Field 2 (e.g. password)
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
            Field 3 (e.g. description)
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
            className={`htmlForm-label p-1 d-flex flex-column text-white ${
              keywordIsTooShort ? "bg-danger" : "bg-warning"
            }`}
          >
            {keywordIsTooShort
              ? "Keyword must be at least 2 characters long"
              : "Keyword (must be at least 2 characters long)"}
            <input
              value={keyword}
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
    </form>
  );
};

export default Form;
