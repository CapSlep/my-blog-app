import { useState } from "react";
import { Form as BootstrapForm, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./LogInPage.scss";
import { useNotification, ToastType } from "../../contexts";

//Page for login into the account with firebase
function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { addNotification } = useNotification(); // useNotification hook from NotificationContext

  const navigate = useNavigate();

  //function to login with firebase
  async function login() {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password); // firebase function for login in
      addNotification(ToastType.Success, "Logged in successfully!"); // show success message
      navigate("/articles"); // transfer to other page after login in
    } catch (error: any) {
      addNotification(ToastType.Error, error.message); // show error message
    }
  }

  return (
    <Container fluid="md">
      <h1>Log In Page</h1>
      <BootstrapForm
        onSubmit={(e) => {
          e.preventDefault();
          login();
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </BootstrapForm>

      <Link className="create__link" to={"/create-account"}>
        Don't have an account? Create one!
      </Link>
    </Container>
  );
}

export default LogInPage;
