<template>
  <div>
    <Header/>
    <div class="pay-content">
      <div class="title">订单生成成功</div>
      <div class="text time-margin">
        <span>请在 </span>
        <span class="time">{{ ddlTime }}</span>
        <span> 之前付款，超时订单将自动取消</span>
      </div>
      <a-descriptions
        title="订单详情"
        bordered
        :column="{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }"
      >
        <a-descriptions-item label="家教姓名">{{detailData.title}}</a-descriptions-item>
        <a-descriptions-item class="state" label="科目">{{classification_title}}</a-descriptions-item>
        <a-descriptions-item label="价格">{{detailData.price}}元/小时</a-descriptions-item>
        <a-descriptions-item label="性别">{{detailData.sex}}</a-descriptions-item>
        <a-descriptions-item label="年龄">{{detailData.age}}</a-descriptions-item>
        <a-descriptions-item label="地区">{{detailData.location}}</a-descriptions-item>
        <a-descriptions-item label="简介">
          {{detailData.description}}
        </a-descriptions-item>
      </a-descriptions>  
      
      <div>
        <div>
          <br/>
          <div class="label">时长(小时)</div>
          <br/>
          <div class="timeCountInput-Style">
            <input type="number" id="timeCountInput" placeholder="请输入时长" maxlength="100" class="input-dom web-input" min="1">
          </div>
        </div>
        <br/>
        <div class="text">支付金额</div>
        <div class="price">
          <span class="num" id="amountSpan">0</span>
          <span>元</span>
        </div>
      </div>
      <div class="pay-choose-view" style="">
        <div class="pay-choose-box flex-view">
          <div id="wxPay" class="choose-box choose-box-active">
            <img :src="WxPayIcon">
            <span>微信支付</span>
          </div>
          <div id="aliPay" class="choose-box">
            <img :src="AliPayIcon">
            <span>支付宝</span>
          </div>
        </div>
        <div class="tips">请选择任意一种支付方式</div>
        <div class="flex-view">
          <button class="pay-btn pay-btn-active" @click="handlePay()">确认支付</button>
          <button class="pay-btn" @click="handleCancle()">取消订单</button>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import Header from '/@/views/index/components/header.vue'
import Footer from '/@/views/index/components/footer.vue'
import {message} from "ant-design-vue";
import WxPayIcon from '/@/assets/images/wx-pay-icon.svg';
import AliPayIcon from '/@/assets/images/ali-pay-icon.svg';
import {
  detailApi,
  listApi as listThingList,
} from '/@/api/thing'
import {BASE_URL} from "/@/store/constants";
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {useUserStore} from "/@/store";
import {getFormatTime} from "/@/utils";
import {listApi, userOrderListApi, createApi, deleteApi, cancelApi, cancelUserOrderApi} from '/@/api/order'


let orderData = reactive({
  form:{
    id: undefined,
    status: 0,
    orderTime: 0,
    payTime: 0,
    thingId: undefined,
    userId: undefined,
    count: 0,
    price: 0,
    username: undefined,
    title: undefined
  }
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore();

let count:Number = 0
let thingId = ref('')
let detailData = ref({})
let ddlTime = ref()
let classification_title = ref('')

// 定义 TypeScript 类型
interface HTMLElements {
  timeCountInput: HTMLInputElement | null;
  amountSpan: HTMLElement | null;
}

onMounted(() => {
  thingId.value = route.query.id.trim()
  getThingDetail()

  // 获取 DOM 元素
  const elements: HTMLElements = {
    timeCountInput: document.getElementById("timeCountInput") as HTMLInputElement,
    amountSpan: document.getElementById("amountSpan"),
  };
  // 监听 timeCount 输入框的变化事件
  elements.timeCountInput?.addEventListener("change", function() {
    const timeCount: number = parseInt(elements.timeCountInput?.value || "0");
    const amount: number = timeCount * parseInt(detailData.value.price);
    count = amount
    elements.amountSpan!.textContent = amount.toString();
  });

  // 获取支付方式元素
  const wxPayElement = document.getElementById("wxPay");
  const aliPayElement = document.getElementById("aliPay");
  // 添加点击事件监听器
  wxPayElement?.addEventListener("click", function() {
    // 移除之前选中的支付方式的样式
    aliPayElement?.classList.remove("choose-box-active");
    // 添加当前选中的支付方式的样式
    wxPayElement?.classList.add("choose-box-active");
  });

  aliPayElement?.addEventListener("click", function() {
    // 移除之前选中的支付方式的样式
    wxPayElement?.classList.remove("choose-box-active");
    // 添加当前选中的支付方式的样式
    aliPayElement?.classList.add("choose-box-active");
  });
  orderData.form.orderTime = new Date().getTime();
  ddlTime.value = formatDate(new Date().getTime(), 'YY-MM-DD hh:mm:ss')
})

const getThingDetail =()=> {
  detailApi({id: thingId.value}).then(res => {
    detailData.value = res.data
    detailData.value.cover = BASE_URL + '/api/staticfiles/image/' + detailData.value.cover
    if(detailData.classificationId == "1"){
      classification_title = "小学"
    } else if(detailData.value.classificationId == "2"){
      classification_title = "初中"
    } else if(detailData.value.classificationId == "3"){
      classification_title = "高中"
    }
    console.log(detailData)
  }).catch(err => {
    message.error('获取详情失败')
  })
}

const getOrderData = (status:String) => {
  let userId = userStore.user_id
  orderData.form.payTime = new Date().getTime();
  orderData.form.userId = userId
  orderData.form.thingId = thingId
  orderData.form.status = status
  orderData.form.count = count
  orderData.form.price = detailData.value.price
  orderData.form.username = userStore.user_name
  orderData.form.title = detailData.value.title

  let orderForm = new FormData()
  orderForm.append("status", orderData.form.status)
  orderForm.append("payTime", orderData.form.payTime)
  orderForm.append("userId", orderData.form.userId)
  orderForm.append("thingId", orderData.form.thingId)
  orderForm.append("count", orderData.form.count)
  orderForm.append("price", orderData.form.price)
  orderForm.append("username", orderData.form.username)
  orderForm.append("title", orderData.form.title)
  orderForm.append("orderTime", orderData.form.orderTime)
  return orderForm
}

const handlePay = () => {
  createApi(getOrderData("2")).then(res => {
    message.success('保存成功，后台审核中')
  }).catch(err => {
    console.log(err)
  })
  let text = router.resolve({name: 'jiajiaoOrderView'})
  window.open(text.href, '_blank')
}

const handleCancle = () => {
  createApi(getOrderData("7")).then(res => {
    message.success('保存成功，后台审核中')
  }).catch(err => {
    console.log(err)
  })
}

const formatDate = (time, format = 'YY-MM-DD hh:mm:ss') => {
  const date = new Date(time)

  const year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate() + 1,
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds()
  const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index
  })

  const newTime = format.replace(/YY/g, year)
      .replace(/MM/g, preArr[month] || month)
      .replace(/DD/g, preArr[day] || day)
      .replace(/hh/g, preArr[hour] || hour)
      .replace(/mm/g, preArr[min] || min)
      .replace(/ss/g, preArr[sec] || sec)

  return newTime
}
</script>

<style scoped lang="less">
.flex-view {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.image-container {
    max-width: 260px; /* 设置图片容器的最大宽度 */
  }
  
  .image-container img {
    max-width: 100%; /* 图片的最大宽度为容器的宽度 */
    height: auto; /* 高度自动调整以保持比例 */
  }
  .right-box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
.pay-content {
  position: relative;
  margin: 120px auto 0;
  width: 500px;
  background: #fff;
  overflow: hidden;
.timeCountInput-Style input{
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
  .img-view {
        //background: #f3f3f3;
        //text-align: center;
        height: 200px;
        width: 255px;
        //border: 1px #f3f3f3 solid;

        img {
          height: 200px;
          width: 255px;
          overflow: hidden;
          margin: 0 auto;
          background-size: contain;
          object-fit: contain;
        }
      }

  .label{
    font-weight: 400;
    font-size: 20px;
  }
  .title {
    color: #152844;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;
    height: 22px;
    text-align: center;
    margin-bottom: 11px;
  }

  .timeSelect {
    color: #152844;
    font-weight: 500;
    font-size: 24px;
    line-height: 22px;
    height: 22px;
    text-align: center;
    margin-bottom: 11px;
  }

  .time-margin {
    margin: 11px 0 24px;
  }

  .text {
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    text-align: center;
    color: #152844;
  }

  .time {
    color: #f62a2a;
  }

  .text {
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    text-align: center;
    color: #152844;
  }

  .price {
    color: #ff8a00;
    font-weight: 500;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    text-align: center;

    .num {
      font-size: 28px;
    }
  }

  .pay-choose-view {
    margin-top: 24px;

    .choose-box {
      width: 140px;
      height: 126px;
      border: 1px solid #cedce4;
      border-radius: 4px;
      text-align: center;
      cursor: pointer;
    }

    .pay-choose-box {
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      max-width: 300px;
      margin: 0 auto;

      img {
        height: 40px;
        margin: 24px auto 16px;
        display: block;
      }
    }

    .tips {
      color: #6f6f6f;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      text-align: center;
      margin: 16px 0 24px;
    }

    .choose-box-active {
      border: 1px solid #4684e2;
    }

    .tips {
      color: #6f6f6f;
      font-size: 14px;
      line-height: 22px;
      height: 22px;
      text-align: center;
      margin: 16px 0 24px;
    }

    .pay-btn {
      cursor: pointer;
      background: #c3c9d5;
      border-radius: 32px;
      width: 104px;
      height: 32px;
      line-height: 32px;
      border: none;
      outline: none;
      font-size: 14px;
      color: #fff;
      text-align: center;
      display: block;
      margin: 0 auto;
    }

    .pay-btn-active {
      background: #4684e2;
    }
  }
}

.hide {
  display: none;
}

.detail-content {
  display: flex;
  flex-direction: column;
  width: 1100px;
  margin: 4px auto;
}

.flex-view {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.hidden-lg {
  display: none !important;
}

.thing-infos-view {
  display: flex;
  margin: 89px 0 40px;
  overflow: hidden;

  .thing-infos {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: flex;
  }

  .mobile-share-box {
    height: 38px;
    background: transparent;
    padding: 0 16px;
    margin: 12px 0;
    font-size: 0;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;

    .state {
      width: 64px;
      height: 24px;
      line-height: 24px;
      background: rgba(70, 132, 226, .1);
      border-radius: 2px;
      font-weight: 500;
      font-size: 12px;
      color: #4684e2;
      text-align: center;
    }

    .share-img {
      background: #fff;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      text-align: center;

      img {
        position: relative;
        top: 4px;
        width: 24px;
      }
    }
  }

  .thing-info-box {
    text-align: left;
    padding: 0;
    margin: 0;
  }

  .thing-state {
    height: 26px;
    line-height: 26px;

    .state {
      font-weight: 500;
      color: #4684e2;
      background: rgba(70, 132, 226, .1);
      border-radius: 2px;
      padding: 5px 8px;
      margin-right: 16px;
    }

    span {
      font-size: 14px;
      color: #152844;
    }
  }

  .thing-name {
    line-height: 32px;
    margin: 16px 0;
    color: #0F1111!important;
    font-size: 15px!important;
    font-weight: 400!important;
    font-style: normal!important;
    text-transform: none!important;
    text-decoration: none!important;
  }

  .translators, .authors {
    line-height: 18px;
    font-size: 14px;
    margin: 8px 0;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;

    .name {
      color: #315c9e;
      white-space: normal;
    }
  }

  .tags {
    position: absolute;
    bottom: 20px;
    margin-top: 16px;

    .category-box {
      color: #152844;
      font-size: 14px;

      .title {
        color: #787878;
      }
    }
  }

  .thing-counts {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 235px;
    flex: 0 0 235px;
    margin-left: 20px;
  }

  .pointer {
    cursor: pointer;
  }

  .count-item {
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
  }

  .count-img {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 32px;
    flex: 0 0 32px;
    margin-right: 24px;
    font-size: 0;

    img {
      width: 100%;
      display: block;
    }
  }

  .count-box {
    position: relative;
    border-bottom: 1px solid #cedce4;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
  }

  .count-text-box {
    font-size: 0;

    .count-title {
      color: #152844;
      font-weight: 600;
      font-size: 16px;
      line-height: 18px;
      display: block;
      height: 18px;
    }
  }

  .count-num-box {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #152844;
  }
}

.buy-btn {
  cursor: pointer;
  display: block;
  background: #4684e2;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  width: 110px;
  outline: none;
  border: none;
  margin-top: 18px;
  margin-left: 20px;
  margin-right: 20px;
}

.buy-btn img {
  width: 12px;
  margin-right: 2px;
  vertical-align: middle;
}

.buy-btn span {
  vertical-align: middle;
}

.buy-way {
  overflow: hidden;

  .title {
    font-weight: 600;
    font-size: 18px;
    height: 26px;
    line-height: 26px;
    color: #152844;
    margin-bottom: 12px;
  }
}

.thing-content-view {
  margin-top: 40px;
  padding-bottom: 50px;
}

.main-content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;

  .text {
    color: #484848;
    font-size: 16px;
    line-height: 26px;
    padding-left: 12px;
    margin: 11px 0;
    white-space: pre-wrap;
  }
}

.main-tab {
  border-bottom: 1px solid #cedce4;
}

.order-view {
  position: relative;
  color: #6c6c6c;
  font-size: 14px;
  line-height: 40px;

  .title {
    margin-right: 8px;
  }

  .tab {
    margin-right: 20px;
    cursor: pointer;
    color: #5f77a6;
    font-size: 16px;
    cursor: pointer;
  }

  .tab-select {
    color: #152844;
    font-weight: 600;
  }

  .tab-underline {
    position: absolute;
    bottom: 0;
    left: 84px;
    width: 16px;
    height: 4px;
    background: #4684e2;
    -webkit-transition: left .3s;
    transition: left .3s;
  }
}

.recommend {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 235px;
  flex: 0 0 235px;
  margin-left: 20px;

  .title {
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
    color: #152844;
    margin-bottom: 12px;
  }

  .things {
    border-top: 1px solid #cedce4;

    .thing-item {
      min-width: 255px;
      max-width: 255px;
      position: relative;
      flex: 1;
      margin-right: 20px;
      height: fit-content;
      overflow: hidden;
      margin-top: 26px;
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px #e1e1e1 solid;
      cursor: pointer;

      .img-view {
        //background: #f3f3f3;
        //text-align: center;
        height: 200px;
        width: 255px;
        //border: 1px #f3f3f3 solid;

        img {
          height: 200px;
          width: 255px;
          overflow: hidden;
          margin: 0 auto;
          background-size: contain;
          object-fit: contain;
        }
      }

      .info-view {
        //background: #f6f9fb;
        overflow: hidden;
        padding: 0 16px;
        .thing-name {
          line-height: 32px;
          margin-top: 12px;
          color: #0F1111!important;
          font-size: 15px!important;
          font-weight: 400!important;
          font-style: normal!important;
          text-transform: none!important;
          text-decoration: none!important;
        }

        .price {
          color: #ff7b31;
          font-size: 20px;
          line-height: 20px;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .translators {
          color: #6f6f6f;
          font-size: 12px;
          line-height: 14px;
          margin-top: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

  }
}

.flex-view {
  display: flex;
}

.thing-comment {
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 22px;
    height: 22px;
    color: #152844;
    margin: 24px 0 12px;
  }

  .publish {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

    .mine-img {
      -webkit-box-flex: 0;
      -ms-flex: 0 0 40px;
      flex: 0 0 40px;
      margin-right: 12px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .content-input {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: #f6f9fb;
      border-radius: 4px;
      height: 32px;
      line-height: 32px;
      color: #484848;
      padding: 5px 12px;
      white-space: nowrap;
      outline: none;
      border: 0px;
    }

    .send-btn {
      margin-left: 10px;
      background: #4684e2;
      border-radius: 4px;
      -webkit-box-flex: 0;
      -ms-flex: 0 0 80px;
      flex: 0 0 80px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      height: 32px;
      line-height: 32px;
      outline: none;
      border: 0px;
      cursor: pointer;
    }
  }

  .tab-view {
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 24px 0;

    .count-text {
      color: #484848;
      float: left;
    }

    .tab-box {
      color: #5f77a6;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

      .tab-select {
        color: #152844;
      }

      span {
        cursor: pointer;
      }
    }

    .line {
      width: 1px;
      height: 12px;
      margin: 0 12px;
      background: #cedce4;
    }
  }
}


.comments-list {
  .comment-item {
    .flex-item {
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-top: 16px;

      .avator {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 40px;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        margin-right: 12px;
        border-radius: 50%;
        cursor: pointer;
      }

      .person {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }

      .name {
        color: #152844;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        height: 22px;
        cursor: pointer;
      }

      .time {
        color: #5f77a6;
        font-size: 12px;
        line-height: 16px;
        height: 16px;
        margin-top: 2px;
      }

      .float-right {
        color: #4684e2;
        font-size: 14px;
        float: right;

        span {
          margin-left: 19px;
          cursor: pointer;
        }

        .num {
          color: #152844;
          margin-left: 6px;
          cursor: auto;
        }
      }
    }
  }
}

.comment-content {
  margin-top: 8px;
  color: #484848;
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 16px;
  border-bottom: 1px dashed #cedce4;
  margin-left: 52px;
  overflow: hidden;
  word-break: break-word;
}

.infinite-loading-container {
  clear: both;
  text-align: center;
}

.a-price-symbol {
  top: -0.5em;
  font-size: 12px;
}
.a-price {
  color: #0F1111;
  font-size:14px;
}
</style>