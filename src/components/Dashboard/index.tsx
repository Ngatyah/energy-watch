import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  AuditOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { METERS_URL, GRAPH_URL } from "../../constants";
import { dashboardRoutes } from "../../configs/routes";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: any = (props: any) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onSiteHandler = () => {
    history.push("/");
  };
  console.log(props.match);

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<DesktopOutlined />}>
              <NavLink to={GRAPH_URL}></NavLink>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<DashboardOutlined />}>
              <NavLink to={METERS_URL}></NavLink>
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
            <Switch>
              {dashboardRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props: RouteComponentProps<any>) => (
                      <route.component />
                    )}
                  />
                );
              })}
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Energy Watch ©2021 Created by Tinga Art
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};
export default Dashboard;
