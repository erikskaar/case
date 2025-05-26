type NavigationButtonsProps = {
  step: number;
  setStep: (newStep: number) => void;
  submit: () => void;
};

const NavigationButtons = ({
  step,
  setStep,
  submit,
}: NavigationButtonsProps) => {
  return (
    <div className="button-container">
      {step > 0 && (
        <button type="button" onClick={() => setStep(step - 1)}>
          Back
        </button>
      )}
      {step < 2 ? (
        <button type="button" onClick={() => setStep(step + 1)}>
          Continue
        </button>
      ) : (
        <button type="button" onClick={() => submit()}>
          Submit
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
