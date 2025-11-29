const STATUS_STYLES = {
  IN: "badge-secondary",
  IN_MEETING: "badge-warning",
  OUT: "badge-success",
};

const ROLE_ROUTE_MAP = {
  admin: "/",
  security: "/visitor/list",
  manager: "/visitor/assign",
  hr: "/visitor/assign",
};

export { STATUS_STYLES, ROLE_ROUTE_MAP };
