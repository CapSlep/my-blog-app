import { useState, useEffect } from "react";
import { Toast, ProgressBar } from "react-bootstrap";
import "./ErrorComponent.scss";
import { ToastType } from "../../contexts";

interface ToastComponentProps {
  errorText: string;
  type: ToastType;
  onClose: () => void;
}

function ToastNotification({ errorText, type, onClose }: ToastComponentProps) {
  const [show, setShow] = useState(true);
  const delayTime = 10000;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (delayTime / 100);
        return newProgress < 95 ? newProgress : 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [delayTime]);

  return (
    <Toast
      bg={type}
      onClose={() => {
        setShow(false);
        onClose();
      }}
      show={show}
      delay={delayTime}
      autohide
      animation={true}
    >
      <Toast.Header>
        <strong className="me-auto">
          {type === "danger"
            ? "Error"
            : type.replace(/^./, type[0].toUpperCase())}
        </strong>
      </Toast.Header>
      <Toast.Body className="text-white">{errorText}</Toast.Body>
      <ProgressBar
        className="error__progress-bar"
        animated
        variant={type}
        now={progress}
      />
    </Toast>
  );
}

export default ToastNotification;
