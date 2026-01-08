import React, { useState, useEffect, useRef } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { DEMO_ACCOUNTS } from "../common/grid-config";
import '../styles/Login.css';

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [error, setError] = useState("");
  const userInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    const attachIcon = (textboxRef, iconCss) => {
      const instance = textboxRef.current;
      if (!instance) return;

      const input = instance.element?.parentElement;

      if (!input.parentElement.querySelector('.e-icons')) {
        instance.addIcon("prepend", iconCss);
      }
    };

    attachIcon(userInputRef, "e-icons e-user");
    attachIcon(passwordInputRef, "e-icons e-lock");
  }, []);

  const handleSubmit = (event) => {
    event?.preventDefault?.();
    const trimmedUser = credentials.userId.trim();
    const trimmedPass = credentials.password.trim();

    if (!trimmedUser || !trimmedPass) {
      setError("Please enter both the User ID and Password.");
      return;
    }

    const matchedAccount = DEMO_ACCOUNTS.find(
      (account) =>
        account.userId === trimmedUser && account.password === trimmedPass
    );

    if (!matchedAccount) {
      setError("Invalid credentials. Please check your user id and password.");
      return;
    }

    setError("");
    onLogin({ role: matchedAccount.role, userId: matchedAccount.userId });
  };

  return (
    <div className="login-screen">
      <div className="card shadow-sm login-card">
        <div className="card-body p-4">
          <h2 className="card-title text-center mb-4">Sign in</h2>

          <form className="d-grid gap-3" onSubmit={handleSubmit}>
            <div className="form-field-inline">
              <label htmlFor="userId" className="form-label form-label-inline">
                User ID: <span className="field-accent" />
              </label>
              <TextBoxComponent
                id="userId"
                placeholder="Enter your user id"
                value={credentials.userId}
                ref={userInputRef}
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
                Password: <span className="field-accent" />
              </label>
              <TextBoxComponent
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                ref={passwordInputRef}
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

            <div className="login-actions">
              <ButtonComponent
                type="submit"
                isPrimary={true}
                cssClass="login-submit-btn"
                onClick={handleSubmit}
              >
                Login
              </ButtonComponent>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}