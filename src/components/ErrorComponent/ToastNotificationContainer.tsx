import { ToastContainer } from "react-bootstrap";
import ToastNotification from "./ToastNotification";
import { useNotification } from "../../contexts/NotificationContext";

function ToastNotificationContainer() {
  const { notifications, removeNotification } = useNotification();

  const notificationsArray = notifications;

  if (notificationsArray.length > 3) {
    const firstNotification = notificationsArray.shift();
    if (firstNotification && firstNotification.id) {
      removeNotification(firstNotification.id);
    }
  }

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
