const publicVapidKey = "BErWA3jCpjU3vzj-nldaCxSLNMFqIQhsEIPPVHjvotwpT_YZ0ItkzT7kkHIkl4uiEZgycQg1wO23N94O0ux672o";

//check for serviceWorker support
if('serviceWorker' in navigator){
    send().catch(err => console.error(err));
}

// register SW, register push , send push
async function send(){
    console.log('Registering SW');
    const register = await navigator.serviceWorker.register('/serviceworker.js',{
        scope: '/'
    });
    console.log('SW registered');

    // register push
    console.log('Registering Push...');
    const subscription  = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    });
    console.log('Push Registered...');

    //send push notification
    console.log('Sending Push...');
    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('Push sent...');

}