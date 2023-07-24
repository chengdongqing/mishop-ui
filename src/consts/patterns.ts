export default {
  username: /^[\u4e00-\u9fa5\w]{2,20}$/,
  phoneNumber: /^1[3-9]\d{9}$/,
  email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  password: /^\w{8,20}$/,
  verificationCode: /^\d{6}$/
};
