import React from 'react';
import { Typography } from 'antd';

import CreateItem from './CreateItem';

const { Title } = Typography;

const Sell = () => {
  return (
    <div>
      <Title>Sell</Title>
      <CreateItem />
    </div>
  );
};

export default Sell;
