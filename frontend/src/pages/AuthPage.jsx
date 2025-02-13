import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
    const [form, setForm] = useState({ email: "", password: "", username: "" });
    const [isLogin, setIsLogin] = useState(true);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = isLogin ? "/auth/login" : "/auth/register";
      try {
        const { data } = await axios.post(`http://localhost:5000${url}`, form);
        if (isLogin) {
          login({ token: data.token });
          navigate("/dashboard");
        } else {
          alert("Registration successful, please log in!");
          setIsLogin(true);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Server error.");
      }
    };
  
    return (
      <div>
        {!localStorage.getItem("token") && <div>
        <h2>{isLogin ? "Log in" : "Sign up"}</h2> {/* fix soon */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="username"
              onChange={handleChange}
            />
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <button type="submit">{isLogin ? "Log in" : "Sign up"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up." : "Already have an account? Log in."}
        </button>
        </div>}
        {localStorage.getItem("token") && <p>You are already logged in.</p>}
      </div>
    );
  };
  
  export default AuthPage;