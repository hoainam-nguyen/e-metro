var ctx = document.getElementById("doughnut-chart");
var donut2 = document.getElementById("doughnut-chart2");

var getAllLinesApi = "https://aiclub.uit.edu.vn/namnh/emetro/lines/getall";
// var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";


function start() {
    // getAllLines(renderLines);
    getUser(sessionStorage.getItem("id_user"));
    // getCompanies(renderCompanies);
}

start();

function getUser(id) {
  fetch("https://aiclub.uit.edu.vn/namnh/emetro/users/search/?id=" + id)
      .then(function(response) {
          return response.json();
      })
      .then(function(user) {
          let data = user.data[0];

          getAllLines(data.company_id);
      })
      .catch(function(err) {
          console.log(err);
      });
}



// GET ALL LINES
async function getAllLines(company_id) {
  fetch(getAllLinesApi)
      .then(function(response) {
          return response.json();
      })
      .then(function(lines) {
            renderLines(lines, company_id);
      })
      .catch(function(err) {
          console.log(err);
      });
}

async function renderLines(lines, company_id) {
  var data = lines.data;

  let ConHoatDong = 0, KhongHoatDong = 0; 

  data.map(function(line) {

    if (line.company_id == company_id) {
      if (line.status == 0) {
          KhongHoatDong += 1;
      } else {
          ConHoatDong += 1;
      }
    }

  });

    const arr = [
        ConHoatDong,
        KhongHoatDong
    ];

  setDataStation(arr);

}

function setDataStation(data) {
  var chart1 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Còn hoạt động', 'Không hoạt động'],
        datasets: [{
          label: ' Số lượng',
          data: data,
          backgroundColor: [
            'rgb(43, 192, 43)',
            'rgb(230, 68, 68)'          
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
}


// BAR CHART
const labels = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
const data = {
  labels: labels,
  datasets: [{
    label: ' Doanh thu 2023',
    data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
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