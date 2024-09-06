import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { StudentFormState,Students, UpdateStudent } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas:T;
}


export const useStudentStore = defineStore('students', () => {
  const members = ref<Students[]>([]);
  const router = useRouter();

  const fetchStudent = async () => {
    try {
      const response = await axios.get<ApiResponse<Students[]>>('http://localhost:3030/v1/student/view');
      members.value = response.data.datas;
    } catch (error) {
      console.error('Failed to fetch members', error);
    }
  };

  const createStudent = async (data: StudentFormState) => {
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

      const response = await axios.post<ApiResponse<Students>>('http://localhost:3030/v1/student', formData, {
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
  
  const updateMember = async (id: string, data: UpdateStudent) => {
    try {
      const response = await axios.put<ApiResponse<Students>>(`http://localhost:3030/v1/student${id}`, data);
      const index = members.value.findIndex(member => member.id === id);
      if (index !== -1) {
        members.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update member', error);
    }
  };

  const deleteMember = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://root-foundation.onrender.com/v1/member/${id}`);
      members.value = members.value.filter(member => member.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete member', error);
    }
  };

  return { members, fetchStudent, createStudent, updateMember, deleteMember };
});
