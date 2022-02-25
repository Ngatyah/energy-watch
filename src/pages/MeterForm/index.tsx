import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button } from "antd";
import { useHistory } from "react-router-dom";
import { METERS_ENDPOINT, METERS_URL, SITES_ENDPOINT,} from "../../constants";
import { meterActions, getSingleMeter } from "../../store/meter-slice";
import { useParams } from "react-router-dom";
import { uuid } from "uuidv4";
import store from "../../store";
import { DjangoService } from "../../services/django-api";
import { getProfileData } from "../../store/auth_slice";
import { getAllSites, siteActions } from "../../store/sites_slice";

const MeterForm: React.FunctionComponent<{}> = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(state => getProfileData(state));
  const sitesData = useSelector(state => getAllSites(state));
  const { id }: { id: string } = useParams();
  const meterData = getSingleMeter(store.getState(), id);

  const apiGetAllSites = () => {
    const apService = new DjangoService(SITES_ENDPOINT);
    apService.list()
      .then((res) => {
        dispatch(siteActions.addSites(res));
      })
      .catch((err) => {
        
        console.log(err);
      });
  }

  useEffect(() => {
    apiGetAllSites()
  }, [profileData.id])

  useEffect(() => {
    if(meterData) {
      form.setFieldsValue({
        name: meterData.name,
        device_id: meterData.device_id,
        device_srn: meterData.device_srn,
        site: meterData.site
      });
    }
  }, [meterData])

  const dispatch = useDispatch();
  const { Option } = Select;
  const history = useHistory();

  const saveMeter = async (values: any) => {
    const apiService = new DjangoService(METERS_ENDPOINT);
    apiService
      .create({...values, owner: profileData.id})
      .then((res) => {
        setLoading(false);
        history.replace(METERS_URL);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  const UpdateSite = async (values: any) => {
    setLoading(true);
    const apiService = new DjangoService(METERS_ENDPOINT);
    apiService
      .update(`${id}/`, {...meterData, ...values })
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
        form={form}
        name="normal_login"
        className="login-form"
        onFinish={id ? UpdateSite : saveMeter}
      >
        <div>
          <h1 style={{ color: "#008B8B" }}>{id?"Update":"Add"} Meter </h1>
          <hr/>
        </div>
        <Form.Item
          name="device_id"
          label="METER ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="device_srn"
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
          name="name"
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
          name="site"
          label="SITES"
          rules={[{ required: true, message: "Select a site" }]}
        >
          <Select placeholder="Select the meter site">
            {sitesData.length > 0? 
              sitesData.map((site: any) => <Option key={site.id} value={site.id}>{site.name.toUpperCase()}</Option>)
              : "Loading sites Data"
            }
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

