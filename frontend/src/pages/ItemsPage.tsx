import React, { useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Alert, Row, Col } from 'antd';
import { Typography } from 'antd';

import { IItem } from '../interfaces';
import Item from '../components/Item';
import { ALL_ITEMS_QUERY } from '../shared/queries';

const { Title } = Typography;

export const ItemsPage = () => {
  return (
    <div>
      <Title>Items</Title>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Spin />;
          if (error)
            return <Alert message="Could not load data" type="error" />;
          return (
            <Row gutter={16}>
              {!!data.items.length &&
                data.items.map((item: IItem) => (
                  <Col span={8} key={item.id}>
                    <Item {...item} />
                  </Col>
                ))}
              {!data.items.length && <div>Nothing</div>}
            </Row>
          );
        }}
      </Query>
    </div>
  );
};
