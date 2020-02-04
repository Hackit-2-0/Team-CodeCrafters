import React, { Component } from "react";
// firebase
import firebase from "firebase";
import { config } from "../Components/configs/config";
import axios from "axios";
import DataSkills from "./DataSkills";
import Navbar from "./Navbar";

import { Segment, Grid, Form, Button, Menu } from "semantic-ui-react";
import {
  Divider,
  TextArea,
  Label,
  List,
  Input,
  Container,
  Radio
} from "semantic-ui-react";
import FileUpload from "./FileUpload";

if (!firebase.app) {
  firebase.initializeApp(config);
}

export default class Home extends Component {
  constructor() {
    super();
    this.state = { skillArr: [], userLiked: [] };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    if (Object.keys(this.state).length === 2) {
      alert("please out the mandatory details or upload your resume");
    } else {
      let consets = { begineer: true, Intermiddent: false, Advance: false };
      this.setState(consets);
      console.log(this.state);
      firebase
        .firestore()
        .doc(`/allUsers/${this.state.firstname + this.state.lastname}`)
        .set(this.state)
        .then(msg => {
          console.log("the file is successfullt added");
        })
        .catch(err => {
          console.log(err);
        });

      // post the data to the server
      axios
        .post("/UserData", { data: this.state })
        .then(jsonData => {
          console.log("the data is successfully added");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  addLike(data) {}
  componentDidMount() {}
  change = e => {
    if (
      e.target.name === "begineer" ||
      e.target.name === "Intermident" ||
      e.target.name === "Advance"
    ) {
      console.log(123);

      this.setState({
        [e.target.name]: !e.target.name
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // added - Hritik
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  //

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Navbar />

        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column>
            <form onSubmit={this.submit}>
              <Segment inverted>
                <Form inverted>
                  <Form.Group widths="equal">
                    <Form.Input
                      fluid
                      onChange={this.change}
                      label="First name : "
                      placeholder="First name ..."
                      name="firstname"
                    />
                    <Form.Input
                      fluid
                      onChange={this.change}
                      label="Last name : "
                      name="lastname"
                      placeholder="Last name ..."
                    />
                    <Divider horizontal />
                    <Form.Input
                      fluid
                      onChange={this.change}
                      label="Email address : "
                      name="email"
                      placeholder="Email-id ..."
                    />
                    <Form.Input
                      fluid
                      onChange={this.change}
                      type="phone number : "
                      label="Phone number"
                      name="Phone"
                      placeholder="Contact Number ..."
                    />
                    {/* <Form.Input
                      fluid
                      disabled
                      value={this.state.location}
                      type="location"
                      label="location"
                      name="location"
                      placeholder="location ..."
                    /> */}
                  </Form.Group>

                  <Form>
                    <Form.Field>
                      <Divider horizontal inverted>
                        BIO{" "}
                      </Divider>
                      <textarea
                        placeholder="Enter your bio ..."
                        name="info_detail"
                        onChange={this.change}
                      />
                    </Form.Field>
                  </Form>
                  <Form>
                    <Form.Field>
                      <Divider horizontal inverted>
                        Work Experience{" "}
                      </Divider>

                      <input
                        placeholder="work experience ..."
                        name="work"
                        onChange={this.change}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Divider horizontal inverted>
                        Education{" "}
                      </Divider>

                      <input
                        placeholder="Last Name ..."
                        name="education"
                        onChange={this.change}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Divider horizontal inverted>
                        Certificates
                      </Divider>

                      <textarea
                        placeholder="certificates ..."
                        name="certificates"
                        onChange={this.change}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Divider horizontal inverted>
                        Experience
                      </Divider>
                      <textarea
                        placeholder="experience ..."
                        name="experience"
                        onChange={this.change}
                      />
                    </Form.Field>
                  </Form>

                  {/*  */}
                  <Form>
                    <Form.Field>
                      {this.state.begineer === true ? <b>begineer</b> : null}
                      {this.state.Intermiddent === true ? (
                        <b>Intermiddent</b>
                      ) : null}
                      {this.state.Advance === true ? <b>Advance</b> : null}
                    </Form.Field>
                    <Divider horizontal inverted>
                      Technical Skills
                    </Divider>
                    <Form.Field>
                      {/* gonna change after like internshala */}
                      <Form.Input
                        placeholder="skills used"
                        name="skills"
                        onChange={e => {
                          const val = e.target.value;
                          axios
                            .get(
                              `https://api.codetabs.com/v1/proxy?quest=https://internshala.com/autocomplete/skill/${e.target.value}`
                            )
                            .then(data => {
                              const datas = data.data.result;
                              const arr = datas;
                              if (arr.includes(val)) {
                                arr.push(val);
                              }
                              this.setState({
                                skillArr: arr,
                                userRenowed: val
                              });
                            })
                            .catch(err => {
                              {
                                console.log(err);
                              }
                            });
                        }}
                      />
                      <Button
                        onClick={e => {
                          e.preventDefault();
                          this.state.userLiked.push(this.state.userRenowed);
                          this.setState({
                            userRenowed: ""
                          });
                          alert(`You added like ${this.state.userRenowed}`);
                        }}
                        color="linkedin"
                      >
                        Add Skill
                      </Button>
                    </Form.Field>

                    {this.state.skillArr.length === 0 ? null : (
                      <DataSkills
                        data={this.state.skillArr}
                        liker={this.addLike}
                      />
                    )}
                    {/* scanner uto this reference to the up scale */}
                  </Form>
                  <Form>
                    <Divider horizontal inverted>
                      Linkedin
                    </Divider>
                    {/* <label>Linkedin Profile</label> */}
                    <Input
                      style={{ paddingLeft: "70px" }}
                      label="Linkedin http://"
                      placeholder="mysite.com"
                      name="Linkedin_link"
                      onChange={this.change}
                    />

                    <Divider horizontal inverted>
                      Github
                    </Divider>
                    <Input
                      style={{ paddingLeft: "70px" }}
                      label="Github:http://"
                      placeholder="mysite.com"
                      name="github_link"
                      onChange={this.change}
                    />

                    <Divider horizontal inverted>
                      Portfoilo
                    </Divider>
                    <Input
                      style={{ paddingLeft: "70px" }}
                      label="Portfoilo:http://"
                      onChange={this.change}
                      placeholder="mysite.com"
                      name="port_link"
                    />
                    <br />
                    <Divider horizontal inverted>
                      Certification Of Yours
                    </Divider>
                    <TextArea
                      label="The project of Yours..."
                      onChange={this.change}
                      placeholder="SuperCool project of yours.."
                      name="projets"
                    />

                    <Divider horizontal inverted>
                      Programming Language
                    </Divider>
                    <TextArea
                      label="The Languages you know.."
                      onChange={this.change}
                      placeholder="eeg JS Python..."
                      name="Programming_languages"
                    />
                    <Divider horizontal inverted>
                      Non Technical Skills
                    </Divider>
                    <TextArea
                      label="The cool other stuff you do"
                      onChange={this.change}
                      placeholder="eeg JS Python..."
                      name="other_skills"
                    />
                  </Form>

                  <Form.Radio
                    style={{ paddingTop: "10px" }}
                    name="acceptance"
                    label="I agree to the Terms and Conditions"
                    onClick={() => {
                      {
                        alert("thanks for tuning in");
                      }
                    }}
                  />
                  <button className="ui primary button" type="submit">
                    Submit
                  </button>
                </Form>
              </Segment>
            </form>
          </Grid.Column>

          <Grid.Column verticalAlign="top">
            <FileUpload />
          </Grid.Column>
        </Grid>

        <Divider vertical>Or</Divider>
      </div>
    );
  }
}
