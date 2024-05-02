// create function

var newLatest = null ;
var newLatestD = null ;

function getChart_L7d(url) {
  let canvasElement1 = $("<canvas></canvas>");
  let canvasElement2 = $("<canvas></canvas>");
  canvasElement1.attr("id", "ChartL7d")
  canvasElement2.attr("id", "Chart7-dayNight")
  $('#show-chart7Dn').append(canvasElement1)
  $('#show-chart7Dn-areaND').append(canvasElement2)
  // let CardBody = $("<div></div>");
  // CardBody.attr("class", "card-body")

  $.ajax({
    url: url,
    dataType: "json",
    success: function (response) {

    console.log(response);

    let Data = response.newData

    if(Object.keys(Data).length !== 0){
      
      
      $('.card-body').html('<div class="row" style="justify-content: space-between;"><div class="groupData"><p>timestamp</p><h4 id="timestamp" style="display:flex; align-items:center;"></h4></div><div class="groupData"><p>Device ID</p><h4 id="DeviceID" style="display:flex; align-items:center;"></h4></div><div class="groupData"><p>Time Period</p><h4 id="TimePeriod" style="display:flex; align-items:center;"></h4></div></div><div class="row"><div class="groupData"><p>address</p><h4 id="address" style="display:flex; align-items:center;"></h4></div></div>')
      // info Device
    let info_deviceID = Data.infoDv.DvId
    let info_timestamp = Data.infoDv.timestamp
    let info_timeP = Data.infoDv.timeP
    let info_address = Data.infoDv.address

    $('#timestamp').html(info_timestamp);
    $('#DeviceID').html(info_deviceID);
    $('#TimePeriod').html(info_timeP);
    $('#address').html(info_address);



    // card
    let tFRange = Data.totalfromRamge
    let TotalToday =Data.TodayT
    let TotalAll =Data.TotalAll

    console.log(tFRange);
    console.log(TotalToday);
    console.log(TotalAll);

    $('#MosttFRange').text(tFRange);
    $('#MostToday').text(TotalToday);
    $('#MostAll').text(TotalAll);

  new Chart($('#ChartL7d'), {
        type: 'line',
        
        data: {
          labels: Data.labels,
          datasets: [
            {
            label:'detected',
            data:Data.Dataset
          }
        ]
        },
        options: {
          indexAxis: 'x',
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            }
          }
        }
      });

        new Chart($('#Chart7-dayNight'), {
        type: 'pie',
        data:  {
          labels: [
            'Night',
            'Day'
          ],
          datasets: [{
            label: ' Time Period',
            data: [Data.conutTimePeriod.Night, Data.conutTimePeriod.Day],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 2
          }]
        }
    })



    } else{

      $('.card-body').html('<div style="display:flex; justify-content:center; align-items:center; height: 100%;">not Data</div>')
      // $('#timestamp').html('not data');
      // $('#DeviceID').html('not data');
      // $('#TimePeriod').html('not data');
      // $('#address').html('not data');

      $('#MosttFRange').text(0);
      $('#MostToday').text(0);
      $('#MostAll').text(0);
      
    }


    

  }

  })

}

function getLastData() {
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbyQJu_ayE0VMmh1H0yJH7PQCwmPbiZDXJA-B92WIwDN_PThd5YhdAx_52xikyDYEmtwxA/exec',
        dataType: "json",
        success: function (data) {
          console.log(data)
          const latest = data[0];
          console.table(latest)
          if(newLatest === null && newLatestD === null){
            console.log(null)
            newLatest = latest.timestamp
            newLatestD = latest.DvID
          } 
          else if (newLatest == latest.timestamp && newLatestD == latest.DvID){
            console.log(false)
            $('#update-gif').hide();
          }else{
            console.log(true)
            newLatest = latest.timestamp
            newLatestD = latest.DvID
            $('#update-gif').show();
            $('#ChartL7d').remove()
            $('#Chart7-dayNight').remove()
            getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${setDate(1).Start}&dateEnd=${setDate(1).End}`)
          }

          console.table(newLatest)
          console.table(latest)
          $('#body-latestTable').find('tr').remove();
          data.forEach(item => {
            
            $('#body-latestTable').append('<tr><td>'+item.timestamp+'</td>'+'<td>'+item.DvID+'</td>'+'<td>'+item.timePeriod+'</td>'+'<td>'+item.address+'</td>'+'</tr>');
            console.log(typeof(item.timestamp));
          });
        }
    });
        
}


function setDate(days) {
  var dateObject = moment().tz('Asia/Bangkok');
  let dateRange = {}

  if(days === 1){
    dateRange.Start = dateObject.format('YYYY-MM-DD')
    dateRange.End = dateObject.format('YYYY-MM-DD')

  }
  
  else if(days === -1){
    dateRange.Start = dateObject.clone().add(days, 'days').format('YYYY-MM-DD');
    dateRange.End = dateObject.clone().add(days, 'days').format('YYYY-MM-DD');

  }


  // this month
  else if(days === 1.1){
     H30 = ['04', '06', '09', '11']
     H31 = ['01', '03', '05', '07', '08', '10', '12']
     H89 = ['02']

    if(H30.includes(dateObject.format('MM'))){
       dateRange.Start = dateObject.format('YYYY-MM-')+'01';
    dateRange.End = dateObject.format('YYYY-MM-')+'30';
    } 

    else if(H31.includes(dateObject.format('MM'))){
      dateRange.Start = dateObject.format('YYYY-MM-')+'01';
      dateRange.End = dateObject.format('YYYY-MM-')+'31';
   }
    
   else if(H89.includes(dateObject.format('MM'))){
      dateRange.Start = dateObject.format('YYYY-MM-')+'01';
      dateRange.End = dateObject.format('YYYY-MM-')+'28';
   }
   

  }

  // last month
  else if(days === 1.2){
    H30 = ['04', '06', '09', '11']
    H31 = ['01', '03', '05', '07', '08', '10', '12']
    H89 = ['02']

    D = dateObject.clone().add(-1, 'months').format('MM')

   if(H30.includes(D)){
      dateRange.Start = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'01';
   dateRange.End = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'30';
   } 

   else if(H31.includes(D)){
    dateRange.Start = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'01';
    dateRange.End = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'31';
  }
   
  else if(H89.includes(D)){
    dateRange.Start = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'01';
    dateRange.End = dateObject.clone().add(-1, 'months').format('YYYY-MM-')+'28';
  }
  

 }

 else if(days === 2.1){
  dateRange.Start = dateObject.format('YYYY-')+'01-01';
  dateRange.End = dateObject.clone().add(-1, 'months').format('YYYY-')+'12-31';
  
}

else if(days === 2.2){
  dateRange.Start = dateObject.clone().add(-1, 'years').format('YYYY-')+'01-01';
  dateRange.End = dateObject.clone().add(-1, 'years').format('YYYY-')+'12-31';
  
}

else{
    dateRange.End = dateObject.format('YYYY-MM-DD');
    dateRange.Start = dateObject.clone().add(days, 'days').format('YYYY-MM-DD'); 
  }

 
  return dateRange

}


  
  

function formatDateToYYYYMMDD(date) {
  var formattedDate = new Date(date).toISOString().split('T')[0];
  return formattedDate;
}

function checkEndDate(startDate, endDate) {
  // แปลงวันที่เป็น Date objects
  startDate = formatDateToYYYYMMDD(startDate)
  endDate = formatDateToYYYYMMDD(endDate)
  var start = new Date(startDate);
  var end = new Date(endDate);

  // เปรียบเทียบ timestamp ของวันที่เริ่มต้นและสิ้นสุด
  return end.getTime() >= start.getTime();
}



// -------------------------------------------------------------
let map;


var currantMaps = null

async function initMap() {
  

  
  // The location of Uluru
  const position = {lat: 13.568249 , lng:101.509455 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "802dff93db0ce925",
  });


  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycby9vPBs9n5GyRhCXiUNcAypI1q5MfcDoRYPuU17miFmQwrYHqhRIhUuXDKZqNrZuwJX/exec');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);


   
    data.forEach((val) => {
    let marker = new google.maps.Marker({
      position: val.pos,
      map: map,
      title: data.label
    });
  
    marker.addListener('click', function() {
     $('.not-info').remove()
     createDvInfo_DvID = document.createElement('p')
    createDvInfo_Ad = document.createElement('p')
    createDvInfo_Count = document.createElement('p')

    createDvInfo_DvID.setAttribute('id', 'DvInfo_DvID');
    createDvInfo_Ad.setAttribute('id', 'DvInfo_Ad');
    createDvInfo_Count.setAttribute('id', 'DvInfo_Count');


    document.getElementById('infoDV').appendChild(createDvInfo_DvID);
    document.getElementById('infoDV').appendChild(createDvInfo_Ad);
    document.getElementById('infoDV').appendChild(createDvInfo_Count);

    

      document.getElementById('DvInfo_DvID').innerHTML =  `<span style="font-weight: bold">Device ID: </span>${val.DvId}`;
      document.getElementById('DvInfo_Ad').innerHTML =  `<span style="font-weight: bold">address: </span>${val.address}`;
      document.getElementById('DvInfo_Count').innerHTML =  `<span style="font-weight: bold">count Detected: </span>${val.count}`;

      currantMaps = val.DvId
    });

    let DvCheckbox = `<label for="${val.DvId}"  class="checkbox"><input type="checkbox" name="${val.DvId}" id="DvFilter" value="test" style="display: none;">${val.DvId}</label>`
    $('#DvFilter-item').append(DvCheckbox)
  })

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }


  // LavelAndData.forEach((val) => {
  //   let marker = new google.maps.Marker({
  //     position: data.pos,
  //     map: map,
  //     title: data.label
  //   });
  
  //   marker.addListener('click', function() {
  //     document.getElementById('test').textContent = 'clicked!';
  //   });
  // });
  

  // The marker, positioned at Uluru
  
}

// main 
$(document).ready(function () {

  
  getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${setDate(1).Start}&dateEnd=${setDate(1).End}`)
  getLastData()
  setInterval(function () {
    $('#update-date').html('<span id="update-date" style="font-size:14px; color: #818181; margin-left:0.5rem;"><spanclass="spinner-grow" aria-hidden="true"></spanclass=>กำลังโหลดข้อมูล...</span>');
    getLastData()
  }, 8000);




  // $.ajax({
  //   url: "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json",
  //   dataType: "json",
  //   success: function (response) {
  //     const amphures = response.filter((res)=>{
  //       return res.name_en === 'Bangkok'
  //     })
  //   //   const result = amphure.filter((res)=>{
  //   //     return amphure. === 'Bangkok'
  //   // })

  //   amphures[0].amphure.forEach(amphure => {
  //     console.log(amphure);
  //   });

      

  //     console.log(amphures); 
  //   }
  // });


  $('#dateRange').change(function (e) { 
    e.preventDefault();  
    const valDateRange = $('#dateRange').val();
    

    $('#dateRangeCustom').hide()

    if(valDateRange == 'custom'){
      $('#dateRangeCustom').show();
    } 
    
    else{
    if(valDateRange == 'Today'){
      dS = setDate(1)
     
    }

    else if(valDateRange == 'yesterday'){
      dS = setDate(-1)
     
    }
    
    else if(valDateRange == '7days'){
      dS = setDate(-7)
      
     
    }

    else if(valDateRange == '14days'){
      dS = setDate(-14)
      
     
    }

    else if(valDateRange == '28days'){
      dS = setDate(-28)
      
     
    }

    else if(valDateRange == 'thisMonth'){
      dS = setDate(1.1)
      
     
    }

    else if(valDateRange == 'lastMonth'){
      dS = setDate(1.2) 
    }

    else if(valDateRange == 'thisYear'){
      dS = setDate(2.1) 
    }

    else if(valDateRange == 'lastYear'){
      dS = setDate(2.2) 
    }
  



    $('#ChartL7d').remove()
    $('#Chart7-dayNight').remove()
    $('#MosttFRange').html('<div style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</div>');
    $('#MostToday').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>');
    $('#MostAll').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>');
    $('.card-body').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>')

    
    

    console.log(('dateStart = '+dS.Start+' - dateEnd = '+dS.End))
    getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${dS.Start}&dateEnd=${dS.End}`)
   
   alert(valDateRange)
  
  }
  });


  $('#endDate').change(function (e) { 
    e.preventDefault();
    const valDateRangeSt = $('#startDate').val();
    const valDateRangeEn = $('#endDate').val();
    if(checkEndDate(valDateRangeSt, valDateRangeEn)){
      $('#btn-query').removeAttr('disabled');
    }else{
      $('#endDate').val('')
      $('#btn-query').attr('disabled',true);
      alert('The end date must be greater than the start date.')
      
      
    }
  });


  $('#btn-query').click(function (e) { 
    e.preventDefault();
    $('#ChartL7d').remove()
    $('#Chart7-dayNight').remove()
    $('#MosttFRange').html('<div style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</div>');
    $('#MostToday').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>');
    $('#MostAll').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>');
    $('.card-body').html('<span style="font-size: 16px; display: flex; align-items: center; justify-content: center;"><span class="spinner-grow" aria-hidden="true"></span>กำลังโหลดข้อมูล...</span>')

    const valDateRangeSt = $('#startDate').val();
    const valDateRangeEn = $('#endDate').val();
    getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${valDateRangeSt}&dateEnd=${valDateRangeEn}`)
   
    
  });

  $('#DvFilter').click(function (e) { 
    e.preventDefault();
    alert($('#DvFilter').val())
    
  });

  $('#filter-item1').change(function (e) { 
    e.preventDefault();

    if($('#filter-item1').val() == 'custom'){
      $('#group-filterDate').show();
    } 
    
    else{
      $('#group-filterDate').hide();
    }
    
  });


  $('#btn-filter').click(function (e) { 
    e.preventDefault();
    $('.groupFilter-item').toggle('activeBtnFilter');
  });


  initMap();
  


});


