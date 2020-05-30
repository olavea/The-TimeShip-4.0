import React from "react";
import { Link } from "gatsby";

const IndexPage = () => (
  <>
    <h1>The TimeShip</h1>
    <p>Take a trip in time</p>
    <p>
      Its an example to show how to use{" "}
      <a href="https://userbase.com/">Userbase</a> with{" "}
      <a href="https://www.gatsbyjs.org/">Gatsby JS</a>.
    </p>
    <p>
      Created by <a href="https://twitter.com/raae">@raae</a> for Gatsby Virtual
      Days 2020. Mod. by @olaholstvea
    </p>
    <hr />
    <p>
      <Link to="/app/login">Log In</Link> /{" "}
      <Link to="/app/signup">Sign Up</Link>
    </p>
  </>
);

export default IndexPage;
