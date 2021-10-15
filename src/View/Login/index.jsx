import { Container, TextField, Typography, Button } from "@material-ui/core";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import "./style.js";
import { useStyles } from "./style.js";
import { useDispatch } from "react-redux";
import { loginCyberBugAction } from "../../Store/Actions/CyberBugActions.js";
import { Redirect } from "react-router";
import { USER_INFO } from "../../util/constants/settingSystem.js";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dispatch từ comp thành công");
    dispatch(loginCyberBugAction(formik.values));
  };
  return (
    <Fragment>
      {localStorage.getItem(USER_INFO) ? (
        <Redirect to="/" />
      ) : (
        <Container className={classes.root}>
          <Typography variant="h2" align="center">
            LOGIN
          </Typography>
          <TextField
            onChange={formik.handleChange}
            name="email"
            value={formik.values.email}
            className={classes.textField}
            fullWidth={true}
            id="outlined-basic"
            label="User Name"
            variant="outlined"
          />
          <TextField
            onChange={formik.handleChange}
            name="password"
            value={formik.values.password}
            className={classes.textField}
            fullWidth={true}
            id="outlined-basic"
            label="PassWord"
            type="password"
            variant="outlined"
          />
          <Button
            color="primary"
            type="submit"
            onClick={handleSubmit}
            variant="contained"
          >
            Contained
          </Button>
        </Container>
      )}
    </Fragment>
  );
};

export default Login;
