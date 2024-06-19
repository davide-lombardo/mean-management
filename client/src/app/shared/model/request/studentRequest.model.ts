export interface CreateStudentRequest {
    _id?: string;
    name: string;
    surname: string;
    birth: Date;
    gender: string;
    subscriptionDuration: number;
    course: string | undefined;
    subscription: string;
  }