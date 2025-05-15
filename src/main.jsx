import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {Provider} from "react-redux";
import store from "./redux/store.js";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <Provider store={store}>
                <App/>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
;
