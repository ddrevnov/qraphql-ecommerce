import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Alert, Row, Col, Pagination, Typography, Card } from 'antd';

import { IItem } from '../interfaces';
import Item from '../components/Item';
import { ALL_ITEMS_QUERY, PAGINATION_QUERY } from '../shared/queries';

const { Title } = Typography;

export const ItemsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  const showSizeChange = (current: number, pg: number) => {
    setPerPage(pg);
    setCurrentPage(current);
  };

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Title>Items</Title>
      <Query
        query={ALL_ITEMS_QUERY}
        variables={{ skip: currentPage * perPage - perPage, first: perPage }}
      >
        {({ data, error, loading }) => {
          if (loading) return <Spin />;
          if (error)
            return <Alert message="Could not load data" type="error" />;
          return (
            <Row gutter={16} type="flex">
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
      <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <Spin />;
          if (error)
            return (
              <Alert
                message="Error load a count of the pagination"
                type="error"
              />
            );
          return (
            <Card>
              <Pagination
                showSizeChanger
                pageSizeOptions={['2', '5', '10', '20', '30', '40']}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                pageSize={perPage}
                onShowSizeChange={showSizeChange}
                onChange={pageChange}
                current={currentPage}
                total={data.itemsConnection.aggregate.count}
              />
            </Card>
          );
        }}
      </Query>
    </div>
  );
};
