import { toast } from "react-toastify";
const initialState = {
  visible: false,
  ComponentContentDrawer: <p>defult</p>,
  //   Nếu muốn ở comp gọi nó  dưới dạng thẻ thì viết nhưu sau : ComponentContentDrawer:()=>{return <p></p>} ( viết kiểu này là đang viết dưới dạng compp nên ta có thể gọi theo dạng comp)
  // ComponentContentDrawer: (props) => {
  //   return <p>dèau</p>;
  // },
  callbackSubmit: (propsValue) => {
    alert("click demo!");
  },
  notify: () => toast("Wow so easy !"),
  title: "",
};

export const DrawerCyberBug = (state = initialState, { type, payload }) => {
  switch (type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM":
      state.visible = true;
      state.ComponentContentDrawer = payload.Comp;
      state.title = payload.title;
      return { ...state };
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callbackSubmit = payload;
      return { ...state };
    }
    case "SET_SUBMIT_CREATE_TASK": {
      state.callbackSubmit = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
