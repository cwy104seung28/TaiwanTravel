$(function(){
    var $li = $('ul.tab-title li');
        $($li. eq(0) .addClass('active').find('a').attr('href')).siblings('.travel').hide();
    
        $li.click(function(){
            $($(this).find('a'). attr ('href')).show().siblings ('.travel').hide();
            $(this).addClass('active'). siblings ('.active').removeClass('active');
        });
}); 

 
 function getAuthorizationHeader() {
 //  填入自己 ID、KEY 開始
     let AppID = '207c5a36445144deb01d8b95f4fc1a3c';
     let AppKey = 'sA8n5MZTY6_V-uHoJYi27BlbJyk';
 //  填入自己 ID、KEY 結束
     let GMTString = new Date().toGMTString();
     let ShaObj = new jsSHA('SHA-1', 'TEXT');
     ShaObj.setHMACKey(AppKey, 'TEXT');
     ShaObj.update('x-date: ' + GMTString);
     let HMAC = ShaObj.getHMAC('B64');
     let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
     return { 'Authorization': Authorization, 'X-Date': GMTString }; 
 }


 function travelResponse(travel){
    // let addressCard = document.querySelector("#travel-address");
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=ID%2CName%2CAddress%2CPicture%2CClass1%2CClass2%2CClass3&$filter=Picture%2FPictureUrl1%20ne%20null&$top=20&$format=JSON',

        {
           headers: getAuthorizationHeader()
        }
     ).then( (response) => {
        console.log(response.data)
        response.data.forEach(function(data,ID){
            content +=
            `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[0].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].Name}</h5>
                        <span class="card-address">${response.data[ID].Address}</span>
                        <span class="card-sort">${response.data[ID].Class1}${response.data[0].Class2}${response.data[0].Class3}</span>
                    </div>
                </div>
            </div>
            `
            for(i = 1;i < response.length; i++){}
            if (response.data[i].Class1 == undefined){
                response.data[i].Class1 ="";
            }
        });
        document.querySelector(`#${travel}`).innerHTML = content ;
     })
     .catch( (error) => console.log(error))
     
 }

 travelResponse("travel-address");

