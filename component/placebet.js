import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";

export default function BettingComponent() {
  const { contract } = useContract("0xc1FaB1F6f3726f28d0f306864FADCf7739EAD215");
  const { mutateAsync: placeBet, isLoading } = useContractWrite(contract, "placeBet");

  // Define state variables for input values
  const [betId, setBetId] = useState("");
  const [optionId, setOptionId] = useState("");
  const [ethAmount, setEthAmount] = useState("");

  const handleBetIdChange = (event) => {
    setBetId(event.target.value);
  };

  const handleOptionIdChange = (event) => {
    setOptionId(event.target.value);
  };

  const handleEthAmountChange = (event) => {
    setEthAmount(event.target.value);
  };

  const placeBetHandler = async () => {
    // Convert the input values to appropriate data types
    const betIdNumber = parseInt(betId, 10);
    const optionIdNumber = parseInt(optionId, 10);
   

    if (isNaN(betIdNumber) || isNaN(optionIdNumber) ) {
      console.error("Invalid input. Please enter valid values.");
      return;
    }

    try {
      const data = await placeBet({ args: [betIdNumber, optionIdNumber],  overrides: {
        gasLimit: 1000000, // override default gas limit
        value: utils.parseEther(ethAmount), // send 0.1 native token with the contract call
      }, });
      console.info("Contract call success", data);
    } catch (err) {
      console.error("Contract call failure", err);
    }
  };

  return (
    <div>
      <h1>Place a Bet</h1>
      <div>
        <label htmlFor="betId">Bet ID:</label>
        <input type="number" id="betId" value={betId} onChange={handleBetIdChange} />
      </div>
      <div>
        <label htmlFor="optionId">Option ID:</label>
        <input type="number" id="optionId" value={optionId} onChange={handleOptionIdChange} />
      </div>
      <div>
        <label htmlFor="ethAmount">ETH Amount:</label>
        <input type="number" id="ethAmount" value={ethAmount} onChange={handleEthAmountChange} />
      </div>
      <button onClick={placeBetHandler} disabled={isLoading}>
        Place Bet
      </button>
    </div>
  );
}
