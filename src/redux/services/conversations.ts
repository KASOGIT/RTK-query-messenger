import { Conversation } from 'types/conversation';
import { api } from './api';

interface createConversationRequest extends Omit<Conversation, 'id'> {}

export const conversationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserConversations: builder.query<Conversation[], number>({
      query: (userId) => ({
        url: `conversations/${userId}`,
      }),
      providesTags: ['Conversation'],
    }),
    getConversation: builder.query<Conversation, number>({
      query: (conversationId) => ({
        url: `conversation/${conversationId}`,
      }),
      transformResponse: (response: Conversation[]) => response?.[0],
      providesTags: ['Conversation'],
    }),
    createConversation: builder.mutation<Conversation, createConversationRequest>({
      query: (conversation) => ({
        url: `conversations/${conversation.senderId}`,
        method: 'POST',
        body: conversation,
      }),
      invalidatesTags: ['Conversation'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserConversationsQuery, useGetConversationQuery, useCreateConversationMutation } = conversationApi;
