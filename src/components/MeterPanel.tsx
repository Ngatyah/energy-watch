import { Table, Typography, Input, Button, Space, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Fragment } from "react";
import { useHistory } from "react-router";
import { METERFORM } from "../constants";

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
    title: "Condition",
    dataIndex: "condition",
    sorter: {
      compare: (a: any, b: any) => a.math - b.math,
      multiple: 2,
    },
  },
];

const data = [
  {
    key: "1",
    serial: "123443243",
    model: "6M",
    condition: "OK",
  },
  {
    key: "2",
    serial: "1234433",
    model: "6M",
    condition: "OK",
  },
  {
    key: "3",
    serial: "123443243",
    model: "6M",
    condition: "OK",
  },
  {
    key: "4",
    serial: "123443243",
    model: "6M4",
    condition: "OK",
  },
];

const MeterPanel = () => {
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

      <Table dataSource={data} columns={columns} />
    </Fragment>
  );
};
export default MeterPanel;
