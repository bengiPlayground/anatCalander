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
    const res = await fetch("/api/v1/treatments", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: moment().format("YYYY-MM-DD hh:mm"),
        title: "treatment",
        patient: { first_name: "Moni", last_name: "Aploni", rate: 300 },
        status: "sechuld",
        hours: 1,
      }),
    });

    return res;
  };

  const AddEvent = (props) => {
    return (
      <div style={{ width: "40vw", height: 300 }}>
        <TextField></TextField>
        {/* <ControlGroup> */}
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
        {/* </ControlGroup> */}
      </div>
    );
  };

  return (
    <>
      <Dialog open={dialogVisble}>
        {/* <DialogContent> */}
        {/* <p size="5" as="h6" css={{ fontWeight: 500, mb: "$3" }}>
          Dialog Heading
        </p>
        <AddEvent /> */}
        {/* </DialogContent> */}
      </Dialog>
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
