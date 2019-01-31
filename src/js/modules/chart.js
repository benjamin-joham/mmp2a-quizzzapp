import Chart from 'chart.js'

let RenderChart = (data, ctx, labels) => {
  // console.log('KUCHEN: ',wrong_questions_last, ' ', correct_questions_last, ' ',wrong_questions_total, ' ',correct_questions_total, ' ', ctx, ' ')
  Chart.defaults.global.defaultFontColor = 'white';
  Chart.defaults.global.legend.position='top';
  new Chart(ctx, {
    type: 'pie',
    data: {
        labels: labels,
        datasets: [{
            label: '# of Questions',
            data: data,
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
}

export default RenderChart
