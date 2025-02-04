import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import React, { useState, useRef, ChangeEvent, FormEvent } from "react";

const Calculator = () => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");

  const first = useRef<HTMLInputElement>(null);
  const second = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      operation: operation,
      first: first.current.value,
      second: second.current.value,
    };
    console.log("Query",query)
    if (query.operation === '' && query.first === '' && query.second === '') {
      setResult('Must fill out form')
    }
    else {
    axios
      // for testing with msw --> .get(`/api/calculate/add/1/2`)
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        setResult(err.response.data.message);
      });}
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="first" label="First Number" variant="outlined" inputRef={first} />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="second" label="Second Number" variant="outlined" inputRef={second} />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" id="result" data-testid="result-id" gutterBottom>
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;

