import { useSelector, useDispatch } from "react-redux";
import { Table, Typography, Button, Space, Row } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { formActions, getAllMeters } from "../../store/meter-slice";
import { ADD_METER } from "../../constants";
import store from "../../store";

const MeterPanel = () => {
  const formData = getAllMeters(store.getState());
  const dispatch = useDispatch();
  let { Title } = Typography;
  const history = useHistory();

  const onButtonClick = () => {
    history.replace(ADD_METER);
  };
  const removeItemHandler = (id: any) => {
    dispatch(formActions.removeMeterFromTable(id));
  };

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serial",
      sorter: {
        compare: (a: any, b: any) => a.name - b.name,
        multiple: 3,
      },
    },
    {
      title: "Model",
      dataIndex: "model",
      sorter: {
        compare: (a: any, b: any) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: "Site",
      dataIndex: "site",
      sorter: {
        compare: (a: any, b: any) => a.math - b.math,
        multiple: 2,
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
            <Link to={"/dashboard/edit/meter/" + row.id}>
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
