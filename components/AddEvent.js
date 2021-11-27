import react, { useState, useEffect } from "react";
import { styled } from "../stitches.config";
import moment from "moment";

export default function AddEvent({ params: defaultParams, toggle, isOpen }) {
  if (!isOpen) return null;
  const [params, setParams] = useState({});
  const [startTime, setStartTime] = useState(
    moment(defaultParams.start).format("hh:mm")
  );
  const [endTime, setEndTime] = useState(
    moment(defaultParams.end).format("hh:mm")
  );
  console.log(moment(defaultParams.end).format("hh:mm"));

  const insertToDB = async (params) => {
    console.log(params);
    const res = await fetch("/api/v1/treatments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: params.start,
        end: params.end,
        title: params.title,
        patient: { first_name: "Moni", last_name: "Aploni", rate: 300 },
        status: "sechuld",
      }),
    });

    return res;
  };

  return isOpen ? (
    <Overlay>
      <Dialog>
        <DialogHeader>
          <button onClick={() => toggle(false)}>close</button>
        </DialogHeader>
        <DialogContent>
          <div style={{ display: "flex" }}>
            title
            <input
              onChange={(e) =>
                setParams({
                  ...params,
                  title: e.target.value,
                })
              }
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            start
            <input
              type="time"
              onChange={(e) => {
                const c = e.target.value.split(":");
                const startTime = moment(params.start).set({
                  hour: +c[0],
                  minute: +c[1],
                });
                setParams({
                  ...params,
                  start: startTime,
                });
              }}
            ></input>
          </div>
          <div style={{ display: "flex" }}>
            end
            <input
              type="time"
              onChange={(e) => {
                const c = e.target.value.split(":");
                const endTime = moment(params.end).set({
                  hour: +c[0],
                  minute: +c[1],
                });
                setParams({
                  ...params,
                  end: endTime,
                });
              }}
            ></input>
            <button onClick={() => insertToDB(params)}>save</button>
          </div>
        </DialogContent>
      </Dialog>
    </Overlay>
  ) : null;
}

const Overlay = styled("div", {
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 100,
  top: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "@bp1": {
    width: "100%",
  },
});

const Dialog = styled("div", {
  width: "50%",
  height: "70%",
  backgroundColor: "#fefefe",
  borderRadius: 5,
  padding: 5,
  "@bp1": {
    height: "80%",
    width: "90%",
  },
});

const DialogHeader = styled("div", {
  py: 5,
  "@bp1": {},
});

const DialogContent = styled("div", {
  py: 5,
  display: "flex",
  fd: "column",
  alignItems: "center",
  justifyContent: "center",
  "@bp1": {},
});
