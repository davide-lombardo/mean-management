export interface CoursesListResponse {
  countCourses: number;
  courses: Course[];
  status: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  status: string;
  maxStudents: number;
  enrolledStudents: string[];
  createdAt: Date;
  updatedAt?: Date;
}
