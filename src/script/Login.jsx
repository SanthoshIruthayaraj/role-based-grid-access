import React, { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DEMO_ACCOUNTS } from "../data/grid-config";

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event?.preventDefault?.();
    const trimmedUser = credentials.userId.trim();
    const trimmedPass = credentials.password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError("Please enter both the User ID and Password.");
      return;
    }

    // Match against the predefined in-memory demo accounts.
    const matchedAccount = DEMO_ACCOUNTS.find(
      (account) =>
        account.userId === trimmedUser && account.password === trimmedPass
    );

    if (!matchedAccount) {
      setError("Invalid credentials. Please use one of the demo accounts.");
      return;
    }

    setError("");
    onLogin({ role: matchedAccount.role, userId: matchedAccount.userId });
  };

  return (
    <div className="login-screen bg-light">
      <div className="card shadow-sm login-card">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Sign in</h2>

          <form className="d-grid gap-3" onSubmit={handleSubmit}>
            <div className="form-field-inline">
              <label htmlFor="userId" className="form-label form-label-inline">
                User ID
              </label>
              <TextBoxComponent
                id="userId"
                placeholder="Enter your demo user ID"
                value={credentials.userId}
                change={(args) =>
                  setCredentials((current) => ({
                    ...current,
                    userId: args.value,
                  }))
                }
              />
            </div>

            <div className="form-field-inline">
              <label htmlFor="password" className="form-label form-label-inline">
                Password
              </label>
              <TextBoxComponent
                id="password"
                type="password"
                placeholder="Enter the password"
                value={credentials.password}
                change={(args) =>
                  setCredentials((current) => ({
                    ...current,
                    password: args.value,
                  }))
                }
              />
            </div>

            {error && (
              <div className="alert alert-danger py-2 small mb-0">{error}</div>
            )}

            <div className="d-grid">
              <ButtonComponent isPrimary={true} onClick={handleSubmit}>
                Login
              </ButtonComponent>
            </div>
          </form>

          <p className="text-muted small mt-3 mb-0 text-center">
            This sample does not perform backend authentication.
          </p>
        </div>
      </div>
    </div>
  );
}