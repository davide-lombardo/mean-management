export interface StudentDetails {
    _id?: string | null,
    name: string,
    surname: string,
    birth: Date,
    gender: string,
    subscriptionDuration: number,
    weeklyLessons: number,
    subscriptionExpires: Date,
    statusSubscription: SubscriptionStatus,
    course: {
        _id: string,
        title: string,
        level: string,
        category: string
    }
}

export interface SubscriptionStatus {
    Active: 'Active',
    Inactive: 'Inactive',
    Suspended: 'Suspended',
    Expired: 'Expired'
};

export interface StudentListResponse {
    message: string,
    students: StudentDetails[],
    countStudents: number,
}
