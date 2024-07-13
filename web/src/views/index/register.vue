<template>
  <div class="container">
    <div class="tel-regist-page pc-style">
      <div class="regist-title">
        <span>注册新账号</span>
        <span @click="router.push({ name: 'login' })" class="toWxLogin">我要登录</span>
      </div>
      <div class="regist-padding">
        <div class="common-input">
          <img :src="UserIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入用户名" v-model="tData.registerForm.username" type="text" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
      </div>
      <div class="regist-padding">
        <div class="common-input">
          <img :src="PwdIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入密码" v-model="tData.registerForm.password" type="password" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
      </div>
      <div class="regist-padding">
        <div class="common-input">
          <img :src="PwdIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请再次输入密码" v-model="tData.registerForm.repassword" type="password" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
      </div>

      <div class="regist-padding">
        <div class="common-input">
          <img :src="MailIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入邮箱" v-model="tData.registerForm.usermail" type="text" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
      </div>
      <div class="regist-padding">
        <!-- <a-divider style="height: 2px; background-color: #7c7878" /> -->
        <div class="common-input">
          <img :src="PwdIcon" class="left-icon" />
          <a-input-search
            v-model:value="tData.registerForm.captcha"
            placeholder="请输入验证码"
            size="middle"
            enter-button="发送验证码"
            @search="handleEmailSend"
          />
        </div>
      </div>
      <div class="tel-login">
        <div class="next-btn-view">
          <button class="next-btn" @click="handleRegister">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入必要的模块和组件
import { userRegisterApi } from '/@/api/user';
import { message } from 'ant-design-vue';
import MailIcon from '/@/assets/images/mail-icon.svg';
import PwdIcon from '/@/assets/images/pwd-icon.svg';
import { useUserStore } from '/@/store';
import UserIcon from '/@/assets/images/user.svg';

const router = useRouter(); // 获取路由对象，用于页面跳转
const userStore = useUserStore(); // 获取用户存储对象，用于管理用户状态

// 定义响应式数据对象，用于存储注册表单信息
const tData = reactive({
  registerForm: {
    username: '', // 用户名
    usermail: '', // 邮箱
    captcha: '',  // 验证码
    password: '', // 密码
    repassword: '', // 确认密码
  },
});

/**
 * 处理注册逻辑。
 * 检查表单字段是否为空，如果为空则显示警告消息。
 * 如果所有字段都已填写，则调用userRegister函数执行注册操作。
 */
const handleRegister = async () => {
  if (
    tData.registerForm.username === '' ||
    tData.registerForm.password === '' ||
    tData.registerForm.repassword === '' ||
    tData.registerForm.usermail === '' ||
    tData.registerForm.captcha === ''
  ) {
    message.warn('不能为空！');
    return;
  } else {
    userRegister();
  }
};

/**
 * 处理发送邮箱验证码的逻辑。
 * 调用userStore中的sendcaptcha方法，传入用户邮箱，发送注册验证码。
 * 如果验证码发送成功，则显示成功提示。
 * 如果发送失败，则显示错误提示。
 */
const handleEmailSend = async () => {
  userStore
    .sendcaptcha({ usermail: tData.registerForm.usermail, sendtype: 'register' })
    .then((res) => {
      if (res.code == 200) {
        message.warn(res.msg || '发送成功');
      }
    })
    .catch((err) => {
      message.warn(err.msg || '发送失败');
    });
};

/**
 * 注册用户。
 * 调用userRegisterApi方法，传入注册表单数据进行注册操作。
 * 如果注册成功，则显示成功消息并跳转到登录页面。
 * 如果注册失败，则显示错误消息。
 */
const userRegister = () =>
  userRegisterApi({
    username: tData.registerForm.username,
    password: tData.registerForm.password,
    rePassword: tData.registerForm.repassword,
    captcha: tData.registerForm.captcha,
    email: tData.registerForm.usermail,
  })
    .then((res) => {
      message.success('注册成功！');
      router.push({ name: 'login' });
    })
    .catch((err) => {
      message.error(err.msg || '注册失败');
    });
</script>


<style scoped lang="less">
  div {
    display: block;
  }

  *,
  :after,
  :before,
  img {
    border-style: none;
  }

  *,
  :after,
  :before {
    border-width: 0;
    border-color: #dae1e7;
  }

  .container {
    max-width: 100%;
    //background: #142131;
    background-image: url('../../assets/images/117201993_p1.jpg');
    background-size: cover;
    object-fit: cover;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pc-style {
    position: relative;
    width: 400px;
    height: 500px;
    background: #fff;
    -webkit-box-shadow: 2px 2px 6px #aaa;
    box-shadow: 2px 2px 6px #aaa;
    border-radius: 4px;
  }

  .tel-regist-page {
    overflow: hidden;

    .regist-title {
      font-size: 14px;
      color: #1e1e1e;
      font-weight: 500;
      height: 24px;
      line-height: 24px;
      margin: 40px 0;
      padding: 0 28px;

      .toWxLogin {
        color: #3d5b96;
        float: right;
        cursor: pointer;
      }
    }

    .regist-padding {
      padding: 0 28px;
      margin-bottom: 8px;
    }
  }

  .common-input {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;

    .left-icon {
      margin-right: 12px;
      width: 24px;
    }

    .input-view {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;

      .input {
        font-weight: 500;
        font-size: 14px;
        color: #1e1e1e;
        height: 26px;
        line-height: 26px;
        padding: 0;
        display: block;
        width: 100%;
        letter-spacing: 1.5px;
        outline: none; // 去掉边框线
      }

      .err-view {
        margin-top: 4px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #f62a2a;
      }
    }
  }

  .tel-login {
    padding: 25px 28px;
  }

  .next-btn {
    background: #3d5b96;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 100%;
    outline: none;
    cursor: pointer;
  }
</style>
