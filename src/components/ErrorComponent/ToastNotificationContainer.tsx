import { ToastContainer } from "react-bootstrap";
import ToastNotification from "./ToastNotification";
import { useNotification } from "../../contexts/NotificationContext";

function ToastNotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  return (
    <ToastContainer
      position="top-end"
      containerPosition="fixed"
      className="p-3"
    >
      {notifications.map((notification) => (
        <ToastNotification
          key={notification.id}
          errorText={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </ToastContainer>
  );
}

export default ToastNotificationContainer;
