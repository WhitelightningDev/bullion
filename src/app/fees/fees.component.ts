import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createFeesChart();
  }

  createFeesChart() {
    const ctx = document.getElementById('feesChart') as HTMLCanvasElement;
    const feesChart = new Chart(ctx.getContext('2d')!, {
      type: 'bar',
      data: {
        labels: [
          '< R100,000',
          '≥ R100,000',
          '≥ R500,000',
          '≥ R1,000,000',
          '≥ R2,500,000'
        ],
        datasets: [{
          label: 'Administration Fee (%)',
          data: [1.50, 1.25, 0.75, 0.50, 0.25],
          backgroundColor: 'rgba(0, 123, 255, 0.6)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          },
          title: {
            display: true,
            text: 'Administration Fees by Deposit Amount',
            color: 'white',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Deposit Bracket (ZAR)',
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Fee Percentage (%)',
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 12
              },
              callback: function (value) {
                return value + '%';
              }
            }
          }
        }
      }
    });
  }
}
