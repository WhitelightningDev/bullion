import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metals-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metals-chart.component.html',
  styleUrls: ['./metals-chart.component.css']
})
export class MetalsChartComponent implements OnInit {
  goldPrice: number | null = null;
  silverPrice: number | null = null;
  lastUpdated: string | null = null;
  errorMessage: string | null = null;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    this.fetchMetalRates();
  }

  async fetchMetalRates(): Promise<void> {
    const url = 'https://api.metals.dev/v1/latest?api_key=UCFQEU9TIZMZWRCYJRAY203CYJRAY&currency=ZAR&unit=toz';

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' }
      });

      const result = await response.json();

      this.zone.run(() => {
        this.goldPrice = result.metals?.gold ?? null;
        this.silverPrice = result.metals?.silver ?? null;
        this.lastUpdated = new Date(result.timestamps?.metal).toLocaleString();
        this.errorMessage = null;
      });
    } catch (error) {
      this.zone.run(() => {
        console.error('Error fetching metal rates:', error);
        this.errorMessage = 'Unable to fetch metal prices at the moment.';
      });
    }
  }
}


// https://metals.dev/dashboard