import { useState, useCallback, useContext } from "react";
import { ServerResponseContext } from "../contexts/ServerResponseContext";

const useModal = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [buttonDisplay, setButtonDisplay] = useState("");
  const { setServerResponse } = useContext(ServerResponseContext);

  const toggleModal = useCallback(
    (modalName, buttonDisplay = null) => {
      if (currentModal === modalName) {
        setCurrentModal(null);
      } else {
        setCurrentModal(modalName);
        setServerResponse("");
        setButtonDisplay(buttonDisplay);
      }
    },
    [currentModal, setServerResponse]
  );

  return {
    currentModal,
    setCurrentModal,
    buttonDisplay,
    setButtonDisplay,
    toggleModal,
  };
};

export default useModal;
