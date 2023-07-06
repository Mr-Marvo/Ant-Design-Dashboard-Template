import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Layout, Button, Dropdown } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { Route, Routes } from "react-router-dom";
import { Dashboard, Map } from "../pages";
import Sidebar from "./Sidebar";
import { useContentContext } from "../providers/ContentContext";

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);

  let { openSuccessNotification } = useContentContext();

  useEffect(() => {
    if (window.innerWidth < 426) {
      setCollapsed(true);
    }
  }, []);

  // Navigation Menu Options
  const items = [
    {
      label: "Logout",
      key: "1",
      icon: <PoweroffOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "1") {
      //Logout
      openSuccessNotification("Logged Out!", "Logout Success!");
      localStorage.clear();
      window.location.replace("/login");
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Layout className="h-screen w-full flex flex-row">
      <Sider
        className={
          collapsed
            ? "max-md:hidden bg-[#EBEBEB]"
            : "visible sider bg-[#EBEBEB]"
        }
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#EBEBEB" }}
      >
        <Sidebar />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <div className="flex flex-row ">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                zIndex: 999,
              }}
            />
            <Dropdown.Button
              menu={menuProps}
              icon={<UserOutlined />}
              className="flex justify-end m-4"
            >
              Hello, User!
            </Dropdown.Button>
          </div>
        </Header>

        <Content className="m-[24px] p-[24px] bg-white rounded-md h-full overflow-scroll">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/map" element={<Map />} />
          </Routes>
        </Content>
        <Footer className="text-center pt-0">
          Copyright 2023 © ALL RIGHTS RESERVED. Design by{" "}
          <a href="https://aventureit.com" target="_blank" rel="noreferrer">
            Aventure It Solution
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
