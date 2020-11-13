import { FormGroup, ControlLabel, FormControl } from "rsuite";

function TextField({ name, label, accepter, ...props }) {
  return (
    <FormGroup>
      <ControlLabel>{label} </ControlLabel>
      <FormControl name={name} accepter={accepter} {...props} />
    </FormGroup>
  );
}

export default TextField;
