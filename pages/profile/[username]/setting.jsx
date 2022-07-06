import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Footer";

const Setting = () => {
  return (
    <div className="setting">
      <Header />

      <div className="form-inputs">
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

      <Footer />
    </div>
  );
};

export default Setting;
