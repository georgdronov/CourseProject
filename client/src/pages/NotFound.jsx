import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = (props) => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Page not found</h1>
      <button onClick={handleGoHome}>Go in the main page</button>
    </div>
  );
};
