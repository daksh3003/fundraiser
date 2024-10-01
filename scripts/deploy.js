// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Compile the contracts


  // Get the contract to deploy
  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding"); // Replace with your contract name
  const crowdFunding = await Token.deploy(); // You can pass constructor arguments here if needed

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
