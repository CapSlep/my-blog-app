import { useState, useContext } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "./CreateAccountPage.scss";
import { FirestoreContext } from "../../contexts";
import * as fs from "firebase/firestore";

// Page for creating of an account with firebase
function CreateAccountPage() {
  const firebaseDB = useContext(FirestoreContext);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // error that will show what went wrong during registration

  const navigate = useNavigate(); // function that uses useNavigate hook from react-router-dom to

  //function to register with firebase method and then navigate to articles page
  async function register() {
    // Checking if both passwords are the same
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const usersRef = fs.collection(firebaseDB, "users");
      const q = fs.query(usersRef, fs.where("displayName", "==", userName));
      const querySnapshot = await fs.getDocs(q);

      if (!querySnapshot.empty) {
        setError("Display name already exists!");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password).then(
        async (userCredential) => {
          await updateProfile(userCredential.user, {
            displayName: userName,
          });
          await fs
            .setDoc(fs.doc(firebaseDB, "users", userCredential.user.uid), {
              displayName: userName,
              email: email,
            })
            .catch((error) => {
              console.log(error);
              setError(error.message);
              return;
            });
        }
      );

      // Save the user to the Firestore database

      navigate("/articles"); // navigate to articles after registration
    } catch (error: any) {
      console.log(error);
      setError(error.message); // catching error if something went wrong
    }
  }

  return (
    <>
      <h1>Create Account Page</h1>
      {error && <p className="error">{error.toString()}</p>}
      <BootstrapForm
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >
        <BootstrapForm.Group className="mb-3" controlId="formUserName">
          <BootstrapForm.Label>Your Nickname</BootstrapForm.Label>
          <BootstrapForm.Control
            type="text"
            placeholder="Enter nickname"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </BootstrapForm.Group>

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

        <BootstrapForm.Group
          className="mb-3"
          controlId="formRepeatBasicPassword"
        >
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

      <div className="create__link">
        <Link to={"/login"}>Already have an account? Log In!</Link>
      </div>
    </>
  );
}

export default CreateAccountPage;
