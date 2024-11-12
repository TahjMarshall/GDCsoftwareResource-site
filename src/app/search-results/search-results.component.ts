import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  query: string = '';
  searchResults: { title: string; route: string; snippet: string; sectionTitle: string; sectionId: string }[] = [];
  private queryParamsSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.performSearch(this.query);
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  performSearch(query: string): void {
    const lowerCaseQuery = query.toLowerCase();
    this.searchResults = []; 

    const pages = this.dataService.getPageContent(); 

    pages.forEach(page => {
      page.sections.forEach(section => {
        const contentLower = section.content.toLowerCase();

        if (contentLower.includes(lowerCaseQuery)) {
          const startIndex = contentLower.indexOf(lowerCaseQuery);
          const snippet = section.content.substring(
            Math.max(0, startIndex - 100),
            startIndex + query.length + 100
          );

         
          const exists = this.searchResults.some(result => result.sectionId === section.id && result.title === page.title);
          if (!exists) {
            this.searchResults.push({
              title: page.title,
              route: page.route,
              sectionId: section.id,
              sectionTitle: section.title,
              snippet: `...${snippet}...`
            });
          }
        }
      });
    });
  }

  onSearch(): void {
    if (this.query.trim()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { query: this.query },
        queryParamsHandling: 'merge'
      });
      this.performSearch(this.query); 
    }
  }

  navigateToSection(route: string, sectionId: string): void {
    this.router.navigate([route], { fragment: sectionId });
  }
  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
