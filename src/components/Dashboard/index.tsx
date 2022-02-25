import {
  BrowserRouter as Router,
  Redirect,
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
import { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { METERS_URL, GRAPH_URL, SITE_URL, LOGIN, PROFILE_STORAGE_KEY, TOKEN_STORAGE_KEY } from "../../constants";
import { dashboardRoutes } from "../../configs/routes";
import { authActions } from "../../store/auth_slice";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard: any = (props: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const addAuthDetailsToStore = (tokenDetails:any, profile:any) => {
    if(!tokenDetails && !profile) {
      return <Redirect to={LOGIN} />
    }
    dispatch(authActions.addAccessData(JSON.parse(tokenDetails)));
    dispatch(authActions.addProfileData(JSON.parse(profile)));
  }

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const profile = localStorage.getItem(PROFILE_STORAGE_KEY);
    addAuthDetailsToStore(token, profile)
  }, [])
  

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onSiteHandler = () => {
    history.push("/");
  };

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
            <Menu.Item key="3" icon={<AuditOutlined />}>
              <NavLink to={SITE_URL}></NavLink>
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
