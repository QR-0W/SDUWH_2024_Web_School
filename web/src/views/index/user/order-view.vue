<template>
  <div class="content-list">
    <div class="list-title">我的订单</div>
    <a-tabs default-active-key="1" @change="onTabChange">
      <a-tab-pane key="1" tab="全部" />
      <a-tab-pane key="2" tab="待付款" />
      <a-tab-pane key="3" tab="已支付" />
    </a-tabs>
    <div class="list-content">
      <div class="order-item-view" v-for="(item, index) in orderData" :key="index">
        <div class="header flex-view">
          <div class="left">
            <span class="text">订单号</span>
            <span class="num mg-4">#</span>
            <span class="num">{{ item.orderNumber }}</span>
            <span class="time">{{ getFormatTime(item.orderTime, true) }}</span>
          </div>
          <div class="right">
            <a-popconfirm v-if="item.status === '1'" title="确定取消订单？" ok-text="是" cancel-text="否" @confirm="handleCancel(item)">
              <a-button type="primary" size="small" style="margin-right: 24px">取消</a-button>
            </a-popconfirm>
            <span class="text">订单状态</span>
            <span class="state">{{ item.status === '1' ? '待支付' : item.status === '2' ? '已支付' : '已取消' }}</span>
          </div>
        </div>
        <div class="content flex-view">
          <div class="left-list">
            <div class="list-item flex-view">
              <img :src="item.cover" class="thing-img" />
              <div class="detail flex-between flex-view">
                <div class="flex-between flex-top flex-view">
                  <h2 class="name">{{ item.title }}</h2>
                  <span class="count">x{{ item.count }}</span>
                </div>
                <div class="flex-between flex-center flex-view">
                  <span class="type"></span>
                  <span class="price">¥{{ item.price }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right-info">
            <p class="title">收货信息</p>
            <p class="name">{{ item.receiverName }}{{ item.receiverPhone }} </p>
            <p class="text mg">{{ item.receiverAddress }} </p>
            <p class="title">快递单号</p>
            <p class="text"> </p>
            <p class="title">备注信息</p>
            <p class="text">{{ item.remark }} </p>
          </div>
        </div>
        <div class="bottom flex-view">
          <div class="left">
            <span class="text">共{{ item.count }}件商品</span>
            <span class="open" @click="handleDetail(item.thingId)">商品详情</span>
          </div>
          <div class="right flex-view">
            <span class="text">总计</span>
            <span class="num">¥ {{ item.price * item.count }}</span>
            <span class="text">优惠</span>
            <span class="num">¥0</span>
            <span class="text">实际支付</span>
            <span class="money">¥ {{ item.price * item.count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入必要的模块和工具
import { message } from "ant-design-vue";
import { getFormatTime } from "/@/utils/";
import { cancelUserOrderApi, userOrderListApi } from "/@/api/order";
import { BASE_URL } from "/@/store/constants";
import { useUserStore } from "/@/store";

// 获取路由和用户状态存储
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

// 定义响应式变量
const loading = ref(false); // 加载状态
const orderData = ref([]); // 订单数据
const orderStatus = ref(''); // 订单状态

// 组件挂载时执行的逻辑
onMounted(() => {
  getOrderList(); // 获取订单列表
});

/**
 * 处理选项卡切换事件
 * @param {string} key 选项卡的键
 */
const onTabChange = (key) => {
  console.log(key);
  if (key === '1') {
    orderStatus.value = ''; // 全部订单
  }
  if (key === '2') {
    orderStatus.value = '1'; // 待支付订单
  }
  if (key === '3') {
    orderStatus.value = '2'; // 已支付订单
  }
  getOrderList(); // 根据选项卡状态获取订单列表
};

/**
 * 获取订单列表
 */
const getOrderList = () => {
  loading.value = true; // 设置加载状态为true
  let userId = userStore.user_id; // 获取当前用户ID
  userOrderListApi({ userId: userId, status: orderStatus.value })
    .then((res) => {
      res.data.forEach((item, index) => {
        if (item.cover) {
          item.cover = BASE_URL + '/api/staticfiles/image/' + item.cover; // 设置图片的完整URL
        }
      });
      orderData.value = res.data; // 更新订单数据
      loading.value = false; // 设置加载状态为false
    })
    .catch((err) => {
      console.log(err); // 打印错误信息
      loading.value = false; // 设置加载状态为false
    });
};

/**
 * 处理订单详情查看
 * @param {string} thingId 订单关联的物品ID
 */
const handleDetail = (thingId) => {
  // 跳转新页面
  let text = router.resolve({ name: 'detail', query: { id: thingId } });
  window.open(text.href, '_blank');
};

/**
 * 处理取消订单操作
 * @param {Object} item 订单项
 */
const handleCancel = (item) => {
  cancelUserOrderApi({
    id: item.id,
  })
    .then((res) => {
      message.success('取消成功'); // 显示取消成功的消息
      getOrderList(); // 刷新订单列表
    })
    .catch((err) => {
      message.error(err.msg || '取消失败'); // 显示取消失败的消息
    });
};
</script>


<style scoped lang="less">
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
      line-height: 24px;
      height: 24px;
      margin-bottom: 4px;
    }
  }

  .order-item-view {
    background: #f7f9fb;
    border-radius: 4px;
    padding: 16px;
    margin-top: 12px;

    .header {
      border-bottom: 1px solid #cedce4;
      padding-bottom: 12px;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      font-size: 14px;

      .text {
        color: #6f6f6f;
      }

      .mg-4 {
        margin-left: 4px;
      }

      .num {
        font-weight: 500;
        color: #152844;
      }

      .num {
        font-weight: 500;
        color: #152844;
      }

      .time {
        margin-left: 16px;
        color: #a1adc5;
      }

      .state {
        color: #ff7b31;
        font-weight: 600;
        margin-left: 10px;
      }
    }

    .content {
      padding: 12px 0;
      overflow: hidden;

      .left-list {
        overflow: hidden;
        height: 132px;
        -webkit-box-flex: 2;
        -ms-flex: 2;
        flex: 2;
        padding-right: 16px;

        .list-item {
          height: 60px;
          margin-bottom: 12px;
          overflow: hidden;
          cursor: pointer;
        }

        .thing-img {
          width: 48px;
          height: 100%;
          margin-right: 12px;
        }

        .detail {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
        }

        .flex-between {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .flex-between {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .flex-top {
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
        }

        .name {
          color: #152844;
          font-weight: 600;
          font-size: 14px;
          line-height: 18px;
        }

        .count {
          color: #484848;
          font-size: 12px;
        }

        .flex-between {
          -webkit-box-pack: justify;
          -ms-flex-pack: justify;
          justify-content: space-between;
        }

        .flex-center {
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .type {
          color: #6f6f6f;
          font-size: 12px;
        }

        .price {
          color: #ff7b31;
          font-weight: 600;
          font-size: 14px;
        }
      }

      .right-info {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border-left: 1px solid #cedce4;
        padding-left: 12px;
        line-height: 22px;
        font-size: 14px;

        .title {
          color: #6f6f6f;
        }

        .name {
          color: #152844;
        }

        .text {
          color: #484848;
        }

        .mg {
          margin-bottom: 4px;
        }
      }
    }

    .bottom {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-top: 1px solid #cedce4;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      font-size: 14px;
      padding-top: 14px;

      .text {
        color: #6f6f6f;
      }

      .open {
        color: #4684e2;
        margin-left: 8px;
        cursor: pointer;
      }

      .right {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .text {
        color: #6f6f6f;
      }

      .num {
        color: #152844;
        margin: 0 40px 0 8px;
      }

      .money {
        font-weight: 600;
        font-size: 18px;
        color: #ff7b31;
        margin-left: 8px;
      }
    }
  }

  .order-item-view:first-child {
    margin-top: 16px;
  }
</style>
