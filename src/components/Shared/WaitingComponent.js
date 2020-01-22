import React, { Suspense } from "react";
import SectionLoading from "./SectionLoading";

export default Component => {
  return props => (
    <Suspense fallback={SectionLoading}>
      <Component {...props} />
    </Suspense>
  );
};
