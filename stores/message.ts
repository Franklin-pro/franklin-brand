
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Message, MessageFormState } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas:T;
}
export const useMessageStore = defineStore('messages', () => {
  const members = ref<Message[]>([]);
  const router = useRouter();
  const user = ref<Message | null>(null);

  const setMessage = (data: Message | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('message', JSON.stringify(data));
    } else {
      localStorage.removeItem('message');
    }
  };
  const fetchMessage = async () => {
    try {
      const response = await axios.get<ApiResponse<Message[]>>('https://realme-backend.onrender.com/message');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch message', error);
    }
  };

  const sendmessage = async (data: MessageFormState) => {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('phoneNumber', data.phoneNumber);
      formData.append('campanyName', data.campanyName); // Ensure this matches your type
      formData.append('message', data.message);
  
      const response = await axios.post<ApiResponse<Message>>('https://realme-backend.onrender.com/message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      members.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Dashboard/members/view-members');
    } catch (error) {
      console.error('Failed to create message:', error);
    }
  };
  
  const deleteMessage = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/message/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete blog', error);
    }
  };



  return { members, fetchMessage,setMessage, sendmessage,deleteMessage };
});
