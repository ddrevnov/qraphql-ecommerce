import React, { Fragment } from 'react';
import { Mutation, compose } from 'react-apollo';
import { Alert, Typography, Form, Button, Input, message } from 'antd';

import { IUser } from '../interfaces';
import { SIGNIN_USER } from '../shared/queries';
import { FormComponentProps } from 'antd/lib/form';
import { withRouter, RouteComponentProps } from 'react-router';
import { AUTH_TOKEN } from '../shared/constants';

const { Title } = Typography;

interface IProps extends FormComponentProps, RouteComponentProps {}

interface ISigninMutation {
  signIn: {
    user: IUser;
    token: string;
  };
}

const SignIn: React.FC<IProps> = ({ form, history }) => {
  const submit = (login: any) => (e: React.FormEvent) => {
    e.preventDefault();
    form.validateFields(async (err, variables) => {
      if (!err) {
        await login({
          variables
        });
      }
    });
  };

  const _confirm = (token: string) => {
    message.success('You are signed in');
    window.localStorage.setItem(AUTH_TOKEN, token);
    history.push('/');
  };

  return (
    <Mutation<ISigninMutation>
      mutation={SIGNIN_USER}
      onCompleted={({ signIn: { token } }) => _confirm(token)}
    >
      {(login, { loading, error }) => (
        <Fragment>
          <Title level={2}>Sign In</Title>
          {error && <Alert message="Server Error" type="error" />}
          <Form onSubmit={submit(login)}>
            <Form.Item>
              {form.getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input an email!' }],
                initialValue: ''
              })(<Input placeholder="Email" />)}
            </Form.Item>
            <Form.Item>
              {form.getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input a password!' }
                ],
                initialValue: ''
              })(<Input placeholder="Password" />)}
            </Form.Item>
            <Button
              disabled={loading}
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Sign In
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

const SigninPage = enhance(SignIn);

export { SigninPage };
