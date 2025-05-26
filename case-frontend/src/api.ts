import type { Form } from "./App";

export const fetchForm = async (formId: string) => {
  const url = `http://localhost:8080/form/${formId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching form: ${response.statusText}`);
    }

    const data = (await response.json()) as Form;
    return data;
  } catch (error) {
    console.error("Failed to fetch form data:", error);
    return null;
  }
};

export const submitForm = async (input: FormInput) => {
  const url = "http://localhost:8080/submit-form";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`Submission failed: ${response.statusText}`);
    }

    const result = (await response.json()) as FormResponse;
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export type FormInput = {
  name: string;
  phoneNumber: string;
  birthDate: string;
  formId: string;
  memberTypeId: string;
};

export type FormResponse = {
  id: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  formId: string;
  memberTypeId: string;
};
