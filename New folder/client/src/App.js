import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonAppBar from "./components/AppBar";
import Card from "./components/Card";
import TransactionsList from "./components/TransactionsList";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [edittransactions, setEditTransactions] = useState({});

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
        <Card
          edittransactions={edittransactions}
          fetchTransctions={fetchTransctions}
        />
        <TransactionsList
          transactions={transactions}
          fetchTransctions={fetchTransctions}
          setEditTransactions={setEditTransactions}
        />
      </Container>
    </div>
  );
}

export default App;
