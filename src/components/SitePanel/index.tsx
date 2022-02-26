import { useDispatch, useSelector } from "react-redux";
import { Table, Typography, Button, Space, Row, notification } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link, Redirect } from "react-router-dom";
import { ADD_SITE, ANTD_SUCCESS_NOTIFICATION_TYPE, LOGIN, SITES_ENDPOINT, SITES_LIST_ENDPOINT } from "../../constants";
import store from "../../store";
import { siteActions, getAllSites as getAllSitesList  } from "../../store/sites_slice";
import { DjangoService } from "../../services/django-api";
import { getFullSizeName, openNotificationWithIcon } from "../../utils";
import { getProfileData } from "../../store/auth_slice";

const SitePanel = () => { 
  const siteData = useSelector(state => getAllSitesList(state));
  const profileData = useSelector(state => getProfileData(state));
  const [deletingId, setdeletingId] = useState('');
  const dispatch = useDispatch();
  let { Title } = Typography;
  const history = useHistory()

  const onButtonClick = () => {
    history.replace(ADD_SITE);
  };

  const getAllSites = () => {
    const apService = new DjangoService(SITES_ENDPOINT);
    apService.list()
      .then((res) => {
        dispatch(siteActions.addSites(res));
      })
      .catch((err) => {
        
        console.log(err);
      });
  }

  const softDeleteSite = (siteData: any) => {
    setdeletingId(siteData.id);
    const apiService = new DjangoService(SITES_ENDPOINT);
    apiService
      .update(`${siteData.id}/`, {...siteData, is_deleted: true })
      .then((res) => {
        const notificationMsg = `Site ${siteData.name} successfully deleted`
        openNotificationWithIcon(ANTD_SUCCESS_NOTIFICATION_TYPE, notificationMsg)
        dispatch(siteActions.removeSite(siteData.id));
        setdeletingId('');
      })
      .catch((err) => {
        setdeletingId('');
        console.log(err);
      }); 

  }

  useEffect(() => {
    getAllSites()
  }, [profileData.id])
  

  const columns = [
    {
      title: "Site Id",
      dataIndex: "id",
      key: "id",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Site Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Site Size",
      dataIndex: "size",
      key: "size",
      render: ((size:string) => <p>{getFullSizeName(size)}</p>)
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, row: any) => (
        <Space size="large">
          <Button type="text">
            {<EyeOutlined style={{ fontSize: "20px" }} />}
          </Button>
          <Button type="text">
            <Link to={"/dashboard/edit/site/" + row.id}>
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
        <Title>Site Panel</Title>
        <Button type="primary" onClick={onButtonClick}>
          Add Site
        </Button>
      </Row>

      <Table dataSource={siteData} columns={columns} />
    </Fragment>
  );
};
export default SitePanel;
