export interface CreateCourseRequest {
  _id?: string;
  title: string;
  description: string;
  category: CourseStatus;
  level: CourseLevel;
  maxStudents: number;
}

export interface CourseLevel {
  Beginner: 'Beginner';
  Intermediate: 'Intermediate';
  Advanced: 'Advanced';
}

export interface CourseStatus {
  Upcoming: 'Upcoming';
  Ongoing: 'Ongoing';
  Completed: 'Completed';
}
