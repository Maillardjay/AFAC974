import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const CurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);

export function CurrentUserProvider({ children }) {
  const [user, setUser] = useState();

  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
