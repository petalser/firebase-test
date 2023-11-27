import { useAppContext } from "../hooks/useAppContext";

const Info = () => {
  const { setShowInfo } = useAppContext();

  return (
    <div
      className="
    bg-black 
    bg-opacity-25 
    d-flex 
    flex-column 
    text-white 
    mb-3
    mx-lg-5
    px-lg-5
    p-3
    "
    >
      <div className="d-flex justify-content-between">
        <h1>Info & how to use</h1>
        <button
          onClick={() => setShowInfo(false)}
          className="btn btn-light my-2 fw-bolder"
        >
          Close
        </button>
      </div>
      <nav className="d-flex flex-column">
        <a className="link-light" href="#warnings">
          Warnings
        </a>
        <a className="link-light" href="#howto">
          How to use
        </a>
      </nav>
      <section>
        <h2 id="warnings">Warnings</h2>
        <ol>
          <li>
            This app doesn't expose provided data. Everything you will pass to
            input fields <br />
            will be encrypted with given keyword right on <strong>your </strong>
            device <strong>before</strong> sending it to database;
          </li>
          <li>
            Your data will be stored in Google's Firestore database as
            unreadable text, <br />
            so - even if someone get access to it - it cannot be read (unless
            intruder has provided "keyword(-s)");
          </li>
          <li>
            Although this app seems completely safe to store sensitive data,{" "}
            <strong>use it on your own risk</strong>.
          </li>
        </ol>
      </section>
      <section>
        <h2 id="howto">How to use</h2>
        <p>Main section consists of two sections:</p>
        <ol className="list-group">
          <li className="list-group-item bg-primary text-white mb-3">
            <h3>Form </h3>
            <div className="bg-black bg-opacity-25 px-3 py-2">
              <p>
                Form consists of 3 input fields for your data, 1 input for
                keyword and "Submit" button.
              </p>
              <p>
                <ol>
                  <li>
                    Fill <strong>at least 1 </strong>input field;
                  </li>
                  <li>
                    Provide the keyword (<strong>at least 3 </strong> characters
                    long). You can have different keywords for each dataset;
                  </li>
                  <li>Press "Submit".</li>
                </ol>
                Congratulations! You just saved your first dataset! <br />
                What's next? Make as many submits as you want and proceed to{" "}
                <b>Table</b>
              </p>
            </div>
          </li>
          <li className="list-group-item bg-primary text-white mb-3">
            <h3>Table </h3>
            <div className="bg-black bg-opacity-25 px-3 py-2">
              <p>
                Table consist of input field (for passing keyword) and of table
                itself.
              </p>
              <p>
                <ol>
                  <li>Provide a keyword;</li>
                  <li>Press "Decode".</li>
                </ol>
              </p>
              <p>
                If you haven't submitted any data yet, table will be empty (no
                cells, only headers).
              </p>
              <p>
                If you already have data, but didn't provided keyword (or if
                provided keyword <br /> doesn't fit for any dataset) you'll see
                cells with raw data;
              </p>
              <p>
                If you have data and provided keyword fits one or more dataset,
                you will get decoded <br /> data in that cells. Rest of table
                will remain unreadable.{" "}
              </p>
              <p>
                If you see "no data" sign in one of your cells, that means that
                you provided correct keyword, <br /> but you left corresponding
                input empty when submitted this particular dataset.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Info;
