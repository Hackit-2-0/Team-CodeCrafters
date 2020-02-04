import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <Menu stackable>
          <Menu.Item>
            <img src="https://react.semantic-ui.com/logo.png" />
          </Menu.Item>

          <Menu.Item name="Add Resumes">
            <Link to="/Home">Add Resumes</Link>
          </Menu.Item>

          <Menu.Item name="Scrapp Resumes">
            <Link to="/IndeedReq">Scrapp Resumes (Indeed)</Link>
          </Menu.Item>

          <Menu.Item name="Scraped Custom Data">
            <Link to="/val">Scrapp Resumes (Frappy)</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="" />
          </Menu.Menu>
        </Menu>
        ;
      </div>
    );
  }
}
