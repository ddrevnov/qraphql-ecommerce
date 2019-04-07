import React from 'react';
import { Card, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { IItem } from '../../interfaces';
import { ENDPOINT } from '../../config';
import DeleteIcon from './DeleteIcon';
import { RouterProps } from 'react-router';

interface Props extends IItem, RouterProps {}

const Item: React.FC<Props> = ({ title, description, id, image, history }) => {
  const link = <Link to={`/items/${id}`}>{title}</Link>;
  const imageSrc = `${ENDPOINT}/uploads/${image}`;

  return (
    <Card
      title={link}
      bordered={false}
      actions={[
        <Icon
          onClick={() => history.push(`/admin/updateItem/${id}`)}
          type="edit"
        />,
        <DeleteIcon id={id} />
      ]}
    >
      {description}
      {image && <Image src={imageSrc} alt={title} />}
    </Card>
  );
};

export default withRouter(Item);

const Image = styled.img`
  width: 100%;
`;
