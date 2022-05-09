import { createContext, useContext } from 'react';
import LoginStore from './login.store';

class RootStore {
  loginStore;
  constructor() {
    this.loginStore = new LoginStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
