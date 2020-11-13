import { Drawer, FlexboxGrid } from "rsuite";
import { useAppContext } from "../context/app";

function ProfileDrawer({ isOpen, onClose }) {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return null;
  }

  return (
    <Drawer
      show={isOpen}
      onHide={onClose}
      placement="left"
      className="fancy-drawer"
    >
      <Drawer.Header>
        <Drawer.Title>User profile</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <FlexboxGrid align="middle" justify="center">
          <FlexboxGrid.Item>
            <h3 className="text-capitalize">{currentUser.fullName}</h3>@
            {currentUser.username}
            <p className="margin-0">{currentUser.email}</p>
            <p className="margin-0">
              <i>{currentUser.phone}</i>
            </p>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Drawer.Body>
    </Drawer>
  );
}

export default ProfileDrawer;
