import { createContext, useContext } from 'react';

import ChannelStore from './channel.store';
import LoginStore from './login.store';
import UserStore from './user.store';

class RootStore {
  loginStore;
  userStore;
  channelStore;
  constructor() {
    this.loginStore = new LoginStore();
    this.userStore = new UserStore();
    this.channelStore = new ChannelStore();
  }
}

const rootStore = new RootStore();
const context = createContext(rootStore);

const useStore = () => useContext(context);

export { useStore };
