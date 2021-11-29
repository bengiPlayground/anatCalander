import react, { useState, useEffect } from "react";
import { connectToDatabase } from "../util/mongodb";
import moment from "moment";
import { styled } from "../stitches.config";
import BigCalander from "../components/Calander";
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
  const [selectedSlot, setSelectedSlot] = useState();
  const [params, setParams] = useState({});
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
        selectedSlot={selectedSlot}
      />
      <BigCalanderWrapper>
        {events && (
          <BigCalander
            rtl
            views={["month", "week", "day", "agenda"]}
            popup
            selectable
            defaultView="day"
            events={events}
            endAccessor="end"
            onSelectEvent={(e) => console.log({ eventClicked: e })}
            onSelectSlot={(e) => {
              setDialogVisble(true);
              setSelectedSlot(e);
              setParams({
                ...params,
                start: moment(e.start).format("YYYY-MM-DD HH:mm"),
                end: moment(e.end).format("YYYY-MM-DD HH:mm"),
              });
            }}
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
