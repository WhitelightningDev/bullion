import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metals-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metals-chart.component.html',
  styleUrls: ['./metals-chart.component.css'],
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
  const url = 'https://api.polygon.io/v3/reference/dividends?apiKey=bG0E2pivkqp1BuyiNB4lBcd24Y_DNVvo';

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    const result = await response.json();
    console.log('API Response:', result); // ✅ Logs the API response

    this.zone.run(() => {
      // Note: There are no "gold" or "silver" fields in this API
      this.goldPrice = null;
      this.silverPrice = null;
      this.lastUpdated = new Date().toLocaleString();
      this.errorMessage = null;
    });
  } catch (error) {
    this.zone.run(() => {
      console.error('Error fetching data from Polygon:', error);
      this.errorMessage = 'Unable to fetch data at the moment.';
    });
  }
}

}
