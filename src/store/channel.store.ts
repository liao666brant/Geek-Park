import { makeAutoObservable } from 'mobx';

import { request } from '@/utils';

interface ChannelModel {
  id: number;
  name: string;
}

class ChannelStore {
  channelList = [] as ChannelModel[];
  constructor() {
    makeAutoObservable(this);
  }
  setChannelList = (channels: typeof this.channelList) => {
    this.channelList = channels;
  };
  // article publish 哪里调用这个函数呢？
  loadChannelList = async () => {
    const res = await request.get('/channels');
    this.setChannelList(res.data.channels);
  };
}

export default ChannelStore;
