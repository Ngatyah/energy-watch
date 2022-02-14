import { useDispatch, useSelector } from "react-redux";
import { Table, Typography, Button, Space, Row } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { ADD_SITE } from "../../constants";
import store from "../../store";
import { siteActions, getAllSites } from "../../store/sites_slice";

const SitePanel = () => { 
  const siteData = useSelector(state => getAllSites(state));
  const dispatch = useDispatch();
  let { Title } = Typography;
  const history = useHistory();

  const onButtonClick = () => {
    history.replace(ADD_SITE);
  };
  const removeItemHandler = (id: any) => {
    dispatch(siteActions.removeSiteFromTable(id));
  };

  const columns = [
    {
      title: "Site Id",
      dataIndex: "id",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Site Name",
      dataIndex: "name",
      sorter: {
        compare: (a: any, b: any) => a.chinese - b.chinese,
        multiple: 3,
      },
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
          <Button type="text" onClick={() => removeItemHandler(row.id)}>
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
