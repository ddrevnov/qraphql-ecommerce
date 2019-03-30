import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Alert, Row, Col } from 'antd';
import { Typography } from 'antd';

import { IItem } from '../../interfaces';
import Item from './Item';

const { Title } = Typography;

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
    }
  }
`;

const Items = () => {
  return (
    <div>
      <Title>Items</Title>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Spin />;
          if (error) return <Alert message="Error Text" type="error" />;
          return (
            <Row gutter={16}>
              {data.items.map((item: IItem) => (
                <Col span={8} key={item.id}>
                  <Item {...item} />
                </Col>
              ))}
            </Row>
          );
        }}
      </Query>
    </div>
  );
};

export default Items;
