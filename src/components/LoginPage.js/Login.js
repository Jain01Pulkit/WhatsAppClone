import React, { useState } from "react";
import "./Login.css";
import { Avatar, IconButton } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserName } from "../../Redux/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name != "" && email != "") {
      const result = axios
        .post("http://localhost:9001/createUser", {
          name: name,
          email: email,
        })
        .then((response) => {
          console.log("adasdadadadasada", response);
          if (response?.status == 200) {
            dispatch(setUserName(response?.data?.name));
            dispatch(setUserEmail(response?.data?.email));
            navigate("/chat");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    const allowedFormats = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/tiff",
      "image/svg+xml",
      "image/webp",
    ]; // Allowed image formats

    // Profile image type and size validations
    // if (!allowedFormats.includes(file.type)) {
    //   //   setError(
    //   //     "Invalid image format. Please select a JPEG, PNG, or GIF image."
    //   //   );
    //   return;
    // }
    const image = new Image();
    console.log("imageimage", image);
    image.onload = async () => {
      alert("12");
      // Set the image path and URL
      const imageUrl = URL.createObjectURL(file);
      console.log("imageUrl", imageUrl);
      setPicture(imageUrl);
    };
  };
  return (
    <div className="Login">
      <div className="image__icon">
        <input
          accept="image/*"
          id="upload-avatar-pic"
          type="file"
          hidden
          onChange={(e) => handleFileSelect(e)}
        />
        <img src={picture} alt="Selected file" className="profile_img" />

        <label htmlFor="upload-avatar-pic">
          <IconButton component="span">
            <Avatar />
          </IconButton>
        </label>
      </div>
      <div className="input__name">
        <input
          type="text"
          placeholder="Type Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input__email">
        <input
          type="text"
          placeholder="Type Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="button__submit">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
