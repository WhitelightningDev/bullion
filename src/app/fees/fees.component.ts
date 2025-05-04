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
          'Admin Fee (<R100k)',
          'Admin Fee (≥R100k)',
          'Admin Fee (≥R500k)',
          'Admin Fee (≥R1M)',
          'Admin Fee (≥R2.5M)',
          'Commission',
          'Switching',
          'Withdrawals',
          'Courier',
          'Collection',
          'Ongoing (Gold)',
          'Ongoing (Silver)'
        ],
        datasets: [{
          label: 'Fee (%) / Fixed',
          data: [
            1.50, 1.25, 0.75, 0.50, 0.25,
            NaN, // Commission is variable
            0.25,
            0.15,
            0.4,  // Insurance % component only
            0.15,
            1.0,
            0.8
          ],
          backgroundColor: [
            'rgba(0, 123, 255, 0.6)', 'rgba(0, 123, 255, 0.6)', 'rgba(0, 123, 255, 0.6)',
            'rgba(0, 123, 255, 0.6)', 'rgba(0, 123, 255, 0.6)', 'rgba(255, 193, 7, 0.6)',
            'rgba(40, 167, 69, 0.6)', 'rgba(220, 53, 69, 0.6)', 'rgba(108, 117, 125, 0.6)',
            'rgba(23, 162, 184, 0.6)', 'rgba(102, 16, 242, 0.6)', 'rgba(102, 16, 242, 0.6)'
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
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
            text: 'Fee Structure Overview',
            color: 'white',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.raw as number;
                return isNaN(value)
                  ? 'Variable / Fixed fee'
                  : `${tooltipItem.dataset.label}: ${value}%`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
              font: {
                size: 10
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Percentage (%)',
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: 'white',
              callback: function (value) {
                return value + '%';
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
  }
}
