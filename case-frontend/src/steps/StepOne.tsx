import React, { useState, useEffect } from "react";
import type { FormInput } from "../api";

type Props = {
  formInput: FormInput;
  setFormInput: React.Dispatch<React.SetStateAction<FormInput>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const StepOne = ({ formInput, setFormInput, step, setStep }: Props) => {
  const [errors, setErrors] = useState({
    phone: "",
    birthDate: "",
  });

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const phonePattern = /^\+?[0-9]{7,15}$/;
    const isPhoneValid = phonePattern.test(formInput.phoneNumber);
    const isBirthDateValid =
      formInput.birthDate < today && formInput.birthDate !== "";

    setErrors({
      phone: isPhoneValid ? "" : "Please enter a valid phone number.",
      birthDate: isBirthDateValid ? "" : "Date of birth must be in the past.",
    });
  }, [formInput.phoneNumber, formInput.birthDate]);

  const isFormValid = !errors.phone && !errors.birthDate;

  return (
    <form>
      <p>Personal info</p>

      <label htmlFor="name-input">Name</label>
      <input
        id="name-input"
        type="text"
        value={formInput.name}
        onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
      />

      <label htmlFor="phone-input">Phone</label>
      <input
        id="phone-input"
        type="tel"
        value={formInput.phoneNumber}
        onChange={(e) =>
          setFormInput({ ...formInput, phoneNumber: e.target.value })
        }
      />
      {errors.phone && <p className="error">{errors.phone}</p>}

      <label htmlFor="date-of-birth-input">Date of birth</label>
      <input
        id="date-of-birth-input"
        type="date"
        max={today}
        value={formInput.birthDate}
        onChange={(e) =>
          setFormInput({ ...formInput, birthDate: e.target.value })
        }
      />
      {errors.birthDate && <p className="error">{errors.birthDate}</p>}

      <button
        type="button"
        disabled={!isFormValid}
        onClick={() => setStep(step + 1)}
      >
        Continue
      </button>
    </form>
  );
};

export default StepOne;
