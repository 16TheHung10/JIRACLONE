import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  VideoCameraOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import FormCreateTask from "./Form/FormCreateTask/FormCreateTask";
const { Sider } = Layout;
const Sidebar = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ collapsed: false });
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        style={{ height: "100%" }}
      >
        <div className="text-right text-white" style={{ fontSize: "30px" }}>
          {state.collapsed ? (
            <MenuUnfoldOutlined
              style={{ cursor: "pointer" }}
              onClick={toggle}
            />
          ) : (
            <MenuFoldOutlined style={{ cursor: "pointer" }} onClick={toggle} />
          )}
        </div>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<PlusOutlined />}
            onClick={() => {
              dispatch({
                type: "OPEN_FORM",
                payload: { Comp: <FormCreateTask />, title: "Create Task" },
              });
            }}
          >
            Create Task
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Search
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default Sidebar;
