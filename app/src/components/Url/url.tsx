import { TextField, Button, InputAdornment, Box } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useSystem } from "../../system/system";

export default function Url() {
  const { url } = useSystem();

  return (
    <>
      <Box display="flex" alignItems="center" gap="10px">
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant="outlined"
          size="small"
          disabled
          value={`${url}`}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PublicIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" sx={{ height: "100%" }}>
          <InsertDriveFileIcon />
        </Button>
      </Box>
    </>
  );
}
