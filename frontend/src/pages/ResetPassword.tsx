import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { useMutation } from 'react-apollo-hooks';

import { FormComponentProps } from 'antd/lib/form';
import { hasErrors, getValidateStatus } from '../shared/utilities';
import { RESET_PASSWORD } from '../shared/queries';
import { RouteComponentProps } from 'react-router';

interface IRouterParams {
  token: string;
}

interface IProps
  extends FormComponentProps,
    RouteComponentProps<IRouterParams> {}

const ResetPassword: React.FC<IProps> = ({ form, match, history }) => {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const resetPassword = useMutation(RESET_PASSWORD);

  useEffect(() => {
    form.validateFields();
  }, []);

  const handleConfirmBlur = ({ target: { value } }: any) => {
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const _submit = (e: any) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await resetPassword({
            variables: {
              password: values.password,
              confirmPassword: values.confirmPassword,
              resetToken: match.params.token
            }
          });
          message.success('Success');
          history.push('/signIn');
        } catch (err) {
          console.error({ err });
          message.error('Error');
        }
      }
    });
  };

  return (
    <Row type="flex" justify="center" align="top">
      <Col md={12}>
        <Form onSubmit={_submit}>
          <Form.Item
            validateStatus={getValidateStatus({ field: 'password', form })}
          >
            {form.getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password!' },
                { validator: validateToNextPassword }
              ]
            })(<Input.Password placeholder="Password" />)}
          </Form.Item>
          <Form.Item
            validateStatus={getValidateStatus({
              field: 'confirmPassword',
              form
            })}
          >
            {form.getFieldDecorator('confirmPassword', {
              rules: [
                { required: true, message: 'Please confirm your password!' },
                { validator: compareToFirstPassword }
              ]
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(form.getFieldsError())}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Form.create({ name: 'resetPassword' })(ResetPassword);
