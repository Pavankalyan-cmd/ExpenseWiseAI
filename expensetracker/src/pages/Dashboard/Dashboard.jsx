import Cards from "../../components/cards/Card";
import { useEffect, useState } from "react";
import Addexpensive from "../../components/modals/ExpensiveModal";
import Addincome from "../../components/modals/IncomeModal";
import Navbar from "../../components/navbar/Navbar";
import { fetchExpenses, fetchIncome } from "../services/services";
import Tabledata from "../../components/table/Table";
import { toast } from "react-toastify";
import MyChart from "../../components/charts/Newchart";
import Notransaction from "../../components/notransaction/Notransaction";
import Footer from "../../components/footer/Footer";
import { auth } from "../../firebase";
import Navbarr from "../../components/navbar2/navbarr";
export default function Dashboard() {
  const [isExpensivemodalVisible, setIsExpensivemodalVisible] = useState(false);
  const [isIncomemodalVisible, setIsIncomemodalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [Transactions, setTransactions] = useState([]);
  const [Income, SetIncome] = useState(0);
  const [Expense, SetExpense] = useState(0);
  const [Balance, setBalance] = useState(0);
  const user = auth.currentUser;

  const showExpensivemodal = () => {
    setIsExpensivemodalVisible(true);
  };

  const showIncomemodal = () => {
    setIsIncomemodalVisible(true);
  };

  const handleCloseExpensiveModal = () => {
    setIsExpensivemodalVisible(false);
  };

  const handleCloseIncomeModal = () => {
    setIsIncomemodalVisible(false);
  };

  const refreshTransactions = () => {
    if (user) {
      setLoading(true);
      Promise.all([
        fetchIncome(user.displayName),
        fetchExpenses(user.displayName),
      ])
        .then(([incomeResponse, expenseResponse]) => {
          const incomes = incomeResponse.data || [];
          const expenses = expenseResponse.data || [];
          console.log("Income Response:", incomeResponse);
          console.log("Expense Response:", expenseResponse);
          console.log(user.displayName);

          setTransactions([...incomes, ...expenses]);
          calculateBalance();
          toast.success("Transactions fetched successfully");
          console.log(incomes);
        })
        .catch((error) => {
          toast.error("Failed to fetch transactions ");
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (user) {
      refreshTransactions();
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [Transactions]);

  function calculateBalance() {
    let Incomebalance = 0;
    let Expensebalance = 0;
    Transactions.forEach((transaction) => {
      if (transaction.Type === "Income") {
        Incomebalance += parseFloat(transaction.Amount);
      } else {
        Expensebalance += parseFloat(transaction.Amount);
      }
    });
    setBalance(Incomebalance - Expensebalance);
    SetIncome(Incomebalance);
    SetExpense(Expensebalance);
  }
  let sortedtransactions = Transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div className="container-fluid" style={{ height: "auto" }}>
      <Navbarr />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            Income={Income}
            Expense={Expense}
            Balance={Balance}
            showExpensivemodal={showExpensivemodal}
            showIncomemodal={showIncomemodal}
          />

          {console.log(Transactions)}

          {/* Modal for Expenses */}
          <Addexpensive
            isExpensivemodalVisible={isExpensivemodalVisible}
            handleCloseExpensiveModal={handleCloseExpensiveModal}
            refreshTransactions={refreshTransactions}
          />
          {/* Modal for Income */}
          <Addincome
            isIncomemodalVisible={isIncomemodalVisible}
            handleCloseIncomeModal={handleCloseIncomeModal}
            refreshTransactions={refreshTransactions}
          />
          {Transactions.length !== 0 ? (
            <MyChart sortedtransactions={sortedtransactions} />
          ) : (
            <Notransaction />
          )}

          <Tabledata
            Transactions={Transactions}
            refreshTransactions={refreshTransactions}
          />
          <Footer />
        </>
      )}
    </div>
  );
}
