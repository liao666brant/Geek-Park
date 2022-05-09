import './index.scss';

import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useStore } from '@/store';

import { rule } from './rules';

export default function Login() {
  const { loginStore } = useStore();
  const navigate = useNavigate();

  const initFormValue = {
    remember: false,
    mobile: 13811111111,
    code: '246810',
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);

    loginStore
      .setToken({
        mobile: values.mobile,
        code: values.code,
      })
      .then(() => {
        // 跳转首页
        navigate('/', { replace: true });
        message.success('登陆成功');
      })
      .catch((err) => message.error(err.response?.data?.message || '登录失败'));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger={['onBlur', 'onChange']}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={initFormValue}
        >
          <Form.Item name="mobile" rules={rule.mobile}>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="code" rules={rule.verifyCode}>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
