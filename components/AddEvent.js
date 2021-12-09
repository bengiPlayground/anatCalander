import react, { useState, useEffect } from "react";
import { styled } from "../stitches.config";
import moment from "moment";
import { Button } from "./Button";
import { ControlGroup } from "./ControlGroup";
import { TextField } from "./TextField";
import {
  SewingPinIcon,
  PersonIcon,
  ClockIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

export default function AddEvent({
  selectedSlot,
  params: defaultParams,
  toggle,
  isOpen,
}) {
  const [params, setParams] = useState();
  const [eventDate, setEventDate] = useState();
  const [participant, setParticipant] = useState();

  useEffect(() => {
    setParams({
      title: "טיפול",
      start: defaultParams.start,
      end: defaultParams.end,
    });
  }, [defaultParams]);

  async function insertParticipantToDB(participant) {
    const res = await fetch("/api/v1/participants", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
    });

    const result = await res.json();

    return result;
  }

  async function insertEventToDB(event, participant) {
    const objToInsert = {
      ...event,
      resources: {
        ...participant,
      },
    };

    const res = await fetch("/api/v1/treatments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(objToInsert),
    });

    const result = await res.json();

    return result;
  }

  const insertToDB = async () => {
    let participantResult;

    if (participant) {
      const res = await fetch("/api/v1/participants", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(participant),
      });

      participantResult = await res.json();
    }

    let obj = {};

    if (participantResult) {
      obj = {
        ...params,
        resources: {
          participant_id: participantResult.ops[0]._id,
        },
      };
    }

    const res = await fetch("/api/v1/treatments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(obj),
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

  const AddParticipant = ({ participant, setParticipant }) => {
    const [visible, setVisble] = useState(true);

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          //   backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          padding: 10,
          borderBottom: "1px solid lightgray",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            // backgroundColor: "red",
            padding: "10px 0",
            alignItems: "center",
          }}
          onClick={() => setVisble(!visible)}
        >
          <PersonIcon
            style={{
              margin: "0 5px",
              display: "flex",
            }}
          />
          הוספת משתתפים
        </div>
        {visible && (
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                padding: "10px 0",
              }}
            >
              <input
                placeholder="first name"
                value={participant?.first_name}
                onChange={({ target }) =>
                  setParticipant({
                    ...participant,
                    first_name: target.value,
                  })
                }
              />
              <TextField
                placeholder="last name"
                value={participant?.last_name}
                onChange={({ target }) =>
                  setParticipant({
                    ...participant,
                    last_name: target.value,
                  })
                }
              />
            </div>
            <TextField
              placeholder="rate"
              value={participant?.rate}
              onChange={({ target }) =>
                setParticipant({
                  ...participant,
                  rate: target.value,
                })
              }
            />
          </>
        )}
      </div>
    );
  };

  const AddDate = (props) => {
    const [visible, setVisble] = useState(true);

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          //   backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          padding: 10,
          borderBottom: "1px solid lightgray",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            // backgroundColor: "red",
            padding: "10px 0",
            alignItems: "center",
          }}
          onClick={() => setVisble(!visible)}
        >
          <ClockIcon
            style={{
              margin: "0 5px",
            }}
          />
          זמנים
        </div>

        <>
          <InputWrapper>
            <TextField
              type="date"
              //   value={params.start.format("YYYY-MM-DD")}
              onChange={(e) => handleDateInputChange(e, "start")}
              style={{ border: "none" }}
            />
            <TextField
              type="time"
              value={moment(params.start).format("HH:mm")}
              onChange={(e) => handleTimeInputChange(e, "start")}
            />
          </InputWrapper>
          <InputWrapper style={{ display: "flex" }}>
            <TextField
              type="Date"
              //   value={moment(params.end).format("YYYY-MM-DD")}
            />
            <TextField
              type="time"
              value={moment(params.end).format("HH:mm")}
              onChange={(e) => handleTimeInputChange(e, "end")}
            />
          </InputWrapper>
        </>
      </div>
    );
  };

  const AddTitle = (props) => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          //   backgroundColor: "green",
          display: "flex",
          flexDirection: "column",

          borderBottom: "1px solid lightgray",
        }}
      >
        <InputTitle
          placeholder="שם"
          value={params.title}
          onChange={(e) =>
            setParams({
              ...params,
              title: e.target.value,
            })
          }
        />
      </div>
    );
  };

  return isOpen ? (
    <Overlay>
      {params && (
        <Dialog>
          <DialogHeader>
            <Button onClick={() => toggle(false)}>ביטול</Button>
            <Button onClick={() => insertEventToDB(params, participant)}>
              שמור
            </Button>
          </DialogHeader>
          <DialogContent>
            <AddTitle />
            <AddDate />
            <AddParticipant
              participant={participant}
              setParticipant={setParticipant}
            />
          </DialogContent>
        </Dialog>
      )}
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
  //   padding: 5,
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

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  borderBottom: "1px solid $mauve5",
  p: 10,
  my: 10,
  "@bp1": {
    width: "100%",
  },
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
  width: "100%",
  height: 40,
  border: "none",
  //   borderBottom: "1px solid $mauve5",
  fontSize: 20,
  padding: 10,
  "@bp1": {},
  "&:focus": { outline: "none" },
});
