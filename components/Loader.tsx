import React from "react";
import BeatLoader from "react-spinners/BeatLoader";



type LoaderProps = {
  color: string;
  size: number;
};

const Loader: React.FC<LoaderProps> = ({ color, size }) => {
  return (
    <div className="sweet-loading">
      <BeatLoader color={color}  size={size} />
    </div>
  );
};

export default Loader;
