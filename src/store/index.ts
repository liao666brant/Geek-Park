import { createContext, useContext } from 'react';

import LoginStore from './login.store';
import UserStore from './user.store';

class RootStore {
  loginStore;
  userStore;
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
