import React from "react";
import { List, Button } from "semantic-ui-react";

export default function DataSkills(props) {
  const { data } = props;
  return (
    <div>
      <List>
        {data.map(skill => (
          <div>
            <Button onClick={props.liker(skill)} positive>
              {skill}
            </Button>
          </div>
        ))}
      </List>
    </div>
  );
}
