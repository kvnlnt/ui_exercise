export type FormViewState = "check" | "cvv" | "check-success" | "cvv-success";

export type CheckFormInputs = {
  loanAccountNumber: number;
  typeOfAccount: "checking" | "debit-card";
  routingNumber: number;
  bankAccountNumber: number;
  confirmBankAccountNumber: number;
};

export type CvvFormInputs = {
  loanAccountNumber: number;
  typeOfAccount: "checking" | "debit-card";
  cardNumber: number;
  nameOnCard: string;
  expirationDate: Date;
  cvv: number;
};
