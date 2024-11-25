import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-flex',
  standalone: true,
<<<<<<< Updated upstream
  imports: [RouterModule, FormsModule],  
=======
  imports: [RouterModule, FormsModule, CommonModule, HttpClientModule],
>>>>>>> Stashed changes
  templateUrl: './flex.component.html',
  styleUrls: ['./flex.component.css'],
})
export class FlexComponent implements OnInit {
  searchTerm: string = '';
<<<<<<< Updated upstream

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    const sections = [
      { id: 'overview', title: 'Overview', content: ' Overview This section includes information on Flex Printer configurations, setup, and troubleshooting.' },
      {
        id: 'database-configuration', title: 'Database Configuration Install (Flex)', content: ` Database Configuration Install (Flex)
        Navigate to C:\\Program Files\\General Data Healthcare\\LaserTrack - Cassette Printing and delete gdcSettings.db.
        Start SamLight.
        Start Flex (create a shortcut if needed). Right-click on your desktop, select "New > Shortcut," and enter the following path:
        C:\\Windows\\System32\\cmd.exe /c "net start gdcCassettePrinting"
        Open a browser (e.g., Chrome) and go to localhost:5000.
        Go to the Settings tab and click on the lock icon in the bottom right.
        Password: lt4354 (DO NOT GIVE TO CUSTOMER)
        Customer Password: 3539
        In the Service(s) tab:
        Select RegEx in the Name field and toggle "Enable".
        Set value for \`(?<=(?:[^\|]*\|){3})[^\|]* Color Location\`.
        Map Format Entity and LIS Field Values using Regex101 with .NET (C#) and the given FlatFile.
        Place the FlatFile in C:\\lis data.
        The queue should populate at localhost:5000 after completing step 5.
        Inspect items in the queue:
        Open the Network tab, click PrintJob, and verify values in the Response tab.
      `},
      {
        id: 'backup-files', title: 'Backup File Locations', content: ` Backup File Locations
        Instructions on where to store various backup files:
        .lcf and .ucf: Store in Scaps/sam2d/usc1.
        flex.sjf and gdcsettings.db: Store in C:\\Program Files\\General Data Healthcare\\LaserTrack - Cassette Printing.
        Files in Scaps/sam2d/system:
        sc_498_50708.scl
        sc_light_settings.sam
        sc_pwd_498_50708.txt
      `},
      {
        id: 'regex', title: 'RegEx Patterns', content: ` RegEx Patterns
        FlatFile Example: Genesys2.itl|1|1|102|3|Genesys||4513146|sg-24-1500-A-1|sg-24-1500-A-1|  01 AJ||sg-24-1500|A|1|
        Color: (?<=(?:[^\|]*\|){3})[^\|]*
        Barcode: (?<=(?:[^\|]*\|){8})[^\|]*
        Accession Number: (?<=(?:[^\|]*\|){12})[^\|]*
        Part Block: (?<=(?:[^\|]*\|){13})[^\|]*~""~(?<=(?:[^\|]*\|){14})[^\|]*
      `},
      {
        id: 'troubleshooting', title: 'Troubleshooting', content: ` Troubleshooting

        Make sure the printer is connected.
        Check device manager to see if the USB connection is there; ensure the SamLight driver is installed.
        Power cycle the printer and computer.
        Make sure the printer is turned on before starting the computer.
      `}
    ];

    this.dataService.addPageContent('Flex Printers', '/Flex', sections);
  }

=======
  editMode: boolean = false;
  newSectionTitle: string = '';
  newSectionContent: string = '';
  editSection: { id: string; title: string; content: string } | null = null;
  sections: { id: string; title: string; content: SafeHtml }[] = [];
  route: string = '/flex'; // Normalized route for the Flex page

  constructor(
    private dataService: DataService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.normalizeRoute();
    this.fetchPageContent();
  }

  // Normalize the route to lowercase
  private normalizeRoute(): void {
    this.route = this.route.toLowerCase();
  }

  fetchPageContent(): void {
    this.dataService.getAllPagesFromBackend().subscribe(
      (pages: any) => {
        const flexPage = pages.find((page: any) => page.route === this.route);
        if (flexPage) {
          this.sections = flexPage.sections.map((section: any) => ({
            ...section,
            content: this.sanitizer.bypassSecurityTrustHtml(section.content),
          }));
        }
      },
      (error) => console.error('Error fetching page content:', error)
    );
  }

>>>>>>> Stashed changes
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search-results'], { queryParams: { query: this.searchTerm } });
    }
  }
<<<<<<< Updated upstream
=======

  openEditPopup(section: { id: string; title: string; content: SafeHtml } | null): void {
    this.editMode = true;
    if (section) {
      this.editSection = { id: section.id, title: section.title, content: section.content as string };
      this.newSectionTitle = section.title;
      this.newSectionContent = section.content as string;
    } else {
      this.resetEditFields();
    }
  }

  closeEditPopup(): void {
    this.editMode = false;
    this.resetEditFields();
  }

  savePage(): void {
    console.log('Saving page');
    const updatedPage = {
      title: 'Flex Printers', // Update the title as needed
      route: this.route,
      sections: this.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: section.content.toString(), // Convert SafeHtml to string
      })),
    };

    this.dataService.updatePageInBackend(updatedPage).subscribe(
      () => {
        console.log('Page updated successfully');
        this.closeEditPopup();
      },
      (error) => {
        console.error('Error updating page:', error);
      }
    );
  }


  addOrUpdateSection(): void {
    console.log('Add or update section triggered');
    if (this.editSection) {
      // Update an existing section
      const sectionIndex = this.sections.findIndex((section) => section.id === this.editSection?.id);
      if (sectionIndex !== -1) {
        this.sections[sectionIndex] = {
          id: this.editSection.id,
          title: this.newSectionTitle,
          content: this.sanitizer.bypassSecurityTrustHtml(this.newSectionContent),
        };
      }
    } else {
      // Add a new section
      const newSection = {
        id: `section-${Date.now()}`,
        title: this.newSectionTitle,
        content: this.sanitizer.bypassSecurityTrustHtml(this.newSectionContent),
      };
      this.sections.push(newSection);
    }
    this.savePage(); // Save the entire page to the backend
  }

  deleteSection(sectionId: string): void {
    this.sections = this.sections.filter((section) => section.id !== sectionId);
    this.savePage(); // Save the updated page to the backend
  }

  private resetEditFields(): void {
    this.newSectionTitle = '';
    this.newSectionContent = '';
    this.editSection = null;
  }
>>>>>>> Stashed changes
}
