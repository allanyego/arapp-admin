import { Badge, Icon, Table } from "rsuite";
import dayjs from "dayjs";
import { useEffect } from "react";

import { USER } from "../util/constants";

const { Column, HeaderCell, Cell } = Table;

function UsersTable({ users, fetchUsers, onRowClick }) {
  useEffect(() => {
    !users && fetchUsers();
  }, []);

  return (
    <Table
      height={420}
      data={users || []}
      loading={!users}
      onRowClick={onRowClick}
      autoHeight
      affixHeader
    >
      <Column minWidth={100} flexGrow={1}>
        <HeaderCell>Full name</HeaderCell>
        <Cell>
          {(rowData) => {
            const isProvider =
              rowData.accountType &&
              rowData.accountType !== USER.ACCOUNT_TYPES.USER;
            const isIndividual =
              isProvider &&
              rowData.accountType === USER.ACCOUNT_TYPES.COUNSELLOR;

            const Inner = () => (
              <span className="text-capitalize">
                <strong>
                  {rowData.fullName} {"  "}
                  {isProvider ? (
                    <Icon icon={isIndividual ? "user-o" : "building-o"} />
                  ) : null}
                  {"  "}
                  {!rowData.active && <Icon icon="ban" className="ban-icon" />}
                </strong>
              </span>
            );

            return <Inner />;
          }}
        </Cell>
      </Column>

      <Column minWidth={100} flexGrow={1}>
        <HeaderCell>Username</HeaderCell>
        <Cell>{(rowData) => <span>@{rowData.username}</span>}</Cell>
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>Email</HeaderCell>
        <Cell dataKey="email" />
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>Member since</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{dayjs(rowData.createdAt).format("MMM D, YYYY")}</span>
          )}
        </Cell>
      </Column>
    </Table>
  );
}

export default UsersTable;
