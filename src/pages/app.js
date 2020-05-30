import React, { useLayoutEffect, useState } from "react";
import { Link } from "gatsby";
import { Router } from "@reach/router";
import userbase from "userbase-js";

import Default from "../components/TodoList";
import Login from "../components/Login";
import Signup from "../components/Signup";

const TimeShip = () => {
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("initializing");

  useLayoutEffect(() => {
    const init = async () => {
      try {
        console.log("Init Userbase");

        const session = await userbase.init({
          appId: process.env.GATSBY_USERBASE_APP_ID,
        });

        console.log("Init Userbase succeeded");

        if (session.user) {
          console.log("with user", session.user.username);
          setUser(session.user);
        }

        setStatus("idle");
      } catch (error) {
        console.log("Init Userbase failed", error);
        setError(error);
        setStatus("idle");
      }
    };

    init();
  }, []);

  const logOut = async () => {
    try {
      console.log("Log out");
      setStatus("pending");
      setError(false);

      await userbase.signOut();

      console.log("Log out succeeded");
      setUser(false);
      setStatus("idle");
    } catch (error) {
      console.log("Log out failed", error);
      setError(error);
      setStatus("idle");
    }
  };

  if (status === "initializing") {
    return (
      <>
        <h1>The TimeShip</h1>
        <p>Loading...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>TimeShip / Error</h1>
        <p>{error.message}</p>
      </>
    );
  }

  return (
    <>
      <Router basepath="/app">
        <Login path="/login" setUser={setUser} user={user} />
        <Signup path="/signup" setUser={setUser} user={user} />
        <Default path="/" user={user} />
      </Router>
      <br />

      {user && (
        <>
          <hr />
          <p>
            {user.username} - <button onClick={logOut}>Log out</button>
          </p>
        </>
      )}

      <hr />
      <p>
        <small>
          <Link to="/">Back to London Bridge</Link>
        </small>
      </p>
    </>
  );
};

export default TimeShip;
