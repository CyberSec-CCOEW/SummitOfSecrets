import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setShowToast(true);
        setTimeout(() => navigate("/login"), 1500);
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
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="text-secondary">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label className="text-secondary">Email</label>
          </div>

          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Password"
              value={formData.password}
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
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#25D366" }}>
            Login
          </Link>
        </p>
      </div>

      {showToast && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-success text-white">
            <div className="toast-body">
              Signup Successful! Please Login.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}