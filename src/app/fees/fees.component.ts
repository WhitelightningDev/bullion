import { Component, OnInit, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit, AfterViewInit {

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createFeesChart();
  }

 createFeesChart() {
  Chart.register(ChartDataLabels);

  const canvas = document.getElementById('feesChart') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Use async translation loading
  this.translate.get([
    'FEES.SWITCHING_FEE',
    'FEES.WITHDRAWAL_FEE',
    'FEES.COURIER_FEE',
    'FEES.COLLECTION_FEE',
    'FEES.ONGOING_GOLD',
    'FEES.ONGOING_SILVER',
    'FEES.FEE_PERCENT',
    'FEES.TITLE'
  ]).subscribe(translations => {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          translations['FEES.SWITCHING_FEE'],
          translations['FEES.WITHDRAWAL_FEE'],
          translations['FEES.COURIER_FEE'],
          translations['FEES.COLLECTION_FEE'],
          translations['FEES.ONGOING_GOLD'],
          translations['FEES.ONGOING_SILVER'],
        ],
        datasets: [{
          label: translations['FEES.FEE_PERCENT'],
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
            font: { weight: 'bold' },
            formatter: (value: number) => `${value}%`
          },
          legend: {
            position: 'right',
            labels: { color: 'white' }
          },
          title: {
            display: true,
            text: translations['FEES.TITLE'],
            color: 'white',
            font: { size: 18, weight: 'bold' }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) =>
                `${tooltipItem.label}: ${tooltipItem.raw}%`
            }
          }
        }
      },
      plugins: [ChartDataLabels]
    });
  });
}

}
