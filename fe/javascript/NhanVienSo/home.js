// API
var ctx = document.getElementById("doughnut-chart");
var donut2 = document.getElementById("doughnut-chart2");

var getAllStationsApi = "https://aiclub.uit.edu.vn/namnh/emetro/stations/getall";
var getAllCompaniesApi = "https://aiclub.uit.edu.vn/namnh/emetro/companies/getall";


function start() {
    getAllStations(renderStations);
    getCompanies(renderCompanies);
}

start();

// GET ALL STATION
async function getAllStations(callback) {
  fetch(getAllStationsApi)
      .then(function(response) {
          return response.json();
      })
      .then(callback)
      .catch(function(err) {
        toast({
            title: "Lỗi!",
            message: "Có lỗi xảy ra!",
            type: "error",
            duration: 3000
          });
      });
}

async function renderStations(stations) {
  var data = stations.data;

  let BinhThuong = 0, DangSuaChua = 0, DaNgungHoatDong = 0; 

  data.map(function(station) {

      if (station.status == 0) {
          DaNgungHoatDong += 1;
      } else {
          if (station.status == 1) {
              DangSuaChua += 1;
          } else {
              BinhThuong += 1;
          }
      }

  });

  const arr = [
      BinhThuong,
      DaNgungHoatDong,
      DangSuaChua
  ];

  setDataStation(arr);

}

function setDataStation(data) {
  var chart1 = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Bình thường', 'Đã ngưng hoạt động', 'Đang sữa chửa'],
        datasets: [{
          label: ' Số lượng',
          data: data,
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
}


// GET ALL COMPANY

async function getCompanies(callback) {
  fetch(getAllCompaniesApi)
      .then(function(response) {
          return response.json();
      })
      .then(callback)
      .catch(function(err) {
        toast({
            title: "Lỗi!",
            message: "Có lỗi xảy ra!",
            type: "error",
            duration: 3000
          });
      });
}

async function renderCompanies(companies) {
  var data = companies.data;

  let ConKhaiThac = 0, DungKhaiThac = 0;

  data.map(function(company) {

      if (company.status == 0) {
          DungKhaiThac += 1;
      } else {
          ConKhaiThac += 1;
      }
  });

  let arr = [
      ConKhaiThac,
      DungKhaiThac
  ];


  setDataCompany(arr);  
}

function setDataCompany(data) {
  var chart2 = new Chart(donut2, {
    type: 'doughnut',
    data: {
        labels: ['Còn khai thác', 'Dừng khai thác'],
        datasets: [{
          label: ' Số lượng',
          data: data,
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
}