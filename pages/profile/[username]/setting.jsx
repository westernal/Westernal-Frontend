import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../../requests/API";

const Setting = () => {
  const [loader, SetLoader] = useState(false);
  const [image, SetImage] = useState("/Images/userIcon.png");

  function checkInputs() {
    SetLoader(true);
    const password = document.getElementById("password");
    const rpassword = document.getElementById("rpassword");
    const username = document.getElementById("username");

    if (password.value.length < 6 && password.value !== 0) {
      toast.error("Password must be more than 6 characters!");
      SetLoader(false);
    }

    if (password.value !== rpassword.value) {
      toast.error("Password must be equal to repeat password!");
      SetLoader(false);
    } else editUser(username.value, password.value);
  }

  useEffect(() => {
    async function getUserInfo(params) {}
  }, []);

  async function editUser(params) {}
  return (
    <div className="setting flex">
      <Header />

      <div className="auth-form">
        {loader && (
          <div className="flex">
            <div className="logo-loader flex">
              <p id="loader">w</p>
            </div>
          </div>
        )}
        <div className="form-inputs">
          <div className="flex">
            <img src={image} alt="user image" id="edit-img" />
            <input type="file" id="image" name="image" accept="image/*" />
          </div>
          <input type="text" placeholder="Username" id="username" />
          <input type="text" placeholder="Bio" id="bio" />
          <input type="text" placeholder="Password" id="password" />
          <input type="text" placeholder="Repeat Password" id="rpassword" />
        </div>

        <div className="flex">
          <button className="btn" onClick={checkInputs}>
            Edit
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Setting;
