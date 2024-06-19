export interface PaymentDetails {
    studentId?: string,
    name: string,
    surname: string,
    paymentDate: Date,
    subscription: string, // todo chane to enum
}
