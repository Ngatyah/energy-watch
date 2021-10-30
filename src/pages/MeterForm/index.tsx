import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_URL } from "../../constants";
import { formActions } from "../../store/form-slice";
import { useParams } from "react-router-dom";
import { uuid } from "uuidv4";

const MeterForm: React.FunctionComponent<{}> = () => {
  let initialValues = {};
  const { id }: { id: string } = useParams();
  const formData = useSelector((state: any) => state.form.items);
  if (id) {
    const data = formData.find((item: any) => item.id === id);
    initialValues = {
      Serial: data["serial"],
      Model: data["model"],
      site: data["site"],
      Id: data["id"],
    };
  }

  console.log(id);
  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();
  const removeItemHandler = (id: any) => {
    dispatch(formActions.removeItemFromTable(id));
  };
  const onFinish = async (values: any) => {
    console.log("Success:", values["Serial"], values["Model"], values["site"]);
    history.replace(METERS_URL);
    if (id) {
      removeItemHandler(id);
    }
    dispatch(
      formActions.addItemsToTable({
        site: values["site"],
        model: values["Model"],
        serial: values["Serial"],
        id: uuid(),
        key: uuid(),
      })
    );
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
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
        {...formItemLayout}
        name="normal_login"
        className="login-form"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <div>
          <h1 style={{ color: "#008B8B" }}>Add Meter </h1>
          <p> Enter the New Meter Details Here. Fill all the Fields</p>
        </div>
        <Form.Item
          name="Serial"
          label="SERIAL No"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Model"
          label="MODEL"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="site"
          label="SITES"
          rules={[{ required: true, message: "Select a site" }]}
        >
          <Select placeholder="Select the meter site">
            <Option value="Site 1">site 1</Option>
            <Option value="site 2">Site 2</Option>
            <Option value="site 3">Site 3</Option>
            <Option value="site 4">Site 4</Option>
            <Option value="site 5">Site 5</Option>
          </Select>
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
