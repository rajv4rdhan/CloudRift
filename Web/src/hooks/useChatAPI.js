import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

// Query keys
export const QUERY_KEYS = {
  CHAT_SESSIONS: 'chatSessions',
  CHAT_HISTORY: 'chatHistory',
};

// Hook to get all chat sessions
export const useChatSessions = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT_SESSIONS],
    queryFn: chatAPI.getSessions,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to create a new chat session
export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: chatAPI.createSession,
    onSuccess: (data) => {
      // Invalidate and refetch sessions
      queryClient.invalidateQueries([QUERY_KEYS.CHAT_SESSIONS]);
      toast.success('New chat session created successfully!');
      return data;
    },
    onError: (error) => {
      console.error('Error creating session:', error);
      toast.error('Failed to create new session. Please try again.');
    },
  });
};

// Hook to get chat history for a specific session
export const useChatHistory = (sessionId) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHAT_HISTORY, sessionId],
    queryFn: () => chatAPI.getChatHistory(sessionId),
    enabled: !!sessionId, // Only run if sessionId exists
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to send a message to a chat session
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId, message }) => chatAPI.sendMessage(sessionId, message),
    onSuccess: (data, variables) => {
      // Update chat history cache
      queryClient.setQueryData([QUERY_KEYS.CHAT_HISTORY, variables.sessionId], (oldData) => {
        if (!oldData) return oldData;
        
        // Add the new message to the chat array
        const newChat = {
          user: variables.message,
          system: data.message,
        };
        
        return {
          ...oldData,
          chat: [...(oldData.chat || []), newChat],
          files: data.files ? {
            ...oldData.files,
            file: data.files,
            updatedAt: new Date().toISOString(),
          } : oldData.files,
        };
      });
      
      return data;
    },
    onError: (error) => {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    },
  });
};
