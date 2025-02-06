import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // handle form submission visible
  const handleSubmit = async (e) => {
    e.preventDefault(); // to prevent default behavior (page reload)
    await login(email, password);
  };

  // redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'>
          <div className='card shadow-lg p-4'>
            <h2 className='text-center text-primary mb-4'>Login</h2>

            {error ? (
              <div className='alert alert-danger text-center mb-4' role='alert'>
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit}>
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
                <label className='form-label'>Password</label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className='form-control'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className='form-check mt-2'>
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
              </div>

              <button
                type='submit'
                className='btn btn-primary w-100'
                disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className='mt-3 text-center'>
                Don't have an account? <a href='/register'>Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
