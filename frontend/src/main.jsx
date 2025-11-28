import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import User from "./components/User.jsx";
import UserList from "./components/UserList.jsx";
import VisitorForm from "./components/VisitorForm.jsx";
import VisitorList from "./components/VisitorList.jsx";
import "./index.css";
import appStore from "./store/appStore.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<UserList />} />
            <Route path="visitor/list" element={<VisitorList />} />
            <Route path="visitor/new" element={<VisitorForm />} />
            <Route path="create/new" element={<User />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
