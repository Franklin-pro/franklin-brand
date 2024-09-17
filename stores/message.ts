import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type{ Message,MessageFormState } from '~/types';


interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([]);
  const currentMessage = ref<Message | null>(null);
  const router = useRouter();

  const fetchMessages = async () => {
    try {
      const response = await axios.get<ApiResponse<Message[]>>('https://realme-backend.onrender.com/v1/messages');
      messages.value = response.data.data;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const createMessage = async (data: MessageFormState) => {
    try {
      const response = await axios.post<ApiResponse<Message>>('https://realme-backend.onrender.com/v1/messages', data);
      messages.value.push(response.data.datas);
      // alert(response.data.message);
    } catch (error) {
      console.error('Failed to create message', error);
    }
  };


  const deleteMessage = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/v1/messages/${id}`);
      messages.value = messages.value.filter(message => message.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete message', error);
    }
  };

  return { messages, currentMessage, fetchMessages, createMessage, deleteMessage };
});