import * as echarts from 'echarts';
import React, { useEffect, useRef } from 'react';

interface Props {
  title: string;
  xData: string[];
  yData: number[];
  style: React.CSSProperties;
}

const init = (node: HTMLElement, xData: string[], yData: number[], title: string) => {
  const myChart = echarts.init(node);
  // 绘制图表
  myChart.setOption({
    title: {
      text: title,
    },
    tooltip: {},
    xAxis: {
      data: xData,
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: yData,
      },
    ],
  });
};

const MyChart = (props: Props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    init(chartRef.current!, props.xData, props.yData, props.title);
  }, [props]);

  return <div ref={chartRef} style={props.style}></div>;
};

export default MyChart;
