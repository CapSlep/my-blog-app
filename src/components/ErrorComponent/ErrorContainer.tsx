import { ToastContainer } from "react-bootstrap";
import ErrorComponent from "./ErrorComonent";

function ErrorContainer() {
  return (
    <ToastContainer
      position="top-end"
      containerPosition="fixed"
      className="p-3"
    >
      <ErrorComponent errorText="error"></ErrorComponent>
      <ErrorComponent errorText="error"></ErrorComponent>
      <ErrorComponent errorText="error"></ErrorComponent>
    </ToastContainer>
  );
}

export default ErrorContainer;
