import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Container } from "@mui/system";

import TransactionsList from "../components/TransactionsList";
function Home() {
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
  );
}

export default Home;