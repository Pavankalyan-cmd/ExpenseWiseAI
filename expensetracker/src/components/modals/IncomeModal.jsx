import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { addIncome } from "../../pages/services/services";
import { auth } from "../../firebase";

function AddIncome({
  isIncomemodalVisible,
  handleCloseIncomeModal,
  refreshTransactions,
}) {
  const user = auth.currentUser;

  const [incomeData, setIncomeData] = useState({
    User: user ? user.displayName : "",
    Title: "",
    Amount: 0,
    Tag: "",
    Type: "Income",
    Date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: name === "Amount" ? (value ? parseFloat(value) : 0) : value,
    });
    console.log(incomeData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Income Data Submitted:", incomeData);
    addIncome(incomeData)
      .then((response) => {
        console.log(response.data);
        toast.success("Income added successfully");
        refreshTransactions();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error adding income");
      });

    handleCloseIncomeModal(); // Close the modal after submission
  };

  useEffect(() => {
    if (user) {
      setIncomeData((prevData) => ({
        ...prevData,
        User: user.displayName,
      }));
    }
  }, [user]);

  return (
    <div>
      <Modal
        open={isIncomemodalVisible}
        onClose={handleCloseIncomeModal}
        sx={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        <Box
          sx={{
            padding: 2,
            backgroundColor: "white",
            borderRadius: 1,
            width: "40%",
            margin: "10% auto",
          }}
        >
          <h2>Add Income</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="Title"
              value={incomeData.Title}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              name="Amount"
              type="number"
              value={incomeData.Amount}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="Tag"
              name="Tag"
              select
              value={incomeData.Tag}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            >
              <MenuItem value="Salary">Salary</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            <TextField
              name="Date"
              type="date"
              value={incomeData.Date}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ left: "60%" }}
            >
              Submit
            </Button>
            <Button
              onClick={handleCloseIncomeModal}
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px", left: "60%" }}
            >
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddIncome;
