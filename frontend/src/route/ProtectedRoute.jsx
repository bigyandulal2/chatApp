import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ProtectedRoute({ children }) {
  const login = useSelector((state) => state.login.login);
  // console.log("from protectedRoutes", login);

  const navigate = useNavigate();
  useEffect(() => {
    if (!login) {
      navigate("/");
      return;
    }
  }, [login]);

  return children;
}
