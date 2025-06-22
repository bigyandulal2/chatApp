import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import SignUpForm from "./components/Hero/auth/SignUp/SignUpForm/signUpForm.jsx";
import "./App.css";
import App from "./App.jsx";
import ChatAppLayout from "./components/rooms/main/ChatAppLayout.jsx";
import { store } from "./redux/Store.js";
import { Provider } from "react-redux";
import SignInForm from "./components/Hero/auth/SignInForm.jsx";
import ProtectedRoute from "./route/ProtectedRoute.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route
            path="/room"
            element={
              <ProtectedRoute>
                <ChatAppLayout />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
