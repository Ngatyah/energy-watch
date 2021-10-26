import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_URL } from "../constants";

const MeterForm: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    history.replace(METERS_URL);
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "5vh",
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
          <h1 style={{ color: "#008B8B" }}>Add Meter </h1>
          <p> Enter the New Meter Details Here</p>
        </div>
        <Form.Item
          name="Name"
          label="NAME"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Serial"
          label="SERIAL NUMBER"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Id"
          label="ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Site"
          label="SITE"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Address"
          label="Address"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MeterForm;
