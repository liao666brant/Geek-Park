import React, { useEffect, useState } from 'react';

import MyChart from '@/components/MyChart';

const Test = () => {
  const [state, setState] = useState({
    name: 'Tom',
    age: 17,
  });

  console.log(state);

  useEffect(() => {
    setState((value) => ({
      ...value,
      age: value.age + 1,
    }));
  }, []);

  return <div>{state.age}</div>;
};

export default function Home() {
  return (
    <div className="home">
      <Test />
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
