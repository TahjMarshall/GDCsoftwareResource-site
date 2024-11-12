import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ph',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ph.component.html',
  styleUrls: ['./ph.component.css'] 
})
export class PHComponent implements OnInit {
  searchTerm: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    const sections = [
      {
        id: 'overview',
        title: 'Overview',
        content: 'This section includes information on PH Printer configurations, setup, and troubleshooting.'
      },
      {
        id: 'ph-initial-install',
        title: 'PH Initial Install',
        content: `Download Vega
                  Download GDC Server - Service Installer
                  Change security on C:pulsar, C:\\scaps, C:\\program files\\fa-tech,
                  General Data Server folder. Copy DirectMark files and server setting to General Data Server folder.
                  Configure the server settings to look for their polling path; ServerSettings.xml tells the server which processor (directmark) to use.
                  Copy Sjf file C:\\Pulsar\\cfg.
                  If there is no backup, go to printer serial and download necessary files.`
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        content: 'Troubleshooting steps for PH Printers.'
      }
    ];

    this.dataService.addPageContent('PH Printers', '/PH', sections);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchTerm } });
    }
  }
}
