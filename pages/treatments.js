import react, { useState, useEffect } from "react";
import { connectToDatabase } from "../util/mongodb";
import moment from "moment";
import { styled } from "../stitches.config";
import {
  Dialog,
  // DialogTrigger,
  DialogContent,
} from "../components/Dialog/SimpleDialog";
import BigCalander from "../components/Calander";
import { TextField } from "../components/TextField";
import { ControlGroup } from "../components/ControlGroup";
import { Button } from "../components/Button";

const BigCalanderWrapper = styled("div", {
  width: "90%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@bp1": {
    width: "100%",
  },
});

export default function Calander({ treatments }) {
  const [events, setEvents] = useState();
  const [params, setParams] = useState({});
  const [date, setDate] = useState({});
  const [dialogVisble, setDialogVisble] = useState(false);

  useEffect(() => {
    const e = treatments.map((treatment) => {
      const { title, patient, hours, minutes, date, status } = treatment;

      const start = moment(date).toDate();
      const end = moment(date)
        .add(hours, "hours")
        .add(minutes, "minutes")
        .toDate();

      return {
        start,
        end,
        title,
        resources: { patient, status },
      };
    });

    setEvents(e);
  }, []);

  const addEvent = async () => {
    console.log(params);
    // const res = await fetch("/api/v1/treatments", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     start: params.start,
    //     end: params.end,
    //     title: params.title,
    //     patient: { first_name: "Moni", last_name: "Aploni", rate: 300 },
    //     status: "sechuld",
    //   }),
    // });

    // return res;
  };

  return (
    <>
      {dialogVisble && (
        <div
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 100,
            top: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "50%", height: "70%", backgroundColor: "#fefefe" }}
          >
            <button onClick={() => setDialogVisble(false)}>close</button>
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
                  const startTime = moment(date.start).set({
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
                  const endTime = moment(date.start).set({
                    hour: +c[0],
                    minute: +c[1],
                  });
                  setParams({
                    ...params,
                    end: endTime,
                  });
                }}
              ></input>
              <button onClick={() => addEvent()}></button>
            </div>
          </div>
        </div>
      )}
      <BigCalanderWrapper>
        {events && (
          <BigCalander
            views={["month", "week", "day", "agenda"]}
            popup
            selectable
            defaultView="day"
            events={events}
            endAccessor="end"
            onSelectEvent={(e) => console.log(e)}
            onSelectSlot={(e) => {
              setDialogVisble(true);
              setDate(e);
              // setParams({});
              console.log(e);
            }}
            rtl
          />
        )}
      </BigCalanderWrapper>
    </>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const treatments = await db
    .collection("treatments")
    .find({})
    .limit(20)
    .toArray();

  // const response = await fetch("/api/v1/treatments");
  // const treatments2 = await response.json();

  // console.log(treatments2);

  return {
    props: {
      treatments: JSON.parse(JSON.stringify(treatments)),
    },
  };
}
