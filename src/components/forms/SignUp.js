import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  DatePicker,
  FlexboxGrid,
  Form,
  FormControl,
  FormGroup,
  Radio,
  RadioGroup,
  Schema,
} from "rsuite";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import { useAppContext } from "../../context/app";
import { signUp } from "../../http/users";
import { REGEX } from "../../util/constants";
import getAge from "../../util/get-age";
import useToastManager from "../../util/hooks/toast-manager";
import TextField from "./TextField";

const genderArray = ["male", "female"];
const mapGenderLabels = (value) => ({
  value,
  label: value === "male" ? "Male" : "Female",
});
const { StringType, DateType } = Schema.Types;

const signUpModel = Schema.Model({
  fullName: StringType().isRequired("Enter user name."),
  email: StringType()
    .isEmail("Enter a valid email.")
    .isRequired("Enter user email."),
  username: StringType().isRequired("Enter username for user."),
  gender: StringType()
    .isOneOf(genderArray, "Invalid selection.")
    .isRequired("Select user gender."),
  birthday: DateType()
    .isRequired("Enter user birthday.")
    .addRule((value, data) => {
      const age = getAge(value);
      return age >= 18 && age <= 85;
    }, "Between 18-85 year."),
  phone: StringType()
    .isRequired("Enter user phone number.")
    .pattern(REGEX.PHONE, "Invalid phone number."),
});

function SignUp({ closeDrawer = null }) {
  const [formValue, setFormValue] = useState({
    fullName: "",
    email: "",
    username: "",
    gender: "",
    birthday: undefined,
    phone: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const { setCurrentUser } = useAppContext();
  const { onError, onSuccess } = useToastManager();

  const handleSubmit = async (e) => {
    if (!e) {
      return; // Form is invalid
    }

    setSubmitting(true);
    try {
      const { data } = await signUp(formValue);
      setSubmitting(false);
      setCurrentUser(data);
      onSuccess("Admin added. Instruct them on how to setup their account.");
      closeDrawer && closeDrawer();
    } catch (error) {
      setSubmitting(false);
      onError(error.message);
    }
  };

  return (
    <div>
      <Form
        onChange={setFormValue}
        onCheck={setFormError}
        formValue={formValue}
        model={signUpModel}
        onSubmit={handleSubmit}
        fluid
      >
        <TextField
          label="Full name"
          name="fullName"
          placeholder="john doe"
          errorMessage={formError.fullName}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          errorMessage={formError.email}
        />

        <TextField
          label="Username"
          name="username"
          placeholder="bambi"
          errorMessage={formError.username}
        />

        <FormGroup>
          <ControlLabel>Gender </ControlLabel>
          <FormControl
            name="gender"
            accepter={RadioGroup}
            errorMessage={formError.gender}
            inline
          >
            {genderArray.map(mapGenderLabels).map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </FormControl>
        </FormGroup>

        <TextField
          label="Birthday"
          name="birthday"
          accepter={DatePicker}
          errorMessage={formError.birthday}
        />

        <TextField
          label="Phone"
          name="phone"
          placeholder="+254790..."
          errorMessage={formError.phone}
        />

        <FlexboxGrid justify="end">
          <FlexboxGridItem>
            <ButtonToolbar>
              <Button
                appearance="primary"
                type="submit"
                loading={isSubmitting}
                disabled={!!Object.keys(formError).length || isSubmitting}
              >
                Submit
              </Button>
            </ButtonToolbar>
          </FlexboxGridItem>
        </FlexboxGrid>
      </Form>
    </div>
  );
}

export default SignUp;
