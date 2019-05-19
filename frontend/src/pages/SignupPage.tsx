import React, { Fragment } from 'react';
import { Mutation, compose } from 'react-apollo';
import { Alert, Typography, Form, Button, Input, message } from 'antd';

import { IUser } from '../interfaces';
import { SIGNUP_USER } from '../shared/queries';
import { FormComponentProps } from 'antd/lib/form';
import { withRouter, RouteComponentProps } from 'react-router';
import { AUTH_TOKEN } from '../shared/constants';
import { hasErrors, getValidateStatus } from '../shared/utilities';

const { Title } = Typography;

interface IProps extends FormComponentProps, RouteComponentProps {}

interface ISignupMutation {
  signUp: {
    user: IUser;
    token: string;
  };
}

const SignUp: React.FC<IProps> = ({ form, history }) => {
  const submit = (createUser: any) => (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, variables) => {
      if (!err) {
        const { data } = await createUser({
          variables
        });

        message.success('You are signed up');
        window.localStorage.setItem(AUTH_TOKEN, data.signUp.token);
        history.push('/');
      }
    });
  };

  const _confirm = (token: string) => {
    message.success('You are signed in');
    window.localStorage.setItem(AUTH_TOKEN, token);
    history.push('/');
  };

  return (
    <Mutation<ISignupMutation>
      mutation={SIGNUP_USER}
      onCompleted={({ signUp: { token } }) => _confirm(token)}
    >
      {(createUser, { loading, error }) => (
        <Fragment>
          <Title level={2}>Sign Up</Title>
          {error && <Alert message="Server Error" type="error" />}
          <Form onSubmit={submit(createUser)}>
            <Form.Item
              validateStatus={getValidateStatus({ field: 'email', form })}
            >
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input an email!' }],
                initialValue: ''
              })(<Input placeholder="Email" />)}
            </Form.Item>
            <Form.Item
              validateStatus={getValidateStatus({ field: 'name', form })}
            >
              {form.getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input a name!' }],
                initialValue: ''
              })(<Input placeholder="Name" />)}
            </Form.Item>
            <Form.Item
              validateStatus={getValidateStatus({ field: 'password', form })}
            >
              {form.getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input a password!' }
                ],
                initialValue: ''
              })(<Input.Password placeholder="Password" />)}
            </Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              disabled={loading || hasErrors(form.getFieldsError())}
            >
              Sign Up
            </Button>
          </Form>
        </Fragment>
      )}
    </Mutation>
  );
};

const enhance = compose(
  withRouter,
  Form.create()
);

const SignupPage = enhance(SignUp);

export { SignupPage };
