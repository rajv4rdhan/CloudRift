import React, { useState } from 'react';
import { Plus, MessageSquare, Calendar, Loader2, Zap, Sparkles } from 'lucide-react';
import { useChatSessions, useCreateSession } from '../hooks/useChatAPI';

const SessionSelector = ({ selectedSession, onSessionSelect, onNewSession }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);

  const { data: sessions = [], isLoading, error } = useChatSessions();
  const createSessionMutation = useCreateSession();

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const newSession = await createSessionMutation.mutateAsync(newProjectName.trim());
      setNewProjectName('');
      setShowNewSessionForm(false);
      onSessionSelect(newSession.sessionId);
      if (onNewSession) onNewSession(newSession);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (error) {
      return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-lg flex items-center justify-center mr-3">
          <Loader2 className="h-5 w-5 animate-spin text-[#121212]" />
        </div>
        <span className="text-[#B0B0B0]">Loading sessions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="h-6 w-6 text-red-400" />
        </div>
        <p className="text-red-400 text-sm mb-3">Failed to load sessions</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm rounded-lg border border-red-500/20 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1A1A1A] to-[#121212]">
      <div className="p-6">
        {/* Premium Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-bold text-lg flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-lg flex items-center justify-center mr-3">
                <Zap className="h-4 w-4 text-[#121212]" />
              </div>
              Chat Sessions
            </h2>
            <p className="text-[#B0B0B0] text-sm mt-1">Manage your AI conversations</p>
          </div>
          <button
            onClick={() => setShowNewSessionForm(!showNewSessionForm)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-[#121212] hover:from-[#3AC070] hover:to-[#16A34A] transition-all duration-200 shadow-lg"
            title="New Session"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Enhanced New Session Form */}
        {showNewSessionForm && (
          <div className="mb-6">
            <form onSubmit={handleCreateSession} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl text-white placeholder-[#666] focus:outline-none focus:ring-2 focus:ring-[#4ADE80] focus:border-transparent transition-all duration-200"
                  disabled={createSessionMutation.isLoading}
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="h-4 w-4 text-[#4ADE80]" />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewSessionForm(false)}
                  className="flex-1 px-4 py-2.5 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#E0E0E0] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createSessionMutation.isLoading || !newProjectName.trim()}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-[#121212] rounded-lg font-medium hover:from-[#3AC070] hover:to-[#16A34A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {createSessionMutation.isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                  ) : (
                    'Create Session'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Enhanced Sessions List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4ADE80] to-[#22C55E] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-[#121212]" />
              </div>
              <h3 className="text-white font-semibold mb-2">No Sessions Yet</h3>
              <p className="text-[#B0B0B0] text-sm mb-4">Create your first chat session to get started</p>
              <button
                onClick={() => setShowNewSessionForm(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#4ADE80] to-[#22C55E] text-[#121212] rounded-lg font-medium hover:from-[#3AC070] hover:to-[#16A34A] transition-all duration-200"
              >
                Create Session
              </button>
            </div>
          ) : (
            sessions.map((session) => (
              <button
                key={session._id}
                onClick={() => onSessionSelect(session._id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                  selectedSession === session._id
                    ? 'bg-gradient-to-r from-[#4ADE80]/10 to-[#22C55E]/10 border border-[#4ADE80]/30 shadow-lg'
                    : 'hover:bg-[#2A2A2A]/50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-200 ${
                      selectedSession === session._id 
                        ? 'bg-gradient-to-br from-[#4ADE80] to-[#22C55E]' 
                        : 'bg-[#2A2A2A] group-hover:bg-[#3A3A3A]'
                    }`}>
                      <MessageSquare className={`h-5 w-5 ${
                        selectedSession === session._id ? 'text-[#121212]' : 'text-[#4ADE80]'
                      }`} />
                    </div>
                    <div>
                      <span className="text-[#E0E0E0] font-medium text-sm block">
                        {session.projectName}
                      </span>
                      <div className="flex items-center text-xs text-[#B0B0B0] mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(session.createdAt || session.updatedAt)}
                      </div>
                    </div>
                  </div>
                  {selectedSession === session._id && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionSelector;
