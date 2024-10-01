import React,{useState,useEffect, Children} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

//Internal Imports
import { CrowdFundingABI,CrowdFundingAddress } from "./constants";


//Fetching smart contracts
const fetchContract  = (signerOrProvider) => new ethers.Contract(CrowdFundingAddress,CrowdFundingABI,signerOrProvider);


export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({Children}) =>{
    const titleData = "Crowd Funding Contract";
    const [curretAccount,setCurrentAccount] = useState("");

    const createCampaign = async(campaign) =>{
        const {title,description,amount,deadline} = campaign;
        const Web3Modal = new Web3Modal();
        const connection = await Web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner(signer);


        console.log(curretAccount);
        try{
            const transaction =  await contract.createCampaign(
                curretAccount,
                title,
                description,
                ethers.utils.parseUnits(amount,18),
                new Date(deadline).getTime()
            );
            await transaction.wait();

            console.log("contract call success",transaction);
        }catch(error){
            console.log("contract call failure", error);
        }
    };

    const getCampaigns  = async()=>{
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();
        
        const parsedCampaigns = campaigns.mapo((campaign,i) =>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i,
        }));
        return parsedCampaigns;
    };

    const getUserCampaigns = async() =>{
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        const currentUser = accounts[0];

        const filterCampaigns = allCampaigns.filter(
            (campaign)=>
                campaign.owner === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        );

        const userData = filterCampaigns.map((campaign,i)=>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId: i
        }));
        return userData;
    }; 

    const donateToCampaign = async (pId,amount) =>{
        const web3Modal = new Web3Modal();
        const connection  = await Web3Modal.connect();
        const provider  = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract  = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId,{
            value: ethere.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async(pId) =>{
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];
        for(let i =0;i<numberOfDonations;i++){
            parsedDonations.push({
                donator: donations[0][1],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    };

    //---CHECK IF THE WALLET IS CONNECTED
    const checkIfWalletConnected = async ()=>{
        try{
            if(!window.ethereum){
                return setOpenError(true), setError("Install Metamask");
            }
            
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if(accounts.length){
                setCurrentAccount(accounts[0]);
            }else{
                console.log("No account found");
            }
    }catch(error){
        console.log("something wrong while connecting to the wallet");
        }
    };

    useEffect(()=>{
        checkIfWalletConnected();
    },[]);

    //---CONNECT WALLET FUNCTION
    const connectWallet = async()=>{
        try{
            if(!window.ethereum){
                return console.log("Install metamask");
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log("Error while connecting to the wallet");
        }
    };

    return(
        <CrowdFundingContext.Provider
        value={{
            titleData,
            curretAccount,
            createCampaign,
            getCampaigns,
            getUserCampaigns,
            donateToCampaign,
            getDonations,
            connectWallet,
        }}
        >
            {Children}
        </CrowdFundingContext.Provider>
    )
}