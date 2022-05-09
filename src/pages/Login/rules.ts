export const rule = {
  mobile: [
    {
      required: true,
      message: '请输入手机号',
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      validateTrigger: 'onBlur',
    },
  ],
  verifyCode: [
    {
      required: true,
      message: '请输入验证码',
    },
    {
      len: 6,
      message: '请输入6位验证码',
      validateTrigger: 'onBlur',
    },
  ],
};
