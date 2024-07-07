import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Close from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSystem } from "../../system/system";

function urlCheck(text: string) {
  const regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
  return regex.test(text);
}

type FormProps = {
  url: string;
};

export default function Url() {
  const { register, handleSubmit, watch } = useForm<FormProps>();
  const { status, connected, setSystem, url: urlSystem } = useSystem();
  const url = watch("url");
  const [isUrl, setIsUrl] = useState<boolean>(true);

  const onSubmit = handleSubmit(() => {
    setSystem({
      status: urlSystem ? "disconnect" : "connecting",
      url: urlSystem ? null : "ws://" + url,
    });
  });

  useEffect(() => {
    if (url) setIsUrl(urlCheck(url));
    else setIsUrl(true);
  }, [url]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack direction="row" spacing={2}>
          <TextField
            error={!isUrl}
            variant="outlined"
            label="IP"
            helperText={isUrl ? "" : "O endereço digitado é inválido."}
            fullWidth
            defaultValue="127.0.0.1:8080"
            disabled={connected}
            {...register("url")}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ borderRadius: "10px", height: "56px" }}
            disabled={!isUrl}
            color={connected ? "error" : "success"}
          >
            {status === "connecting" ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={30} color="inherit" />
              </Box>
            ) : connected ? (
              <Close fontSize="large" />
            ) : (
              <TaskAltIcon fontSize="large" />
            )}
          </Button>
        </Stack>
      </form>
    </>
  );
}
