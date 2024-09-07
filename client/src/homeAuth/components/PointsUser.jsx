import React, { useContext, useEffect, useState } from "react";
import usePoint from "../../hooks/usePoints";
import Loading from "../../ui/Loading";

export default function PointsUser() {
  const { points, getPoints } = usePoint();
  const [loading, setLoading] = useState(true);

  const handleGetPoints = () => {
    getPoints();
  };
  const totalSavings = points;
  useEffect(() => {
    handleGetPoints();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  if(loading) return <Loading />

  return (  
      <div className="pointsGeneralAccumulated">
        My Points: <span>{points.accumulated}</span>
      </div>
  );
}
