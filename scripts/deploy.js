const main = async () => {
    const name = "flavor";
    const tld = "music";
    const price = "0.01";

    const domainContractFactory = await hre.ethers.getContractFactory('DomainMarket');
    const domainContract = await domainContractFactory.deploy(tld);
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register(name,  {value: hre.ethers.utils.parseEther(price)});
    await txn.wait();
    console.log(`Minted domain ${name}.${tld}`);
  
    txn = await domainContract.setRecord(name, `Am I a ${name} or a ${tld}??`);
    await txn.wait();
    console.log(`Set record for ${name}.${tld}`);
  
    const address = await domainContract.getAddress(name);
    console.log(`Owner of domain ${name}:`, address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();