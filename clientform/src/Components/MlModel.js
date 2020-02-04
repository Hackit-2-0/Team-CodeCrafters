import React, { Component } from "react";
// import { Train, NewJsonTrain } from "../../../server/assets/train";
import {
  Input,
  Container,
  Button,
  Header,
  List,
  Segment
} from "semantic-ui-react";
import Axios from "axios";
import Navbar from "./Navbar";

export default class MlModel extends Component {
  constructor() {
    super();
    this.state = {
      skillField: "",
      response: []
    };
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    if (this.state.skillField.length > 0) {
      Axios.post("http://localhost:5000/MlModel", {
        data: this.state.skillField
      })
        .then(data => {
          this.setState({
            response: data.data
          });
          console.log(data.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("please fill the details for classifying");
    }
  }
  render() {
    return (
      <Container>
        <Navbar />
        <br />
        <Header color="olive">
          Add Details requirements like (Skills Needed)..
        </Header>
        <form onSubmit={this.submit}>
          <Input
            fluid
            icon="search"
            placeholder="Search..."
            onChange={e => {
              console.log(e.target.value);
              this.setState({
                skillField: e.target.value
              });
            }}
          />
          <br />
          <Button fluid color="google plus">
            Submit Search
          </Button>
        </form>
        {this.state.response.length === 0 ? null : (
          <div>
            <div>
              <Container>
                {this.state.response.map(val => (
                  <Segment inverted>
                    <List>
                      <List.Item>
                        <b>{val.user}</b>
                        <div>
                          <b>{val.aboutme}</b>
                        </div>
                        <div>
                          <b>THE User Skills</b>
                          {val.skills.map(newbie => (
                            <div>
                              {/* <Header color="blue">{newbie.category}</Header> */}
                              <div>
                                Technologies
                                <div>{newbie}</div>
                              </div>
                            </div>
                          ))}
                          {val.newskills
                            ? val.newskills.map(sks => (
                                <div>
                                  <Header color="blue">{sks.category}</Header>

                                  <span>category_name :{sks.name} </span>
                                  <span>
                                    category_rationgs :{sks.category}{" "}
                                  </span>
                                </div>
                              ))
                            : null}
                        </div>
                      </List.Item>
                    </List>
                  </Segment>
                ))}
              </Container>
            </div>
          </div>
        )}
      </Container>
    );
  }
}
