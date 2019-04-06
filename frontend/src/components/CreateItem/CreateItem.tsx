import React, { Fragment } from 'react';
import { Form, Alert, Typography } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { Mutation, compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';

import { IItem } from '../../interfaces';
import ItemForm from '../ItemForm';

const { Title } = Typography;

interface IFormData extends Omit<IItem, 'image'> {
  image: UploadFile[];
}

interface Props extends FormComponentProps, RouteComponentProps {}

interface IItemCreateMutation {
  createItem: IItem;
}

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createItem(
      data: {
        title: $title
        description: $description
        price: $price
        image: $image
      }
    ) {
      id
    }
  }
`;

const CreateItem: React.FC<Props> = ({ form, history }) => {
  const initialItemData = {
    title: '',
    description: '',
    price: 0
  };

  const handleSubmit = (createItem: any) => (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, { image, ...values }: IFormData) => {
      if (!err) {
        const variables: any = { ...values };

        if (image && image.length) {
          variables.image = image[0].originFileObj;
        }

        const res = await createItem({
          variables
        });
        history.push(`/items/${res.data.createItem.id}`);
      }
    });
  };

  return (
    <Mutation<IItemCreateMutation> mutation={CREATE_ITEM_MUTATION}>
      {(createItem, { loading, error }) => (
        <Fragment>
          <Title level={2}>Create Item</Title>
          {error && <Alert message="Server Error" type="error" />}
          <ItemForm
            form={form}
            item={initialItemData}
            loading={loading}
            onSubmit={handleSubmit(createItem)}
          />
        </Fragment>
      )}
    </Mutation>
  );
};

const enhance = compose(
  withRouter,
  Form.create()
);

export default enhance(CreateItem);
