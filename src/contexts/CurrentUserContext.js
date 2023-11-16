import { createContext, useState } from "react";
import avatar from "../../src/images/Avatar.svg";

export const CurrentUserContext = createContext();

export function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    name: "Current User",
    avatar: avatar,
  });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
