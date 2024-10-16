import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';
import type { Blogs, BlogFormState, UpdateBlog, Comment } from '~/types';

interface ApiResponse<T> {
  message: string;
  data: T;
  datas: T;
}

export const useBlogStore = defineStore('blogs', () => {
  const blogs = ref<Blogs[]>([]);
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

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<ApiResponse<Blogs[]>>('https://realme-backend.onrender.com/v1/blogs');
      blogs.value = response.data.data;
    } catch (error) {
      console.error('Failed to fetch blogs', error);
    }
  };

  const fetchBlog = async (id: string): Promise<Blogs> => {
    try {
      const response = await axios.get<ApiResponse<Blogs>>(`https://realme-backend.onrender.com/v1/blogs/${id}`);
     
      return response.data.data; 
    } catch (error) {
      console.error('Failed to fetch blog', error);
      throw error; 
    }
  };
  
  
  const createBlog = async (data: BlogFormState) => {
    try {
      const formData = new FormData();
      if (data.blogImage) {
        formData.append('blogImage', data.blogImage);
      }
      formData.append('blogName', data.blogName);
      formData.append('blogStatus', data.blogStatus);
      formData.append('blogDescription', data.blogDescription);

      const response = await axios.post<ApiResponse<Blogs>>('https://realme-backend.onrender.com/v1/blogs/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      blogs.value.push(response.data.data);
      alert(response.data.message);
      router.push('/Dashboard/createBlogs');
    } catch (error) {
      console.error('Failed to create blog:', error);
    }
  };

  const updateBlog = async (id: string, data: UpdateBlog) => {
    try {
      const response = await axios.put<ApiResponse<Blogs>>(`https://realme-backend.onrender.com/v1/blogs/${id}`, data);
      const index = blogs.value.findIndex(blog => blog.id === id);
      if (index !== -1) {
        blogs.value[index] = response.data.data;
      }
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to update blog', error);
    }
  };



  const deleteBlog = async (id: string) => {
    try {
      const response = await axios.delete<ApiResponse<null>>(`https://realme-backend.onrender.com/v1/blogs/${id}`);
      blogs.value = blogs.value.filter(blog => blog.id !== id);
      alert(response.data.message);
    } catch (error) {
      console.error('Failed to delete blog', error);
    }
  };

  const handleLike = async (blogId: string) => {
    try {
      const response = await axios.post(`https://realme-backend.onrender.com/api/blogs/${blogId}/like`);
      const updatedBlog = response.data.data;
      updateBlogInStore(updatedBlog); // Update the blog in the store with the new like count
    } catch (error) {
      console.error('Failed to like blog', error);
    }
  };

  const handleDislike = async (blogId: string) => {
    try {
      const response = await axios.post(`https://realme-backend.onrender.com/api/blogs/${blogId}/dislike`);
      const updatedBlog = response.data.data;
      updateBlogInStore(updatedBlog); // Update the blog in the store with the new dislike count
    } catch (error) {
      console.error('Failed to dislike blog', error);
    }
  };

  // const addComment = async (blogId: string, comment: string) => {
  //   try {
  //     const response = await axios.post(`http://localhost:3030/v1/blogs/${blogId}`, { comment });
  //     const updatedBlog = response.data.data;
  //     updateBlogInStore(updatedBlog);
  //   } catch (error) {
  //     console.error('Failed to post comment', error);
  //   }
  // };

  // const fetchComments = async (blogId: string) => {
  //   try {
  //     const response = await axios.get<ApiResponse<Comment[]>>(`/v1/blogs/${blogId}`);
  //     comment.value = response.data.data;
  //     return comment.value;
  //   } catch (error) {
  //     console.error('Failed to fetch comments', error);
  //     throw error;
  //   }
  // };

  const updateBlogInStore = (updatedBlog: Blogs) => {
    const index = blogs.value.findIndex(blog => blog._id === updatedBlog._id);
    if (index !== -1) {
      blogs.value[index] = updatedBlog;
    }
  };



  return { blogs,comment, fetchBlogs, handleLike, handleDislike ,setBlogs, fetchBlog, createBlog, updateBlog, deleteBlog };
});
