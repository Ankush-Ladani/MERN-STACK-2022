import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const InitialForm = {
  amount: "",
  description: "",
  date: new Date(),
};
export default function TransactionForm({
  fetchTransctions,
  edittransactions,
}) {
  const [form, setForm] = useState(InitialForm);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (edittransactions.amount !== undefined) {
      setForm(edittransactions);
    }
  }, [edittransactions]);

  useEffect(() => {
    fetchTransctions();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = edittransactions.amount === undefined ? create() : update();

    async function create() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      });
      reload(res);
    }
    async function update() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transaction/${edittransactions._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(form),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      reload(res);
    }
  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchTransctions();
    }
  }

  return (
    <>
      <Typography variant="h6" sx={{ marginTop: 10 }}>
        Add New Transaction
      </Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ marginRight: 5 }}
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              name="amount"
              size="small"
              value={form.amount}
              onChange={handleChange}
            />
            <TextField
              sx={{ marginRight: 5 }}
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              size="small"
              value={form.description}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                value={form.date}
                onChange={handleDate}
                renderInput={(params) => (
                  <TextField
                    name="date"
                    sx={{ marginRight: 5 }}
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
            {edittransactions.amount !== undefined && (
              <Button variant="contained" type="submit">
                Update
              </Button>
            )}
            {edittransactions.amount === undefined && (
              <Button variant="contained" type="submit">
                Submit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </>
  );
}
