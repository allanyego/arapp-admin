const { FlexboxGrid } = require("rsuite");

function Page({ children, align, justify, ...props }) {
  return (
    <FlexboxGrid {...{ align, justify, ...props }} className="page">
      {children}
    </FlexboxGrid>
  );
}

export default Page;
