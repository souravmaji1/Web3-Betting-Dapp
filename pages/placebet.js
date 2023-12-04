import React, { useState } from 'react';
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Navbar from '../component/navbar';
import Topnav from '../component/Top';
import { Bungee } from '@next/font/google';
import { utils } from "ethers";

const bungee = Bungee({ subsets: ['latin'], weight: '400' });

export default function Component() {
  const { contract } = useContract("0x1348c834632e075322e241486B91bfd307d49a34");
  const { mutateAsync: placeBet, isLoading } = useContractWrite(contract, "placeBet");

  const [betId, setBetId] = useState('');
  const [optionId, setOptionId] = useState('');
  const [etherAmount, setEtherAmount] = useState(''); // Added input for ether amount

  const call = async () => {
    try {
      const data = await placeBet({ args: [betId, optionId], overrides:{
        gasLimit: 1000000, // override default gas limit
        value: utils.parseEther(etherAmount), // send 0.1 ether with the contract call
      }, }); // Pass the value in Wei
      console.info("Contract call success", data);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  }

  return (
    <div>
      <Topnav />
      <Navbar />
    
      <h1 style={{ textAlign: "center" }}>
        <span className={bungee.className} style={{ fontSize: "50px" }}>
          Place Your Bet
        </span>
      </h1>

      <Container maxWidth="sm">
        <Box p={4}>
          <TextField
            label="Bet ID"
            variant="outlined"
            fullWidth
            value={betId}
            onChange={(e) => setBetId(e.target.value)}
            InputProps={{ 
              style: { border: '1px solid white', color: 'white' }
            }}
            InputLabelProps={{ 
              style: { color: 'grey' }
            }}
          />
          <br />
          <TextField
            label="Option ID"
            variant="outlined"
            fullWidth
            value={optionId}
            onChange={(e) => setOptionId(e.target.value)}
            InputProps={{ 
              style: { border: '1px solid white', top: "10px", color: 'white' }
            }}
            InputLabelProps={{ 
              style: { color: 'grey' }
            }}
          />
          <br />
          <TextField
            label="Ether Amount"
            variant="outlined"
            fullWidth
            value={etherAmount}
            onChange={(e) => setEtherAmount(e.target.value)}
            InputProps={{ 
              style: { border: '1px solid white',  color: 'white',top: "20px" }
            }}
            InputLabelProps={{ 
              style: { color: 'grey',top: "20px" }
            }}
          />
          <br />
          <Button
            sx={{ top: "30px" }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={call}
            disabled={isLoading}
          >
            Place Bet
          </Button>
        </Box>
      </Container>
    </div>
  );
}
