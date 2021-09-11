const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // ask user permission to access his accounts
            await window.ethereum.request({ method: "eth_requestAccounts" });
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        } else {
          reject("Must install MetaMask");
        }
      });
    });
  };

  const getContract = async (web3) => {
    const data = await $.getJSON("./contracts/MemeOfTheDay.json");
    //The ABI is the description of the contract interface. 
    const greeting = new web3.eth.Contract(
      data.abi,
      "0xAdBa8665529Fa62703FDb0b82B99a184006Ab665"
    );
    return greeting;
};