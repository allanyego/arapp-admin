import { Col, FlexboxGrid, Panel } from "rsuite";

import SignInForm from "../components/forms/SignIn";
import Page from "../components/Page";

function SignIn() {
  return (
    <Page align="middle" justify="center">
      <FlexboxGrid.Item componentClass={Col} xs={24} sm={12} md={8}>
        <Panel shaded>
          <h1 className="text-center">Sign in</h1>
          <SignInForm />
        </Panel>
      </FlexboxGrid.Item>
    </Page>
  );
}

export default SignIn;
