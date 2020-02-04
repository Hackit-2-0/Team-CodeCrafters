import React from "react";
import logo from "./logo.svg";
import "./App.css";
// react-router-dom
import { BrowserRouter, Route, Router } from "react-router-dom";

import Client_Details from "./Components/Home";
import Company from "./Components/Company";
import Structure from "./Components/Structure";
import WhoYouAre from "./Components/WhoYouAre";
import MilModel from "./Components/MlModel";

import { Grid, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <switch>
          <Route exact path="/" component={WhoYouAre} />
          <Route exact path="/Home" component={Client_Details} />
          {/* github */}
          <Route exact path="/GithubReq" component={Structure} />
          {/* indeed */}
          <Route exact path="/IndeedReq" component={Company} />
          <Route exact path="/Val" component={MilModel} />
          {/* <Route exact path="/*" component={WhoYouAre} /> */}
        </switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
