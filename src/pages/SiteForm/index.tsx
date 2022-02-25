import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_URL, SITES_ENDPOINT, SITE_URL } from '../../constants';
import { useParams } from "react-router-dom";
import store from "../../store";
import { getSingleSite, siteActions } from "../../store/sites_slice";
import { DjangoService } from "../../services/django-api";
import { getProfileData } from "../../store/auth_slice";

const { Option } = Select;

const SiteForm: React.FunctionComponent<{}> = () => {
  const [form] = Form.useForm();
  const profileData = useSelector(state => getProfileData(state));
  const [loading, setLoading] = useState(false);
  const { id }: { id: string } = useParams();
  const siteData = getSingleSite(store.getState(), id);

  const getOneSite = (id:string) => {
    const apService = new DjangoService(SITES_ENDPOINT);
    apService.read(id)
      .then((res) => {
        dispatch(siteActions.addSingleSite(res));
      })
      .catch((err) => {
        
        console.log(err);
      });
  }

  useEffect(() => {
    getOneSite(id)
  }, [profileData.id])


  useEffect(() => {
    if(siteData) {
      form.setFieldsValue({
        name: siteData.name,
        size: siteData.size
      });
    }
  }, [siteData])
  
  
  const dispatch = useDispatch();
  const history = useHistory();
  const removeItemHandler = (id: any) => {
    dispatch(siteActions.removeSite(id));
  };

  const saveSite = async (values: any) => {
    setLoading(true);
    const apiService = new DjangoService(SITES_ENDPOINT);
    apiService
      .create({...values, owner:profileData.id })
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });      
  };

  const UpdateSite = async (values: any) => {
    setLoading(true);
    const apiService = new DjangoService(SITES_ENDPOINT);
    apiService
      .update(`${id}/`, {...siteData, ...values })
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
        form={form}
        {...formItemLayout}
        name="normal_login"
        className="login-form"
        onFinish={id? UpdateSite : saveSite}
      >
        <div>
          <h1 style={{ color: "#008B8B" }}>Add Meter </h1>
          <p> Enter the New Meter Details Here. Fill all the Fields</p>
        </div>
        <Form.Item
          name="name"
          label="Site Name"
          rules={[{required: true}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="size"
          label="Site Size"
          rules={[{required: true}]}
        >
          <Select>
              <Option value="S">Small</Option>
              <Option value="M">Medium</Option>
              <Option value="L">Large</Option>
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

export default SiteForm;
