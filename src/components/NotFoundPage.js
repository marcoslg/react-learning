import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage(props) {
  return (
    <div>
      <h2>Page Not found</h2>
      <p>
        <Link to="/">Back to Home</Link>
        <button onClick={props.history.goBack}>Back</button>
      </p>
    </div>
  );
}

export default NotFoundPage;
