import { useEffect, useState } from "react";
import "./App.css";
import { fetchForm, submitForm, type FormInput } from "./api";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepZero from "./steps/StepZero";
import NavigationButtons from "./NavigationButtons";

export type MemberType = {
  id: string;
  name: string;
};

export type Form = {
  clubId: string;
  memberTypes: MemberType[];
  formId: string;
  title: string;
  registrationOpens: Date;
};

function App() {
  const [form, setForm] = useState<Form | null>(null);
  const [selectedMemberType, setSelectedMemberType] =
    useState<MemberType | null>(null);
  const [step, setStep] = useState(0);
  const [formInput, setFormInput] = useState<FormInput>({
    name: "",
    phoneNumber: "",
    birthDate: "",
    formId: "",
    memberTypeId: "",
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const submit = () => {
    submitForm(formInput).then((response) => {
      if (response !== null) {
        setSubmitMessage(
          `The form was successfully submitted. Your reference is: ${response.id}`,
        );
      } else {
        setSubmitMessage("Something went wrong. Please try again later.");
      }
    });
  };

  useEffect(() => {
    const formId = window.location.pathname.split("/").filter(Boolean).pop();
    if (!formId) {
      setSubmitMessage(
        "No form identifier was found. Do you have the correct URL?",
      );
      return;
    }
    fetchForm(formId).then((data) => {
      if (data) {
        const opens = new Date(data.registrationOpens);
        const now = new Date();

        if (opens > now) {
          setSubmitMessage(
            `This form is not open yet. Please try again at ${opens}`,
          );
          return;
        }

        setForm(data);
        if (data.memberTypes && data.memberTypes.length > 0) {
          setSelectedMemberType(data.memberTypes[0]);
        }
        setFormInput((prev) => ({ ...prev, formId: data.formId }));
      } else {
        setSubmitMessage("Invalid formId found. Do you have the correct URL?");
      }
    });
  }, []);

  useEffect(() => {
    if (selectedMemberType?.id) {
      setFormInput((prev) => {
        if (prev.memberTypeId !== selectedMemberType.id) {
          return { ...prev, memberTypeId: selectedMemberType.id };
        }
        return prev;
      });
    }
  }, [selectedMemberType]);

  return (
    <div className="container">
      <div className="form-container">
        {submitMessage ? (
          <div className="submission-message-inline">{submitMessage}</div>
        ) : (
          <>
            <h1>{form ? form.title : "Loading Form..."}</h1>
            <p>{form ? `By ${form.clubId}` : null}</p>
            <p>{form ? `Sign up for ${form.title} today!` : null}</p>

            <div style={{ display: step === 0 ? "block" : "none" }}>
              <StepZero
                form={form}
                selectedMemberType={selectedMemberType}
                setSelectedMemberType={setSelectedMemberType}
                step={step}
                setStep={setStep}
              />
            </div>

            <div style={{ display: step === 1 ? "block" : "none" }}>
              <StepOne
                formInput={formInput}
                setFormInput={setFormInput}
                setStep={setStep}
                step={step}
              />
            </div>

            <div style={{ display: step === 2 ? "block" : "none" }}>
              <StepTwo
                formInput={formInput}
                selectedMemberType={selectedMemberType}
                step={step}
              />
            </div>

            <p>Step {step + 1} of 3</p>
            <NavigationButtons step={step} setStep={setStep} submit={submit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
