const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(                        
        ["Leo", "Aang", "Pikachu"],       
        ["QmVx79jpJTCvh9B8M6ZNucB4ehxLJyZVNsVqSfrwLwSKCG", 
        "QmetNRFG8t55zndy9WDBZfLcW37FGSQYELYAt3poiRWTbL", 
        "QmRippRQfe5zwRwudtwEy1YjXYpnQ1pt7dKXNcfu66moUS"],
        [100, 200, 300],                    
        [100, 50, 25],
        "Elon Musk", // Boss name
        "Qmens3TSDu2rpf7KSdoNGZdnLkN9CnS2mX7eyt6KUF4uNi", // Boss image
        10000, // Boss hp
        50 // Boss attack damage
      );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    
    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);

    txn = await gameContract.attackBoss();
    await txn.wait();
    
    txn = await gameContract.attackBoss();
    await txn.wait();
  };
  
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