import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, isAuthenticated, loading, error } = useContext(AuthContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formError, setFormError] = useState(null);

  // redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    // basic validation
    if (!name || !email || !password || !confirmPassword || !phone) {
      setFormError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setFormError("Password mus be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      await register(name, email, password, phone);
    } catch (err) {
      setFormError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className='registerContainer'>
      <div>
        <h2>Register</h2>

        {formError && <p style={{ color: "red" }}>{formError}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type='checkbox'
              id='show-password'
              checked={isPasswordVisible}
              onChange={() => setIsPasswordVisible(!isPasswordVisible)}
            />
            <label htmlFor='show-password'>Show Password</label>
          </div>

          <div>
            <label>Phone</label>
            <input
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type='submit' disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p>
            Already have an account? <a href='/login'>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
