//  <DONUT_CHART>
var ctx = document.getElementById("doughnut-chart");
var chart1 = new Chart(ctx, {
  type: 'doughnut',
  data: {
      labels: ['Hà Nội - Sài Gòn', 'Hà Nội - Huế', 'Hà Nội - Đà Nẵng'],
      datasets: [{
        label: ' Số lượng',
        data: [70, 20, 50],
        backgroundColor: [
          'rgb(43, 192, 43)',
          'rgb(230, 68, 68)',
          'rgb(241, 241, 59)'            
        ],
      }]
  },
  options: {
      plugins: {
          labels: {
              render: 'percentage',
          }
      }
  }                                                                                                                                                                                               
});

var donut2 = document.getElementById("doughnut-chart2");
var chart2 = new Chart(donut2, {
  type: 'doughnut',
  data: {
      labels: ['Còn hoạt động', 'Ngừng hoạt động'],
      datasets: [{
        label: ' Số lượng',
        data: [70, 20],
        backgroundColor: [
          'rgb(96, 96, 252)',
          'rgb(230, 68, 68)',
        ],
      }]
  },
  options: {
      plugins: {
          labels: {
              render: 'percentage',
          }
      }
  }                                                                                                                                                                                               
});



// BAR CHART
const labels = ['January','February','March','April','May','June','July'];
const data = {
labels: labels,
datasets: [{
  label: 'Doanh thu trong năm 2023',
  data: [65, 59, 80, 81, 56, 55, 40],
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

var ctx2 = document.getElementById("bar-chart");
var chart2 =new Chart(ctx2,config);

// LINE CHART
const dataLineChart = {
labels: labels,
datasets: [{
  label: 'My First Dataset',
  data: [65, 59, 80, 81, 56, 55, 40],
  fill: false,
  borderColor: 'rgb(75, 192, 192)',
  tension: 0.1
}]
};

const configLineChart = {
type: 'line',
data: dataLineChart,
};
var ctx3 = document.getElementById("line-chart");
new Chart(ctx3,configLineChart);