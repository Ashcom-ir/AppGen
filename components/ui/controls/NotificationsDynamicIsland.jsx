"use client";
import { useState } from "react";
import { X } from "lucide-react";
import "./Notifications.scss";


export default function NotificationsDynamicIsland({
  triggerText = "Add notification +",
  title = "Notification",
  description = "This is a Dynamic Island style notification",
  duration = 3500,
}) {
  const [items, setItems] = useState([]);

  const addIosNotification = () => {
    const id = Date.now();
    setItems(prev => [{ id, title, description, exiting: false }, ...prev]);
    setTimeout(() => startExitAnimation(id), duration);
  };

  const startExitAnimation = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, exiting: true } : item
      )
    );
    setTimeout(() => removeIosNotification(id), 500);
  };

  const removeIosNotification = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={addIosNotification}
        className="px-5 py-3 rounded-full bg-[#0e1616] text-white font-semibold text-lg shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md"
      >
        {triggerText}
      </button>

      {/* Notification Container */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex flex-col-reverse gap-4 z-50 pointer-events-none">
        {items.map(item => (
          <div
            key={item.id}
            className={`w-80 p-4 rounded-full text-white border border-white/10 shadow-2xl pointer-events-auto relative ${
              item.exiting ? "exit" : "enter"
            }`}
            style={{ backgroundColor: "#0e161631", backdropFilter: "blur(14px)" }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold tracking-tight">{item.title}</span>
              <button
                onClick={() => removeIosNotification(item.id)}
                className="mt-1 p-1 rounded-full bg-white/10 border border-white/20 text-white transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <X size={16} />
              </button>
            </div>
            <div className="text-base opacity-95 leading-relaxed">{item.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
