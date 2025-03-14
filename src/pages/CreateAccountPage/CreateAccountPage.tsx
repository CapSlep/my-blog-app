import { useState } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./CreateAccountPage.scss";

function CreateAccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function register() {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <>
      <h1>Create Account Page</h1>
      {error && <p className="error">{error}</p>}
      <BootstrapForm
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <BootstrapForm.Group className="mb-3" controlId="formBasicEmail">
          <BootstrapForm.Label>Email address</BootstrapForm.Label>
          <BootstrapForm.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <BootstrapForm.Text className="text-muted">
            We'll never share your email with anyone else.
          </BootstrapForm.Text>
        </BootstrapForm.Group>

        <BootstrapForm.Group className="mb-3" controlId="formBasicPassword">
          <BootstrapForm.Label>Password</BootstrapForm.Label>
          <BootstrapForm.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </BootstrapForm.Group>

        <BootstrapForm.Group className="mb-3" controlId="formBasicPassword">
          <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
          <BootstrapForm.Control
            type="password"
            placeholder="Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </BootstrapForm.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BootstrapForm>

      <Link className="create__link" to={"/login"}>
        Already have an account? Log In!
      </Link>
    </>
  );
}

export default CreateAccountPage;
