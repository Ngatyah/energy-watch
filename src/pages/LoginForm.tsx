import { Form, Input, Button, Checkbox } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import {
  REGISTRATION,
  CLIENT_ID,
  TOKEN_ENDPOINT,
  GRAPH_URL,
  USER_PROFILE_ENDPOINT,
} from "../constants";
import { DjangoService } from "../services/django-api";
import { useState } from "react";

const LoginForm: React.FunctionComponent<{}> = () => {

  const [error, setError] = useState('')
  const form = new FormData();
  form.set("greeting", "Hello, world!");
  const history = useHistory();

  // get token and 
  const onFinish = async (values: any) => {
    setError('')
    const body = `username=${values.email}&password=${values.password}&grant_type=password&client_id=${CLIENT_ID}`;

    const credentials = fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: body,
    })
    .then((response) => {
      return {data: response.json, status: response.status}
    })
    .then((res) => {
      if (res.status === 200) {
        const {access_token} = res.data as any;
        // dispatch auth details to store
        const apiService = new DjangoService(USER_PROFILE_ENDPOINT, access_token);
        apiService.list()
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
        return history.replace(GRAPH_URL);
      } else {
        setError('Username and password mismatch');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "30vh",
        justifyContent: "center",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div>
          <h1 style={{ color: "#008B8B" }}>Login </h1>
          <p> Use your Email and Password to login Here</p>
          <p style={{color: 'red'}}> {error}</p>
        </div>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Log in
          </Button>
          Or <Link to={REGISTRATION}> register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
