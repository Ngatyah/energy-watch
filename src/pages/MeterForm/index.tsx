import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_ENDPOINT, METERS_URL, SITES_ENDPOINT } from "../../constants";
import { formActions, getOneMeter } from "../../store/meter-slice";
import { useParams } from "react-router-dom";
import { uuid } from "uuidv4";
import store from "../../store";
import { DjangoService } from "../../services/django-api";
import { getProfileData } from "../../store/auth_slice";

const MeterForm: React.FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(state => getProfileData(state));
  let initialValues = {};
  const { id }: { id: string } = useParams();
  if (id) {
    const data = getOneMeter(store.getState(), id);
    initialValues = {
      Serial: data["serial"],
      Model: data["model"],
      site: data["site"],
      Id: data["id"],
      key: data["key"],
    };
  }

  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();

  const onFinish = async (values: any) => {
    
    if (id) {
      dispatch(formActions.removeMeterFromTable(id));
    }
    dispatch(
      formActions.addMeterToTable({
        site: values["site"],
        model: values["Model"],
        serial: values["Serial"],
        id: uuid(),
        key: uuid(),
      })
    );
    // Upload  data online
    const apiService = new DjangoService(METERS_ENDPOINT);
    apiService
      .create({ name:  values["site"],
      owner:profileData.id,
      device_srn: values["Serial"],
       site:values["site"],})
      .then((res) => {
        console.log(res);
        setLoading(false);
        history.replace(METERS_URL);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MeterForm;
