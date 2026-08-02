import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { STATUS_CLASSES, STATUS_VARIANTS } from "../constants/constants";

const StatusBadge = ({ status }) => {
  const variant = STATUS_VARIANTS[status] || "outline";
  const customClass = STATUS_CLASSES[status] || "";

  return (
    <Badge variant={variant} className={cn(customClass)}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
