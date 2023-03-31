import { useContext, useEffect } from "react";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

function NewTask() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  useEffect(
    () =>
      setTitleText({
        title: "Zadania",
        subtitle: "Dodaj nowe zadanie",
      }),
    []
  );
  return <div>NewTask</div>;
}

export default NewTask;
