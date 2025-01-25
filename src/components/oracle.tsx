// import { useEffect, useState } from "react";

export interface OracleProp {
  puzzleId: number;
}

export const Oracle = (prop: OracleProp) => {
  const isMobile = window.innerWidth < 768;
  console.log(isMobile);
  return <p>{prop.puzzleId}</p>;
};
