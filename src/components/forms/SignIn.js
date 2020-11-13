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
  Icon,
  Input,
  InputGroup,
  Radio,
  RadioGroup,
  Schema,
  SelectPicker,
  Toggle,
} from "rsuite";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import { useAppContext } from "../../context/app";
import { signIn } from "../../http/users";
import useToastManager from "../../util/hooks/toast-manager";

import TextField from "./TextField";

const { StringType } = Schema.Types;

const signInModel = Schema.Model({
  username: StringType().isRequired("Enter your username."),
  password: StringType()
    .isRequired("Enter your password.")
    .minLength(8, "Too short"),
});

function SignIn() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const { setCurrentUser } = useAppContext();
  const { onError } = useToastManager();

  const handleSubmit = async (e) => {
    if (!e) {
      return; // Form is invalid
    }

    setSubmitting(true);
    try {
      const { data } = await signIn(formValue.username, formValue.password);
      setSubmitting(false);
      setCurrentUser(data);
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
        model={signInModel}
        onSubmit={handleSubmit}
        fluid
      >
        <TextField
          label="Username"
          name="username"
          errorMessage={formError.username}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          errorMessage={formError.password}
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

export default SignIn;
