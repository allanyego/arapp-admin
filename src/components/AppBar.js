import { forwardRef } from "react";
import { Link } from "react-router-dom";
import {
  ButtonToolbar,
  Col,
  Dropdown,
  FlexboxGrid,
  Icon,
  Nav,
  Navbar,
} from "rsuite";
import { useAppContext } from "../context/app";

const RouterLink = forwardRef((props, ref) => {
  const { href, children, ...rest } = props;
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
});

function NavLink(props) {
  return <Nav.Item componentClass={RouterLink} {...props} />;
}

function DropdownLink(props) {
  return <Dropdown.Item componentClass={RouterLink} {...props} />;
}

function AppBar({
  onSelect,
  activeKey,
  onProfileClick,
  onAdminClick,
  ...props
}) {
  const { currentUser, setCurrentUser } = useAppContext();

  const handleLogout = () => setCurrentUser(null);

  const DropdownItems = () => (
    <>
      <Dropdown.Item
        eventKey="4"
        icon={<Icon icon="user" />}
        onSelect={onProfileClick}
      >
        Profile
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="5"
        icon={<Icon icon="plus" />}
        onSelect={onAdminClick}
      >
        Add admin
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="6"
        icon={<Icon icon="exit" />}
        onSelect={handleLogout}
      >
        Logout
      </Dropdown.Item>
    </>
  );

  return (
    <Navbar {...props}>
      <Navbar.Header>
        <Nav>
          <NavLink href="/">
            <strong>ARApp</strong>
          </NavLink>
        </Nav>
        {/* <Link to="/">ARApp</Link> */}
      </Navbar.Header>
      <Navbar.Body>
        {currentUser && (
          <Nav onSelect={onSelect} activeKey={activeKey} pullRight>
            <FlexboxGrid>
              <FlexboxGrid.Item componentClass={Col} xsHidden>
                <NavLink
                  href="/app/users"
                  icon={<Icon icon="people-group" />}
                  eventKey="1"
                >
                  Users
                </NavLink>
                <NavLink
                  href="/app/guides"
                  icon={<Icon icon="newspaper-o" />}
                  eventKey="2"
                >
                  Guides
                </NavLink>
                <Dropdown
                  title={`@${currentUser.username}`}
                  icon={<Icon icon="cog" />}
                >
                  <DropdownItems />
                </Dropdown>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item componentClass={Col} smHidden mdHidden lgHidden>
                <ButtonToolbar>
                  <Dropdown
                    title="Menu"
                    icon={<Icon icon="bars" />}
                    placement="bottomEnd"
                  >
                    <DropdownLink
                      href="/app/users"
                      icon={<Icon icon="people-group" />}
                      eventKey="1"
                    >
                      Users
                    </DropdownLink>
                    <DropdownLink
                      href="/app/guides"
                      icon={<Icon icon="newspaper-o" />}
                      eventKey="2"
                    >
                      Guides
                    </DropdownLink>
                    <Dropdown.Menu title="@username" pullLeft>
                      <DropdownItems />
                    </Dropdown.Menu>
                  </Dropdown>
                </ButtonToolbar>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Nav>
        )}
      </Navbar.Body>
    </Navbar>
  );
}

export default AppBar;
