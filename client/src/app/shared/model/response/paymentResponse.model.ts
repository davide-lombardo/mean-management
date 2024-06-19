export interface PaymentResponse {
    status: string;
    results: number;
    data: {
        payments: PaymentData[];
    };
}

export interface PaymentData {
    _id: string;
    student: {
        _id: string;
        name: string;
        surname: string;
    };
    paymentDate: Date;
    status: string;
    subscription: {
        _id: string;
        subscriptionDuration: number;
        startDate: Date;
        endDate: Date;
        amount: number;
    };
    course: {
        title: string;
    };
}