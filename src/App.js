import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import TranslateIcon from "@mui/icons-material/Translate";
import GitHubIcon from "@mui/icons-material/GitHub";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import BrightnessMediumIcon from "@mui/icons-material/BrightnessMedium";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";

function App({ toggleTheme, theme }) {
  const [names, setNames] = useState({
    0: "John Doe",
  });

  const openLanguageMenu = () => {};

  const handleFieldKeyInput = (code, value, key) => {
    key = parseInt(key);

    switch (code) {
      case "Comma":
        let namesLength = Object.keys(names)?.length;
        if (!namesLength) return;

        let values = Object.values(names);
        values.splice(key + 1, 0, "");

        const updatedNames = values.reduce(
          (prev, current, index) => ({ ...prev, [index]: current }),
          {}
        );

        setNames(updatedNames);

        break;
      case "Backspace":
        if (!value && key > 0) {
          let namesLength = Object.keys(names)?.length;
          if (!namesLength) return;

          let values = Object.values(names);
          values.splice(key, 1);

          const updatedNames = values.reduce(
            (prev, current, index) => ({ ...prev, [index]: current }),
            {}
          );

          setNames(updatedNames);
        }
        break;
      default:
        break;
    }
  };

  const handleTextInput = (key, value, lastValue) => {
    if (!value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9 ]*$/)) return;

    setNames({ ...names, [key]: value });
  };

  const Paste = async() => {
    const clipboardText = await navigator.clipboard.readText() || ""
    const data = clipboardText.replace(/[$&+:;=?@#|'<>.^*()%!-]/g,'').split(",");

    const updatedNames = data?.reduce(
      (prev, current, index) => ({ ...prev, [index]: current }),
      {}
    );

    setNames(updatedNames);
  };

  return (
    <>
      <Container maxWidth="100%" style={{ paddingTop: "15px" }}>
        <Box>
          <Button sx={{ mr: 0.5 }} variant="outlined">
            Name <LocalFireDepartmentIcon sx={{ mr: "4px", ml: "4px" }} /> Clash
          </Button>
          <Box sx={{ float: "right" }}>
            <Button
              sx={{ mr: 0.5 }}
              variant="contained"
              href="https://github.com"
              target={"_blank"}
            >
              <GitHubIcon />
            </Button>

            <Button
              sx={{ mr: 0.5 }}
              variant="contained"
              onClick={openLanguageMenu}
            >
              <TranslateIcon />
            </Button>

            <Button sx={{ mr: 0.5 }} variant="contained" onClick={toggleTheme}>
              <BrightnessMediumIcon />
            </Button>

            <Button variant="contained" color="secondary">
              <FavoriteIcon />
            </Button>
          </Box>
        </Box>
      </Container>
      <Container sx={{ mt: "40px" }}>
        <Typography fontWeight={"800"} color="primary">
          Instructions
        </Typography>
        <Typography marginBottom={2} color="primary">
          Comma: adds a new field
          <br />
          Backspace: removes an empty field
        </Typography>

        <Box>
          {Object.keys(names)?.map((key) => (
            <TextField
              key={key}
              onKeyDown={({ code }) =>
                handleFieldKeyInput(code, names[key], key)
              }
              sx={{ input: { color: theme?.palette?.primary?.main } }}
              color="primary"
              variant="filled"
              placeholder="John Doe"
              value={names[key]}
              onChange={({ target }) =>
                handleTextInput(key, target.value, names[key])
              }
              label="Name"
              focused
              size={"small"}
            />
          ))}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button color="primary" variant="outlined" sx={{ mr: 1 }}>
            <SportsEsportsIcon sx={{ mr: "2px" }} />
            Start
          </Button>
          <Button color="primary" variant="outlined" onClick={Paste}>
            <ContentPasteIcon sx={{ mr: "2px" }} />
            Paste
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;
