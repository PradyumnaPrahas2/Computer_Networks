import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const sendVerification = (e) => {
    e.preventDefault();
    console.log('Send verification to:', { email, name });
    // Implement sending verification code to email here
  };

  const verifyCode = () => {
    console.log('Verifying code:', verificationCode);
    // Implement verification logic here
    setIsVerified(true);
  };

  const register = (e) => {
    e.preventDefault();
    console.log('Registering:', { name, email, password });
    // Implement registration logic here
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%', borderRadius: '12px' }}>
        <h3 className="text-center mb-4 font-weight-bold text-primary">Sign Up</h3>

        <form onSubmit={isVerified ? register : sendVerification}>
          <div className="form-group">
            <label htmlFor="nameInput" className="font-weight-bold">Full Name</label>
            <input
              type="text"
              id="nameInput"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="emailInput" className="font-weight-bold">Email address</label>
            <input
              type="email"
              id="emailInput"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {!isVerified ? (
            <>
              <button type="submit" className="btn btn-primary btn-lg btn-block mb-3">
                Send Verification Code
              </button>

              <div className="form-group">
                <label htmlFor="verificationCodeInput" className="font-weight-bold">Verification Code</label>
                <input
                  type="text"
                  id="verificationCodeInput"
                  className="form-control form-control-lg"
                  placeholder="Enter code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="btn btn-info btn-lg btn-block"
                onClick={verifyCode}
              >
                Verify Code
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="passwordInput" className="font-weight-bold">Set Password</label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" className="btn btn-success btn-lg btn-block">
                Register
              </button>
            </>
          )}
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{' '}
          <Link to="/" className="text-primary font-weight-bold" style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
