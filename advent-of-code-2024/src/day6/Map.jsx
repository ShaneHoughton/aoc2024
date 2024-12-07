import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";

const Row = ({ row }) => {
  return (
    <div className="row">
      {row.map((space, index) => (
        <div className="space" key={`space-${index}`}>{`${space}`}</div>
      ))}
    </div>
  );
};
Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.string).isRequired, // Validate `row` as an array of strings
};

const Map = () => {
  const [floor, setFloor] = useState([]);
  // const [guardPosition, setGaurdPosition] = ([-1, -1]);
  // const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const getMapData = async () => {
      const response = await fetch("./test.txt");
      const text = await response.text();
      const mapMatrix = text.split("\n").map((row) => row.split(""));
      setFloor(mapMatrix);
    };
    getMapData();
  }, []);

  return (
    <div className="board">
      {floor.map((row, index) => (
        <Row key={`row-${index}`} row={row} />
      ))}
    </div>
  );
};

export default Map;
