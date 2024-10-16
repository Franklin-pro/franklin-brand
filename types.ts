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
  export interface createAccount {
    data: UserFormState;
  }

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
export interface BlogImage {
  url: string;
}

export interface Blogs {
  _id: string;
  id: string;
  blogName: string;
  blogDescription: string;
  blogStatus: string;
  url: string;
  blogImage?: BlogImage | undefined; // Optional BlogImage object
}

export interface BlogFormState {
  blogName: string;
  blogDescription: string;
  blogStatus: string;
  url: string;
  blogImage: File | null; // blogImage is for handling the file upload
}

export interface UpdateBlog {
  id: string;
  blogName: string;
  blogDescription: string;
  blogStatus: string;
  url:string;
  blogImage?: File | string; 
}
export interface CreateUserData {
  email: string;
  username: string;
  password: string;
  confirmPassword:string;
}

export interface CreateUser {
  data: CreateUserData;
}
export interface UserFormState {
  email: string;
  userName: string;
  password: string;
  confirmPassword:string;
}
export interface UpdateUser {
  _id: string;
  userName: string;
  email: string;
}

export interface User extends UpdateUser {
  id:string;
}

  export interface User {
    _id:string;
    id: string;
    email: string;
    userName: string;
    role:string;
    password:string;
    confirmpassword:string;

  }

  export interface Comment {
    _id:string,
    userId:string
    userName:string,
    message:string
  }