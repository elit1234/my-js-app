import signOut from "../objects/signOut";

import { useHistory } from "react-router-dom";

export default function Logout() {
  localStorage.clear();
  const history = useHistory();
  return signOut(history);
}
