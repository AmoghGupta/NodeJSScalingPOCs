const getWeb3 = () => {
    return new Promise(async(resolve, reject) => {
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
  };

  const getContract = async (web3) => {
    const data = await $.getJSON("./contract/ethertransferapp.json");
    //The ABI is the description of the contract interface. 
    const greeting = new web3.eth.Contract(
      data.abi,
      //smart contract
      "0xcc37553Acd1Ec8c4de931573E36792E72E413dD6"
    );
    return greeting;
};