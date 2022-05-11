import './App.scss';

import React from 'react';

import RouterView from '@/router';
import { history, HistoryRouter } from '@/utils/history';

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <RouterView />
      </div>
    </HistoryRouter>
  );
}

export default App;
