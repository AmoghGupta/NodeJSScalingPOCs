async function login(){
    try{
        web3 = await getWeb3();
        //get the ethereum accounts
        accounts = await web3.eth.getAccounts();
        // get the smart contract using the smart contract ABI and smart contract address
        contract = await getContract(web3);
    
        mybalance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
        $("#mybalance").text(mybalance);
        $("#myaddress").text(accounts[0]);
    
        //contacting smart contract
        owneraddress = await contract.methods.getContractOwner().call();
        $("#smartcontractaddress").text(owneraddress);
        alert("Logged in successfully");
        $("#loginbutton").hide();
    }catch(err){
        alert(err.message);
        $("#loginbutton").show();
    }
}


async function transferMoney(){
    try{
        // await contract.myFunction(arg1, arg2, { value: <amountInWei> })
        let receiverAddress = $("#receipientaddress").val();
        let amountinEther = $("#receipientamount").val() ;
        data = await contract.methods.sendEthereum(receiverAddress).send({ from: accounts[0], value: amountinEther*1000000000000000000});
        let receiverbalance = await web3.utils.fromWei(await web3.eth.getBalance(receiverAddress), 'ether');
        $("#receipientaddress1").text(receiverAddress);
        $("#receipientbalance1").text(receiverbalance);
        $("#receipientaddress").val("");
        $("#receipientamount").val("");
        mybalance = await web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'ether');
        $("#mybalance").text(mybalance);
    }catch(err){
        alert(err.message);
    }
}