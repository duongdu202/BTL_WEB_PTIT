import { useState } from "react";
import control from "../API/control";
import isEmail from "validator/lib/isEmail";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()


  const [validate, setValidate] = useState({});
  const [info, setInfor] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    console.log(info);

    const msg = {};

    if (info.email === "") {
      msg.email = "Please type your Email";
    } else if (!isEmail(info.email)) {
      msg.email = "Email is Invalid";
    }
    if (info.password === "") {
      msg.password = "Please type your Password";
    }

    const checkLogin = async () => {
      try {
        const response = await control.get("/login", {
          params: {
            email: info.email,
            password: info.password,
          },
        });
        const user = response.data;
        console.log(user);
        if (user.name != null) {
            alert("login success")
          localStorage.setItem(
            "info",
            JSON.stringify({
              email: info.email.toLowerCase().trim(),
              login: true,
              role: user.role,
              name: user.name,
              id: user.id,
            })
          );
          window.location.reload(false);
          navigate("/")
        } else {
          setValidate({...validate, password: "Username or Password is Incorrect!!!"})
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    setValidate(msg);
    if (Object.keys(msg).length > 0) return;

    checkLogin();


  };

  return (
    <div>
        {
            JSON.parse(localStorage.getItem("info")).login ? <Navigate to={"/"}/> :
            <div>
          Email:{" "}
          <input
            className="border border-gray-300 rounded-md p-2 my-3"
            type="text"
            value={info.email}
            onChange={(e) => {
              setInfor({ ...info, email: e.target.value });
            }}
          />{" "}
          <br />
          <p style={{ color: "red" }}>{validate.email}</p>
          Password:{" "}
          <input
          className="border border-gray-300 rounded-md p-2 my-3"
            type="password"
            value={info.password}
            onChange={(e) => {
              setInfor({ ...info, password: e.target.value });
            }}
          />{" "}
          <br />
          <p style={{ color: "red" }}>{validate.password}</p>
          <input className="border border-gray-300 rounded-md p-2 my-3" type="submit" onClick={login} value={"Login"} /> <br/>
          <NavLink to="/register">Register</NavLink>
          
        </div>}
    </div>
  );
}
