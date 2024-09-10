import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { UserFormState,User, UpdateUser,Login } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas:T;
}


export const useStudentStore = defineStore('students', () => {
  const members = ref<User[]>([]);
  const router = useRouter();
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const setToken = (data: string | null) => {
    token.value = data;
    if (data) {
      localStorage.setItem('token', data);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUser = (data: User | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      localStorage.removeItem('user');
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get<ApiResponse<User[]>>('https://realme-backend.onrender.com/user');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const createAccount = async (data: UserFormState) => {
    try {
      const formData = new FormData();
      if (data.studentReport) {
        formData.append('studentReport', data.studentReport);
      }
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('age', data.age);
      formData.append('sex', data.sex);
      formData.append('grade', data.grade);

      const response = await axios.post<ApiResponse<User>>('https://realme-backend.onrender.com/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      members.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Member-Dashboard/View-Students');
    } catch (error) {
      console.error('Failed to create member:', error);
    }
  };
  
  const updateUser = async (id: string, data: UpdateUser) => {
    try {
      const response = await axios.put<ApiResponse<User>>(`https://realme-backend.onrender.com/user/${id}`, data);
      const index = members.value.findIndex(member => member.id === id);
      if (index !== -1) {
        members.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update member', error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/user/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  const signIn = async (data: Login) => {
    const validatePassword = (password: string) => password.length >= 8;
  
    if (!validatePassword(data.password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      const response = await fetch("https://realme-backend.onrender.com/users/login", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
  
      if (result.token) {
        setToken(result.token);
      } else {
        throw new Error('Token not found in response');
      }
  
      if (result.data && result.data.user) {
        setUser(result.data.user);
        alert('Login successful');
  
        if (result.data.user.role === 'admin') {
          await router.replace('/Dashboard/members/');
        } else {
          await router.replace('/member-dashboard/member');
        }
        return result.data.user;
      } else {
        throw new Error('User data not found in response');
      }
    } catch (error: any) {
      if (error.message.includes('401')) {
        alert('Invalid email or password. Please try again.');
      } else {
        setToken(null);
        setUser(null);
  
        console.error('Failed to sign in:', error);
        alert('An error occurred during login. Please try again later.');
      }
      throw error;
    }
  };
  
  const logout = async() =>{
    setUser(null);
    setToken(null);
    await router.push('/login')
  }
  return { members,signIn,logout, fetchUsers, createAccount, updateUser, deleteUser };
});
