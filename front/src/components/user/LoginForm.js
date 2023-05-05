import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Form } from "react-bootstrap";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import "./login.css";
import "../font.css";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    if (email === "") {
      return false;
    }
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("user/login", {
        email,
        password,
      });
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      navigate("/", { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    }
  };

  document.body.style.backgroundColor = "#e5e1fe";

  return (
    <div className="login-page">
      <div className="logo-box">
      <img src = "images/logo2.png" style = {{width: "20rem"}}></img>
      </div>
      <Row className="justify-content-center mt-5">
        <Col lg={5} md={8} xs={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="loginEmail">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                className="inputLogin"
                placeholder="Email"
                type="email"
                autoComplete="on"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isEmailValid && email !== "" && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
              {!isFormValid && email === "" && (
                <Form.Text className="text-success">
                  이메일을 입력해주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="loginPassword" className="mt-3">
              <Form.Label>PW</Form.Label>
              <Form.Control
                className="inputLogin"
                placeholder="Password"
                type="password"
                autoComplete="on"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style = {{marginBottom: "2rem"}}
              />
              {!isPasswordValid && password !== "" && (
                <Form.Text className="text-success">
                  비밀번호는 4자리 이상입니다.
                </Form.Text>
              )}
              {!isFormValid && password === "" && (
                <Form.Text className="text-success">
                  비밀번호를 입력해주세요.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="shadow-button"
                >
                  로그인
                </button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <button
                  className="shadow-button"
                  onClick={() => navigate("/register")}
                >
                  회원가입
                </button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default LoginForm;
