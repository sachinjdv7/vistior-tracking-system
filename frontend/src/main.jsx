import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Login from "./components/Login.jsx";
import "./index.css";
import appStore from "./store/appStore.js";
import UserList from "./components/UserList.jsx";
import User from "./components/User.jsx";
import VisitorList from "./components/VisitorList.jsx";
import VisitorForm from "./components/VisitorForm.jsx";

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
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
