import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Navbar from '../component/navbar';
import Topnav from '../component/Top';
import { Bungee} from '@next/font/google';

const bungee = Bungee({ subsets: ['latin'],weight: '400' });

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  },
  header: {
    marginBottom: "2rem",
    
  },
  listItem: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "1rem",
    padding: "1rem",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "10rem",
  },
  whiteText: {
    color: "white", // Set the text color to white
  },
};

export default function Component() {
  const { contract } = useContract("0x1348c834632e075322e241486B91bfd307d49a34");
  const { data, isLoading } = useContractRead(contract, "getAllBets", []);
  

  return (
    <div>
       <Topnav />
    <Container >
        <Navbar />
      <Typography variant="h3" style={styles.header}  className={bungee.className}   >
       All Active Bettings
      </Typography>

      {isLoading && (
        <div style={styles.loading}>
          <CircularProgress />
        </div>
      )}

      {data && data.length > 0 && (
        <List>
          {data.map((bet, index) => (
            <ListItem key={index} style={styles.listItem}>
              <ListItemText
                primary={`Event Description: ${bet.eventDescription}`}
                secondary={`Total Amount: ${bet.totalAmount.toString()} wei | Status: ${bet.status} | Option IDs: ${bet.optionIds.join(", ")}`}
                secondaryTypographyProps={{ style: styles.whiteText }}
              />
            </ListItem>
          ))}
        </List>
      )}

      {data && data.length === 0 && (
        <Typography variant="body1">No data available.</Typography>
      )}
    </Container>
    </div>
  );
}

