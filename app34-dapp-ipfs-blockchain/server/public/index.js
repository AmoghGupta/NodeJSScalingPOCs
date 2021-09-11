
async function init(){
    web3 = await getWeb3();
    //get the ethereum accounts
    accounts = await web3.eth.getAccounts();
    // get the smart contract using the smart contract ABI and smart contract address
    contract = await getContract(web3);
}



function displayLatestMemeImage(){
    location.reload();
};


async function updateMemeOfTheDay(){
    await contract.methods
    .updateMemeHash(latesthash)
    .send({ from: accounts[0], gas: 40000 });
    displayLatestMemeImage();
};

$(document).ready(function(){
    $("#but_upload").click(function(event){
        var data;
        
        event.stopPropagation();
        event.preventDefault();

        data = new FormData();
        data.append('memeFile', $('input[id="file"]')[0].files[0]);
        

        // Ajax to post the form
        $.ajax({
            url: '/uploadImage',
            type: 'POST',
            method: 'POST',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (resp) {
                console.log(resp);
                latesthash = resp.file[0].path;
                updateMemeOfTheDay();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + data.error);
            }
        });
    });
});



init();