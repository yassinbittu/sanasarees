import React, { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "warning"
      ? "bg-yellow-500"
      : "bg-green-600";

  return (
    <div className={`fixed top-5 right-5 z-50 ${bgColor} text-white px-5 py-3 rounded-lg shadow-lg animate-slideIn`}>
      {message}
    </div>
  );
}

export default Toast;