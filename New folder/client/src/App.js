import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "./components/AppBar";
import Card from "./components/Card";
import TransactionsList from "./components/TransactionsList";

const InitialForm = {
  amount: 0,
  description: "",
  date: "",
};

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <div>
      <ButtonAppBar />
      <Container>
        <Card fetchTransctions={fetchTransctions} />
        <TransactionsList
          transactions={transactions}
          fetchTransctions={fetchTransctions}
        />
      </Container>
    </div>
  );
}

export default App;
