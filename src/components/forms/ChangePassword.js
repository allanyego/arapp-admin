import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, ButtonToolbar, FlexboxGrid, Form, Schema } from "rsuite";
import FlexboxGridItem from "rsuite/lib/FlexboxGrid/FlexboxGridItem";
import { useAppContext } from "../../context/app";
import { editUser } from "../../http/users";
import useToastManager from "../../util/hooks/toast-manager";

import TextField from "./TextField";

const { StringType } = Schema.Types;

const model = Schema.Model({
  password: StringType()
    .isRequired("Enter your old password.")
    .minLength(8, "Too short"),
  newPassword: StringType()
    .isRequired("Enter your new password.")
    .minLength(8, "Too short"),
  confirmPassword: StringType()
    .isRequired("Confirm your password.")
    .addRule((value, data) => value === data.password),
});

function ChangePassword() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const { currentUser, setCurrentUser } = useAppContext();
  const { onError, onInfo } = useToastManager();
  const history = useHistory();

  const handleSubmit = async (e) => {
    if (!e) {
      return; // Form is invalid
    }

    setSubmitting(true);
    try {
      await editUser(currentUser._id, currentUser.token, {
        password: formValue.password,
        newPassword: formValue.newPassword,
      });
      setSubmitting(false);
      setCurrentUser({
        requirePasswordChange: false,
      });
      onInfo("Nice!. Password updated.");
      history.push("/app");
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
        model={model}
        onSubmit={handleSubmit}
        fluid
      >
        <TextField
          label="Old password"
          name="password"
          type="password"
          errorMessage={formError.password}
        />

        <TextField
          label="New password"
          name="newPassword"
          type="password"
          errorMessage={formError.newPassword}
        />

        <TextField
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          errorMessage={formError.confirmPassword}
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

export default ChangePassword;
