export const getDashboardPath = (path = "") => {
  const role = localStorage.getItem("role")
  return `/dashboard/${role}/${path}`
}