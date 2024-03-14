import Page from "src/components/Page";
import { CheckFormInputs, CvvFormInputs, FormViewState } from "src/types";
import { useLocalStorage } from "usehooks-ts";
import { CheckForm } from "./CheckForm";
import { CvvForm } from "./CvvForm";

export const OneTimeLoanPayment: React.FC = () => {
  const [formState, setFormState] = useLocalStorage<FormViewState>("formState", "check");

  const [checkFormData, setCheckFormData] = useLocalStorage<CheckFormInputs>("checkFormData", {
    loanAccountNumber: 0,
    typeOfAccount: "checking",
    routingNumber: 0,
    bankAccountNumber: 0,
    confirmBankAccountNumber: 0,
  });

  const [cvvFormData, setCvvFormData] = useLocalStorage<CvvFormInputs>("cvvFormData", {
    loanAccountNumber: 0,
    typeOfAccount: "checking",
    cardNumber: 0,
    nameOnCard: "",
    expirationDate: "",
    cvv: 0,
  });

  const handleCheckFormSubmit = (data: CheckFormInputs) => {
    console.log("I just submitted the check form with the following data:", data);
    setFormState("check-success");
    setCheckFormData(data);
  };

  const handleCvvFormSubmit = (data: CvvFormInputs) => {
    console.log("I just submitted the cvv form with the following data:", data);
    setFormState("cvv-success");
    setCvvFormData(data);
  };

  switch (formState) {
    case "cvv-success":
      return (
        <div style={{ padding: 20 }}>
          <h2>Success!</h2>
          <ul>
            <li>Loan account number: {checkFormData?.loanAccountNumber}</li>
            <li>Type of account: Debit Card</li>
            <li>Card number: {cvvFormData?.cardNumber}</li>
            <li>Name on card: {cvvFormData?.nameOnCard}</li>
            <li>Expiration date: {new Date(cvvFormData?.expirationDate).toLocaleDateString()}</li>
            <li>CVV: {cvvFormData?.cvv}</li>
          </ul>
          <button onClick={() => setFormState("check")}>Submit Another</button>
        </div>
      );
    case "check-success":
      return (
        <div style={{ padding: 20 }}>
          <h2>Success!</h2>
          <ul>
            <li>Loan account number: {checkFormData?.loanAccountNumber}</li>
            <li>Type of account: checking</li>
            <li>Routing number: {checkFormData?.routingNumber}</li>
            <li>Bank account number: {checkFormData?.bankAccountNumber}</li>
          </ul>
          <button onClick={() => setFormState("check")}>Submit Another</button>
        </div>
      );
    case "check":
      return (
        <Page.Root>
          <Page.Header>
            <Page.Title>One-time Loan Payment</Page.Title>
            <Page.Desc>Fill out the form below to complete your payment.</Page.Desc>
          </Page.Header>
          <Page.Main>
            <CheckForm
              onSubmit={handleCheckFormSubmit}
              onAccountTypeChange={(viewState: FormViewState) => setFormState(viewState)}
            />
          </Page.Main>
        </Page.Root>
      );
    case "cvv":
      return (
        <Page.Root>
          <Page.Header>
            <Page.Title>One-time Loan Payment</Page.Title>
            <Page.Desc>Fill out the form below to complete your payment.</Page.Desc>
          </Page.Header>
          <Page.Main>
            <CvvForm
              onSubmit={handleCvvFormSubmit}
              onAccountTypeChange={(viewState: FormViewState) => setFormState(viewState)}
            />
          </Page.Main>
        </Page.Root>
      );
  }
};
