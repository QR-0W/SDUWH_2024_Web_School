<template>
  <div>
    <!-- 页面头部 -->
    <Header />

    <!-- 购物车页面主体 -->
    <section class="cart-page flex-view">
      <div class="left-flex">
        <!-- 订单明细标题 -->
        <div class="title flex-view">
          <h3>订单明细</h3>
        </div>

        <!-- 购物车商品列表 -->
        <div class="cart-list-view">
          <!-- 商品列表标题栏 -->
          <div class="list-th flex-view">
            <span class="line-1">商品名称</span>
            <span class="line-2">价格</span>
            <span class="line-5">数量</span>
            <span class="line-6">操作</span>
          </div>

          <!-- 商品列表内容 -->
          <div class="list">
            <div class="items flex-view">
              <div class="book flex-view">
                <!-- 商品封面图和标题 -->
                <img :src="pageData.cover" />
                <h2>{{ pageData.title }}</h2>
              </div>
              <!-- 商品价格 -->
              <div class="pay">¥{{ pageData.price }}</div>
              <!-- 商品数量选择 -->
              <a-input-number v-model:value="pageData.count" :min="1" :max="10" @change="onCountChange" />
              <!-- 删除商品按钮 -->
              <img :src="DeleteIcon" class="delete" />
            </div>
          </div>
        </div>

        <!-- 备注标题 -->
        <div class="title flex-view">
          <h3>备注</h3>
        </div>
        <!-- 备注输入框 -->
        <textarea v-model="pageData.remark" placeholder="输入备注信息，100字以内" class="remark"> </textarea>
      </div>

      <!-- 右侧区域 -->
      <div class="right-flex">
        <!-- 收货地址标题 -->
        <div class="title flex-view">
          <h3>收货地址</h3>
        </div>

        <!-- 收货地址展示区域 -->
        <div class="address-view">
          <div class="info" style="">
            <span>收件人：</span>
            <span class="name">{{ pageData.receiverName }} </span>
            <span class="tel">{{ pageData.receiverPhone }} </span>
          </div>
          <!-- 如果有收货地址则显示地址信息，否则显示添加地址提示 -->
          <div class="address" v-if="pageData.receiverAddress"> {{ pageData.receiverAddress }}</div>
          <div class="info" v-else>
            <span>目前暂无地址信息，请</span>
            <span class="info-blue" @click="handleAdd">新建地址</span>
          </div>
        </div>

        <!-- 结算标题和价格展示 -->
        <div class="title flex-view">
          <h3>结算</h3>
          <span class="click-txt">价格</span>
        </div>
        <div class="price-view">
          <!-- 商品总价等详细价格信息 -->
          <div class="price-item flex-view">
            <div class="item-name">商品总价</div>
            <div class="price-txt">¥{{ pageData.amount }}</div>
          </div>
          <div class="price-item flex-view">
            <div class="item-name">商品优惠</div>
            <div class="price-txt">¥0</div>
          </div>
          <div class="price-item flex-view">
            <div class="item-name">商品折扣</div>
            <div class="price-txt">¥0</div>
          </div>
          <!-- 合计价格 -->
          <div class="total-price-view flex-view">
            <span>合计</span>
            <div class="price">
              <span class="font-big">¥{{ pageData.amount }}</span>
            </div>
          </div>
          <!-- 返回和结算按钮 -->
          <div class="btns-view">
            <button class="btn buy" @click="handleBack()">返回</button>
            <button class="btn pay jiesuan" @click="handleJiesuan()">结算</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 新建地址弹窗 -->
    <div>
      <a-modal
        :visible="modal.visile"
        :forceRender="true"
        :title="modal.title"
        ok-text="确认"
        cancel-text="取消"
        @cancel="handleCancel"
        @ok="handleOk"
      >
        <a-form ref="myform" :label-col="{ style: { width: '80px' } }" :model="modal.form" :rules="modal.rules">
          <!-- 表单内容 -->
          <a-row :gutter="24">
            <a-col span="24">
              <a-form-item label="姓名" name="name">
                <a-input placeholder="请输入" v-model:value="modal.form.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col span="24">
              <a-form-item label="电话号码" name="mobile">
                <a-input placeholder="请输入" v-model:value="modal.form.mobile" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col span="24">
              <a-form-item label="送货地址" name="desc">
                <a-input placeholder="请输入" v-model:value="modal.form.desc" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col span="24">
              <a-form-item label="默认地址">
                <a-switch v-model:checked="modal.form.default" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import Header from '/@/views/index/components/header.vue';
  import Footer from '/@/views/index/components/footer.vue';
  import DeleteIcon from '/@/assets/images/delete-icon.svg';
  import { createApi } from '/@/api/order';
  import { listApi as listAddressListApi, createApi as createAddressApi } from '/@/api/address';
  import { useUserStore } from '/@/store';

  const router = useRouter();
  const route = useRoute();
  const userStore = useUserStore();

  // 响应式数据
  const pageData = reactive({
    id: undefined,
    title: undefined,
    cover: undefined,
    price: undefined,
    remark: undefined,
    count: 1,
    amount: undefined,
    receiverName: undefined,
    receiverPhone: undefined,
    receiverAddress: undefined,
  });

  // 弹窗相关数据
  const modal = reactive({
    visile: false,
    editFlag: false,
    title: '',
    form: {
      name: undefined,
      mobile: undefined,
      desc: undefined,
      default: undefined,
    },
    rules: {
      name: [{ required: true, message: '请输入', trigger: 'change' }],
    },
  });

  const myform = ref();

  // 组件挂载后的操作
  onMounted(() => {
    pageData.id = route.query.id;
    pageData.title = route.query.title;
    pageData.cover = route.query.cover;
    pageData.price = route.query.price;
    pageData.amount = pageData.price;

    listAddressData();
  });

  // 新建地址操作
  const handleAdd = () => {
    resetModal();
    modal.visile = true;
    modal.editFlag = false;
    modal.title = '新增';
    // 重置表单
    for (const key in modal.form) {
      modal.form[key] = undefined;
    }
  };

  // 确认新建地址
  const handleOk = () => {
    if (!userStore.user_id) {
      message.warn('请先登录');
      return;
    }
    myform.value
      ?.validate()
      .then(() => {
        const formData = new FormData();
        formData.append('userId', userStore.user_id);
        formData.append('def', modal.form.default ? '1' : '0');
        if (modal.form.name) {
          formData.append('name', modal.form.name);
        }
        if (modal.form.mobile) {
          formData.append('mobile', modal.form.mobile);
        }
        if (modal.form.desc) {
          formData.append('description', modal.form.desc);
        }
        // 创建地址请求
        createAddressApi(formData)
          .then((res) => {
            console.log(res);
            hideModal();
            // 更新页面地址信息
            pageData.receiverName = modal.form.name;
            pageData.receiverAddress = modal.form.desc;
            pageData.receiverPhone = modal.form.mobile;
          })
          .catch((err) => {
            message.error(err.msg || '新建失败');
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 取消操作
  const handleCancel = () => {
    hideModal();
  };

  // 关闭弹窗
  const hideModal = () => {
    modal.visile = false;
  };

  // 清空弹窗内容
  const resetModal = () => {
    modal.form.name = undefined;
    modal.form.mobile = undefined;
    modal.form.desc = undefined;
    modal.form.default = false;
  };

  // 返回按钮操作
  const handleBack = () => {
    router.go(-1);
  };

  // 结算按钮操作
  const handleJiesuan = () => {
    const cartData = new FormData();
    cartData.append('orderId', pageData.id);
    cartData.append('count', pageData.count.toString());
    cartData.append('amount', pageData.amount.toString());
    cartData.append('remark', pageData.remark || '');

    createApi(cartData)
      .then((res) => {
        console.log(res);
        message.success('提交成功');
        router.push('/order');
      })
      .catch((err) => {
        message.error(err.msg || '提交失败');
      });
  };

  // 商品数量改变操作
  const onCountChange = (val) => {
    pageData.count = val;
    pageData.amount = pageData.price * val;
  };

  // 获取地址列表
  const listAddressData = () => {
    listAddressListApi({ userId: userStore.user_id })
      .then((res) => {
        if (res.data.length > 0) {
          // 如果有默认地址，设置默认地址
          for (const item of res.data) {
            if (item.def === '1') {
              pageData.receiverName = item.name;
              pageData.receiverPhone = item.mobile;
              pageData.receiverAddress = item.description;
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
</script>

<style scoped lang="scss">
  .flex-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cart-page {
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;

    .left-flex {
      flex: 2;
      background-color: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin-right: 20px;

      .title {
        margin-bottom: 20px;
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
      }

      .cart-list-view {
        .list-th {
          background-color: #f0f0f0;
          padding: 10px 0;
          font-weight: bold;
          .line-1 {
            width: 400px;
          }
          .line-2 {
            width: 200px;
          }
          .line-5 {
            width: 200px;
          }
          .line-6 {
            width: 200px;
          }
        }
        .list {
          .items {
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
            align-items: center;
            .book {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              img {
                width: 80px;
                height: 80px;
                margin-right: 10px;
              }
              h2 {
                font-size: 16px;
              }
            }
            .pay {
              width: 100px;
            }
            .delete {
              width: 20px;
              cursor: pointer;
            }
          }
        }
      }

      .remark {
        width: 100%;
        height: 100px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        resize: none;
      }
    }

    .right-flex {
      flex: 1;
      background-color: #fff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;

      .title {
        margin-bottom: 20px;
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
      }

      .address-view {
        .info {
          margin-bottom: 10px;
          .info-blue {
            color: #1e90ff;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .name,
          .tel {
            margin-right: 10px;
          }
        }
        .address {
          margin-bottom: 10px;
          font-size: 14px;
        }
      }

      .price-view {
        .price-item {
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
          .item-name {
            flex: 1;
            font-size: 16px;
          }
          .price-txt {
            font-size: 16px;
          }
        }
        .total-price-view {
          margin-top: 20px;
          .price {
            margin-left: auto;
            .font-big {
              font-size: 24px;
              font-weight: bold;
              color: #ff0000;
            }
          }
        }
        .btns-view {
          margin-top: 20px;
          button {
            width: 100px;
            height: 40px;
            margin-right: 10px;
            cursor: pointer;
            &.buy {
              background-color: #f0f0f0;
              color: #666;
              border: none;
              &:hover {
                background-color: #e0e0e0;
              }
            }
            &.jiesuan {
              background-color: #ff0000;
              color: #fff;
              border: none;
              &:hover {
                background-color: #cc0000;
              }
            }
          }
        }
      }
    }
  }

  .ant-modal-body {
    padding: 20px !important;
  }

  .info-blue {
    color: #1e90ff;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .btn {
    display: inline-block;
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    &:hover {
      opacity: 0.8;
    }
  }
</style>
