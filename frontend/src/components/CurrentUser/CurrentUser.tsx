import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { CURRENT_USER_QUERY } from '../../shared/queries';
import { IUser } from '../../interfaces';

interface IMeQuery {
  me: IUser;
}

const CurrentUser: React.FC<any> = (props) => (
  <Query<IMeQuery> {...props} query={CURRENT_USER_QUERY}>
    {(payload: QueryResult) => props.children(payload)}
  </Query>
);

export default CurrentUser;
