
$(document).ready(function () {
  $.getJSON('https://script.google.com/macros/s/AKfycbw-bzmgeGwVs7oSkeHtfN87khUtgwdpeeK-6Hs8AFjoR1XTqFs5e7yzQ5zYFGZ4bbU/exec', function (data) {
    // ดำเนินการตามต้องการเมื่อข้อมูลถูกโหลดสำเร็จ
    const resData = data.response[0];
    console.table(resData)
    $('#timestamp').html(resData.timestamp)
    $('#DeviceID').html(resData.deviceID)
    $('#TimePeriod').html(resData.timePeriod)
    $('#address').html(resData.address)
  })


  $.getJSON('https://script.googleusercontent.com/macros/echo?user_content_key=nb9MAMYf4TdJ8p_C8iX8AiTp6hW1xL96BD-IHV1kiGeWe1y3QXfBfOdW3TKxn5LNlXtfOGySHNtZqcx3JCyzJaBDSHQv_bjim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJgSAIWKDx00CoGTHESOVG3IG50HMAMmMsH29bCOBAsecSaBFTLuT081OgWRJFt8MA4eEu4rFh42UXQwMwhrQiRFejEjiikJf9z9Jw9Md8uu&lib=M8YYSjD5pq6fegETqhFRgcaWdiAq-oa8Y', function (data) {
    const label = data.response.label;
    console.log(data.response.dataset);



    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [{
          label: data.response.dataset[0].nameDataSet,
          data: data.response.dataset[0].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[1].nameDataSet,
          data: data.response.dataset[1].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[2].nameDataSet,
          data: data.response.dataset[2].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[3].nameDataSet,
          data: data.response.dataset[3].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[4].nameDataSet,
          data: data.response.dataset[4].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[5].nameDataSet,
          data: data.response.dataset[5].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        },

        {
          label: data.response.dataset[6].nameDataSet,
          data: data.response.dataset[6].dataset,
          borderWidth: 1,
          stack: 'Stack 0'
        }
      
      
      
      ]
      },
      options: {
        indexAxis: 'y',
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
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart'
          }
        }
      }
    });




  })





});
