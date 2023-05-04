import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import * as Api from '../../api';
import Award from "./Award";
import AwardAddForm from "./AwardAddForm";

function Awards({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [awards, setAwards] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
    Api.get("awardlist", portfolioOwnerId).then((res) => setAwards(res.data));
  }, [portfolioOwnerId]);


  return (
    <Card>
      <Card.Body>
        <Card.Title style = {{display: "inline-block", marginRight: "10px"}}>수상이력</Card.Title>         
        {isEditable && (
            <button className = "btn-add" style = {{ display: "inline-block" }} onClick={() => setIsAdding(true)}>+</button>
        )}

        {isAdding && (
          <AwardAddForm
            portfolioOwnerId={portfolioOwnerId}
            setAwards={setAwards}
            setIsAdding={setIsAdding}
            
          />
        )}
        
        {awards.map((award) => (
          <Award
            key={award.id}
            award={award}
            setAwards={setAwards}
            isEditable={isEditable}

          />
        ))}


      </Card.Body>
    </Card>
  );
}

export default Awards;

