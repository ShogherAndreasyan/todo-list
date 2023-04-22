import { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";

export default function Counter() {
  const [num, setNum] = useState(0);
  useEffect(()=>{
    console.log(num>0?"positive":num<0?"negative":"zero");
  }, [num]);
  return (
    <Row>
      <div>
        <Button onClick={() => setNum(num - 1)}>-</Button>
        <span className="spanNum">{num}</span>
        <Button onClick={() => setNum(num + 1)}>+</Button>
      </div>
    </Row>
  );
}
