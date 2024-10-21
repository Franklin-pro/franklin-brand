import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Blogs, BlogFormState, UpdateBlog, Comment, Video, VideoFormState } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useVideoStore = defineStore('blogs', () => {
  const videos = ref<Video[]>([]);
  const comment = ref<Comment[]>([])
  const router = useRouter();
  const user = ref<Blogs | null>(null);



  const setBlogs = (data: Blogs | null) => {
    user.value = data;
    if (data) {
      localStorage.setItem('blogs', JSON.stringify(data));
    } else {
      localStorage.removeItem('blogs');
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get<ApiResponse<Video[]>>('http://localhost:3030/v1/video/get');
      videos.value = response.data.data;
    } catch (error) {
      console.error('Failed to fetch videos', error);
    }
  };

  const fetchVideo = async (id: string): Promise<Video> => {
    try {
      const response = await axios.get<ApiResponse<Video>>(`http://localhost:3030/v1/video/${id}`);
     
      return response.data.data; 
    } catch (error) {
      console.error('Failed to fetch video', error);
      throw error; 
    }
  };
  const uploadVideo = async (data: VideoFormState) => {
    try {
      const response = await axios.post<ApiResponse<Video>>('http://localhost:3030/v1/video/post', data);
      videos.value.push(response.data.datas);
      // alert(response.data.message);
    } catch (error) {
      console.error('Failed to create message', error);
    }
  };

  const updateVideo = async (id: string, data: UpdateBlog) => {
    try {
      const response = await axios.put<ApiResponse<Video>>(`https://realme-backend.onrender.com/v1/blogs/${id}`, data);
      const index = videos.value.findIndex(blog => blog.id === id);
      if (index !== -1) {
        videos.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update video', error);
    }
  };



  const deleteVideo = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/v1/blogs/${id}`);
      videos.value = videos.value.filter(blog => blog.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete video', error);
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      const response = await axios.post(`https://realme-backend.onrender.com/api/blogs/${blogId}/like`);
      const updatedBlog = response.data.data;
      updateBlogInStore(updatedBlog); // Update the blog in the store with the new like count
    } catch (error) {
      console.error('Failed to like video', error);
    }
  };

  const handleDislike = async (blogId: string) => {
    try {
      const response = await axios.post(`https://realme-backend.onrender.com/api/blogs/${blogId}/dislike`);
      const updatedBlog = response.data.data;
      updateBlogInStore(updatedBlog); // Update the blog in the store with the new dislike count
    } catch (error) {
      console.error('Failed to dislike video', error);
    }
  };

  const updateBlogInStore = (updatedBlog: Video) => {
    const index = videos.value.findIndex(blog => blog._id === updatedBlog._id);
    if (index !== -1) {
      videos.value[index] = updatedBlog;
    }
  };



  return { videos,comment, fetchVideos, handleLike, handleDislike ,setBlogs, fetchVideo, uploadVideo, updateVideo, deleteVideo };
});
