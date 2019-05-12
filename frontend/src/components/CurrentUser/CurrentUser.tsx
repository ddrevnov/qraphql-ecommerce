import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { AUTH_TOKEN } from '../../shared/constants';
import { CURRENT_USER_QUERY } from '../../shared/queries';
import { IUser } from '../../interfaces';

interface IMeQuery {
  me: IUser;
}

const CurrentUser: React.FC<any> = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const isLoggedIn = !!authToken;

  return (
    <Query<IMeQuery> {...props} query={CURRENT_USER_QUERY}>
      {(payload: QueryResult) =>
        props.children({ payload, authToken, isLoggedIn })
      }
    </Query>
  );
};

export default CurrentUser;
