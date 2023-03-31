import { Autocomplete, Box, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { HeaderTitleContext } from "src/context/HeaderTitleContext";

import { mockMachinesData } from "src/data/mock/mockMachines";

function NewMachine() {
  const { titleText, setTitleText } = useContext(HeaderTitleContext);

  function uniqueAreas() {
    const valueArray = mockMachinesData.map((machine) => machine.Area);
    const setOfValue = new Set(valueArray);
    const uniqueValues = [...setOfValue];
    return uniqueValues;
  }

  const testUnique = uniqueAreas();

  useEffect(
    () =>
      setTitleText({
        title: "Maszyny",
        subtitle: "Dodaj nową maszynę",
      }),
    []
  );

  return (
    <Box>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={testUnique}
        //getOptionLabel={(option) => option.Area}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </Box>
  );
}

export default NewMachine;

/*

<Autocomplete
        disablePortal
        id="combo-box-demo"
        options={[uniqueAreas]}
        //getOptionLabel={(option) => option.Area}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />

      */
