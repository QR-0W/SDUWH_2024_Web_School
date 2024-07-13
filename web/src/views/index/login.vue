<template>
  <div class="container">
    <div class="login-page pc-style">
      <img :src="LogoIcon" alt="logo" class="logo-icon" />
      <div class="login-tab">
        <a-radio-group v-model:value="loginMethod" size="large">
          <a-radio-button value="password">密码登录</a-radio-button>
          <a-radio-button value="email">邮箱登录</a-radio-button>
        </a-radio-group>
      </div>
      <div class="mail-login" v-if="loginMethod === 'password'" type="login">
        <div class="common-input">
          <img :src="MailIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入用户名" v-model="pageData.loginForm.username" type="text" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
        <div class="common-input">
          <img :src="PwdIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入密码" v-model="pageData.loginForm.password" type="password" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
        <div class="next-btn-view">
          <button class="next-btn btn-active" style="margin: 16px 0px" @click="handleLogin">登录</button>
        </div>
      </div>
      <div class="mail-login" v-if="loginMethod === 'email'" type="login">
        <div class="common-input">
          <img :src="MailIcon" class="left-icon" />
          <div class="input-view">
            <input placeholder="请输入登录邮箱" v-model="pageData.mailForm.usermail" type="text" class="input" />
            <p class="err-view"> </p>
          </div>
        </div>
        <div class="common-input">
          <img :src="PwdIcon" class="left-icon" />
          <a-input-search
            v-model:value="pageData.mailForm.captcha"
            placeholder="请输入验证码"
            size="middle"
            enter-button="发送验证码"
            @search="handleEmailSend"
          />
        </div>
        <div class="next-btn-view">
          <button class="next-btn btn-active" style="margin: 16px 0px" @click="handleEmailLogin">登录</button>
        </div>
      </div>
      <div class="operation">
        <a @click="handleCreateUser" class="forget-pwd" style="text-align: left">注册新帐号</a>
        <a class="forget-pwd" style="text-align: right">忘记密码？</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore } from '/@/store';
  import { message } from 'ant-design-vue';
  import LogoIcon from '/@/assets/images/logo2.svg';
  import MailIcon from '/@/assets/images/mail-icon.svg';
  import PwdIcon from '/@/assets/images/pwd-icon.svg';

  const router = useRouter();
  const userStore = useUserStore();
  const loginMethod = ref('email');

  const pageData = reactive({
    loginForm: {
      username: '',
      password: '',
    },
    mailForm: {
      usermail: '',
      captcha: '',
    },
  });

  /**
   * 处理登录逻辑。
   *------------------------------------
   * 本函数负责调用userStore中的login方法，传入用户名和密码进行登录操作。
   * 成功登录后，会执行loginSuccess函数，并打印相关用户信息。
   * 如果登录失败，会显示错误提示。
   */
  const handleLogin = () => {
    userStore
      .login({
        username: pageData.loginForm.username,
        password: pageData.loginForm.password,
      })
      .then((res) => {
        loginSuccess();
        console.log('success==>', userStore.user_name);
        console.log('success==>', userStore.user_id);
        console.log('success==>', userStore.user_token);
      })
      .catch((err) => {
        message.warn(err.msg || '登录失败');
      });
  };

  const handleEmailSend = () => {
    userStore
      .sendcaptcha({ usermail: pageData.mailForm.usermail, sendtype: 'login' })
      .then((res) => {
        if (res.code == 200) {
          message.warn(res.msg || '发送成功');
        }
      })
      .catch((err) => {
        message.warn(err.msg || '发送失败');
      });
  };

  const handleEmailLogin = () => {
    userStore
      .verifycaptcha({
        usermail: pageData.mailForm.usermail,
        captcha: pageData.mailForm.captcha,
      })
      .then((res) => {
        loginSuccess();
        console.log('success==>', userStore.user_name);
        console.log('success==>', userStore.user_id);
        console.log('success==>', userStore.user_token);
      })
      .catch((err) => {
        message.warn(err.msg || '登录失败');
      });
  };
  /**
   * 跳转到用户注册页面
   *
   * 本函数用于导航到应用程序中的用户注册页面。它不接受任何参数，也不返回任何值。
   * 调用此函数将导致当前视图切换到注册页面，允许新用户创建他们的账户。
   */

  const handleCreateUser = () => {
    router.push({ name: 'register' });
  };

  /**
   * 登录成功后的处理函数。
   *
   * 该函数在用户成功登录后被调用，负责将用户重定向到主门户页面，并显示一条成功登录的消息。
   * 这样做是为了提供给用户明确的反馈，让用户知道登录操作已经成功完成，并且他们可以继续进行后续的操作。
   *
   * @returns {void} 该函数没有返回值。
   */
  const loginSuccess = () => {
    router.push({ name: 'portal' });
    message.success('登录成功！');
  };

</script>
//样式表
<style scoped lang="less">
  div {
    display: block;
  }

  .container {
    //background-color: #f1f1f1;
    background-image: url('../../../src/assets/images/75df48af78f22e4e8ed33de32d6c56c4.jpg');
    background-size: cover;
    object-fit: cover;
    height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .new-content {
    position: absolute;
    left: 0;
    right: 0;
    margin: 80px auto 0;
    width: 980px;
  }

  .logo-img {
    width: 125px;
    display: block;
    margin-left: 137.5px;
  }

  .login-page {
    overflow: hidden;
    background: #fff;

    .logo-icon {
      margin-top: 20px;
      margin-left: 175px;
      width: 48px;
      height: 48px;
    }
  }

  .pc-style {
    position: relative;
    width: 400px;
    height: 464px;
    background: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 2px 2px 6px #aaa;
    box-shadow: 2px 2px 6px #aaa;
  }

  .login-tab {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: #1e1e1e;
    font-size: 14px;
    color: #1e1e1e;
    font-weight: 500;
    height: 46px;
    line-height: 44px;
    margin-bottom: 40px;
    border-bottom: 1px solid #c3c9d5;

    div {
      position: relative;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-align: center;
      cursor: pointer;
    }

    .tabline {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      display: inline-block;
      width: 0;
      height: 2px;
      background: #3d5b96;
      -webkit-transition: width 0.5s cubic-bezier(0.46, 1, 0.23, 1.52);
      transition: width 0.5s cubic-bezier(0.46, 1, 0.23, 1.52);
    }

    tab-selected {
      color: #1e1e1e;
      font-weight: 500;
    }

    .mail-login .tel-login {
      padding: 0 28px;
    }
  }

  .mail-login {
    margin: 0px 24px;
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
        border: none;
        padding: 0;
        display: block;
        width: 100%;
        letter-spacing: 1.5px;
      }

      err-view {
        margin-top: 4px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: #f62a2a;
      }
    }
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

  button {
    background: transparent;
    padding: 0;
    border-width: 0px;
  }

  button,
  input,
  select,
  textarea {
    margin: 0;
    padding: 0;
    outline: none;
  }

  .operation {
    display: flex;
    flex-direction: row;
    margin: 0 24px;
  }

  .forget-pwd {
    //text-align: center;
    display: block;
    overflow: hidden;
    flex: 1;
    margin: 0 auto;
    color: #3d5b96;
    font-size: 14px;
    cursor: pointer;
  }
</style>
