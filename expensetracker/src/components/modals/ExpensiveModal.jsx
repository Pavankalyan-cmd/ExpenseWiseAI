import React, { useContext, useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { addExpense } from "../../pages/services/services";
import { auth } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";

function AddExpensive({
  isExpensivemodalVisible,
  handleCloseExpensiveModal,
  refreshTransactions,
}) {
  const { user } = useContext(AuthContext);

  const [expenseData, setExpenseData] = useState({
    User: user.displayName,
    Title: "",
    Amount: 0,
    Description: "",
    Tag: "",
    Type: "Expenses",
    Paymentmethod: "",
    Date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: name === "Amount" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(expenseData)
      .then((response) => {
        console.log(response.data);
        toast.success("Expense Added Successfully");
        refreshTransactions();
      })
      .catch((error) => {
        console.error("Error Data:", error.response.data);
        toast.error("Error Adding Expense enter valid details");
      });
    handleCloseExpensiveModal();
  };
  useEffect(() => {
    if (user) {
      setExpenseData((prevData) => ({
        ...prevData,
        User: user.displayName,
      }));
    }
  }, [user]);

  return (
    <div>
      {console.log(user.displayName)}
      <Modal
        open={isExpensivemodalVisible}
        onClose={handleCloseExpensiveModal}
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
        }}
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
          <h2>Add Expense</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              name="Title"
              value={expenseData.Title}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Amount"
              name="Amount"
              type="number"
              value={expenseData.Amount}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="Description"
              value={expenseData.Description}
              onChange={handleChange}
              required
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="tag-select-label">Tag</InputLabel>
              <Select
                labelId="tag-select-label"
                name="Tag"
                value={expenseData.Tag}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Groceries">Groceries</MenuItem>
                <MenuItem value="Transportation"> Transportation</MenuItem>
                <MenuItem value="Utilities">Utilities</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Paymentmethod"
              name="Paymentmethod"
              value={expenseData.Paymentmethod}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <TextField
              name="Date"
              type="date"
              value={expenseData.Date}
              onChange={handleChange}
              required
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button
              onClick={handleCloseExpensiveModal}
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px" }}
            >
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddExpensive;
