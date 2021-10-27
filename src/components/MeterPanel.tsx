import { useSelector } from "react-redux";
import { Table, Typography, Input, Button, Space, Row } from "antd";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { METERFORM } from "../constants";
import { uuid } from "uuidv4";

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
    render: () => (
      <Space size="large">
        <Button type="text">
          {<EyeOutlined style={{ fontSize: "20px" }} />}
        </Button>
        <Button type="text">
          {<EditOutlined style={{ fontSize: "20px", color: "blue" }} />}
        </Button>
        <Button type="text">
          {<DeleteOutlined style={{ fontSize: "20px", color: "red" }} />}
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    id: uuid(),
    serial: "123443243",
    model: "6M",
    site: "site 1",
  },
  {
    key: "2",
    id: uuid(),
    serial: "1234433",
    model: "6M",
    site: "site 2",
  },
  {
    key: "3",
    id: uuid(),
    serial: "123443243",
    model: "6M",
    site: "site 2",
  },
  {
    key: "4",
    id: uuid(),
    serial: "123443243",
    model: "6M",
    site: "site 4",
  },
];

const MeterPanel = () => {
  const formData = useSelector((state: any) => state.form.items);
  let { Title } = Typography;
  const history = useHistory();

  const onButtonClick = () => {
    history.replace(METERFORM);
  };

  return (
    <Fragment>
      <Row justify="space-between" align="middle">
        <Title>Meter Panel</Title>
        <Button type="primary" onClick={onButtonClick}>
          Add Meter
        </Button>
      </Row>

      <Table dataSource={formData??data} columns={columns} />
    </Fragment>
  );
};
export default MeterPanel;
