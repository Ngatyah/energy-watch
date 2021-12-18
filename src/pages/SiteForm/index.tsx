import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_URL, SITES_ENDPOINT } from "../../constants";
import { useParams } from "react-router-dom";
import { uuid } from "uuidv4";
import store from "../../store";
import { getOneSite, siteActions } from "../../store/sites_slice";
import { DjangoService } from "../../services/django-api";
import { getProfileData } from "../../store/auth_slice";

const SiteForm: React.FunctionComponent<{}> = () => {
  let initialValues = {};
  const profileData = useSelector(state => getProfileData(state));
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams();
  if (id) {
    const data = getOneSite(store.getState(), id);
    initialValues = {
      site_id: data["model"],
      site_name: data["site"],
    };
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const removeItemHandler = (id: any) => {
    dispatch(siteActions.removeSiteFromTable(id));
  };
  const onFinish = async (values: any) => {
    setLoading(true);
    history.replace(METERS_URL);
    if (id) {
      removeItemHandler(id);
    }
    dispatch(
      siteActions.addSiteToTable({
        site: values["site_id"],
        name: values["site_name"],
        id: uuid(),
        key: uuid(),
      })
    );
    const apiService = new DjangoService(SITES_ENDPOINT);
    apiService
      .create({ name: values["site_name"],owner:profileData.id })
      .then((res) => {
        console.log(res);
        setLoading(false);
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
          name="site_id"
          label="Site Id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="site_name"
          label="Site Name"
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
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SiteForm;
