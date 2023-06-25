var ctx2 = document.getElementById("bar-chart");

getRevenueAll();

function getRevenueAll() {
  fetch("https://aiclub.uit.edu.vn/namnh/emetro/revenue_all")
      .then(function(response) {
          return response.json();
      })
      .then(function(arr) {
          setDataRevenueAll(arr.data);          
      })
      .catch(function(err) {
        toast({
          title: "Thất bại!",
          message: "Có lỗi xảy ra!",
          type: "error",
          duration: 3000
        });
      });
}

function setDataRevenueAll(arr) {
  // BAR CHART
  const labels = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const data = {
    labels: labels,
    datasets: [{
      label: ' Doanh thu 2023',
      data: arr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  
  var chart2 =new Chart(ctx2,config);
}
