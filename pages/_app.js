import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const muiTheme = createTheme();



const activeChain = 'mumbai';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={muiTheme}>
		<ThirdwebProvider
			activeChain={activeChain}
		>
			<Component {...pageProps} />
		</ThirdwebProvider>
		</ThemeProvider>
	);
}

export default MyApp;
