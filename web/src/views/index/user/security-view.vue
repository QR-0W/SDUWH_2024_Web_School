<template>
  <div class="content-list">
    <div class="list-title">帐号安全</div>
    <div class="list-content">
      <div class="safe-view">
        <div class="safe-info-box">
          <div class="item flex-view">
            <div class="label">账号安全等级</div>
            <div class="right-box flex-center flex-view">
              <div class="safe-text">中风险</div>
              <progress max="3" class="safe-line" value="2"> </progress>
            </div>
          </div>
<!--          <div class="item flex-view">-->
<!--            <div class="label">绑定手机号</div>-->
<!--            <div class="right-box">-->
<!--              <input class="input-dom" placeholder="请输入手机号" />-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="edit-pwd-box" style="display;">
          <div class="pwd-edit">
            <!---->
            <div class="item flex-view">
              <div class="label">当前密码</div>
              <div class="right-box">
                <a-input-password placeholder="输入当前密码" v-model:value="password" />
              </div>
            </div>
            <div class="item flex-view">
              <div class="label">新密码</div>
              <div class="right-box">
                <a-input-password placeholder="输入新密码" v-model:value="newPassword1" />
              </div>
            </div>
            <div class="item flex-view">
              <div class="label">确认新密码</div>
              <div class="right-box">
                <a-input-password placeholder="重复输入密码" v-model:value="newPassword2" />
              </div>
            </div>
            <div class="item flex-view">
              <div class="label"> </div>
              <div class="right-box">
                <a-button type="primary" @click="handleUpdatePwd()">修改密码</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入必要的模块和工具
import { message } from "ant-design-vue";
import { updateUserPwdApi } from "/@/api/user";
import { useUserStore } from "/@/store";

// 获取路由和用户状态存储
const router = useRouter();
const userStore = useUserStore();

// 定义响应式变量
let password = ref(''); // 当前密码
let newPassword1 = ref(''); // 新密码
let newPassword2 = ref(''); // 确认新密码

// /**
//  * 处理绑定手机的操作
//  */
// const handleBindMobile = () => {
//   message.info('功能开发中'); // 显示功能开发中的提示
// };

/**
 * 处理更新密码的操作
 */
const handleUpdatePwd = () => {
  // 检查是否有空字段
  if (!password.value || !newPassword1.value || !newPassword2.value) {
    message.warn('不能为空');
    return;
  }
  // 检查新密码和确认新密码是否一致
  if (newPassword1.value !== newPassword2.value) {
    message.warn('密码不一致');
    return;
  }

  let userId = userStore.user_id; // 获取当前用户ID
  // 调用API更新密码
  updateUserPwdApi({
    userId: userId,
    password: password.value,
    newPassword: newPassword1.value,
  })
    .then((res) => {
      message.success('修改成功'); // 显示修改成功的消息
    })
    .catch((err) => {
      message.error(err.msg || '修改失败'); // 显示修改失败的消息
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

  .safe-view {
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

      .flex-center {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .safe-text {
        color: #c1bd51;
        font-weight: 600;
        font-size: 14px;
        margin-right: 18px;
      }

      .safe-line {
        background: #d3dce6;
        border-radius: 8px;
        width: 280px;
        height: 8px;
        overflow: hidden;
        color: #f6982a;
      }

      .input-dom {
        background: #f8fafb;
        border-radius: 4px;
        width: 240px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #5f77a6;
        padding: 0 12px;
        margin-right: 16px;
      }

      .change-btn {
        color: #4684e2;
        font-size: 14px;
        border: none;
        outline: none;
        cursor: pointer;
      }

      .wx-text {
        color: #5f77a6;
        font-size: 14px;
        margin-right: 16px;
      }

      .edit-pwd-btn {
        color: #4684e2;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
</style>
