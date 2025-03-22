import React from "react";
import { Button } from "react-bootstrap";
import { ToastType, useNotification } from "../contexts";

function SomeComponent() {
  const { addNotification } = useNotification();

  const handleClick = () => {
    addNotification(ToastType.Success, "This is a success message!");
  };

  return <Button onClick={handleClick}>Show Notification</Button>;
}

export default SomeComponent;
