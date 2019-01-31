import Chart from 'chart.js'

let RenderChart = (wrong_questions_last, correct_questions_last, wrong_questions_total, correct_questions_total, ctx, ctx2) => {
  console.log(wrong_questions_last, ' ', correct_questions_last, ' ',wrong_questions_total, ' ',correct_questions_total, ' ', ctx, ' ', ctx2)
 setTimeout(() => {
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.legend.position='right';
  let myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Wrong last", "Correct last"],
        datasets: [{
            label: '# of Questions',
            data: [wrong_questions_last, correct_questions_last],
            backgroundColor: [
                'rgba(210, 0, 25, 1)',
                'rgba(0, 190, 25, 1)'
            ],
            borderColor: [
                'rgba(255,255,255,1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    display:false
                }
            }]
        }
    }
  });
  let myPieChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ["Wrong total", "Correct total"],
        datasets: [{
            label: '# of Questions',
            data: [wrong_questions_total, correct_questions_total],
            backgroundColor: [
                'rgba(210, 0, 25, 1)',
                'rgba(0, 190, 25, 1)'
            ],
            borderColor: [
                'rgba(255,255,255,1)',
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    display:false
                }
            }]
        }
    }
  });
  }, 2)
}

export default RenderChart
