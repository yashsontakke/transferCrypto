async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  const Transaction = await ethers.getContractFactory("Transaction");
  // console.log(Transaction);
  const transaction = await Transaction.deploy();
  console.log("Token address:", transaction.address);
  // 0x9e04AE6651C92E389E328eE27F71407cC269D0d3
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});