import React, { useState, useContext, useEffect } from "react";
import { TokenContext } from "./TokenContext";

export default function Login(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setToken } = useContext(TokenContext);

  useEffect(() => {
    if (props.location.state && props.location.state.email) {
      setEmail(props.location.state.email);
      setPassword(props.location.state.password);
    }
  },[props.location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://yummydb-api.herokuapp.com/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.status === 200) {
          let token = res.headers.get("auth");
          setToken(token);
        }
        return res.json();
      })
      .then((data) => {
        if (data.err) {
          setErrMsg(data.err);
        } else {
          props.history.push("/");
        }
      });
  };


  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      >
        <div style={{ height: "60px", color: "#F94F72" }}> {errMsg} </div>
        <form onSubmit={handleSubmit}>
          <div>Email</div>
          <input
            className="userInfo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ marginTop: "30px" }}>password</div>
          <input
            className="userInfo"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button className="bbtn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
