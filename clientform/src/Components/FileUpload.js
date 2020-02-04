import React, { useState } from "react";
import { firebaseStorage } from "./configs/config";
import "semantic-ui-css/semantic.min.css";
import { Progress, Loader, Dimmer, Segment, Button } from "semantic-ui-react";
import axios from "axios";

export default function Image(props) {
  const [user, setUser] = useState({
    image: { name: "", size: "", type: "" },
    url: "",
    progress: 0
  });
  const [imageData, setImageData] = useState([]);
  const [classifier, setClassifier] = useState({});
  React.useEffect(() => {
    axios
      .get("http://localhost:8000/")
      .then(data => {
        console.log(data);
        setClassifier(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
  const loader = (
    <Segment size="huge">
      <Dimmer active>
        <Loader size="large" />
      </Dimmer>
    </Segment>
  );
  const reader = new FileReader();

  const changer = e => {
    if (e.target.files[0]) {
      const { name, size, type } = e.target.files[0];
      setUser({
        ...user,
        ...{
          image: { ...e.target.files[0], ...{ name, size, type } },
          url: null
        }
      });
      const data = e.target.files[0];

      setImageData(e.target.files[0]);
    } else {
      alert("no file is present");
    }
  };
  const handleUpload = e => {
    e.preventDefault();
    // post backend to axio
    console.log("done thanks for uploading your details");

    //
    const upload = firebaseStorage
      .ref(`files/${user.image.name}`)
      .put(imageData);
    // progress,error,complete
    upload.on(
      "state_changed",
      snapshot => {
        const progress =
          Math.floor(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUser({ ...user, ...{ progress } });
      },
      error => {
        console.log(error);
      },
      () => {
        firebaseStorage
          .ref("files")
          .child(user.image.name)
          .getDownloadURL()
          .then(urls => {
            setUser({ ...user, ...{ url: urls } });
            console.log(
              "Your resume is successfully uploaded download it for initial traing"
            );
            // window.location.href = urls;
            window.alert("your resume is uploaded add some job profiles");
            // props.history.push("/IndeedReq");
            window.location.href = "/IndeedReq";
            axios
              .post("http://localhost:5000/Image", {
                data: user.image.name,
                link: urls,
                type: user.image.type,
                data: user.image.size
              })
              .then(res => {
                console.log("done thanks for uploading your details");
                // window.location.href = urls;
              })
              .catch(err => {
                console.log(err);
              });
          });
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleUpload}>
        <Button size="large" negative>
          <input type="file" onChange={changer} />
        </Button>
        <button>Upload</button>
      </form>
      {user.progress === 0 ? null : (
        <Progress percent={user.progress} progress color="yellow" />
      )}
      <div>
        {classifier ? <span>You belong to {classifier.category}</span> : null}
      </div>
      {user.image.type === "video/mp4" ? (
        <div>
          {user.url ? (
            <div>
              <video width="320" height="320" controls>
                <source src={user.url} type={user.image.type}></source>
                The Movie here
              </video>
            </div>
          ) : null}
        </div>
      ) : user.url ? (
        <div>
          <img className="image" src={user.url} />
        </div>
      ) : (
        <div>Pleas add your Resume</div>
      )}
    </div>
  );
}
