import React, { Component } from "react";

import { Form, Container, Grid, Image, Transition } from "semantic-ui-react";
import Navbar from "./Navbar";

const transitions = ["jiggle", "flash", "shake"];

const options = transitions.map(name => ({
  key: name,
  text: name,
  value: name
}));

export default class WhoYouAre extends Component {
  state = {
    animation: transitions[0],
    duration: 500,
    visible: true,
    activeItem: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  toggleVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));

  render() {
    const { animation, duration, visible, activeItem } = this.state;

    return (
      <div>
        <Navbar />
        <Container>
          <Grid columns={2}>
            <Grid.Column as={Form}>
              <Form.Select
                label="Choose Type of Recrquiter you are "
                name="animation"
                onChange={this.handleChange}
                options={options}
                value={animation}
              />
              <Form.Input
                label={`Duration: ${duration}ms `}
                min={100}
                max={2000}
                name="duration"
                onChange={this.handleChange}
                step={100}
                type="range"
                value={duration}
              />
              <Form.Button content="Run" onClick={this.toggleVisibility} />
            </Grid.Column>

            <Grid.Column>
              <Transition
                animation={animation}
                duration={duration}
                visible={visible}
              >
                <Image
                  centered
                  size="large"
                  src="data:image/jpeg;base64,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"
                />
              </Transition>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
