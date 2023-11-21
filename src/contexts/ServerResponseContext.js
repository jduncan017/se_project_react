import { createContext, useState } from "react";

export const ServerResponseContext = createContext();

export function ServerResponseProvider({ children }) {
  const [serverResponse, setServerResponse] = useState(false);

  return (
    <ServerResponseContext.Provider
      value={{ serverResponse, setServerResponse }}
    >
      {children}
    </ServerResponseContext.Provider>
  );
}
