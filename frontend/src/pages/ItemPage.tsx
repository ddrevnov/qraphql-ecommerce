import React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { Spin, Alert, Row, Col } from 'antd';

import { IItem } from '../interfaces';
import Item from '../components/Item';
import { ITEM_QUERY } from '../shared/queries';

interface IRouterParams {
  id: string;
}

interface IProps extends RouteComponentProps<IRouterParams> {}

interface IItemQuery {
  item: IItem;
}

export const ItemPage: React.FC<IProps> = ({ match }) => {
  return (
    <Row type="flex" justify="center" align="top">
      <Col md={12}>
        <Query<IItemQuery>
          query={ITEM_QUERY}
          variables={{ id: match.params.id }}
        >
          {({ data, error, loading }) => {
            if (loading) return <Spin />;
            if (error)
              return <Alert message="Could not load data" type="error" />;
            return data && <Item {...data.item} />;
          }}
        </Query>
      </Col>
    </Row>
  );
};
