import React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Input, InputNumber, Upload, Button, Icon } from 'antd';

import { IItem } from '../../interfaces';

interface Props extends FormComponentProps {
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  item: IItem;
}

const ItemForm: React.FC<Props> = ({ form, onSubmit, loading, item }) => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {form.getFieldDecorator('title', {
          rules: [{ required: true, message: 'Please input a title!' }],
          initialValue: item.title
        })(<Input placeholder="Title" />)}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input a description!' }],
          initialValue: item.description
        })(<Input.TextArea placeholder="Description" />)}
      </Form.Item>
      <Form.Item>
        {form.getFieldDecorator('price', {
          rules: [{ required: true, message: 'Please input a price!' }],
          initialValue: item.price
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
      <Button disabled={loading} type="primary" htmlType="submit">
        {`Sav${loading ? 'ing' : 'e'}`}
      </Button>
    </Form>
  );
};

export default ItemForm;
