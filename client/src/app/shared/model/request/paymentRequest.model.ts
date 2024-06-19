export interface AddPaymentRequest {
    studentId: string,
    paymentDate: Date,
    subscription: string,
    course: string
  }