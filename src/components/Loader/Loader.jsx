import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={260}
    height={260}
    viewBox="0 0 260 260"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="123" cy="136" r="108" />
  </ContentLoader>
);

export default Loader;
