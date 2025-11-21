export function getStatus(
  status: "error" | "loading" | "empty-state" | "success",
) {
  return new Map([
    ["error", 0],
    ["loading", 1],
    ["empty-state", 2],
    ["success", 3],
  ]).get(status);
}
