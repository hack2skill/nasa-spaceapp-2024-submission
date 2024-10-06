function emailSend() {
    // Get form values
    var params={
    name: document.getElementById("name").value,
    email:document.getElementById("email").value,
    };
    const serviceID="service_dmokr0t";
    const templateID="template_d7rg6go";
    emailjs.send(serviceID,templateID,params).then(res=>{
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        console.log(res);
        alert("Subscription successful! You will receive daily NASA pictures.");
    }).catch((err)=>console.log(err));
}
