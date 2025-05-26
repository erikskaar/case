import React from "react";
import type { Form, MemberType } from "../App";

type Props = {
  form: Form | null;
  selectedMemberType: MemberType | null;
  setSelectedMemberType: React.Dispatch<
    React.SetStateAction<MemberType | null>
  >;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const StepZero = ({
  form,
  selectedMemberType,
  setSelectedMemberType,
}: Props) => (
  <form>
    <p>Membership selection</p>
    <label htmlFor="member-type-select">Select a membership type:</label>
    <select
      name="member-type-select"
      value={selectedMemberType?.id || ""}
      onChange={(e) => {
        const selectedId = e.currentTarget.value;
        const selected =
          form?.memberTypes.find((type) => type.id === selectedId) || null;
        setSelectedMemberType(selected);
      }}
    >
      {form?.memberTypes.map((type) => (
        <option key={type.id} value={type.id}>
          {type.name}
        </option>
      ))}
    </select>
  </form>
);

export default StepZero;
