import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          margin: "3em auto",
          display: "block",
          width: "200px",
          textAlign: "center"
        }}
      />
    </Fragment>
  );
};

export default Spinner;
