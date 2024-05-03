// create function

var newLatest = null ;
var newLatestD = null ;
function changeCheckedDvID(ID){
  if($(ID).is(':checked')){
      $(ID).parent().attr('style', 'background-color: #468999; color: #F3CF29;');
      let value = $(ID).val();

    }else{
      $(ID).parent().attr('style', '')
    }
}

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
          const latest = data[0];
          if(newLatest === null && newLatestD === null){
            newLatest = latest.timestamp
            newLatestD = latest.DvID
          } 
          else if (newLatest == latest.timestamp && newLatestD == latest.DvID){
            $('#update-gif').hide();
          }else{
            newLatest = latest.timestamp
            newLatestD = latest.DvID
            $('#update-gif').show();
            $('#ChartL7d').remove()
            $('#Chart7-dayNight').remove()
            getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${setDate(1).Start}&dateEnd=${setDate(1).End}`)
          }

          $('#body-latestTable').find('tr').remove();
          data.forEach(item => {
            
            $('#body-latestTable').append('<tr><td>'+item.timestamp+'</td>'+'<td>'+item.DvID+'</td>'+'<td>'+item.timePeriod+'</td>'+'<td>'+item.address+'</td>'+'</tr>');
          });
        }
    });
        
}


async function getDeviceDetect(filter_dateStart, filter_dateEnd, filter_TimePeriod, filter_DeviceID) {
    
  let FormatData = { total: 0 }
  let dataSet = [];
  let labels = []

  let response = await $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxMioYOWhkiyVSAKgRcSVyVNmXr5YUXzTPakbeQzv6sO-7xJ2wY6k0eB9IRvI0lCkbe/exec',
    dataType: "json"
  });

  if(filter_dateStart === '' || filter_dateEnd === ''){
    if (filter_TimePeriod === 'All'){
      var query = response.filter((val) => {
        return val.DvID === filter_DeviceID;
      });

      query.forEach(async (val) => {
        let dateLabel = moment(val.date).tz('Asia/Bangkok').format('YYYY-MMM-DD')
        if (!labels.includes(dateLabel)) {
          labels.push(dateLabel);
        }

        if (FormatData.hasOwnProperty(dateLabel)) {
          FormatData[dateLabel] += 1
          FormatData.total += 1
        }
        else {
          FormatData[dateLabel] = 1
          FormatData.total += 1
        }
      });

      labels.forEach((val) => {
        dataSet.push(FormatData[val])
      });
    }else{
      var query = response.filter((val) => {
        return val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
      });

      query.forEach(async (val) => {
        let dateLabel = moment(val.date).tz('Asia/Bangkok').format('YYYY-MMM-DD')
        if (!labels.includes(dateLabel)) {
          labels.push(dateLabel);
        }

        if (FormatData.hasOwnProperty(dateLabel)) {
          FormatData[dateLabel] += 1
          FormatData.total += 1
        } else {
          FormatData[dateLabel] = 1
          FormatData.total += 1
        }
      });

      labels.forEach((val) => {
        dataSet.push(FormatData[val])
      });
    }
  }else{
    let dateStart = moment(filter_dateStart).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let dateEnd = moment(filter_dateEnd).tz('Asia/Bangkok').format('YYYY-MM-DD');
if (filter_TimePeriod === 'All') {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.DvID === filter_DeviceID;
    });

    query.forEach(async (val) => {
      let dateLabel = moment(val.date).tz('Asia/Bangkok').format('YYYY-MMM-DD')
      if (!labels.includes(dateLabel)) {
        labels.push(dateLabel);
      }

      if (FormatData.hasOwnProperty(dateLabel)) {
        FormatData[dateLabel] += 1
        FormatData.total += 1
      }
      else {
        FormatData[dateLabel] = 1
        FormatData.total += 1
      }
    });

    labels.forEach((val) => {
      dataSet.push(FormatData[val])
    });
  }

  else {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
    });

    query.forEach(async (val) => {
      let dateLabel = moment(val.date).tz('Asia/Bangkok').format('YYYY-MMM-DD')
      if (!labels.includes(dateLabel)) {
        labels.push(dateLabel);
      }

      if (FormatData.hasOwnProperty(dateLabel)) {
        FormatData[dateLabel] += 1
        FormatData.total += 1
      } else {
        FormatData[dateLabel] = 1
        FormatData.total += 1
      }
    });

    labels.forEach((val) => {
      dataSet.push(FormatData[val])
    });
  }
    
  }

  

  return { labels, dataSet };
}


async function getDeviceDetectTime(filter_dateStart, filter_dateEnd, filter_TimePeriod, filter_DeviceID) {
  let dateStart = moment(filter_dateStart).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let dateEnd = moment(filter_dateEnd).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let FormatData = {
    TimeRange1: 0, // 06:00 - 09:00,
    TimeRange2: 0, // 09:00 - 12:00,
    TimeRange3: 0, // 12:00 - 15:00,
    TimeRange4: 0, // 15:00 - 18:00,
    TimeRange5: 0, // 18:00 - 21:00,
    TimeRange6: 0, // 21:00 - 24:00,
    TimeRange7: 0, // 00:00 - 03:00,
    TimeRange8: 0 // 03:00 - 06:00
  }
  
  let labels = ['06:00 - 09:00', '09:00 - 12:00', '12:00 - 15:00', '15:00 - 18:00', '18:00 - 21:00', '21:00 - 24:00', '00:00 - 03:00', '03:00 - 06:00']

  let dataSet = []

  let response = await $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxMioYOWhkiyVSAKgRcSVyVNmXr5YUXzTPakbeQzv6sO-7xJ2wY6k0eB9IRvI0lCkbe/exec',
    dataType: "json"
  });

  if(filter_dateStart === '' || filter_dateEnd === ''){
    if (filter_TimePeriod === 'All')  {
      var query = response.filter((val) => {
        return val.DvID === filter_DeviceID;
      });

      query.forEach(async (val) => {
        let timeVal = moment(val.time, 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
        if (timeVal > moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange1 += 1
        }

        else if (timeVal > moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange2 += 1
        }

        else if (timeVal > moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange3 += 1
        }

        else if (timeVal > moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange4 += 1
        }

        else if (timeVal > moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange5 += 1
        }

        else if (timeVal > moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('23:59', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange6 += 1
        }

        else if (timeVal >= moment('24:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange7 += 1
        }

        else if (timeVal > moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
          FormatData.TimeRange8 += 1
        }
      })

       for(let i = 1; i <= labels.length; i++){
        dataSet.push(FormatData['TimeRange'+i])
      }
      }

        else{
        var query = response.filter((val) => {
          return val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
        });

        query.forEach(async (val) => {
          let timeVal = moment(val.time, 'HH:mm').tz('Asia/Bangkok').format('HH:mm')

          if (timeVal > moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange1 += 1
          }

          else if (timeVal > moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange2 += 1
          }

          else if (timeVal > moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange3 += 1
          }

          else if (timeVal > moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange4 += 1
          }

          else if (timeVal > moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange5 += 1
          }

          else if (timeVal > moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('23:59', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange6 += 1
          }

          else if (timeVal >= moment('24:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange7 += 1
          }

          else if (timeVal > moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
            FormatData.TimeRange8 += 1
          }
        })

        for(let i = 1; i <= labels.length; i++){
          dataSet.push(FormatData['TimeRange'+i])
        }

    }
  }
  
  
  else{

    if (filter_TimePeriod === 'All')  {
  var query = response.filter((val) => {
    return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.DvID === filter_DeviceID;
  });

  query.forEach(async (val) => {
    let timeVal = moment(val.time, 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
    if (timeVal > moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange1 += 1
    }

    else if (timeVal > moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange2 += 1
    }

    else if (timeVal > moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange3 += 1
    }

    else if (timeVal > moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange4 += 1
    }

    else if (timeVal > moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange5 += 1
    }

    else if (timeVal > moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('23:59', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange6 += 1
    }

    else if (timeVal >= moment('24:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange7 += 1
    }

    else if (timeVal > moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
      FormatData.TimeRange8 += 1
    }
  })

   for(let i = 1; i <= labels.length; i++){
    dataSet.push(FormatData['TimeRange'+i])
  }
  }

    else{
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
    });

    query.forEach(async (val) => {
      let timeVal = moment(val.time, 'HH:mm').tz('Asia/Bangkok').format('HH:mm')

      if (timeVal > moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange1 += 1
      }

      else if (timeVal > moment('09:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange2 += 1
      }

      else if (timeVal > moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange3 += 1
      }

      else if (timeVal > moment('15:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange4 += 1
      }

      else if (timeVal > moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange5 += 1
      }

      else if (timeVal > moment('21:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('23:59', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange6 += 1
      }

      else if (timeVal >= moment('24:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange7 += 1
      }

      else if (timeVal > moment('03:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') && timeVal <= moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')) {
        FormatData.TimeRange8 += 1
      }
    })

    for(let i = 1; i <= labels.length; i++){
      dataSet.push(FormatData['TimeRange'+i])
    }
  
}
    
  }



  
  

return {query, labels, dataSet };

}


async function getLatest(filter_dateStart, filter_dateEnd, filter_TimePeriod, filter_DeviceID) {
  
  let FormatData = { latest: [] };

  let response = await $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxMioYOWhkiyVSAKgRcSVyVNmXr5YUXzTPakbeQzv6sO-7xJ2wY6k0eB9IRvI0lCkbe/exec',
    dataType: "json"
  });

  if(filter_dateStart === '' || filter_dateEnd === ''){
    if (filter_TimePeriod === 'All') {
      var query = response.filter((val) => {
        return  val.DvID === filter_DeviceID;
      });

      // เรียงลำดับ query ตาม timestamp จากมากไปน้อย
      query.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      query.forEach((val) => {
        FormatData.latest.push(val);
      });
    } 
    else {
      var query = response.filter((val) => {
        return  val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
      });

      // เรียงลำดับ query ตาม timestamp จากมากไปน้อย
      query.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      query.forEach((val) => {
        FormatData.latest.push(val);
      });
    }
  }
  
  else{
  let dateStart = moment(filter_dateStart).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let dateEnd = moment(filter_dateEnd).tz('Asia/Bangkok').format('YYYY-MM-DD');
  if (filter_TimePeriod === 'All') {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.DvID === filter_DeviceID;
    });

    // เรียงลำดับ query ตาม timestamp จากมากไปน้อย
    query.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    query.forEach((val) => {
      FormatData.latest.push(val);
    });
  } 
  else {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
    });

    // เรียงลำดับ query ตาม timestamp จากมากไปน้อย
    query.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    query.forEach((val) => {
      FormatData.latest.push(val);
    });
  }
  }
  return FormatData;
}


async function getTimePeriod(filter_dateStart, filter_dateEnd, filter_TimePeriod, filter_DeviceID) {
  let dateStart = moment(filter_dateStart).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let dateEnd = moment(filter_dateEnd).tz('Asia/Bangkok').format('YYYY-MM-DD');
  let dataSet = { night:0, day:0 }
  let labels = ['night', 'day']

  var dataExp = []

  let response = await $.ajax({
    url: 'https://script.google.com/macros/s/AKfycbxMioYOWhkiyVSAKgRcSVyVNmXr5YUXzTPakbeQzv6sO-7xJ2wY6k0eB9IRvI0lCkbe/exec',
    dataType: "json"
  });

  if(filter_dateStart === '' || filter_dateEnd === ''){
    if (filter_TimePeriod === 'All') {
      var query = response.filter((val) => {
        return val.DvID === filter_DeviceID;
      });

      query.forEach(async (val) => {
        if(val.timePeriod === 'Night'){
          dataSet.night += 1
        } else{
          dataSet.day += 1
        }
      });


    }

    else {
      var query = response.filter((val) => {
        return val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
      }); 

      query.forEach(async (val) => {
        if(val.timePeriod === 'Night'){
          dataSet.night += 1
        } else{
          dataSet.day += 1
        }
      });


    }
  }

  else{

  if (filter_TimePeriod === 'All') {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.DvID === filter_DeviceID;
    });

    query.forEach(async (val) => {
      if(val.timePeriod === 'Night'){
        dataSet.night += 1
      } else{
        dataSet.day += 1
      }
    });

    
  }

  else {
    var query = response.filter((val) => {
      return moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') >= dateStart && moment(val.date).tz('Asia/Bangkok').format('YYYY-MM-DD') <= dateEnd && val.timePeriod === filter_TimePeriod && val.DvID === filter_DeviceID;
    });

    query.forEach(async (val) => {
      if(val.timePeriod === 'Night'){
        dataSet.night += 1
      } else{
        dataSet.day += 1
      }
    });

    
  }
}
labels.forEach((val) => {
  dataExp.push(dataSet[val])
} )

  return { labels, dataExp };
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

function setChartDetectDay(dataAA){
  $('#chartCountDay').remove()
  let canvasElement1 = $("<canvas></canvas>");



canvasElement1.attr("id", "chartCountDay")



$('#sec-chartCountDay').append(canvasElement1)



  new Chart($('#chartCountDay'), {
    type: 'line',
    
    data: {
      labels: dataAA.labels,
      datasets: [
        {
        label:'detected',
        data:dataAA.dataSet
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

}


function setChartDetectTime(dataAA){
  $('#chartCountTime').remove()
  let canvasElement1 = $("<canvas></canvas>");

canvasElement1.attr("id", "chartCountTime")

$('#sec-chartCountTime').append(canvasElement1)



  new Chart($('#chartCountTime'), {
    type: 'line',
    
    data: {
      labels: dataAA.labels,
      datasets: [
        {
        label:'detected',
        data:dataAA.dataSet
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

}

function setChartDetectperiod(dataAA){
  $('#chartPeriod').remove()
  let canvasElement1 = $("<canvas></canvas>");

canvasElement1.attr("id", "chartPeriod")

$('#sec-chart3').append(canvasElement1)


new Chart($('#chartPeriod'), {
  type: 'pie',
  data:  {
    labels: [
      'Night',
      'Day'
    ],
    datasets: [{
      label: ' Time Period',
      data: dataAA.dataExp,
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 2
    }]
  }
})

}

function setprogress(dataAA){
  $("#predicInfo").show()
let now = moment().tz('Asia/Bangkok').format('HH:mm')
let data = dataAA.dataSet
let presenDD = 0
let rangeT = null

let sumData = 0;
data.forEach((val)=>{
  sumData += val
})

let persen = data.map((val) => {
  return (val*100)/sumData
})

if(
  now >= moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') &&
  now < moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
) {
   presenDD = persen[0]+persen[1] ;
   rangeT = '06:00 - 12:00'
}

else if(
  now >= moment('12:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') &&
  now < moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
) {
   presenDD = persen[2]+persen[3] ;
   rangeT = '12:00 - 18:00'
}

else if(
  now >= moment('18:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') &&
  now <= moment('23:59', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
) {
   presenDD = persen[4] + persen[5];
   rangeT = '18:00 - 24:00'
}

else if(
  now >= moment('24:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm') &&
  now < moment('06:00', 'HH:mm').tz('Asia/Bangkok').format('HH:mm')
) {
   presenDD = persen[6] + persen[7] ;
   rangeT = '24:00 - 06:00'
}

if(presenDD <= 33.33){
  return {persen:presenDD, Leval:'safe', rangeT:rangeT}
} else if(presenDD > 33.33 && presenDD <= 66.66){
  return {persen:presenDD, Leval:'warning', rangeT:rangeT}
} else{
  return {persen:presenDD, Leval:'danger', rangeT:rangeT}
}

}

function updateProgress(Lev) {
  let progressWidth = 0;

  switch (Lev.Leval) {
    case "safe":
      $("#progress-bar").css("background-color", "#089a00"); // Safe color
      progressWidth = Lev.persen; // 33.33% for safe
      $('#lev_vlue').text(`${Lev.rangeT},\t ${Lev.persen.toFixed(2)}% were detected.`)
      break;
    case "warning":
      $("#progress-bar").css("background-color", "#F3CF29"); // Warning color
      progressWidth = Lev.persen; // 66.66% for warning
      $('#lev_vlue').text(`${Lev.rangeT},\t ${Lev.persen.toFixed(2)}% were detected.`)
      break;
    case "danger":
      $("#progress-bar").css("background-color", "#c50000"); // Danger color
      progressWidth = Lev.persen; // 100% for danger
      $('#lev_vlue').text(`${Lev.rangeT},\t ${Lev.persen.toFixed(2)}% were detected.`)
      break;
    default:
      $("#progress-bar").css("background-color", "#089a00"); // Default color for safety
      break;
  }

  $("#progress-bar").css("width", progressWidth + "%");
}





// /


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
      
      $('.not-infoday').remove()
      $(".not-infotime").remove()
      $(".not-infoperiod").remove()
      $("#infopredic").remove() 
      let DeviceDetectDayCart =  getDeviceDetect('', '', 'All', currantMaps)
      DeviceDetectDayCart.then((data) => {
        
        
          
          setChartDetectDay(data)
        
      })
      DeviceDetectDayCart.catch((error) => {
        console.error(error);
      });

      let DeviceDetectTimeCart = getDeviceDetectTime('', '', 'All', currantMaps)
      DeviceDetectTimeCart.then((data) => {
        
       
              
        setChartDetectTime(data)

        let lev = setprogress(data)

        let progresss = updateProgress(lev)

        console.log(lev)
        console.log(progresss)
        
      })
      DeviceDetectTimeCart.catch((error) => {
        console.error(error);
      });

      let DeviceDetectTimePeriodCart = getTimePeriod('', '', 'All', currantMaps)
      DeviceDetectTimePeriodCart.then((data) => {
        
        setChartDetectperiod(data)
        
        
      })
      DeviceDetectTimePeriodCart.catch((error) => {
        console.error(error);
      });



  
    });

   
  })

  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }


  
  
}

// main 
$(document).ready(function () {

  
  getChart_L7d(`https://script.google.com/macros/s/AKfycbwzyMQQGRdOvt52OLgqShInHrIwSyD6_yB2hGfEkqPfjAePEUiKEotUlhfCyCQgYPm4/exec?dateStart=${setDate(1).Start}&dateEnd=${setDate(1).End}`)
  getLastData()
  setInterval(function () {
    getLastData()
  }, 8000);

  setInterval(function () {
    let DeviceDetectTimeCart = getDeviceDetectTime('', '', 'All', currantMaps)
      DeviceDetectTimeCart.then((data) => {

        let lev = setprogress(data)

        let progresss = updateProgress(lev)

        console.log(lev)
        console.log(progresss)
        
      })
      DeviceDetectTimeCart.catch((error) => {
        console.error(error);
      });
  }, 600000);

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


let filterDateRange = null



  $('#btn-filter').click(function (e) { 
    e.preventDefault();
    if(currantMaps === null){
      alert('Not information!\nplease click marker on map')
    }else{
      $('.groupFilter-item').toggle();
    }
    
  });

  $('#btn-filter-enter').click(function (e) { 
    e.preventDefault();
    let timePrCount = []
    let vari_PrTime = null
    let stDate =''
    let endDate = ''
    let valrangeD = $('#filterDateRange').val() 
    let Date_check = true

    $('input[name="filter-timePr"]:checked').each(function(index, val) {
      timePrCount.push($(val).val())
    });

    if(timePrCount.length === 0 || timePrCount.length === 2){
      vari_PrTime = 'All'
    }else{
      vari_PrTime = timePrCount[0]
    }
  
    if(valrangeD === 'custom'){
      if( checkEndDate($('#filter-DateSt').val(), $('#filter-DateEnd').val())){
        stDate = $('#filter-DateSt').val()
        endDate = $('#filter-DateEnd').val()
      }else{
        Date_check = false
      }
      
    }else if(valrangeD === ''){
      stDate =''
      endDate = ''
    }
    
    else{
      let setDateFilter = null

    if(valrangeD == 'Today'){
      setDateFilter = setDate(1)
     
    }

    else if(valrangeD == 'yesterday'){
       setDateFilter = setDate(-1)
     
    }
    
    else if(valrangeD == '7days'){
       setDateFilter = setDate(-7)
      
     
    }

    else if(valrangeD == '14days'){
       setDateFilter = setDate(-14)
      
     
    }

    else if(valrangeD == '28days'){
       setDateFilter = setDate(-28)
      
     
    }

    else if(valrangeD == 'thisMonth'){
       setDateFilter = setDate(1.1)
      
     
    }

    else if(valrangeD == 'lastMonth'){
       setDateFilter = setDate(1.2) 
    }

    else if(valrangeD == 'thisYear'){
       setDateFilter = setDate(2.1) 
    }

    else if(valrangeD == 'lastYear'){
       setDateFilter = setDate(2.2) 
    }
    stDate = setDateFilter.Start
    endDate = setDateFilter.End

    }

    if(Date_check){
      alert(`vari_PrTime: ${vari_PrTime}\nstart Date:${stDate}\nend Date:${endDate}`)

      let DeviceDetectDayCart =  getDeviceDetect(stDate, endDate, vari_PrTime, currantMaps)
      DeviceDetectDayCart.then((data) => {

        
          
          setChartDetectDay(data)
        
      })
      DeviceDetectDayCart.catch((error) => {
        console.error(error);
      });

      let DeviceDetectTimeCart = getDeviceDetectTime(stDate,endDate,vari_PrTime, currantMaps)
      DeviceDetectTimeCart.then((data) => {

       
              
        setChartDetectTime(data)
             
        
      })
      DeviceDetectTimeCart.catch((error) => {
        console.error(error);
      });

      let DeviceDetectTimePeriodCart = getTimePeriod(stDate, endDate,vari_PrTime, currantMaps)
      DeviceDetectTimePeriodCart.then((data) => {

        setChartDetectperiod(data)
        
        
      })
      DeviceDetectTimePeriodCart.catch((error) => {
        console.error(error);
      });

      $('.groupFilter-item').toggle()
    } else{
      alert('The end date must be greater than the start date.')
      $('#filter-DateEnd').val('')
    }
    

  });



  initMap();

  
  $('input[name="filter-timePr"]').change(function() {
    // เข้าถึงค่า value ของ input checkbox ที่ถูกเลือก
    if($(this).is(':checked')){
      $(this).parent().attr('style', 'background-color: #468999; color: #F3CF29;');
      let value = $(this).val();

    }else{
      $(this).parent().attr('style', '')
    }
    
});

var setDateFilter = null

$('#filterDateRange').change(function (e) { 
  e.preventDefault();
  let val = $('#filterDateRange').val()
  if(val !== ''){
      $('#filterDateRange').attr('style', 'width: 100%; border:solid 1px #468999');

      if(val === 'custom'){
        $('#group-filterDate').show()
      }
  }else{
    $('#group-filterDate').hide();
    $('#filterDateRange').attr('style', 'width: 100%; border:none');
  }
});


$('#timeNow').html(moment().tz('Asia/Bangkok').format('HH:mm:ss'))

setInterval(function () {
  $('#timeNow').html(moment().tz('Asia/Bangkok').format('HH:mm:ss'))
}, 1000);
});


