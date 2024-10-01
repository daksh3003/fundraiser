// scripts/deploy.js

const hre = require("hardhat");
//0x5FbDB2315678afecb367f032d93F642f64180aa3
async function main() {
  // Compile the contracts


  // Get the contract to deploy
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding"); // Replace with your contract name
  const crowdFunding = await CrowdFunding.deploy(); // You can pass constructor arguments here if needed

  await crowdFunding.deployed();

  console.log(`CrowdFunding deployed to  ${crowdFunding.address}`);
}

// Run the main function
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
