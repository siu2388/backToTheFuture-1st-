import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { serverUrl } from "../../api";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <Card className="userCard">
      <Card.Body style={{width:"18rem" ,height:"25rem"}}>
        <Row xs="auto" className="justify-content-md-center">
          <Card.Img
            style={{ width: "12rem", height: "18rem", align: "center" }}
            className="mb-3"
            src={`${serverUrl}${user?.image?.path || "uploads/profile.jpg"}`} // fallback 이미지
            alt="프로필 이미지"
          />
        </Row>
        <Card.Title style = {{ fontFamily: "NeoDunggeunmo" }}>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted" >{user?.email}</Card.Subtitle>
        <Card.Link href={user?.github} target="_blank">
          Github
        </Card.Link>
        <Card.Link href={user?.blog} target="_blank">
          Blog
        </Card.Link>

        <Card.Text>{user?.description}</Card.Text>

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
