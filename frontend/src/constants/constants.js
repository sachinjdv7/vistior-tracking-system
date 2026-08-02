const STATUS_VARIANTS = {
  IN: "secondary",
  IN_MEETING: "outline",
  OUT: "default",
};

const STATUS_CLASSES = {
  IN_MEETING: "border-amber-300 bg-amber-50 text-amber-700",
};

const ROLE_ROUTE_MAP = {
  admin: "/",
  security: "/visitor/list",
  manager: "/visitor/assign",
  hr: "/visitor/assign",
};

export { STATUS_VARIANTS, STATUS_CLASSES, ROLE_ROUTE_MAP };
