import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

const ModalCyberBug = () => {
  const dispatch = useDispatch();
  const { visible, ComponentContentDrawer, callbackSubmit, title } =
    useSelector((state) => {
      return state.DrawerCyberBug;
    });

  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "NOTIFICATION_ON" });
                callbackSubmit();
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
};

export default ModalCyberBug;
