import React, { useState, useLayoutEffect } from "react";
import { Link, navigate } from "gatsby";
import userbase from "userbase-js";

const Signup = ({ user, setUser }) => {
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("idle");

  useLayoutEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  const handleTimeShipSignUp = async (event) => {
    event.preventDefault();

    const username = event.target.elements.usernameInput.value;
    const email = event.target.elements.emailInput.value;
    const password = event.target.elements.pasSwordInput.value;

    try {
      console.log("Sign up");
      setError(false);
      setStatus("pending");

      const user = await userbase.signUp({ username, email, password });

      console.log("Sign up succeeded", user.username);
      setUser(user);
      setStatus("idle");
      goToYear(user);
    } catch (error) {
      console.log("Sign up failed", error);
      setError(error);
      setStatus("idle");
    }
  };
  function goToYear(user) {
    const successUrl = "https://github.com/lillylabs/2026/issues/2";
    const cancelUrl = "http://localhost:8000/";
    if (!user.subscriptionStatus) {
      userbase.purchaseSubscription({ successUrl, cancelUrl });
      return;
    }
  }

  return (
    <>
      <h3>Go to 2026 on:</h3>
      <h1>Ruby's TimeShip ⛵</h1>
      <form onSubmit={handleTimeShipSignUp}>
        <label>
          Username: <br />
          <input type="text" id="usernameInput" name="username" required />
        </label>

        <br />
        <br />

        <label>
          Email: <br />
          <input type="email" id="emailInput" name="email" />
        </label>

        <br />
        <br />

        <label>
          Password: <br />
          <input type="password" id="pasSwordInput" name="password" required />
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

        <button type="submit" disabled={status === "pending"}>
          Sign Up
        </button>
        <small>
          {" "}
          or <Link to="/app/login">log in</Link>
        </small>
      </form>
    </>
  );
};

export default Signup;
