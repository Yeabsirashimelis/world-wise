import { useLocation, useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
