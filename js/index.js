$(function(){
    var $li = $('ul.tab-title li');
        $($li. eq(0) .addClass('active').find('a').attr('href')).siblings('.travel').hide();
    
        $li.click(function(){
            $($(this).find('a'). attr ('href')).show().siblings ('.travel').hide();
            $(this).addClass('active'). siblings ('.active').removeClass('active');
        });
    });
    
axios.get(
    'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$select=ID%2CName%2CAddress%2CClass1%2CClass2%2CClass3%2CCity&$top=550&$skip=450&$format=JSON',
    {
       headers: getAuthorizationHeader()
    }
 )
 .then(function (response) {
   document.querySelector('body').textContent=JSON.stringify(response.data);
 })
 .catch(function (error) {
   console.log(error);
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