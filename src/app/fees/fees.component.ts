import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
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
export class FeesComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart?: Chart;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.createFeesChart();
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  createFeesChart() {
    Chart.register(ChartDataLabels);

    const canvas = document.getElementById('feesChart') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    this.chart?.destroy();

    // Use async translation loading
    this.translate
      .get([
        'FEES.SWITCHING_FEE',
        'FEES.WITHDRAWAL_FEE',
        'FEES.COURIER_FEE',
        'FEES.COLLECTION_FEE',
        'FEES.ONGOING_GOLD',
        'FEES.ONGOING_SILVER',
        'FEES.FEE_PERCENT',
        'FEES.PIE_TITLE'
      ])
      .subscribe((translations) => {
        this.chart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              translations['FEES.SWITCHING_FEE'],
              translations['FEES.WITHDRAWAL_FEE'],
              translations['FEES.COURIER_FEE'],
              translations['FEES.COLLECTION_FEE'],
              translations['FEES.ONGOING_GOLD'],
              translations['FEES.ONGOING_SILVER']
            ],
            datasets: [
              {
                label: translations['FEES.FEE_PERCENT'],
                data: [0.25, 0.15, 0.4, 0.15, 1.0, 0.8],
                backgroundColor: [
                  'rgba(255, 193, 7, 0.70)',
                  'rgba(255, 218, 106, 0.60)',
                  'rgba(108, 117, 125, 0.55)',
                  'rgba(23, 162, 184, 0.55)',
                  'rgba(102, 16, 242, 0.55)',
                  'rgba(40, 167, 69, 0.55)'
                ],
                borderColor: 'rgba(255, 255, 255, 0.18)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              datalabels: {
                color: 'rgba(248, 249, 250, 0.90)',
                font: { weight: 'bold' },
                formatter: (value: number) => `${value}%`
              },
              legend: {
                position: 'right',
                labels: { color: 'rgba(248, 249, 250, 0.72)' }
              },
              title: {
                display: true,
                text: translations['FEES.PIE_TITLE'],
                color: 'rgba(248, 249, 250, 0.86)',
                font: { size: 16, weight: 'bold' }
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}%`
                }
              }
            }
          },
          plugins: [ChartDataLabels]
        });
      });
  }

}
