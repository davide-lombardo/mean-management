export interface StudentDetails {
    _id?: string | null,
    name: string,
    surname: string,
    birth: Date,
    gender: string,
    subscriptionDuration: number,
    weeklyLessons: number,
    subscriptionExpires: Date,
    statusSubscription: 'scaduto' | 'in scadenza' | 'in corso',
    course: {
        _id: string,
        title: string,
        level: string,
        category: string
    }
}
