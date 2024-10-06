"use strict"
//returns date string in YYYY-MM-DD format
const getDateString=date=>
    `${date.getFullYear()}-${date.getMonth()+1}-${(date.getDate())}`;
const displayPicture=data=>{
    let html="";
    if(data.error){
        html+=`<span class="error">${data.error.msg}</span>`;

    }
    else if(data.code){
        html+=`<span class="error">${data.msg}</span>`;

    }
    else{
        html+=`<h2>${data.title}</h2>`;
        const width=700;
        switch(data.media_type){
            case "image":
                html+=`<img src="${data.url}" width="${width}"
                alt="NASA photo">`;
                break;
            case "video":
                html+=`<iframe src="${data.url}"
                frameborder="0" allowfullscreen></iframe>`;
                break;
            default:
                html+=`<img src="images/notavailable.png" 
                width="${width}" alt="NASA photo">`;
        }
        html+=`<div>${data.date}`;
        if(data.copyright){
            html+=`<span class="right">&copy;${data.copyright}</span>`;
        }
        html+="</div>";
        html+=`<p>${data.explanation}</p>`;
    }
    $("#display").html(html);
};
const displayError=error=>{
    let html=`<span class="error">${error.message}</span>`;
    $("#display").html(html);
};
$(document).ready(()=>{
const today=new Date();
let dateStr=getDateString(today);
const dateTextbox=$("#date");
dateTextbox.val(dateStr);
dateTextbox.focus();
$("#view_button").click(()=>{
    dateStr=$("#date").val();
    const dateObj=new Date(dateStr);
    if(dateObj=="Invalid Date")
    {
        const msg="Please enter valid date in YYYY-MM-DD format.";
        $("#display").html(`<span class="error">${msg}</span>`);
    }
    else{
        dateStr=getDateString(dateObj);

        const domain=`https://api.nasa.gov/planetary/apod`;
        const request=`?api_key=UTbfaRS1PsJ6gvBEbhcXYRduMu89vxqV6KRI6bit&date=${dateStr}`;
        const url=domain+request;
        fetch(url).then(response=>response.json()).then(json=>displayPicture(json)).
        catch(e=>displayError(e));
    }
    $("#date").focus();
});

});

