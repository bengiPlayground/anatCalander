import react, { useState, useEffect } from "react";
// import { connectToDatabase } from "../util/mongodb";
import moment from "moment";
import { styled } from "../stitches.config";
import BigCalander from "../components/Calander";
import AddEventComponent from "../components/AddEvent";
import AddNewEventLayer from "../components/Layers/AddNewEvent";
import Dialog from "../components/Dialog/Dialog";
import data from "../data/events.json";
import { Button } from "../components/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleVisible,
  setDate,
  setView,
} from "../redux/features/toolbarSlice";

const BigCalanderWrapper = styled("div", {
  width: "90%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@bp1": {
    width: "100%",
  },
});

const Toolbar = styled("div", {
  width: "100%",
  display: "none",
  backgroundColor: "red",
  "@bp1": {
    width: "100%",
  },
  variants: {
    visible: {
      true: { display: "flex", alignItems: "center", justifyContent: "center" },
    },
  },
});

const SelectView = styled("div", {
  backgroundColor: "green",
  "@bp1": {
    // width: "100%",
  },
});

const CustomToolbar = (props) => {
  const {
    // visible,
    setSelectedView,
    setSelectedDate,
    selectedView,
    selectedDate,
  } = props;
  console.log(props);
  const { view, date, views, visible } = useSelector((state) => state.toolbar);
  const dispatch = useDispatch();

  return (
    <Toolbar visible={visible}>
      <SelectView>
        <Button
          onClick={() => dispatch(setDate(moment(date).add(1, view).toDate()))}
        >
          add
        </Button>
        <Button onClick={() => dispatch(setDate(moment().toDate()))}>
          today
        </Button>
        <Button
          onClick={() =>
            dispatch(setDate(moment(date).subtract(1, view).toDate()))
          }
        >
          subtruct
        </Button>
        <Button onClick={() => dispatch(setView("day"))}>day</Button>
        <Button onClick={() => dispatch(setView("week"))}>week</Button>
        <Button onClick={() => dispatch(setView("month"))}>month</Button>
      </SelectView>
      {props.e.label}
    </Toolbar>
  );
};

export default function Calander() {
  const [toolbarVisbile, setToolbarVisible] = useState(false);
  const [selectedView, setSelectedView] = useState("day");
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const [events, setEvents] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedEvent, setSelectedEvent] = useState();
  const [params, setParams] = useState({});
  const [dialogVisble, setDialogVisble] = useState(false);
  const { view, date, views, visible } = useSelector((state) => state.toolbar);
  const dispatch = useDispatch();

  useEffect(() => {
    // const e = treatments.map((treatment) => {
    //   const { title, resources, start, end } = treatment;

    //   return {
    //     start: moment(start).toDate(),
    //     end: moment(end).toDate(),
    //     title,
    //     resources,
    //   };
    // });
    // setEvents(e);

    const e2 = data.map((treatment) => {
      const { title, resources, start, end } = treatment;

      return {
        start: moment(start).toDate(),
        end: moment(end).toDate(),
        title,
        resources,
      };
    });

    setEvents(e2);
  }, []);

  return (
    <>
      <Dialog isOpen={dialogVisble} toggle={setDialogVisble}>
        <AddNewEventLayer />
      </Dialog>

      <BigCalanderWrapper>
        {events && (
          <BigCalander
            rtl
            views={["month", "week", "day", "agenda"]}
            popup
            selectable
            // defaultView="day"
            date={date}
            view={view}
            events={events}
            endAccessor="end"
            onSelectEvent={(e) => setSelectedEvent(e)}
            onSelectSlot={(e) => {
              setDialogVisble(true);
              setSelectedSlot(e);
            }}
            components={{
              toolbar: (e) => (
                <CustomToolbar
                  e={e}
                  visible={toolbarVisbile}
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              ),
            }}
          />
        )}
      </BigCalanderWrapper>
    </>
  );
}

// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();
//   const treatments = await db
//     .collection("treatments")
//     .find({})
//     .limit(20)
//     .toArray();

//   // const response = await fetch(`${__dirname}../data/events.js`);
//   // console.log(await response.json());

//   return {
//     props: {
//       treatments: JSON.parse(JSON.stringify(treatments)),
//     },
//   };
// }
