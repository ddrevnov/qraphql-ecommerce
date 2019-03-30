import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { IItem } from '../../interfaces';
import { ENDPOINT } from '../../config';
import styled from 'styled-components';

interface Props extends IItem {}

const Item: React.FC<Props> = ({ title, description, id, image }) => {
  const link = <Link to={`/items/${id}`}>{title}</Link>;
  const imageSrc = `${ENDPOINT}/uploads/${image}`;

  return (
    <Card title={link} bordered={false}>
      {description}
      {image && <Image src={imageSrc} alt={title} />}
    </Card>
  );
};

export default Item;

const Image = styled.img`
  width: 100%;
`;
