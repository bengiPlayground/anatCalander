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
// import { ControlGroup } from "../components/ControlGroup";
import { Button } from "../components/Button";
import AddEventComponent from "../components/AddEvent";

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
      const { title, patient, start, end, status } = treatment;

      return {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        title,
        resources: { patient, status },
      };
    });
    // console.log(e);
    setEvents(e);
  }, []);

  return (
    <>
      <AddEventComponent
        isOpen={dialogVisble}
        toggle={setDialogVisble}
        params={params}
      />
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
              setParams({
                ...params,
                start: e.start,
                end: e.end,
              });
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

  return {
    props: {
      treatments: JSON.parse(JSON.stringify(treatments)),
    },
  };
}
