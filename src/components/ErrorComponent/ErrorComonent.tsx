import { useState, useEffect } from "react";
import { Toast, ProgressBar } from "react-bootstrap";
import "./ErrorComponent.scss";

interface ErrorComponentProps {
  errorText: string;
}

function ErrorComponent({ errorText }: ErrorComponentProps) {
  const [show, setShow] = useState(true);
  const delayTime = 10000;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (delayTime / 100);
        return newProgress < 97 ? newProgress : 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [delayTime]);

  return (
    <Toast
      bg="danger"
      onClose={() => setShow(false)}
      show={show}
      delay={delayTime}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{errorText}</Toast.Body>
      <ProgressBar
        className="error__progress-bar"
        animated
        variant="danger"
        now={progress}
      />
    </Toast>
  );
}

export default ErrorComponent;
