import "./Dashboard.module.css";
import { Layout, Menu, Button, Breadcrumb, Avatar, List, Row, Col } from "antd";
import {
  DesktopOutlined,
  AuditOutlined,
  DashboardOutlined,
  TeamOutlined,
  PoweroffOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import EnergyGraph from "./EnergyGraph";
import MeterPanel from "./MeterPanel";
import { LOGIN } from "../constants";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: React.FunctionComponent<{}> = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onSiteHandler = () => {
    history.push("/");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            <NavLink to={LOGIN}></NavLink>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DashboardOutlined />}>
            Meters
          </Menu.Item>
          <Menu.Item
            onClick={onSiteHandler}
            key="sub1"
            icon={<AuditOutlined />}
            title="User"
          >
            Sites
          </Menu.Item>
          <Menu.Item key="9" icon={<UserOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        ></Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          ></div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Energy Watch ©2021 Created by Tinga Art
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
