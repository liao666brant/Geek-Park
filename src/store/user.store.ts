import { makeAutoObservable } from 'mobx';

import { request } from '@/utils';

interface UserInfoModel {
  id: string;
  photo: string;
  name: string;
  mobile: string;
  gender: number;
  birthday: string;
}

export default class UserStore {
  userInfo = {} as UserInfoModel;
  constructor() {
    makeAutoObservable(this);
  }

  setUserInfo = (data: Partial<UserInfoModel>) => {
    Object.assign(this.userInfo, data);
  };

  getUserInfo = async () => {
    const { data } = await request.get('/user/profile');
    // this.userInfo = data;
    this.setUserInfo(data);
  };
}
