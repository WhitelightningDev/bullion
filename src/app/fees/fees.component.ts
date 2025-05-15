import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
    Chart.register(ChartDataLabels); // Register the plugin

    const ctx = document.getElementById('feesChart') as HTMLCanvasElement;
    new Chart(ctx.getContext('2d')!, {
      type: 'pie',
      data: {
        labels: [
          'Switching Fee',
          'Withdrawal Fee',
          'Courier Fee',
          'Collection Fee',
          'Ongoing (Gold)',
          'Ongoing (Silver)'
        ],
        datasets: [{
          label: 'Fee (%)',
          data: [0.25, 0.15, 0.4, 0.15, 1.0, 0.8],
          backgroundColor: [
            'rgba(40, 167, 69, 0.7)',
            'rgba(220, 53, 69, 0.7)',
            'rgba(108, 117, 125, 0.7)',
            'rgba(23, 162, 184, 0.7)',
            'rgba(102, 16, 242, 0.7)',
            'rgba(255, 193, 7, 0.7)'
          ],
          borderColor: 'rgba(255, 255, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            color: 'white',
            font: {
              weight: 'bold'
            },
            formatter: (value: number, context: any) => `${value}%`
          },
          legend: {
            position: 'right',
            labels: {
              color: 'white'
            }
          },
          title: {
            display: true,
            text: 'Fees Breakdown (Ongoing & Transactional)',
            color: 'white',
            font: {
              size: 18,
              weight: 'bold'
            }
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}%`;
              }
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  }
}
