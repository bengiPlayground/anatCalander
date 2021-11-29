import react, { useState, useEffect } from "react";
import { styled } from "../stitches.config";
import moment from "moment";
import { Button } from "./Button";

export default function AddEvent({
  selectedSlot,
  params: defaultParams,
  toggle,
  isOpen,
}) {
  const [params, setParams] = useState();
  console.log(selectedSlot);
  useEffect(() => {
    setParams({
      title: "טיפול",
      start: defaultParams.start,
      end: defaultParams.end,
      startDate: defaultParams.start,
    });
  }, [defaultParams]);

  const insertToDB = async () => {
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
        patient: { first_name: "מוני", last_name: "אלמוני", rate: 300 },
        status: "sechuld",
      }),
    });

    return res;
  };

  const handleTimeInputChange = ({ target }, name) => {
    const time = target.value.split(":");
    const hour = +time[0];
    const minute = +time[1];

    if (name === "start") {
      const startTime = moment(defaultParams.start)
        .set({
          hour: hour,
          minute: minute,
        })
        .format("YYYY-MM-DD HH:mm");

      setParams({
        ...params,
        start: startTime,
      });
    } else {
      const endTime = moment(defaultParams.end).set({
        hour: hour,
        minute: minute,
      });

      setParams({
        ...params,
        end: endTime.format("YYYY-MM-DD HH:mm"),
      });
    }
  };

  const handleDateInputChange = ({ target }, name) => {
    if (name === "start") {
      setParams({
        ...params,
        startDate: target.value,
      });
    } else {
      setParams({
        ...params,
        endtDate: target.value,
      });
    }
  };

  return isOpen ? (
    <Overlay>
      <Dialog>
        <DialogHeader>
          <Button onClick={() => toggle(false)}>ביטול</Button>
          <Button onClick={() => insertToDB()}>שמור</Button>
        </DialogHeader>
        <DialogContent>
          <InputWrapper style={{ display: "flex" }}>
            <InputTitle
              placeholder="שם"
              onChange={(e) =>
                setParams({
                  ...params,
                  title: e.target.value,
                })
              }
            />
          </InputWrapper>
          <InputWrapper>
            <input
              type="date"
              //   value={params.start.format("YYYY-MM-DD")}
              onChange={(e) => handleDateInputChange(e, "start")}
              style={{ border: "none" }}
            />
            <input
              type="time"
              value={moment(params.start).format("HH:mm")}
              onChange={(e) => handleTimeInputChange(e, "start")}
            />
          </InputWrapper>
          <InputWrapper style={{ display: "flex" }}>
            <input
              type="Date"
              //   value={moment(params.end).format("YYYY-MM-DD")}
            />
            <input
              type="time"
              value={moment(params.end).format("HH:mm")}
              onChange={(e) => handleTimeInputChange(e, "end")}
            />
          </InputWrapper>
          <InputWrapper>
            <input />
          </InputWrapper>
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
    height: "100%",
    width: "100%",
  },
});

const DialogHeader = styled("div", {
  py: 5,
  display: "flex",
  ai: "cnetrt",
  justifyContent: "space-between",
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

const InputWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  my: 10,
  "@bp1": {
    width: "100%",
  },
});

const InputTitle = styled("input", {
  "@bp1": {
    width: "100%",
    height: 40,
  },
});
