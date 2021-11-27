import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { styled } from "../stitches.config.ts";
import "moment/locale/he";

const localizer = momentLocalizer(moment);

const messages = {
  today: "היום",
  previous: "הקודם",
  next: "הבא",
  month: "חודש",
  week: "שבוע",
  day: "יום",
  agenda: "אג'נדה",
};

const CostumCalander = styled(Calendar, {
  // height: 500,
  fontFamily: "Rajdhani",
  // border: "1px solid $mauve6",
  padding: 30,
  width: "100%",
  // toolbar
  ".rbc-toolbar": {
    display: "flex",
    jc: "center",
    ai: "center",
  },
  "@bp1": {
    padding: 10,
    ".rbc-toolbar": {
      fd: "column",
    },
  },
});

export default function Calander({ ...props }) {
  return (
    <CostumCalander localizer={localizer} messages={messages} {...props} rtl />
  );
}
