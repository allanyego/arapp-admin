import { useEffect, useState } from "react";
import { Col, FlexboxGrid, Icon, Nav } from "rsuite";
import EntityDrawer from "../components/EntityDrawer";
import Helper from "../components/Helper";

import Page from "../components/Page";
import UsersTable from "../components/UsersTable";
import { useAppContext } from "../context/app";
import { editUser, getUsers } from "../http/users";
import { USER } from "../util/constants";
import useMounted from "../util/hooks/mounted";
import useToastManager from "../util/hooks/toast-manager";
import entityMapper from "./helpers/entity-mapper";

const VIEWS = {
  user: "user",
  providers: "providers",
  unset: "unset",
};

function CustomNav({ active, onSelect, ...props }) {
  return (
    <Nav {...props} activeKey={active} onSelect={onSelect}>
      <Nav.Item eventKey={VIEWS.providers} icon={<Icon icon="user-md" />}>
        Service providers
      </Nav.Item>
      <Nav.Item eventKey={VIEWS.user} icon={<Icon icon="user" />}>
        Users
      </Nav.Item>
      <Nav.Item eventKey={VIEWS.unset} icon={<Icon icon="user-times" />}>
        Not set
      </Nav.Item>
    </Nav>
  );
}

function Users() {
  const [active, setActive] = useState("providers");
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState(null);
  const [providers, setProviders] = useState(null);
  const [unsetUsers, setUnset] = useState(null);
  const [isUpdating, setUpdating] = useState(false);
  const { currentUser } = useAppContext();
  const { isMounted, setMounted } = useMounted();
  const { onError } = useToastManager();

  const fetchUsers = async (opts = { user: false, unset: false }) => {
    try {
      const { data } = await getUsers(currentUser.token, opts);
      if (isMounted) {
        const { user, unset } = opts;
        user && setUsers(data);
        unset && setUnset(data);
        !unset && !user && setProviders(data);
      }
    } catch (error) {
      onError(error.message);
    }
  };
  const clearSelected = () => setSelected(null);
  const updateUser = async (id) => {
    const toUpdate =
      users.find((u) => u._id === id) ||
      unsetUsers.find((u) => u._id === id) ||
      providers.find((u) => u._id === id);
    if (!toUpdate) {
      return;
    }

    setUpdating(true);
    try {
      const newState = !toUpdate.active;
      await editUser(id, currentUser.token, {
        active: newState,
      });

      setUpdating(false);
      clearSelected();

      if (!toUpdate.accountType) {
        setUnset([...unsetUsers.map(entityMapper(id, { active: newState }))]);
      } else {
        toUpdate.accountType === USER.ACCOUNT_TYPES.USER
          ? setUsers([...users.map(entityMapper(id, { active: newState }))])
          : setProviders([
              ...providers.map(entityMapper(id, { active: newState })),
            ]);
      }
    } catch (error) {
      setUpdating(false);
      onError(error.message);
    }
  };
  const wrapFetch = (accType) => () => {
    switch (accType) {
      case VIEWS.providers:
        return fetchUsers();

      case VIEWS.user:
        return fetchUsers({
          user: true,
        });

      case VIEWS.unset:
        return fetchUsers({
          unset: true,
        });

      default:
        return fetchUsers();
    }
  };

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  });

  return (
    <Page justify="center" className="baju">
      <EntityDrawer
        entity={selected}
        clearSelected={clearSelected}
        onUpdate={updateUser}
        isUpdating={isUpdating}
      />

      <FlexboxGrid.Item componentClass={Col} xs={24} sm={24} md={16}>
        <h1 className="text-center">Users</h1>
        <CustomNav
          appearance="subtle"
          active={active}
          onSelect={setActive}
          justified
        />
        <hr />
        <Helper />
        <div>
          {active === VIEWS.unset ? (
            <UsersTable
              key="unset-table"
              users={unsetUsers}
              fetchUsers={wrapFetch(VIEWS.unset)}
              onRowClick={setSelected}
            />
          ) : active === VIEWS.user ? (
            <UsersTable
              key="user-table"
              users={users}
              fetchUsers={wrapFetch(VIEWS.user)}
              onRowClick={setSelected}
            />
          ) : (
            <UsersTable
              key="provider-table"
              users={providers}
              fetchUsers={wrapFetch(VIEWS.providers)}
              onRowClick={setSelected}
            />
          )}
        </div>
      </FlexboxGrid.Item>
    </Page>
  );
}

export default Users;
