<template>
  <div class="content-list">
    <div class="list-title">设置</div>
    <a-spin :spinning="loading" style="min-height: 200px">
      <div class="list-content">
        <div class="edit-view">
          <div class="item flex-view">
            <div class="label">头像</div>
            <div class="right-box avatar-box flex-view">
              <img v-if="tData.form && tData.form.avatar" :src="tData.form.avatar" class="avatar" />
              <img v-else :src="AvatarIcon" class="avatar" />
              <div class="change-tips flex-view">
                <a-upload name="file" accept="image/*" :multiple="false" :before-upload="beforeUpload">
                  <label>点击更换头像</label>
                </a-upload>
                <p class="tip">图片格式支持 GIF、PNG、JPEG，尺寸不小于 200 PX，小于 4 MB</p>
              </div>
            </div>
          </div>
          <div class="item flex-view">
            <div class="label">昵称</div>
            <div class="right-box">
              <input type="text" v-model="tData.form.nickname" placeholder="请输入昵称" maxlength="20" class="input-dom" />
              <p class="tip">支持中英文，长度不能超过 20 个字符</p>
            </div>
          </div>
          <div class="item flex-view">
            <div class="label">手机号</div>
            <div class="right-box">
              <input type="text" v-model="tData.form.mobile" placeholder="请输入邮箱" maxlength="100" class="input-dom web-input" />
            </div>
          </div>
          <div class="item flex-view">
            <div class="label">邮箱</div>
            <div class="right-box">
              <input type="text" v-model="tData.form.email" placeholder="请输入邮箱" maxlength="100" class="input-dom web-input" />
            </div>
          </div>
          <div class="item flex-view">
            <div class="label">个人简介</div>
            <div class="right-box">
              <textarea v-model="tData.form.description" placeholder="请输入简介" maxlength="200" class="intro"> </textarea>
              <p class="tip">限制200字以内</p>
            </div>
          </div>
          <button class="save mg" @click="submit()">保存</button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
// 导入必要的模块和工具
import { message } from "ant-design-vue";
import { detailApi, updateUserInfoApi } from "/@/api/user";
import { BASE_URL } from "/@/store/constants";
import { useUserStore } from "/@/store";
import AvatarIcon from "/@/assets/images/avatar.jpg";

// 获取路由和用户状态存储
const router = useRouter();
const userStore = useUserStore();

// 定义响应式变量和状态
let loading = ref(false); // 加载状态
let tData = reactive({
  form: {
    avatar: undefined, // 头像URL
    avatarFile: undefined, // 头像文件
    nickname: undefined, // 昵称
    email: undefined, // 邮箱
    mobile: undefined, // 手机号
    description: undefined, // 描述
  },
});

// 组件挂载时执行的逻辑
onMounted(() => {
  getUserInfo(); // 获取用户信息
});

/**
 * 文件上传前的处理函数
 * @param {File} file 上传的文件
 * @returns {boolean} 返回false以阻止默认上传行为
 */
const beforeUpload = (file) => {
  // 改文件名
  const fileName = new Date().getTime().toString() + '.' + file.type.substring(6);
  const copyFile = new File([file], fileName);
  console.log(copyFile);
  tData.form.avatarFile = copyFile;
  return false;
};

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  loading.value = true; // 设置加载状态为true
  let userId = userStore.user_id; // 获取当前用户ID
  detailApi({ userId: userId })
    .then((res) => {
      tData.form = res.data; // 更新表单数据
      if (tData.form.avatar) {
        tData.form.avatar = BASE_URL + '/api/staticfiles/avatar/' + tData.form.avatar; // 更新头像URL
      }
      loading.value = false; // 设置加载状态为false
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
      loading.value = false; // 设置加载状态为false
    });
};

/**
 * 提交表单数据
 */
const submit = () => {
  let formData = new FormData();
  let userId = userStore.user_id; // 获取当前用户ID
  formData.append('id', userId);
  if (tData.form.avatarFile) {
    formData.append('avatarFile', tData.form.avatarFile); // 添加头像文件
  }
  if (tData.form.nickname) {
    formData.append('nickname', tData.form.nickname); // 添加昵称
  }
  if (tData.form.email) {
    formData.append('email', tData.form.email); // 添加邮箱
  }
  if (tData.form.mobile) {
    formData.append('mobile', tData.form.mobile); // 添加手机号
  }
  if (tData.form.description) {
    formData.append('description', tData.form.description); // 添加描述
  }
  // 更新用户信息
  updateUserInfoApi(formData)
    .then((res) => {
      message.success('保存成功'); // 显示保存成功的消息
      getUserInfo(); // 更新用户信息
      setTimeout(() => {
        window.location.reload(); // 刷新页面
      }, 500); // 设置延迟时间，单位为毫秒，可以根据需要调整
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
    });
};

</script>


<style scoped lang="less">
  input,
  textarea {
    border-style: none;
    outline: none;
    margin: 0;
    padding: 0;
  }

  .flex-view {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .content-list {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;

    .list-title {
      color: #152844;
      font-weight: 600;
      font-size: 18px;
      line-height: 48px;
      height: 48px;
      margin-bottom: 4px;
      border-bottom: 1px solid #cedce4;
    }

    .edit-view {
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

        .right-box {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 16px;
        }

        .change-tips {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -ms-flex-wrap: wrap;
          flex-wrap: wrap;
        }

        label {
          color: #4684e2;
          font-size: 14px;
          line-height: 22px;
          height: 22px;
          cursor: pointer;
          width: 100px;
          display: block;
        }

        .tip {
          color: #6f6f6f;
          font-size: 14px;
          height: 22px;
          line-height: 22px;
          margin: 0;
          width: 100%;
        }

        .right-box {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
        }

        .input-dom {
          width: 400px;
        }

        .input-dom {
          background: #f8fafb;
          border-radius: 4px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          color: #152844;
          padding: 0 12px;
        }

        .tip {
          font-size: 12px;
          line-height: 16px;
          color: #6f6f6f;
          height: 16px;
          margin-top: 4px;
        }

        .intro {
          resize: none;
          background: #f8fafb;
          width: 100%;
          padding: 8px 12px;
          height: 82px;
          line-height: 22px;
          font-size: 14px;
          color: #152844;
        }
      }

      .save {
        background: #4684e2;
        border-radius: 32px;
        width: 96px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #fff;
        border: none;
        outline: none;
        cursor: pointer;
      }

      .mg {
        margin-left: 100px;
      }
    }
  }
</style>
