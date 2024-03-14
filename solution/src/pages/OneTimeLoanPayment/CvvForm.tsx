import { SubmitHandler, useForm } from "react-hook-form";
import Figure from "src/components/Figure";
import Form from "src/components/Form";
import Grid from "src/components/Grid";
import { DESKTOP_BREAKPOINT } from "src/config";
import { CvvFormInputs, FormViewState } from "src/types";
import { useMediaQuery } from "usehooks-ts";

type CvvFormProps = {
  onAccountTypeChange: (viewState: FormViewState) => void;
  onSubmit: (data: CvvFormInputs) => void;
};

export const CvvForm: React.FC<CvvFormProps> = ({ onAccountTypeChange, onSubmit }) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const _onSubmit: SubmitHandler<CvvFormInputs> = onSubmit;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CvvFormInputs>();

  const areaLayouts = {
    mobile: `
      "loanAccountNumber"
      "typeOfAccount"
      "cardNumber"
      "nameOnCard"
      "expirationDate"
      "cvv"
      "figure"
    `,
    desktop: `
      "loanAccountNumber loanAccountNumber loanAccountNumber"
      "typeOfAccount typeOfAccount figure"
      "cardNumber cardNumber figure"
      "nameOnCard nameOnCard figure"
      "expirationDate cvv figure"
    `,
  };

  return (
    <Form.Root onSubmit={handleSubmit(_onSubmit)}>
      <Form.Section>
        <Grid.Layout
          style={{
            gridTemplateAreas: isDesktop ? areaLayouts.desktop : areaLayouts.mobile,
            gridTemplateColumns: isDesktop ? "2fr 2fr 4fr" : "1fr",
          }}
        >
          <Grid.Area style={{ gridArea: "loanAccountNumber" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="loanAccountNumber">Loan Account Number</Form.Label>
              <Form.Input
                type="number"
                {...register("loanAccountNumber", {
                  required: "Loan Account Number is Required",
                  valueAsNumber: true,
                })}
              />
            </Form.FieldSet>
            {errors.loanAccountNumber && <Form.ErrorMessage>{errors.loanAccountNumber.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "typeOfAccount" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="typeOfAccount">Type Of Account</Form.Label>
              <Form.RadioGroup>
                <Form.Radio
                  name="typeOfAccount"
                  label="Checking"
                  onClick={() => onAccountTypeChange("check")}
                  value="checking"
                />
                <Form.Radio defaultChecked name="typeOfAccount" label="Debit Card" value="debit-card" />
              </Form.RadioGroup>
            </Form.FieldSet>
          </Grid.Area>
          <Grid.Area style={{ gridArea: "cardNumber" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="cardNumber">Card Number</Form.Label>
              <Form.Input
                type="number"
                {...register("cardNumber", {
                  required: "Card Number is Required",
                  valueAsNumber: true,
                })}
              />
            </Form.FieldSet>
            {errors.cardNumber && <Form.ErrorMessage>{errors.cardNumber.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "nameOnCard" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="nameOnCard">Name On Card</Form.Label>
              <Form.Input
                type="text"
                {...register("nameOnCard", {
                  required: "Name On Card is Required",
                })}
              />
            </Form.FieldSet>
            {errors.nameOnCard && <Form.ErrorMessage>{errors.nameOnCard.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "expirationDate" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="expirationDate">Expiration Date</Form.Label>
              <Form.Input
                type="date"
                {...register("expirationDate", {
                  required: "Expiration Date is Required",
                  valueAsDate: true,
                })}
              />
            </Form.FieldSet>
            {errors.expirationDate && <Form.ErrorMessage>{errors.expirationDate.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "cvv" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="cvv">CVV</Form.Label>
              <Form.Input
                type="text"
                maxLength={3}
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
                {...register("cvv", {
                  required: "CVV is Required",
                  valueAsNumber: true,
                  min: {
                    value: 100, // Minimum 3-digit number
                    message: "CVV Must Be 3 Digits",
                  },
                  max: {
                    value: 999, // Maximum 9-digit number
                    message: "CVV Must Be 3 Digits",
                  },
                })}
              />
            </Form.FieldSet>
            {errors.cvv && <Form.ErrorMessage>{errors.cvv.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ backgroundColor: "#f5f7fc", gridArea: "figure" }}>
            <Figure.Root style={{ padding: "20px 10px", textAlign: "center" }}>
              <Figure.Caption>Where can I find the CVV number?</Figure.Caption>
              <Figure.Image
                src="gfx/cvv.png"
                alt="Image of check"
                style={{
                  width: "70%",
                }}
              />
            </Figure.Root>
          </Grid.Area>
        </Grid.Layout>
      </Form.Section>
      <Form.Section>
        <Form.Button type="submit">Make Payment</Form.Button>
      </Form.Section>
    </Form.Root>
  );
};
