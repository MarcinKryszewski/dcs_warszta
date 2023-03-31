import { useContext, useEffect } from "react";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

function NewPerson() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  useEffect(
    () =>
      setTitleText({
        title: "Osoby",
        subtitle: "Dodaj nową osobę",
      }),
    []
  );
  return <div>NewPerson</div>;
}

export default NewPerson;
