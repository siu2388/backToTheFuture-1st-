import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { serverUrl } from "../../api";
import "./imageCard.css";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className="userCard">
      <Card.Body style={{ width: "18rem", height: "25rem" }}>

        <Row xs="auto" className="justify-content-md-center">
          <div className="card-img-container">
            <Card.Img
              className="card-img"
              src={`${serverUrl}${user?.image?.path || "uploads/profile.jpg"}`}
              alt="프로필 이미지"
            />
          </div>
        </Row>

        <Card.Title style={{ fontFamily: "NeoDunggeunmo" }}>
          {user?.name}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>
        <a href={user?.github} rel="noreferrer" target="_blank">
          <img
            src="images/github.png"
            alt="Github"
            style={{ width: "1.7rem", marginRight:"10px"}}
          />
        </a>
        <a href={user?.blog} rel="noreferrer" target="_blank">
          <img
            style={{ width: "1.7rem"}}
            src="images/tistory.png"
            alt="Blog"
          />
        </a>



        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/userId/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
