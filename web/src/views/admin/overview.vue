<template>
  <a-spin :spinning="showSpin">
    <div class="main">
      <a-card style="margin-top: 50px;" title="最近访问量">
        <div style="height: 650px; width: 1400px;" ref="visitChartDiv"></div>
      </a-card>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { InteractionOutlined, StarFilled, StarTwoTone } from '@ant-design/icons-vue';
import { listOpLogListApi } from '/@/api/log';
import * as echarts from 'echarts';

let showSpin = ref(true);

const visitChartDiv = ref<HTMLDivElement | null>(null);

let visitChart: echarts.ECharts;

const tdata = reactive<{ data: { time: string; count: number }[] }>({
  data: [],
});

onMounted(() => {
  list();
  window.onresize = function () {
    visitChart.resize();
  };
});

const list = () => {
  listOpLogListApi({})
    .then((res) => {
      console.log(res.data);
      const counts = new Map<number, number>();

      for (const item of res.data) {
        const date = new Date(item.reTimeNew);
        const minutes = date.getMinutes();
        date.setMinutes(minutes - (minutes % 1), 0, 0);

        const count = counts.get(date.getTime());
        counts.set(date.getTime(), (count || 0) + 1);
      }

      const data = Array.from(counts)
        .sort((a, b) => a[0] - b[0])
        .map(([time, count]) => {
          const date = new Date(time);
          return {
            time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
            count,
          };
        });
      console.log(data);
      tdata.data = data;
      initCharts();

      showSpin.value = false;
    })
    .catch((err) => {
      showSpin.value = false;
    });
};

const initCharts = () => {
  if (visitChartDiv.value) {
    visitChart = echarts.init(visitChartDiv.value);
    const option: echarts.EChartsOption = {
      title: {
        text: '',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: '30px',
        left: '20px',
        right: '20px',
        bottom: '50px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          textStyle: {
            color: '#2F4F4F',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#2F4F4F',
          },
        },
        data: tdata.data.map((v) => v.time),
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(10, 10, 10, 0.1)',
            width: 1,
            type: 'solid',
          },
        },
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        },
        {
          type: 'inside',
          realtime: true,
          start: 30,
          end: 70,
          xAxisIndex: [0, 1]
        }
      ],
      series: [
        {
          name: 'visit',
          type: 'line',
          stack: 'Total',
          smooth: true,
          data: tdata.data.map((v) => v.count),
        },
      ],
    };
    visitChart.setOption(option);
  }
};
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;

  .box {
    padding: 12px;
    display: flex;
    flex-direction: column;

    .box-top {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .box-value {
      color: #000000;
      font-size: 32px;
      margin-right: 12px;

      .v-e {
        font-size: 14px;
      }
    }

    .box-bottom {
      margin-top: 24px;
      color: #000000d9;
    }
  }
}
</style>
