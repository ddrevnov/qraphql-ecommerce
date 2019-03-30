import React from 'react';
import { Form, Input, Button, InputNumber, Upload, Icon } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FormComponentProps } from 'antd/lib/form';
import gql from 'graphql-tag';
import { Mutation, compose } from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';

import { IItem } from '../../interfaces';

interface IFormData extends Omit<IItem, 'image'> {
  image: UploadFile[];
}

interface Props extends FormComponentProps, RouteComponentProps {}

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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleSubmit = (createItem: any) => (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, { image, ...values }: IFormData) => {
      if (!err) {
        const imageFile = image[0].originFileObj;
        const res = await createItem({
          variables: { ...values, image: imageFile }
        });
        history.push(`/items/${res.data.createItem.id}`);
      }
    });
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION}>
      {(createItem, { loading, error }) => (
        <Form onSubmit={handleSubmit(createItem)}>
          <Form.Item>
            {form.getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input a title!' }]
            })(<Input placeholder="Title" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('description', {
              rules: [
                { required: true, message: 'Please input a description!' }
              ]
            })(<Input.TextArea placeholder="Description" />)}
          </Form.Item>
          <Form.Item>
            {form.getFieldDecorator('price', {
              rules: [
                { required: true, message: 'Please input a description!' }
              ]
            })(<InputNumber placeholder="Price" />)}
          </Form.Item>
          <Form.Item label="Upload image">
            {form.getFieldDecorator('image', {
              valuePropName: 'image',
              getValueFromEvent: normFile
            })(
              <Upload name="logo" listType="picture">
                <Button>
                  <Icon type="upload" /> Upload image
                </Button>
              </Upload>
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form>
      )}
    </Mutation>
  );
};

const enhance = compose(
  withRouter,
  Form.create()
);

export default enhance(CreateItem);
