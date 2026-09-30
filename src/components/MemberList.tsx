import React from 'react';
import { User } from '../types';

interface MemberListProps {
  members: User[];
  isOpen: boolean;
  onToggle: () => void;
}

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const statusLabels: Record<string, string> = {
  online: 'Online',
  offline: 'Offline',
  away: 'Away',
  busy: 'Sibuk',
};

const MemberList: React.FC<MemberListProps> = ({ members, isOpen, onToggle }) => {
  const onlineMembers = members.filter((m) => m.status === 'online');
  const offlineMembers = members.filter((m) => m.status !== 'online');

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-4 right-4 z-30 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        👥
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 right-0 z-50 w-64 bg-white border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Anggota Tim</h3>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 hover:bg-slate-100 rounded"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {onlineMembers.length} online dari {members.length} anggota
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {/* Online Members */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
              Online — {onlineMembers.length}
            </h4>
            <ul className="space-y-1">
              {onlineMembers.map((member) => (
                <li key={member.id}>
                  <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="relative">
                      <span className="text-xl">{member.avatar}</span>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${statusColors[member.status]} rounded-full border-2 border-white`}
                      ></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{member.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Offline Members */}
          {offlineMembers.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Offline — {offlineMembers.length}
              </h4>
              <ul className="space-y-1">
                {offlineMembers.map((member) => (
                  <li key={member.id}>
                    <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors opacity-60">
                      <div className="relative">
                        <span className="text-xl">{member.avatar}</span>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 ${statusColors[member.status]} rounded-full border-2 border-white`}
                        ></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {statusLabels[member.status]}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default MemberList;
