const { FlexboxGrid, Loader } = require("rsuite");

function PageLoader() {
  return (
    <FlexboxGrid justify="center" align="middle" className="h100">
      <FlexboxGrid.Item>
        <Loader size="md" content="Medium" />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}

export default PageLoader;
