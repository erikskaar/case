import type { FormInput } from "../api";
import type { MemberType } from "../App";

type Props = {
  formInput: FormInput;
  selectedMemberType: MemberType | null;
  step: number;
};

const StepTwo = ({ formInput, selectedMemberType }: Props) => {
  return (
    <form>
      <p>Review</p>
      <p>
        <strong>Name:</strong> {formInput.name}
      </p>
      <p>
        <strong>Phone:</strong> {formInput.phoneNumber}
      </p>
      <p>
        <strong>Date of Birth:</strong> {formInput.birthDate}
      </p>
      <p>
        <strong>Membership Type:</strong> {selectedMemberType?.name}
      </p>
    </form>
  );
};

export default StepTwo;
