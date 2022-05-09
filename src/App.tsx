import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RouterView from '@/router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <RouterView />
      </div>
    </BrowserRouter>
  );
}

export default App;
