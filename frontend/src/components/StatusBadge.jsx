import { STATUS_STYLES } from "../constants/constants";

const StatusBadge = ({ status }) => {
  const badgeClass = STATUS_STYLES[status] || "badge-neutral";
  return <span className={`badge badge-soft ${badgeClass}`}>{status}</span>;
};

export default StatusBadge;
