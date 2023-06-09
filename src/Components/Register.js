import { useState } from "react";
import control from "../API/control";
import isEmail from "validator/lib/isEmail";
import { Navigate, useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    role: 2,
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const [validate, setValidate] = useState({});

  const handleSubmit = async () => {
    console.log(user);

    const checkEmail = async () => {
      try {
        const response = await control.post("check/user", user);
        if (response.data) {
          return true;
        }
        return false;
      } catch (err) {
        console.error(err);
      }
    };

    const register = async () => {
      try {
        const response = await control.post("create/user", user);
        alert("Register Success");
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    };

    const msg = {};
    if (user.name === "") {
      msg.name = "Please type your Name";
    }
    if (user.email === "") {
      msg.email = "Please type your Email";
    } else if (!isEmail(user.email)) {
      msg.email = "Email is Invalid";
    } else if (await checkEmail()) {
      msg.email = "Email is Existed!!!";
    }

    if (user.password === "") {
      msg.password = "Please type your Password";
    }

    setValidate(msg);

    if (Object.keys(msg).length > 0) return;

    register();
  };

  return (
    <>
      {JSON.parse(localStorage.getItem("info")).login ? (
        <Navigate to={"/"} />
      ) : (
        <div>
          Name:{" "}
          <input
          className="border border-gray-300 rounded-md p-2"
            type="text"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <br />
          <p style={{ color: "red" }}>{validate.name}</p>
          Email:
          <input
          className="border border-gray-300 rounded-md p-2 my-3"
            type="Text"
            value={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <br />
          <p style={{ color: "red" }}>{validate.email}</p>
          Password:{" "}
          <input
          className="border border-gray-300 rounded-md p-2 my-3"
            type="Password"
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <br />
          <p style={{ color: "red" }}>{validate.password}</p>
          <br />
          <input
          className="border border-gray-300 rounded-md p-2 my-3"
            onClick={() => {
              handleSubmit();
            }}
            type="submit"
            value={"Register"}
          />
        </div>
      )}
    </>
  );
}
