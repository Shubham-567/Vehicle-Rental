import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    backgroundColor: "#F0FDFD",
    color: "#101902",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#28D6E1",
  },
  heading: {
    color: "#FF6F00",
  },
  button: {
    backgroundColor: "#FF6F00",
    borderColor: "#FF6F00",
  },
  buttonDisabled: {
    backgroundColor: "#FFB400",
    borderColor: "#FFB400",
  },
  link: {
    color: "#28D6E1",
  },
};

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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!name || !email || !password || !confirmPassword || !phone) {
      setFormError("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters.");
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
    <div style={styles.container}>
      <div className='container mt-5 mb-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5'>
            <div className='card shadow-lg p-4' style={styles.card}>
              <h2 className='text-center mb-4' style={styles.heading}>
                Register
              </h2>
              {formError && (
                <div
                  className='alert alert-danger text-center mb-4'
                  role='alert'>
                  {formError}
                </div>
              )}
              {error && (
                <div
                  className='alert alert-danger text-center mb-4'
                  role='alert'>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label'>Name</label>
                  <input
                    type='text'
                    className='form-control'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Phone</label>
                  <input
                    type='tel'
                    className='form-control'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Password</label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Confirm Password</label>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    className='form-control'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='form-check mb-3'>
                  <input
                    type='checkbox'
                    className='form-check-input'
                    id='show-password'
                    checked={isPasswordVisible}
                    onChange={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                  <label className='form-check-label' htmlFor='show-password'>
                    Show Password
                  </label>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary w-100'
                  style={loading ? styles.buttonDisabled : styles.button}
                  disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
                <p className='mt-3 text-center'>
                  Already have an account?{" "}
                  <a href='/login' style={styles.link}>
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
