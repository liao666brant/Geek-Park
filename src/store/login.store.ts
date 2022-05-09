import { getToken, request, setToken } from '@/utils';
import { makeAutoObservable } from 'mobx';

class LoginStore {
  token = getToken() || '';

  constructor() {
    makeAutoObservable(this);
  }

  setToken = async ({ mobile, code }: { mobile: number; code: string }) => {
    const { data } = await request({
      url: 'http://geek.itheima.net/v1_0/authorizations',
      method: 'POST',
      data: { mobile, code },
    });
    this.token = data.token;
    // 存入本地
    setToken(data.token);
  };
}

export default LoginStore;
