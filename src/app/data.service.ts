import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private pages: { title: string; route: string; sections: { id: string; title: string; content: string }[] }[] = [];

  constructor() {
    this.initializePageContent();
  }

  initializePageContent() {
    this.addPageContent('Flex Printers', '/Flex', [
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
    ]);

    this.addPageContent('PH Printers', '/PH', [
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
    ]);
  }

  addPageContent(title: string, route: string, sections: { id: string; title: string; content: string }[]): void {
    const pageExists = this.pages.some(page => page.route === route);
    if (!pageExists) {
      this.pages.push({ title, route, sections });
    }
  }

  getPageContent() {
    return this.pages;
  }
}