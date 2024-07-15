<template>
  <div class="content-list">
    <div class="list-title">推送设置</div>
    <div class="list-content">
      <div class="push-view">
        <div class="item flex-view">
          <div class="label">推送邮箱</div>
          <div class="right-box">
            <input type="text" class="input-dom" placeholder="请输入邮箱" v-model="pushEmail" />
          </div>
        </div>
        <div class="item flex-view">
          <div class="label">接受邮件消息</div>
          <div class="right-box">
            <a-switch v-model:checked="pushSwitch" />
          </div>
        </div>
        <button class="save mg" @click="handleSave()">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入必要的模块和工具
import { message } from "ant-design-vue";
import { detailApi, updateUserInfoApi } from "/@/api/user";
import { useUserStore } from "/@/store";

// 获取路由和用户状态存储
const router = useRouter();
const userStore = useUserStore();

// 定义响应式变量
let pushEmail = ref(''); // 推送邮箱
let pushSwitch = ref(false); // 推送开关状态

// 组件挂载时执行的逻辑
onMounted(() => {
  getUserInfo(); // 获取用户信息
});

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  let userId = userStore.user_id; // 获取当前用户ID

  detailApi({ userId: userId })
    .then((res) => {
      if (res.data) {
        pushEmail.value = res.data.pushEmail; // 更新推送邮箱
        if (res.data.pushSwitch === '1') {
          pushSwitch.value = true; // 更新推送开关状态
        }
      }
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
    });
};

/**
 * 处理保存操作
 */
const handleSave = () => {
  // 邮箱格式校验正则表达式
  const reg = /^[a-zA-Z0-9][a-zA-Z0-9_]+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}(\.[a-zA-Z]{2,5})*$/i;

  // 校验推送邮箱格式
  if (!pushEmail.value.match(reg)) {
    message.warn('请输入正确的邮箱格式');
    return;
  }

  let userId = userStore.user_id; // 获取当前用户ID
  const formData = new FormData();
  formData.append('id', userId);
  if (pushEmail.value) {
    formData.append('pushEmail', pushEmail.value); // 添加推送邮箱
  }
  formData.append('pushSwitch', pushSwitch.value ? '1' : '0'); // 添加推送开关状态

  // 更新用户信息
  updateUserInfoApi(formData)
    .then((res) => {
      getUserInfo(); // 更新用户信息
      message.success('保存成功'); // 显示保存成功的消息
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
    });
};
</script>

<style scoped lang="less">
  progress {
    vertical-align: baseline;
  }

  .flex-view {
    display: flex;
  }

  input,
  textarea {
    outline: none;
    border-style: none;
  }

  button {
    padding: 0;
  }

  .content-list {
    flex: 1;

    .list-title {
      color: #152844;
      font-weight: 600;
      font-size: 18px;
      //line-height: 24px;
      height: 48px;
      margin-bottom: 4px;
      border-bottom: 1px solid #cedce4;
    }
  }

  .push-view {
    .item {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin: 24px 0;

      .label {
        width: 100px;
        color: #152844;
        font-weight: 600;
        font-size: 14px;
      }

      .input-dom {
        background: #f8fafb;
        border-radius: 4px;
        width: 400px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #152844;
        padding: 0 12px;
      }
    }

    .mg {
      margin-left: 100px;
    }

    .save {
      cursor: pointer;
      background: #4684e2;
      border-radius: 32px;
      width: 96px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      border: none;
      outline: none;
    }
  }

  .switch-view {
    position: relative;
    background: #a1adc5;
    border-radius: 32px;
    width: 48px;
    height: 28px;
    cursor: pointer;

    .circle {
      position: absolute;
      margin-left: 4px;
      top: 4px;
      width: 20px;
      height: 20px;
      background: #fff;
      border-radius: 50%;
    }

    .selected {
      right: 4px;
    }
  }

  .selected {
    background: #58b251;
  }
</style>
