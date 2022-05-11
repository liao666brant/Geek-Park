import React from 'react';

import MyChart from '@/components/MyChart';

export default function Home() {
  return (
    <div className="home">
      <MyChart
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title="三大框架满意度"
      />

      <MyChart
        style={{ width: '500px', height: '400px' }}
        xData={['vue', 'angular', 'react']}
        yData={[50, 60, 70]}
        title="三大框架使用度"
      />
    </div>
  );
}
