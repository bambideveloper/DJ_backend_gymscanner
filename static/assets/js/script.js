$(document).ready(function() {
  var active_menu = $('.menu_section ul li ul li.act_item a');
  $('.menu_section ul li ul li a').not(active_menu).prepend('<i class="material-icons menu_not_active_state uk-margin-small-right"></i>');
  $(active_menu).prepend('<i class="material-icons menu_active_state uk-margin-small-right"></i>');
});

// Total Users
new Chartist.Line('#chartist_total_users', {
  series: [
    [5, 4, 7, 6, 5, 3, 5, 4]
  ]
}, {
  showPoint: false,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  chartPadding: 0,
  low: 0
});

// Total Gyms
new Chartist.Line('#chartist_total_gyms', {
  series: [
    [5, 4, 7, 6, 5, 3, 5, 4]
  ]
}, {
  showPoint: false,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  chartPadding: 0,
  low: 0
});

// Trainers
new Chartist.Line('#chartist_trainers', {
  series: [
    [5, 4, 7, 6, 5, 3, 5, 4]
  ]
}, {
  showPoint: false,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  chartPadding: 0,
  low: 0
});

// Trainers
new Chartist.Line('#chartist_orders', {
  series: [
    [5, 4, 7, 6, 5, 3, 5, 4]
  ]
}, {
  showPoint: false,
  showLine: true,
  showArea: true,
  fullWidth: true,
  showLabel: false,
  axisX: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  axisY: {
    showGrid: false,
    showLabel: false,
    offset: 0
  },
  chartPadding: 0,
  low: 0
});



var ctx = document.getElementById('myChart').getContext('2d');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const random = Array.from({length: months.length}, () => Math.floor(Math.random() * 200));

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: months,
        datasets: [{
            data: random,
            backgroundColor: '#508FF4',
            borderRadius: 10,
            maxBarThickness: 10
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
          legend: {
            display: false
          }
        }
    }
});