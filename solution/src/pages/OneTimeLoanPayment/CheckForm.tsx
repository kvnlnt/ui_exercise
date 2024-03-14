import { SubmitHandler, useForm } from "react-hook-form";
import Figure from "src/components/Figure";
import Form from "src/components/Form";
import Grid from "src/components/Grid";
import { DESKTOP_BREAKPOINT } from "src/config";
import { CheckFormInputs, FormViewState } from "src/types";
import { useMediaQuery } from "usehooks-ts";

type CheckFormProps = {
  onAccountTypeChange: (viewState: FormViewState) => void;
  onSubmit: (data: CheckFormInputs) => void;
};

export const CheckForm: React.FC<CheckFormProps> = ({ onAccountTypeChange, onSubmit }) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const _onSubmit: SubmitHandler<CheckFormInputs> = onSubmit;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckFormInputs>();

  const areaLayouts = {
    mobile: `
      "loanAccountNumber"
      "typeOfAccount"
      "routingNumber"
      "bankAccountNumber"
      "confirmBankAccountNumber"
      "figure"
    `,
    desktop: `
      "loanAccountNumber loanAccountNumber"
      "typeOfAccount figure"
      "routingNumber figure"
      "bankAccountNumber figure"
      "confirmBankAccountNumber figure"
    `,
  };

  return (
    <Form.Root onSubmit={handleSubmit(_onSubmit)}>
      <Form.Section>
        <Grid.Layout
          style={{
            gridTemplateAreas: isDesktop ? areaLayouts.desktop : areaLayouts.mobile,
            gridTemplateColumns: isDesktop ? "5fr 4fr" : "1fr",
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
                <Form.Radio defaultChecked name="typeOfAccount" label="Checking" value="checking" />
                <Form.Radio
                  name="typeOfAccount"
                  label="Debit Card"
                  onClick={() => onAccountTypeChange("cvv")}
                  value="debit-card"
                />
              </Form.RadioGroup>
            </Form.FieldSet>
          </Grid.Area>
          <Grid.Area style={{ gridArea: "routingNumber" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="routingNumber">Routing Number</Form.Label>
              <Form.Input
                type="text"
                onInput={(e) => (e.currentTarget.value = e.currentTarget.value.replace(/\D/g, ""))}
                maxLength={9}
                {...register("routingNumber", {
                  required: "Routing Number is Required",
                  valueAsNumber: true,
                  max: {
                    value: 999999999, // Maximum 9-digit number
                    message: "Routing Number Must Be 9 Digits or Less",
                  },
                })}
              />
            </Form.FieldSet>
            {errors.routingNumber && <Form.ErrorMessage>{errors.routingNumber.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "bankAccountNumber" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="bankAccountNumber">Bank Account Number</Form.Label>
              <Form.Input
                type="number"
                {...register("bankAccountNumber", { required: "Bank Account Number is Required", valueAsNumber: true })}
              />
            </Form.FieldSet>
            {errors.bankAccountNumber && <Form.ErrorMessage>{errors.bankAccountNumber.message}</Form.ErrorMessage>}
          </Grid.Area>
          <Grid.Area style={{ gridArea: "confirmBankAccountNumber" }}>
            <Form.FieldSet>
              <Form.Label htmlFor="confirmBankAccountNumber">Confirm Bank Account Number</Form.Label>
              <Form.Input
                type="number"
                {...register("confirmBankAccountNumber", {
                  valueAsNumber: true,
                  validate: (value) => value === watch("bankAccountNumber") || "Bank Account Number Does Not Match",
                })}
              />
            </Form.FieldSet>
            {errors.confirmBankAccountNumber && (
              <Form.ErrorMessage>{errors.confirmBankAccountNumber.message}</Form.ErrorMessage>
            )}
          </Grid.Area>
          <Grid.Area style={{ backgroundColor: "#f5f7fc", gridArea: "figure" }}>
            <Figure.Root style={{ padding: "20px 10px", textAlign: "center" }}>
              <Figure.Caption>Where can I find the routing and account number?</Figure.Caption>
              <Figure.Image src="gfx/check.png" alt="Image of check" />
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
