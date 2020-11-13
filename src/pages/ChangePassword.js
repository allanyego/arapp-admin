import { Col, FlexboxGrid, Panel } from "rsuite";

import ChangePasswordForm from "../components/forms/ChangePassword";
import Page from "../components/Page";

function ChangePassword() {
  return (
    <Page align="middle" justify="center">
      <FlexboxGrid.Item componentClass={Col} xs={24} sm={12} md={8}>
        <Panel bordered>
          <h1
            className="text-center"
            style={{
              fontSize: "2rem",
            }}
          >
            Change password
          </h1>
          <ChangePasswordForm />
        </Panel>
      </FlexboxGrid.Item>
    </Page>
  );
}

export default ChangePassword;
