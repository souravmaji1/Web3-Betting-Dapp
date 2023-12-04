import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { Button, TextField, Grid, Container } from "@mui/material";
import Navbar from '../component/navbar';
import Topnav from '../component/Top';
import { Bungee } from '@next/font/google';

const bungee = Bungee({ subsets: ['latin'], weight: '400' });

const styles = {
  textField: {
    border: "1px solid white", // Set the border color to white
    color: "white", // Set the text color to white
  },
  label: {
    color: "grey", // Set the label color to grey
  },
};

export default function Component() {
  const { contract } = useContract("0x1348c834632e075322e241486B91bfd307d49a34");
  const { mutateAsync: settleBet, isLoading } = useContractWrite(contract, "settleBet");

  const [betId, setBetId] = useState("");
  const [winningOptionId, setWinningOptionId] = useState("");

  const handleBetIdChange = (event) => {
    setBetId(event.target.value);
  };

  const handleWinningOptionIdChange = (event) => {
    setWinningOptionId(event.target.value);
  };

  const call = async () => {
    try {
      const data = await settleBet({ args: [betId, winningOptionId] });
      console.info("Contract call success", data);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  return (
    <div>
      <Topnav />
      <Navbar />

      <h1 className={styles.title} style={{ textAlign: "center" }}>

        <span className={bungee.className} style={{ fontSize: "50px" }}>

          Announce Results

        </span>
      </h1>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bet ID"
              variant="outlined"
              value={betId}
              onChange={handleBetIdChange}
              InputProps={{
                style: styles.textField,
              }}
              InputLabelProps={{
                style: styles.label,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Winning Option ID"
              variant="outlined"
              value={winningOptionId}
              onChange={handleWinningOptionIdChange}
              InputProps={{
                style: styles.textField,
              }}
              InputLabelProps={{
                style: styles.label,
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "center" }}>
            <Button
              sx={{ width: "30%" }}
              variant="contained"
              color="primary"
              onClick={call}
              disabled={isLoading}
            >
              Results
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
