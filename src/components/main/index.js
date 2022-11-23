import "./index.css";
import { useState } from "react";
import Papa from "papaparse";
import { ColorRing } from "react-loader-spinner";

function Main() {
  const [parsedData, setParsedData] = useState([]);
  const [loader, editLoader] = useState(false);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        // Parsed Data Response in array format
        setParsedData(results.data);
        console.log(parsedData);
        const x = JSON.stringify(parsedData);
        console.log(x);
        /*
        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);

        */
      },
    });
  };

  return (
    <div className="main-box">
      <div className="input-box">
        <h1 className="citi-code">Citi Coding Challenge</h1>
        <div className="input-container">
          <h1>Upload your csv file here</h1>
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            onChange={changeHandler}
            accept=".csv"
            style={{ display: "block", margin: "10px auto" }}
          />
          <button
            className="btn btn-primary"
            onClick={async () => {
              console.log("working");
              editLoader(true);
              const url = "http://localhost:8000/main";
              let details = {
                data: parsedData,
              };
              details = JSON.stringify(details);
              const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: details,
              };
              const response = await fetch(url, options);
              console.log(response.body);
              editLoader(false);
            }}
          >
            click to continue
          </button>

          {loader && (
            <div>
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
