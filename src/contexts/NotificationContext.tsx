import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

export enum ToastType {
  Error = "danger",
  Warning = "warning",
  Info = "info",
  Success = "success",
}

interface Notification {
  id: string;
  type: ToastType;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: ToastType, message: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (type: ToastType, message: string) => {
    const id = uuidv4();
    setNotifications([...notifications, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
