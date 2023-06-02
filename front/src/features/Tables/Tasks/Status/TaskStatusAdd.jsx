import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import useTheme from "@mui/material/styles/useTheme";

import { tokens } from "@/assets/themes/theme";
import { HeaderTitleContext } from "@/context/HeaderTitleContext";

export default function PartsStatusAdd() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const taskId = useParams().id;

  useEffect(() => {
    setTitleText({
      title: "Status działania",
      subtitle: "Dodaj status",
    });
  }, []);

  return <div></div>;
}
