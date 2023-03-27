import { useState, useContext, createContext } from "react";

const HeaderTitleContext = createContext({
  title: { title: "", subtitle: "" },
  setTitle: () => {},
});

export function useHeaderTitle() {
  return useContext(HeaderTitleContext);
}

export function HeaderTitleProvider({ children }) {
  const [headerTitleValue, setHeaderTitleValue] = useState({
    title: "",
    subtitle: "",
  });

  function setupTitle(title, subtitle) {
    setHeaderTitleValue({ title: title, subtitle: subtitle });
  }

  return (
    <HeaderTitleContext.Provider value={[headerTitleValue, setupTitle]}>
      {children}
    </HeaderTitleContext.Provider>
  );
}
