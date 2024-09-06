
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { BlogFormState, Blog, updateBlog } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas:T;
}
export const useMessageStore = defineStore('messages', () => {
  const members = ref<Blog[]>([]);
  const router = useRouter();
  const user = ref<Blog | null>(null);

  const setBlogs = (data: Blog | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('message', JSON.stringify(data));
    } else {
      localStorage.removeItem('message');
    }
  };
  const fetchBlogs = async () => {
    try {
      const response = await axios.get<ApiResponse<Blog[]>>('https://realme-backend.onrender.com/blogs');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const createBlogs = async (data: BlogFormState) => {
    try {
      const formData = new FormData();
      if (data.blogImage) {
        formData.append('blogImage', data.blogImage);
      }
      formData.append('blogName', data.blogName);
      formData.append('blogDescription', data.blogDescription);
      formData.append('blogStatus', data.blogStatus);
      // formData.append('', data.password);
      // formData.append('role', data.role);

      const response = await axios.post<ApiResponse<Blog>>('https://realme-backend.onrender.com/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      members.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Dashboard/members/view-members');
    } catch (error) {
      console.error('Failed to create blogs:', error);
    }
  };
  
  const updateBlogs = async (id: string, data: updateBlog) => {
    try {
      const response = await axios.put<ApiResponse<Blog>>(`https://realme-backend.onrender.com/blogs/${id}`, data);
      const index = members.value.findIndex(member => member.id === id);
      if (index !== -1) {
        members.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update blogs', error);
    }
  };

  const deleteBlogs = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/blogs/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete blog', error);
    }
  };



  return { members, fetchBlogs,setBlogs, createBlogs, updateBlogs, deleteBlogs };
});
