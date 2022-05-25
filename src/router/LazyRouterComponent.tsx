import React, { lazy, Suspense } from 'react';

const LazyRouterComponent = (
  address: () => Promise<{
    default: React.ComponentType<any>;
  }>,
) => {
  const Element = lazy(address);
  return function WrapperComponent() {
    return (
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200,
            }}
          >
            loading...
          </div>
        }
      >
        <Element />
      </Suspense>
    );
  };
};

export default LazyRouterComponent;
