import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId="133997806589-sm312p3gvq4tg5oap03v6hnnbarhd790.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </AuthContextProvider>
);
