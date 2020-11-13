import { Col, FlexboxGrid } from "rsuite";

import ChangePasswordForm from "../components/forms/ChangePassword";
import Page from "../components/Page";

function ChangePassword() {
  return (
    <Page justify="center">
      <FlexboxGrid.Item componentClass={Col} xs={24} sm={24} md={16}>
        <h1 className="text-center">Users</h1>
        <ChangePasswordForm />
      </FlexboxGrid.Item>
    </Page>
  );
}

export default ChangePassword;
