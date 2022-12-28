function somethingAsync(param){
    console.log(param);
    setTimeout(()=>{
        console.log("hi from "+ param);
    },2000);
}

somethingAsync("A");
somethingAsync("B");