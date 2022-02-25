import { useSelector, useDispatch } from "react-redux";
import { Table, Typography, Button, Space, Row } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { meterActions, getAllMeters } from "../../store/meter-slice";
import { ADD_METER, METERS_ENDPOINT } from '../../constants';
import { DjangoService } from "../../services/django-api";
import { getProfileData } from "../../store/auth_slice";

const MeterPanel = () => {
  const formData:any = useSelector(state => getAllMeters(state));
  const profileData = useSelector(state => getProfileData(state));
  const [deletingId, setdeletingId] = useState('')
  const dispatch = useDispatch();
  let { Title } = Typography;
  const history = useHistory();

  const onButtonClick = () => {
    history.replace(ADD_METER);
  };
  const removeItemHandler = (id: any) => {
    dispatch(meterActions.removeMeter(id));
  };

  const apiGetAllMeters = () => {
    const apService = new DjangoService(METERS_ENDPOINT);
    apService.list()
      .then((res) => {
        dispatch(meterActions.addMeters(res));
      })
      .catch((err) => {
        
        console.log(err);
      });
  }

  const softDeleteSite = (siteData: any) => {
    setdeletingId(siteData.id);
    const apiService = new DjangoService(METERS_ENDPOINT);
    apiService
      .update(`${siteData.id}/`, {...siteData, is_deleted: true })
      .then((res) => {
        dispatch(meterActions.removeMeter(siteData.id));
        setdeletingId('');
      })
      .catch((err) => {
        setdeletingId('');
        console.log(err);
      }); 

  }

  useEffect(() => {
    apiGetAllMeters()
  }, [profileData.id])

  const columns = [

    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.id - b.id,
        multiple: 3,
      },
    },
    {
      title: "Serial Number",
      dataIndex: "device_srn",
      key: "serial"
    },
    {
      title: "Meter name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Site",
      dataIndex: "site_name",
      key: "site",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, row: any) => (
        <Space size="large">
          <Button type="text">
            {<EyeOutlined style={{ fontSize: "20px" }} />}
          </Button>
          <Button type="text">
            <Link to={"/dashboard/edit/meter/" + row.id}>
              {<EditOutlined style={{ fontSize: "20px", color: "blue" }} />}
            </Link>
          </Button>
          <Button type="text" loading={deletingId === row.id} onClick={() => softDeleteSite(row)}>
            {<DeleteOutlined style={{ fontSize: "20px", color: "red" }} />}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Row justify="space-between" align="middle">
        <Title>Meter Panel</Title>
        <Button type="primary" onClick={onButtonClick}>
          Add Meter
        </Button>
      </Row>

      <Table dataSource={formData} columns={columns} />
    </Fragment>
  );
};
export default MeterPanel;
