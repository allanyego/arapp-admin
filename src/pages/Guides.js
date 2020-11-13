import { useEffect, useState } from "react";
import { Col, FlexboxGrid } from "rsuite";

import EntityDrawer from "../components/EntityDrawer";
import GuidesTable from "../components/GuidesTable";
import Helper from "../components/Helper";
import Page from "../components/Page";
import { useAppContext } from "../context/app";
import { editGuide, getGuides } from "../http/guides";
import useMounted from "../util/hooks/mounted";
import useToastManager from "../util/hooks/toast-manager";

function Guides() {
  const [guides, setGuides] = useState(null);
  const [selected, setSelected] = useState(null);
  const [isUpdating, setUpdating] = useState(false);
  const { currentUser } = useAppContext();
  const { isMounted, setMounted } = useMounted();
  const { onError } = useToastManager();

  const fetchGuides = async (opts = undefined) => {
    try {
      const { data } = await getGuides(currentUser.token, opts);
      isMounted && setGuides(data);
    } catch (error) {
      onError(error.message);
    }
  };
  const clearSelected = () => setSelected(null);
  const updateGuide = async (id) => {
    const toUpdate = guides.find((guide) => guide._id === id);
    if (!toUpdate) {
      return;
    }

    setUpdating(true);
    try {
      const newState = !toUpdate.active;
      await editGuide(id, currentUser.token, {
        active: newState,
      });

      setUpdating(false);
      clearSelected();

      setGuides([
        ...guides.map((guide) => {
          if (guide._id === id) {
            return {
              ...guide,
              active: newState,
            };
          }
          return guide;
        }),
      ]);
    } catch (error) {
      setUpdating(false);
      onError(error.message);
    }
  };

  useEffect(() => () => setMounted(false), []);

  return (
    <Page justify="center">
      <EntityDrawer
        entity={selected}
        clearSelected={clearSelected}
        onUpdate={updateGuide}
        isUpdating={isUpdating}
      />

      <FlexboxGrid.Item componentClass={Col} xs={24} sm={24} md={16}>
        <h1 className="text-center">Guide posts</h1>
        <hr />
        <Helper />
        <GuidesTable {...{ guides, fetchGuides, onRowClick: setSelected }} />
      </FlexboxGrid.Item>
    </Page>
  );
}

export default Guides;
