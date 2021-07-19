console.log('Service worked loaded');

self.addEventListener('push',e=>{
    const data = e.data.json();
    console.log("Push received");
    self.registration.showNotification(data.title,{
        body:'Notified by Nodejs Amogh server',
        icon: ''
    });
});