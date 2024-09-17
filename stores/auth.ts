import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { UserFormState, Login, User, UpdateUser } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useAuthStore = defineStore('users', () => {
  const users = ref<User[]>([]);
  
  const currentUser = ref<User | null>(null); 
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
  const setCurrentMember = (user: User) => {
    currentUser.value = user;
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<ApiResponse<User[]>>('https://realme-backend.onrender.com/v1/user');
      users.value = response.data.data;
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  const fetchUser = async (id: string): Promise<User> => {
    try {
      const response = await axios.get<ApiResponse<User>>(`https://realme-backend.onrender.com/v1/user/${id}`);
     
      return response.data.datas; 
    } catch (error) {
      console.error('Failed to fetch member', error);
      throw error; 
    }
  };
  
  
  const createAccount = async (data: UserFormState) => {
    try {
      const response = await axios.post<ApiResponse<User>>('https://realme-backend.onrender.com/v1/user', data);
      if (response.data.datas) {
        users.value.push(response.data.datas);
        alert(response.data.message || 'Account created successfully!');
        window.location.reload()
      } else {
        alert(response.data.message || 'An error occurred while creating the account.');
      }
    } catch (error) {

      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || 'An error occurred while creating the account.';
        alert(errorMessage);
      } else {
        alert('An unexpected error occurred.');
      }
      console.error('Failed to create account', error);
    }
  };
  

  const updateUser = async (id: string, data: UpdateUser) => {
    try {
      const response = await axios.put<ApiResponse<User>>(`https://realme-backend.onrender.com/v1/user/${id}`, data);
      const index = users.value.findIndex(user => user.id === id);
      if (index !== -1) {
        users.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update member', error);
    }
  };



  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/v1/user/${id}`);
    users.value = users.value.filter(user => user.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const login = async (data: Login) => {
    const validatePassword = (password: string) => password.length >= 8;

    if (!validatePassword(data.password)) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('https://realme-backend.onrender.com/v1/user/login', {
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
        
        if (result.data?.user) {
          setUser(result.data.user);

          const redirectPath = result.data.user.role === 'admin' ? '/Dashboard/admin/' : '/';
          await router.replace(redirectPath);
          return result.data.user;
        } else {
          throw new Error('User data not found in response');
        }
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      // alert('Login failed. Please check your credentials and try again. ❌');
    }
  };

const logout = async ()=>{
setUser(null)
setToken(null)
await router.push('/loginAccount')
}
  return { users, user, token, currentUser, fetchUser, login,fetchUsers, createAccount,logout, updateUser, deleteUser };
});
