$(function () {
    var $li = $('ul.tab-title li');
    $($li.eq(0).addClass('active').find('a').attr('href')).siblings('.travel').hide();

    $li.click(function () {
        $($(this).find('a').attr('href')).show().siblings('.travel').hide();
        $(this).addClass('active').siblings('.active').removeClass('active');
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


function addressResponse(address) {
    // let addressCard = document.querySelector("#address-address");
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24select=ScenicSpotID%2CScenicSpotName%2CAddress%2COpenTime%2CPicture%2CClass1%2CClass2%2CClass3&$filter=Picture%2FPictureUrl1%20ne%20null%20and%20Class1%20ne%20null%20and%20Class2%20ne%20null%20and%20Class3%20ne%20null&%24top=20&$format=JSON',

        {
            headers: getAuthorizationHeader()
        }
    ).then((response) => {
        // console.log(response.data.Class1)
        response.data.forEach(function (data, ID) {
            content +=
                `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].ScenicSpotName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
                        <span class="card-sort">${response.data[ID].Class1}</span>
                        <span class="card-sort">${response.data[ID].Class2}</span>
                        <span class="card-sort">${response.data[ID].Class3}</span>
                    </div>
                </div>
            </div>
            `
        });
        document.querySelector(`#${address}`).innerHTML = content + `<button id="address-more" v-on:click="moreBtn" class="travel-more">更多景點</button>`;
    })
        .catch((error) => console.log(error))

}

function addressRender(description, res) {
    // let addressCard = document.querySelector("#address-address");
    let content = '';
    
    response.data.forEach(function (data, ID) {
        content +=
            `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].ScenicSpotName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
                        <span class="card-sort">${response.data[ID].Class1}</span>
                        <span class="card-sort">${response.data[ID].Class2}</span>
                        <span class="card-sort">${response.data[ID].Class3}</span>
                </div>
            </div>
            `
            
    });
    // document.querySelector(`#${address}`).innerHTML = content ;

}
addressResponse("travel-address");

function foodResponse(food) {
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?%24select=RestaurantID%2CRestaurantName%2CAddress%2COpenTime%2CPicture&%24top=30&%24format=JSON',

        {
            headers: getAuthorizationHeader()
        }
    ).then((response) => {
        response.data.forEach(function (data, ID) {
            content +=
                `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].RestaurantName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
                        <div class="card-open"><i class="fas fa-clock fa-fw"></i>${response.data[ID].OpenTime}</div>
                    </div>
                </div>
            </div>
            `
        });
        document.querySelector(`#${food}`).innerHTML = content + `<button id="food-more" v-on:click="moreBtn" class="travel-more">更多美食</button>`;
    })
        .catch((error) => console.log(error))

}

function foodRender(description, res) {
    let content = '';
    response.data.forEach(function (data, ID) {
        content +=
            `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].RestaurantName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
                        <div class="card-open"><i class="fas fa-clock fa-fw"></i>${response.data[ID].OpenTime}</div>
                    </div>
                </div>
            </div>
            `
    });

}
foodResponse("travel-food");

function roomResponse(room) {
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?%24select=HotelID%2CHotelName%2CAddress%2CCity%2CClass%2CPicture&$filter=Picture%2FPictureUrl1%20ne%20null%20and%20City%20ne%20null&%24top=30&%24format=JSON',
        {
            headers: getAuthorizationHeader()
        }
    ).then((response) => {
        response.data.forEach(function (data, ID) {
            content +=
                `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl1}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].HotelName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].City}</div>
                        <div class="card-sort">${response.data[ID].Class}</div>
                    </div>
                </div>
            </div>
            `

        });
        document.querySelector(`#${room}`).innerHTML = content + `<button id="room-more" v-on:click="moreBtn" class="travel-more">更多旅宿</button>`;
    })
        .catch((error) => console.log(error))
}

function roomRender(description, res) {
    let content = '';
    response.data.forEach(function (data, ID) {
        content +=
            `<div class="col">
                <div class="card">
                    <img src="${response.data[ID].Picture.PictureUrl}" class="card-img-top" alt="${response.data[ID].Picture.PictureDescription1}">
                    <div class="card-body">
                        <h5 class="card-title">${response.data[ID].HotelName}</h5>
                        <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].City}</div>
                        <div class="card-sort">${response.data[ID].Class}</div>
                    </div>
                </div>
            </div>
            `
    });

}
roomResponse("travel-room");

function activityResponse(activity) {
    let content = '';
    axios.get(
        'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?%24select=ActivityID%2CActivityName%2CAddress%2CStartTime%2CEndTime%2CPicture&$filter=Picture%2FPictureUrl1%20ne%20null&%24top=30&%24format=JSON',
        
        {
            headers: getAuthorizationHeader()
        }
    ).then((response) => {
        response.data.forEach(function (data, ID) {
            content +=
                `<div class="card mb-3">
            <div class="row g-0">
              <div class="col-lg-4">
                <img src="${response.data[ID].Picture.PictureUrl1}" class="img-fluid rounded-start" alt="${response.data[ID].Picture.PictureDescription1}">
              </div>
              <div class="col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">${response.data[ID].ActivityName}</h5>
                  <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div>
                  <div class="card-start"> <i class="fas fa-calendar-week fa-fw"></i> ${response.data[ID].StartTime} ~ ${response.data[ID].StartTime}</div>
                </div>
              </div>
            </div>
          </div>
            `
        });
        document.querySelector(`#${activity}`).innerHTML = content + `<button id="activity-more" class="travel-more">更多活動</button>`;
    })
        .catch((error) => console.log(error))
}

function activityRender(description, res) {
    let content = '';
    response.data.forEach(function (data, ID) {
        content +=
            `<div class="card mb-3">
            <div class="row g-0">
              <div class="col-lg-4">
                <img src="${response.data[ID].Picture.PictureUrl1}" class="img-fluid rounded-start" alt="${response.data[ID].Picture.PictureDescription1}">
              </div>
              <div class="col-lg-8">
                <div class="card-body">
                  <h5 class="card-title">${response.data[ID].ActivityName}</h5>
                  <div class="card-address"><i class="fas fa-map-marker-alt fa-fw"></i>${response.data[ID].Address}</div><br>
                  <div class="card-start"> <i class="fas fa-calendar-week fa-fw"></i> ${response.data[ID].StartTime} ~ ${response.data[ID].StartTime}</div>
                </div>
              </div>
            </div>
          </div>
            `
    });

}
activityResponse("travel-activity");
// this.options[this.selectedIndex].value;
function moreBtn(){
    $('.travel-more').click(function() {
        $(this).parent('.travel').toggleClass('.original-height');
    });
    // $(this).parent('.travel').toggleClass('.original-height');
    // $(this).parent(".travel").css('max-height','100%');
}
moreBtn();