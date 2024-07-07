import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useSystem } from "../../system/system";
import SelectMUI, { SelectChangeEvent } from "@mui/material/Select";

type SelectProps = {
  disable: boolean;
};

export default function Select(props: SelectProps) {
  const { setTempo } = useSystem();

  const handleChange = (event: SelectChangeEvent) => {
    setTempo(event.target.value as string);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tempo</InputLabel>
        <SelectMUI
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Tempo"
          onChange={handleChange}
          disabled={props.disable}
          defaultValue="3"
        >
          <MenuItem value={3}>3min</MenuItem>
          <MenuItem value={5}>5min</MenuItem>
          <MenuItem value={10}>10min</MenuItem>
          <MenuItem value={15}>15min</MenuItem>
        </SelectMUI>
      </FormControl>
    </Box>
  );
}
