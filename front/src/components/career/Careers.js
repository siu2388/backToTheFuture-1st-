import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import Career from "./Career";
import CareerAddForm from "./CareerAddForm";

function Careers({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [careers, setCareers] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
    Api.get("careerlist", portfolioOwnerId).then((res) => setCareers(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ display: "inline-block", marginRight: "10px" }}>
          경력
        </Card.Title>
        {isEditable && (
          <button
            className="btn-add"
            style={{ display: "inline-block" }}
            onClick={() => setIsAdding(true)}
          >
            +
          </button>
        )}

        {isAdding && (
          <CareerAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCareers={setCareers}
            setIsAdding={setIsAdding}
          />
        )}
        {careers.map((career) => (
          <Career
            key={career.id}
            career={career}
            setCareers={setCareers}
            isEditable={isEditable}
          />
        ))}
      </Card.Body>
    </Card>
  );
}

export default Careers;
