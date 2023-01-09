import { ethers } from "ethers";
import React , {createContext , useEffect} from 'react';
import { useState } from "react";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext  = createContext();

const {ethereum} = window;

const getEthereumContract = ()=>{
    const provider  = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI , signer);
    return transactionContract;
}

if(ethereum){
  ethereum.on('accountsChanged', (accounts) => {
    window.location.reload();
    ethereum.removeListener('accountsChanged');
  });
  
  ethereum.on('chainChanged', (chainId) => {
    window.location.reload();
  });
}else{
  console.log("metamask is not installed");

}
export const TransactionProvider =({children})=>{

    const [currentAccount,setCurrentAccount] = useState('');
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [transactions, setTransactions] = useState([]);

    const handleChange = async(e , name ) => {
        setformData((prevState) => ({ ...prevState,[name]: e.target.value }));

    };

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex , 16) / (10 ** 18)
            }));
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };
    const checkIfWalletIsConnected = async()=>{
      if(ethereum){
        ethereum.on('accountsChanged', (accounts) => {
          window.location.reload();
          ethereum.removeListener('accountsChanged');
        });
        
        ethereum.on('chainChanged', (chainId) => {
          window.location.reload();
        });
      }else{
        console.log("metamask is not installed");
      }
        try {
            if(!ethereum) return alert ('please install metamask1');
            const accounts = await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }else{
                console.log("No account Found");
            }
        } catch (error) {
             console.log("No ethereum object wallet is not connected");
        }
    }
    const connectWallet = async ()=>{
        if(!ethereum) return alert ('please install metamask');
        try {
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("No ethereum object");
        }
    }

    const checkIfTransactionsExists = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log('To get all transaction connect wallet');
        }
      };
    
    const sendTransaction = async () => {
        try {
          if (ethereum) {
            const { addressTo, amount, keyword, message } = formData;
            console.log(addressTo,amount,keyword,message,currentAccount);


            const transactionsContract = getEthereumContract();
            console.log(transactionsContract);
            
            const parsedAmount = ethers.utils.parseEther(amount);
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [{
                from: currentAccount,
                to: addressTo,
                gas: "0x5208",
                value: parsedAmount._hex,
              }],
            });

            console.log("passes");

            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
          
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            window.location.reload(); 
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };
    

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    },[])
    

    return(
        <TransactionContext.Provider value={{connectWallet , currentAccount , formData , sendTransaction , handleChange , transactions}} >
            {children}
        </TransactionContext.Provider>
    )
}
