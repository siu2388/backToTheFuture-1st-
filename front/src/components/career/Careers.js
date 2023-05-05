import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from "../../api";
import Career from "./Career";
import CareerAddForm from "./CareerAddForm";

function Careers({ portfolioOwnerId, isEditable }) {
  const [careers, setCareers] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
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
