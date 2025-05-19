import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import SignUpForm from "./components/Hero/auth/SignUp/SignUpForm/signUpForm.jsx";
import "./App.css";
import App from "./App.jsx";
import ChatAppLayout from "./components/rooms/main/ChatAppLayout.jsx";
import { store } from "./redux/Store.js";
import { Provider } from "react-redux";
import CreateRoomModal from "./components/rooms/main/modals/CreateRoomModal.jsx";
import JoinRoomModal from "./components/rooms/main/modals/JoinRoomModal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/room" element={<ChatAppLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
