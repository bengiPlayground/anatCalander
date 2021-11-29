import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function FullWidthResizer(props) {
  const [width, height] = useWindowSize();

  return (
    <div
      style={{
        height: height,
      }}
    >
      {props.children}
    </div>
  );
}
