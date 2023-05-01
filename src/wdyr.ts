/// <reference types="@welldone-software/why-did-you-render" />
import React from 'react';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_WDYR_ENABLED === 'true'
) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}
