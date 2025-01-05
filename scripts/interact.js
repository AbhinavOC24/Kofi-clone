// Import the Hardhat runtime environment
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x4f09BeF078A09245Dd664aA49E50cf0fAb2C1CB9";

  const Kofi = await hre.ethers.getContractAt("Kofi", contractAddress);

  const owner = await Kofi.owner();
  console.log("Owner address:", owner);

  console.log("Sending Ether to the contract...");
  const tx = await Kofi.sentToOwner({
    value: hre.ethers.parseEther("0.5"),
  }); // Sending 0.5 ETH
  await tx.wait();

  console.log("Transaction completed. Checking balances...");

  // Check the owner's balance
  const ownerBalance = await hre.ethers.provider.getBalance(owner);
  console.log("Owner's balance:", hre.ethers.formatEther(ownerBalance), "ETH");

  // Check the contract's balance
  const contractBalance = await hre.ethers.provider.getBalance(contractAddress);
  console.log(
    "Contract balance:",
    hre.ethers.formatEther(contractBalance),
    "ETH"
  );
}

// Execute the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
