import styles from "../styles/Home.module.css";
import Createbet from '../component/createbet';
import Navbar from '../component/navbar';
import Topnav from '../component/Top';
import { Bungee} from '@next/font/google';

const bungee = Bungee({ subsets: ['latin'],weight: '400' })

export default function Home() {
  return (
    <div>
      <Topnav />
      <Navbar />
   
   
      <div className={styles.container}>
       
          <h1 className={styles.title}>
          
            <span className={bungee.className}  >
              
                 Web3 Betting Dapp
              
            </span>
          </h1>

       


       <Createbet />
         
    
      </div>
   
    </div>
  );
}
