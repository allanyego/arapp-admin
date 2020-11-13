import { Drawer, Button, Placeholder, FlexboxGrid, Col } from "rsuite";

import SignUp from "./forms/SignUp";

function AdminDrawer({ isOpen, onClose }) {
  return (
    <Drawer show={isOpen} onHide={onClose} className="fancy-drawer">
      <Drawer.Header>
        <Drawer.Title>Add new admin</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <FlexboxGrid>
          <FlexboxGrid.Item componentClass={Col} xs={24} xm={16} md={12}>
            <SignUp closeDrawer={onClose} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Drawer.Body>
    </Drawer>
  );
}

export default AdminDrawer;
