function getInfo_mostDetected() {
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbw-bzmgeGwVs7oSkeHtfN87khUtgwdpeeK-6Hs8AFjoR1XTqFs5e7yzQ5zYFGZ4bbU/exec",
    dataType: "json",
    success: function (response) {
      console.log(response);
      const resData = response.response[0];
      console.log(resData);
      $('#timestamp').html(resData.timestamp)
      $('#DeviceID').html(resData.deviceID)
      $('#TimePeriod').html(resData.timePeriod)
      $('#address').html(resData.address)
      
    }
  });

}

function getChart_L7d() {
  $.ajax({
    url: "https://script.googleusercontent.com/macros/echo?user_content_key=8jjnHBWHUsul22hroncopYrxvlHeSoc0XI_zNqYoqX_-L30WcBbTftMeQXdiJArUgyP0c_JsCwujzBBWBWUxjYZPaHjS36dim5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOqubWxUReyu3_kgJfm7GXuWL8837UHFQlRZDhE1JEW2MyvaEHA7ZsXbEa4xWILQneQfL7q5EXVD-Sm9uDqL-NJClSAxbjjrYtz9Jw9Md8uu&lib=M8YYSjD5pq6fegETqhFRgcaWdiAq-oa8Y",
    dataType: "json",
    success: function (data) {
      const label = data.response.label;
      console.log(data.response.dataset);
      $('#update-date').html('-update:' + data.timestamp + '-');
      $('#L7d').html(data.response.total_L7d + '<span id="L7d-Today" style="color: #00a100; font-size: 16px; margin-left: 0.05rem;">+' + data.response.total_today + '</span>');
      $('#L7d-all').text(data.response.total_All);

      console.log(data.response);

      new Chart($('#ChartL7d'), {
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

      new Chart($('#Chart7-dayNight'), {
        type: 'pie',
        data:  {
          labels: [
            'Night',
            'Day'
          ],
          datasets: [{
            label: ' Time Period',
            data: [data.response.total_L7d_Night,data.response.total_L7d_day],
            backgroundColor: [
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        }

      });
    }
  }
  )

}





$(document).ready(function () {

  getInfo_mostDetected()
  getChart_L7d()

  setInterval(function () {
    getInfo_mostDetected()
    getChart_L7d()
  }, 100000);


  

});
