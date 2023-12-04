import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";

export default function Component() {
  const { contract } = useContract("0x1348c834632e075322e241486B91bfd307d49a34");

  const [eventDescription, setEventDescription] = useState("");
  const [betOption, setBetOption] = useState(""); // Input for a single bet option
  const [betOptionsList, setBetOptionsList] = useState([]); // List to store multiple bet options

  const { mutateAsync: createBet, isLoading } = useContractWrite(contract, "createBet");

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleBetOptionChange = (e) => {
    setBetOption(e.target.value);
  };

  const addBetOption = () => {
    if (betOption) {
      const optionsArray = [...betOptionsList, betOption];
      setBetOptionsList(optionsArray);
      setBetOption(""); // Clear the input field
    }
  };

  const removeBetOption = (index) => {
    const updatedOptions = [...betOptionsList];
    updatedOptions.splice(index, 1);
    setBetOptionsList(updatedOptions);
  };

  const call = async () => {
    try {
      const optionsArray = betOptionsList.map(option => {
        const [description, odds] = option.split(':');
        if (!description || !odds) {
          throw new Error("Invalid format for bet options. Use 'OptionName:Odds,OptionName:Odds' format.");
        }
        return { description, odds: parseInt(odds) };
      });

      const data = await createBet({ args: [eventDescription, optionsArray] });
      console.info("Contract call success", data);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  return (
    <div>
      <form style={{marginTop:"-27px"}}>
        <div>
          <Typography variant="h6">Event Description:</Typography>
          <TextField
            sx={{border:"1px solid grey"}}
            variant="outlined"
            value={eventDescription}
            onChange={handleEventDescriptionChange}
            fullWidth
            InputProps={{ style: { color: 'white' } }}
          />
        </div>
        <div>
          <Typography variant="h6">Add Bet Option (e.g., OptionName:Odds):</Typography>
          <TextField
            sx={{border:"1px solid grey"}}
            variant="outlined"
            value={betOption}
            onChange={handleBetOptionChange}
            fullWidth
            InputProps={{ style: { color: 'white' } }}
          />
          <Button variant="contained" color="primary" onClick={addBetOption} sx={{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",width:"50%",top:"20px"}}  >
            Add Option
          </Button>
        </div>
        <div>
          <Typography variant="h6" sx={{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",top:"30px",position:"relative"}}>Selected Bet Options:</Typography>
          <List>
            {betOptionsList.map((option, index) => (
              <ListItem key={index}>
                <ListItemText primary={option} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => removeBetOption(index)} color="secondary">
                    Remove
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
        <Button variant="contained" color="primary" onClick={call} disabled={isLoading} sx={{display:"flex",justifyContent:"center",alignItems:"center",margin:"auto",width:"50%",top:"30px"}}  >
          Create Bet
        </Button>
      </form>
      {isLoading && <Typography variant="body1">Loading...</Typography>}
    </div>
  );
}
