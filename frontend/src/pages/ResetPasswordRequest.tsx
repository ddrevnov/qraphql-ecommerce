import React, { useEffect } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useMutation } from 'react-apollo-hooks';

import { FormComponentProps } from 'antd/lib/form';
import { hasErrors } from '../shared/utilities';
import { REQUEST_RESET } from '../shared/queries';

interface IProps extends FormComponentProps {}

const ResetPasswordRequest: React.FC<IProps> = ({ form }) => {
  const requestReset = useMutation(REQUEST_RESET);

  useEffect(() => {
    form.validateFields();
  }, []);

  const emailError =
    form.isFieldTouched('email') && form.getFieldError('email');

  const _submit = (e: any) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await requestReset({
            variables: {
              email: values.email
            }
          });
          message.success('Please verify your email');
        } catch (err) {
          console.error({ err });
          message.error('Email not found');
        }
      }
    });
  };

  return (
    <Row type="flex" justify="center" align="top">
      <Col md={12}>
        <Form onSubmit={_submit}>
          <Form.Item validateStatus={emailError ? 'error' : ''}>
            {form.getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input an email!' }]
            })(<Input placeholder="Email" />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(form.getFieldsError())}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Form.create({ name: 'resetPasswordRequest' })(
  ResetPasswordRequest
);
