import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase()]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => navigate("/chats"), 1500);
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
         style={{ height: "100vh", backgroundColor: "#121212" }}>

      <div className="card p-4 shadow-lg"
           style={{
             width: "100%",
             maxWidth: "400px",
             backgroundColor: "#1e1e1e",
             color: "white",
             borderRadius: "15px",
           }}>

        <h3 className="text-center mb-4" style={{ color: "#25D366" }}>
          Login
        </h3>

        <form onSubmit={handleLogin}>

          <div className="form-floating mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control bg-dark text-white border-secondary"
              onChange={handleChange}
              required
            />
            <label className="text-secondary">Email</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="form-control bg-dark text-white border-secondary"
              onChange={handleChange}
              required
            />
            <label className="text-secondary">Password</label>

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#25D366",
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit"
                  className="btn w-100 login-btn"
                  style={{ color: "#fcfcfc" }}>
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#25D366" }}>
            Register
          </Link>
        </p>
      </div>

      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-success text-white">
            <div className="toast-body">
              Login Successful!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}