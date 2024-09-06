export interface CreateMemberData {
    email: string;
    username: string;
    course: string;
    password: string;
    role: string;
    image?: File | null; // Optional field for file upload
  }
  
  export interface CreateMember {
    data: CreateMemberData;
  }
  export interface MemberFormState {
    email: string;
    userName: string;
    course: string;
    password: string;
    role: string;
    memberImage: File | null;
  }
  export interface Login {
    email: string;
    password: string;
  }
  export interface StudentFormState {
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport: File | null;
  }
  export interface createStudent {
    data: StudentFormState;
  }
  export interface Students {
    _id:string;
    id: string;
    firstName: string;
    lastName: string;
    age: string;
    sex: string;
    grade: string;
    studentReport?: string; // Assuming image is a URL or similar
  }
export interface UpdateStudent{
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
export interface UpdateMember {
  _id: string;
  userName: string;
  email: string;
  course: string;
  role: string;
  memberImage?: File | string; // Adjust this based on how the image is handled
}

export interface Member extends UpdateMember {
  id:string;
}

  export interface Member {
    _id:string;
    id: string;
    email: string;
    userName: string;
    course: string;
    role: string;
    url:string;
    memberImage?: string; // Assuming image is a URL or similar
  }
  