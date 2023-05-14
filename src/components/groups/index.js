import {
  Paper,
  TextField,
  Unstable_Grid2 as Grid,
  Select,
  FormControl,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Button,
} from "@mui/material";
import { useId, useState } from "react";

export default function Group({ onSubmit }) {
  const id = useId();
  const [name, setName] = useState("");
  const [condition, setCondition] = useState({
    question: "",
    answer: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ name, condition, id });
  }

  return (
    <Paper component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <FormControl>
            <TextField
              id="group-name"
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} md={5}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="condition-question">Question</InputLabel>
            <Select
              size="small"
              value={condition.question}
              input={<OutlinedInput label="Question" id="condition-question" />}
              onChange={({ target: { value } }) =>
                setCondition((prevState) => ({ ...prevState, question: value }))
              }
            >
              <MenuItem aria-label="None" value="" />
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={5}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="condition-answer">Options</InputLabel>
            <Select
              size="small"
              labelId="condition-answer"
              id="condition-answer"
              value={condition.answer}
              input={<OutlinedInput label="Options" />}
              onChange={({ target: { value } }) =>
                setCondition((prevState) => ({ ...prevState, answer: value }))
              }
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained">
        Create
      </Button>
    </Paper>
  );
}
