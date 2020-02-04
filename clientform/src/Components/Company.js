import React, { Component, Fragment } from "react";
// import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { Icon, Segment, Form } from "semantic-ui-react";
import { List } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Spinner from "./Spinner";
import Navbar from "./Navbar";

export default class Company extends Component {
  state = {
    tech: "",
    sub: "",
    // year is experience
    year: "",
    nontech: "",
    // sub non technical
    nonSub: "",
    loading: false,
    alert: null,
    validation: false,
    userLikes: []
  };

  onChange = e => {
    e.preventDefault();

    this.setState({
      tech: e.target.value
    });
  };

  subSkill = e => {
    e.preventDefault();

    this.setState({
      sub: e.target.value
    });
  };

  yearExperiance = e => {
    e.preventDefault();
    this.setState({
      year: e.target.value
    });
  };

  nonTech = e => {
    e.preventDefault();
    this.setState({
      nontech: e.target.value
    });
  };

  subTech = e => {
    e.preventDefault();
    this.setState({
      nonSub: e.target.value
    });
  };

  spinner = e => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => this.setState({ loading: false }), 5000);

    if (
      this.state.tech === "" ||
      this.state.sub === "" ||
      this.state.year === "" ||
      this.state.nontech === "" ||
      this.state.nonSub === ""
    ) {
      this.setState({ validation: true });
    } else {
      this.setState({ validation: false });
    }
  };

  clearField = e => {
    e.preventDefault();
    this.setState({ tech: "", sub: "", year: "", nontech: "", nonSub: "" });
  };

  render() {
    return (
      <div
        style={{ margin: "10px auto", marginLeft: "20px", marginRight: "20px" }}
      >
        <Navbar />
        <Fragment>
          <div className="ui inverted segment">
            <div className="ui inverted pointing secondary menu">
              <Link className="item" to="IndeedReq">
                Global Recruitment across Indeed
              </Link>
              <Link className="item" to="/GithubReq">
                Global Recruitment across Github
              </Link>
            </div>
          </div>
          <br />
          {this.state.loading ? <Spinner /> : null}

          <div className="ui segment">
            <form
              className="ui form"
              onSubmit={e => {
                e.preventDefault();
                console.log(123);
                axios
                  .post("http://localhost:5000/scraper/indeed", {
                    tech: this.state.tech,
                    city: this.state.city,
                    radius: this.state.radius,
                    age: this.state.year.replace("-year", ""),
                    level: this.state.year,
                    limit: this.state.limit
                  })
                  .then(res => {
                    const arr = res.data;
                    if (arr.length > 0) {
                      this.setState({
                        loading: false
                      });
                      this.setState({
                        userLikes: res.data
                      });
                    } else {
                      this.setState({
                        loading: true
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
                // city radius,maxage,limit

                //             //   tech: "",
                // sub: "",
                // // year is experience
                // year: "",
                // nontech: "",
                // // sub non technical
                // nonSub: "",
              }}
            >
              <div className="fields">
                <label style={{ fontWeight: "bold" }}>
                  Technical Skills :{" "}
                </label>
                <input
                  type="text"
                  name="tech"
                  value={this.state.tech}
                  placeholder="eg. full stack developer , Game developer "
                  onChange={this.onChange}
                ></input>
              </div>
              {/* city */}
              <div className="fields">
                <label style={{ fontWeight: "bold" }}>Residial City : </label>
                <input
                  type="text"
                  name="city"
                  //   value={this.state.city}
                  placeholder="Mumbai ..."
                  onChange={e => {
                    this.setState({
                      [e.target.name]: e.target.value
                    });
                  }}
                ></input>
              </div>

              {/* radius to search aroun */}
              <div className="fields">
                <label style={{ fontWeight: "bold" }}>Radius : </label>
                <input
                  type="text"
                  name="radius"
                  placeholder="10/20 ..."
                  //   value={this.state.city}
                  onChange={e => {
                    this.setState({
                      [e.target.name]: e.target.value
                    });
                  }}
                ></input>
              </div>

              {/* age of the person */}

              {/*  */}

              <div className="fields">
                <label style={{ fontWeight: "bold" }}>Limit Result : </label>
                {/* <input
                  type="range"
                  name="limit"
                  //   value={this.state.city}
                  placeholder="10/20 ..."
                  onChange={e => {
                    this.setState({
                      [e.target.name]: e.target.value
                    });
                  }}
                ></input> */}
                <Form.Input
                  type="range"
                  name="limit"
                  min={0}
                  max={100}
                  placeholder="10/20"
                  onChange={e => {
                    this.setState({
                      [e.target.name]: e.target.value
                    });
                  }}
                  step={5}
                />
                <span>{this.state.limit}</span>
              </div>

              <div className="fields">
                <label style={{ fontWeight: "bold" }}>
                  Sub Technical Skills
                </label>
                <input
                  type="text"
                  name="sub"
                  placeholder="eg. python , java , unity"
                  value={this.state.sub}
                  onChange={this.subSkill}
                ></input>
              </div>

              <div className="fields">
                <label style={{ fontWeight: "bold" }}>
                  Years of experience
                </label>
                <select
                  name="year"
                  className="ui search dropdown"
                  onChange={this.yearExperiance}
                >
                  <option value="">Select Month</option>
                  <option value="1-year">1 years</option>
                  <option value="2-year">2 years</option>
                  <option value="3-year">3 years</option>
                  <option value="3-year">4 years</option>
                  <option value="3-year">5 years</option>
                  <option value="3-year">6 years</option>
                  <option value="7-year">7 years</option>
                  <option value="8-year">8 years</option>
                  <option value="9-year">9 years</option>
                  <option value="10-year">10 years</option>
                </select>
              </div>

              <div className="fields">
                <label style={{ fontWeight: "bold" }}>
                  Non techical skills
                </label>
                <input
                  type="text"
                  name="nontech"
                  placeholder="eg. Project management , Creativity"
                  onChange={this.nonTech}
                ></input>
              </div>

              <div className="fields">
                <label style={{ fontWeight: "bold" }}>
                  Sub Non-technical Skills
                </label>
                <select
                  name="subtech"
                  className="ui dropdown"
                  onChange={this.subTech}
                >
                  <option value="">Select Non technical Skills</option>
                  <option value="Social">Social Media </option>
                  <option value="digital">Digital marketing</option>
                  <option value="Productivity">Productivity</option>
                  <option value="analytical">analytical skills</option>
                  <option value="Marketer">Marketer</option>
                  <option value="Photographer">Photographer</option>
                  <option value="project">project manager</option>
                  <option value="Presentation">Presentation management</option>
                </select>
              </div>

              <div className="fields">
                {this.state.validation ? (
                  <p
                    style={{
                      color: "red",
                      backgroundColor: "#f4f4f4",
                      fontSize: "15px"
                    }}
                  >
                    <Icon className="iconStyle" name="info" />
                    Enter the require fields ...
                  </p>
                ) : null}
              </div>
              <div className="fields">
                <button
                  className="ui primary button"
                  //   onClick={this.spinner}
                  type="submit"
                >
                  Submit
                </button>

                <button
                  className="ui negative button"
                  onClick={this.clearField}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>

          <div>
            <Segment inverted>
              {this.state.userLikes.length > 0
                ? this.state.userLikes.map(data => (
                    <div>
                      <List divided inverted relaxed>
                        <List.Item>
                          <List.Header>{data.company}</List.Header>
                          <b>{data.location ? data.location : null}</b>
                          <br />
                          <b>{data.postData ? data.postData : null}</b>
                          <br />
                          <b>{data.salary ? data.salary : null}</b>
                          <br />
                          <b>{data.titles ? data.titles : null}</b>
                          <br />
                          <b>{data.url ? data.url : null}</b>
                          <br />
                        </List.Item>
                      </List>
                    </div>
                  ))
                : null}
            </Segment>
          </div>
        </Fragment>
      </div>
    );
  }
}
