import { useState, useEffect } from "react";

export const useFormValidator = (formState) => {
  const [errors, setErrors] = useState({});
  const [inputValidity, setInputValidity] = useState({});
  const [formValidity, setFormValidity] = useState(false);

  useEffect(() => {
    const initialInputValidity = Object.keys(formState).reduce((acc, key) => {
      const isValid = false;
      return {
        ...acc,
        [key]: isValid,
      };
    }, {});

    setInputValidity(initialInputValidity);
  }, []);
};

// .2 Check values for validity
// -   how do I do this?
// .3 store validity of each input in object state
// .4 update error message based on state
// .5 update submit button based on form validity
// -   keep track of form validity in a new state
// .6 Enable/Disable button based on formValidity
