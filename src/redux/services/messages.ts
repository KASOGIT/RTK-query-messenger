import { Message } from 'types/message';
import { api } from './api';

interface PostMessageRequest extends Omit<Message, 'id'> {}

export const messagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessagesForConversation: builder.query<Message[], number>({
      query: (conversationId) => ({
        url: `messages/${conversationId}`,
      }),
      providesTags: ['Message'],
    }),
    postMessage: builder.mutation<Message, PostMessageRequest>({
      query: (message) => ({
        url: `messages/${message.conversationId}`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMessagesForConversationQuery, usePostMessageMutation } = messagesApi;
