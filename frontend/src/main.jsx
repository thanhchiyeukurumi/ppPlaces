import ReactDOM from "react-dom/client";
import { BrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
//only update place and post review left T-T