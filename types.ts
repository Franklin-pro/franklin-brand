export interface CreateBlogData {
  blogName: string;
  blogStatus: string;
  blogDescription: string;
  url:string;
  blogImage?: string; 
  }
  
  export interface CreateBlogs {
    data: CreateBlogData;
  }
  export interface BlogFormState {
    blogName: string;
    blogStatus: string;
    blogDescription: string;
    url:string;
    blogImage?: File | null; 
  }
  export interface MessageFormState {
    fullName:string,
    email:string,
    phoneNumber:string,
    campanyName:string,
    message:string
  }
  export interface Login {
    email: string;
    password: string;
  }
  export interface UserFormState {
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport: File | null;
  }
  export interface createAccount {
    data: UserFormState;
  }
  export interface User {
    _id:string;
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport?: string; // Assuming image is a URL or similar
  }
export interface UpdateUser{
  firstName: string;
  lastName: string;
  age: string;
  sex: string;
  grade: string;
  StudentReport: File | null;
}

 // ~/type.ts

 export interface DropdownItem {
  label: string;
  icon: string;
  click: () => void;
}
export interface Message {
  id:string,
  _id:string,
  fullName:string,
  email:string,
  phoneNumber:Number,
  campanyName:string,
  message:string
}
export interface updateBlog {
  _id: string;
  userName: string;
  email: string;
  course: string;
  role: string;
  memberImage?: File | string; // Adjust this based on how the image is handled
}

// export interface Blog extends UpdateBlogs {
//   id:string;
// }

  export interface Blog {
    _id:string;
    id: string;
    blogName: string;
    blogStatus: string;
    blogDescription: string;
    url:string;
    blogImage?: string; // Assuming image is a URL or similar
  }
  