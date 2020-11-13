import { Badge, Icon, Table } from "rsuite";
import dayjs from "dayjs";
import { useEffect } from "react";
import ucFirst from "../util/uc-first";

const { Column, HeaderCell, Cell } = Table;

function GuidesTable({ guides, fetchGuides, onRowClick }) {
  useEffect(() => {
    !guides && fetchGuides();
  }, []);

  return (
    <Table
      height={420}
      data={guides || []}
      loading={!guides}
      onRowClick={onRowClick}
      autoHeight
      affixHeader
      wordWrap
    >
      <Column minWidth={100} flexGrow={1}>
        <HeaderCell>Title</HeaderCell>
        <Cell>
          {(rowData) => {
            const Inner = () => (
              <span className="text-capitalize">
                <strong>
                  {ucFirst(rowData.title)}
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
        <HeaderCell>...</HeaderCell>
        <Cell>
          {(rowData) => <span>{rowData.body.substring(0, 150) + "..."}</span>}
        </Cell>
      </Column>

      <Column minWidth={200} flexGrow={1}>
        <HeaderCell>Posted</HeaderCell>
        <Cell>
          {(rowData) => (
            <span>{dayjs(rowData.createdAt).format("MMM D, YYYY")}</span>
          )}
        </Cell>
      </Column>
    </Table>
  );
}

export default GuidesTable;
