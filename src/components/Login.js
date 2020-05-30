import React, { useState, useLayoutEffect } from "react";
import { Link, navigate } from "gatsby";
import userbase from "userbase-js";

const Login = ({ user, setUser }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");

  useLayoutEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  const handleTimeShipLogin = async (event) => {
    event.preventDefault();

    const username = event.target.elements.usernameInput.value;
    const password = event.target.elements.pasSwordInput.value;

    try {
      console.log("Sign in");
      setError(false);
      setStatus("pending");

      const user = await userbase.signIn({ username, password });

      console.log("Sign in succeeded", user.username);
      setUser(user);
      setStatus("idle");
    } catch (error) {
      console.log("Sign in failed", error);
      setError(error);
      setStatus("error");
    }
  };

  return (
    <>
      <h1>The TimeShip Login</h1>

      <form onSubmit={handleTimeShipLogin}>
        <label>
          Username: <br />
          <input type="text" id="usernameInput" name="username" />
        </label>

        <br />
        <br />

        <label>
          Password: <br />
          <input type="password" id="pasSwordInput" name="password" />
        </label>

        <br />
        <br />

        {error && (
          <>
            <small>{error.message}</small>
            <br />
            <br />
          </>
        )}

        <button type="submit" disabled={status !== "idle"}>
          Log In
        </button>
        <small>
          {" "}
          or <Link to="/app/signup">sign up</Link>
        </small>
      </form>
    </>
  );
};

export default Login;
