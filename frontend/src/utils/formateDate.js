import { format, formatDuration, intervalToDuration } from "date-fns";

function formatTo12Hour(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return format(date, "dd/MM/yyyy, h:mm:ss a");
}

function formatTotalTime(minutes) {
  if (minutes === null || minutes === undefined) return "-";

  const duration = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000,
  });

  return formatDuration(duration, {
    format: ["hours", "minutes"],
    zero: false,
  });
}

export { formatTo12Hour, formatTotalTime };
