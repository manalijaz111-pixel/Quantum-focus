import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'AI Insight Updated',
      desc: 'New error pattern detected in Schrödinger Equation derivation.',
      time: '10 mins ago',
      icon: 'smart_toy',
      color: 'text-violet-400'
    },
    {
      id: 'n2',
      title: 'Daily Streak Maintained!',
      desc: 'You are on a 4-day quantum learning streak.',
      time: '2 hours ago',
      icon: 'local_fire_department',
      color: 'text-fuchsia-400'
    },
    {
      id: 'n3',
      title: 'New Note Draft Saved',
      desc: "Shor's Algorithm Notes auto-saved to archive.",
      time: 'Yesterday',
      icon: 'description',
      color: 'text-violet-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-md w-full p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-[#222222] pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-2xl">
              notifications
            </span>
            <h2 className="font-mono text-base font-bold text-[#F5F5F5]">
              Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-[#050505] p-3.5 rounded-2xl border border-[#222222] flex gap-3 items-start hover:border-violet-500/40 transition-colors"
            >
              <span className={`material-symbols-outlined ${item.color} text-xl shrink-0 mt-0.5`}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs font-mono text-[#F5F5F5]">{item.title}</h4>
                  <span className="text-[10px] font-mono text-[#888888]">{item.time}</span>
                </div>
                <p className="text-xs text-[#888888] mt-0.5 leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="quantum-glow font-mono text-white font-bold px-4 py-2 rounded-2xl text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

