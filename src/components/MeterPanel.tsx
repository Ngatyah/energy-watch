import { Table, Typography, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Fragment, useState } from "react";

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

  //   const [searchText, setSearchText] = useState('');
  //   const [searchedColumn,SetSearchedColumn]= useState('');

  return (
    <Fragment>
      <Title>Meter Panel</Title>
      <Table dataSource={data} columns={columns} />
    </Fragment>
  );
};
export default MeterPanel;
