import React, { Fragment } from 'react';
import { Form, Alert, Typography } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { Mutation, compose, Query } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';

import { IItem } from '../../interfaces';
import ItemForm from '../ItemForm';

interface IFormData extends Omit<IItem, 'image'> {
  image: UploadFile[];
}

const { Title } = Typography;

interface IRouterParams {
  id: string;
}

interface IProps
  extends FormComponentProps,
    RouteComponentProps<IRouterParams> {}

interface IItemQuery {
  item: IItem;
}

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: Upload
  ) {
    updateItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
      }
      where: { id: $id }
    ) {
      id
      title
      description
      price
      image
    }
  }
`;

export const GET_ITEM_QUERY = gql`
  query GET_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
      image
    }
  }
`;

const UpdateItem: React.FC<IProps> = ({ form, history, match }) => {
  const handleSubmit = (updateItem: any) => (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, { image, ...values }: IFormData) => {
      const { id } = match.params;

      if (!err && id) {
        let variables: any = { ...values, id };

        if (image && image.length) {
          variables.image = image[0].originFileObj;
        }

        const res = await updateItem({
          variables
        });

        history.push(`/items/${res.data.updateItem.id}`);
      }
    });
  };

  return (
    <Query<IItemQuery>
      query={GET_ITEM_QUERY}
      variables={{ id: match.params.id }}
    >
      {({ data, error, loading: loadingQuery }) => (
        <Mutation mutation={UPDATE_ITEM_MUTATION}>
          {(updateItem, { loading, error }) => (
            <Fragment>
              <Title level={2}>Update Item</Title>
              {error && <Alert message="Server Error" type="error" />}
              {data && !loadingQuery && (
                <ItemForm
                  form={form}
                  item={data.item}
                  loading={loading}
                  onSubmit={handleSubmit(updateItem)}
                />
              )}
            </Fragment>
          )}
        </Mutation>
      )}
    </Query>
  );
};

const enhance = compose(
  withRouter,
  Form.create()
);

export default enhance(UpdateItem);
