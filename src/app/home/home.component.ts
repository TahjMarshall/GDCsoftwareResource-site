import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,
    //HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchTerm: string = '';

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    const sections = [
      {
        id: 'overview',
        title: 'Overview',
        content: ''
      },
     
    ];

   this.dataService.addPageContent('About', '/home', sections);
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchTerm } });
    }
  }
}

