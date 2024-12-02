const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory for TokenSwap
  const TokenSwap = await ethers.getContractFactory("TokenSwap");

  // Deploy the TokenSwap contract
  const tokenSwap = await TokenSwap.deploy();

  // Wait for the deployment transaction to be mined
  await tokenSwap.deploymentTransaction().wait();

  // Retrieve and log the deployed contract address
  const deployedAddress = await tokenSwap.getAddress();
  console.log("TokenSwap contract deployed to:", deployedAddress);
}

main()
  .then(() => process.exit(0)) // Graceful exit
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  });
