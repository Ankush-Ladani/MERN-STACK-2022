import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Container } from "@mui/system";
import Cookies from "js-cookie";

import TransactionsList from "../components/TransactionsList";
function Home() {
  const [transactions, setTransactions] = useState([]);
  const [edittransactions, setEditTransactions] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const token = Cookies.get("token");
    const res = await fetch("http://localhost:4000/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
