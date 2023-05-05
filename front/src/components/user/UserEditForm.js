import React, { useState, useEffect, useContext } from "react";

import { Button, Form, Col, Row, Modal } from "react-bootstrap";
import * as Api from "../../api";

import { DispatchContext, UserStateContext } from "../../App";

function UserEditForm({ user, setIsEditing, setUser }) {
  const [name, setName] = useState(user.name);
  const [blog, setBlog] = useState(user.blog);
  const [github, setGithub] = useState(user.github);
  const [description, setDescription] = useState(user.description);
  const [bgColor, setBgColor] = useState(user.bgColor);
  const [boxColor, setBoxColor] = useState(user.boxColor);
  const [menuColor, setMenuColor] = useState(user.menuColor);
  const [homeName, setHomeName] = useState(user.homeName);
  const [image, setImage] = useState(user.image);

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  const dispatch = useContext(DispatchContext);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    Api.get("userId", user.id).then((res) => {
      document.body.style.backgroundColor = res.data.bgColor;
    });
  }, [userState]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      github,
      blog,
      description,
      bgColor,
      boxColor,
      menuColor,
      homeName,
      image,
    };

    const isValidGithub =
      (github.startsWith("https://") || github.startsWith("http://")) && github;

    if (!isValidGithub) {
      setGithub(`https://${github}`);
      data.github = `https://${github}`;
    }

    const isValidBlog =
      (blog.startsWith("https://") || blog.startsWith("http://")) && blog;

    if (!isValidBlog) {
      setBlog(`https://${blog}`);
      data.blog = `https://${blog}`;
    }
    if (!isValidBlog) {
      setBlog(`https://${blog}`);
      data.blog = `https://${blog}`;
    }

    const res = await Api.put(`userId/${user.id}`, data);
    const updatedUser = res.data;

    setUser(updatedUser);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: updatedUser,
    });

    setIsEditing(false);
  };

  return (
    <Modal
      show={show}
      animation={false}
      style={{ fontFamily: "NeoDunggeunmo" }}
    >
      <Modal.Header>
        <Modal.Title>유저 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ fontFamily: "NanumBarunGothic" }}>
          <Form.Group controlId="userEditImage" className="mb-3">
            <Form.Label>프로필 사진 변경</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="userEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="userEditGithub" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditBlog" className="mb-3">
            <Form.Control
              type="string"
              placeholder="Blog"
              value={blog}
              onChange={(e) => setBlog(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="인사말을 추가해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </div>

        <div style={{ fontFamily: "NanumBarunGothic" }}>
          <Form.Label>홈피 설정</Form.Label>
          <Form.Group controlId="userEditHomeName">
            <Form.Control
              type="text"
              placeholder="미니홈피 이름"
              value={homeName}
              onChange={(e) => setHomeName(e.target.value)}
            />
          </Form.Group>
          <div style={{ display: "flex" }}>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
              }}
            >
              <Form.Label>배경 색상 선택</Form.Label>
              <Form.Group controlId="userEditBgColor">
                <Form.Control
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
              }}
            >
              <Form.Label>박스 색상 선택</Form.Label>
              <Form.Group controlId="userEditBoxColor">
                <Form.Control
                  type="color"
                  value={boxColor}
                  onChange={(e) => setBoxColor(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "33.33%",
              }}
            >
              <Form.Label>메뉴 색상 선택</Form.Label>
              <Form.Group controlId="userEditMenuColor">
                <Form.Control
                  type="color"
                  value={menuColor}
                  onChange={(e) => setMenuColor(e.target.value)}
                />
              </Form.Group>
            </Col>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Form.Group as={Row} className="mt-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button
              type="submit"
              className="me-3"
              onClick={(e) => {
                handleClose(e);
                handleSubmit(e);
              }}
            >
              확인
            </Button>
            <Button
              variant="secondary"
              onClick={(e) => {
                setIsEditing(false);
                handleClose(e);
              }}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditForm;
