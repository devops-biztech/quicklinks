/* ==========================================================================
   QUICKLINKS CONTENT
   This is the only file you need to edit to change what's on the page.

   Tips
   - Keep the commas between items. A missing comma breaks the page.
   - After editing, run:  node scripts/check-content.mjs
     It catches typos, duplicate ids, missing files and bad dates.
   - Dates are always written YYYY-MM-DD.
   - Icons: see the ICONS list at the top of assets/js/app.js, or use an
     image path such as "assets/icons/adp.png".
   ========================================================================== */

window.QUICKLINKS = {
  updated: "2026-10-07",

  company: {
    name: "Biztech",
    tagline: "Intranet",
    logo: "assets/logos/company.svg",
  },

  /* Brand look.
     color: your brand color, any CSS color ("#0057b8", "rgb(0 87 184)", "teal").
            It's adjusted automatically so links and buttons stay readable in light and dark mode.
     type:  the voice of the big greeting and headings —
            "editorial" (serif), "modern" (bold sans), "friendly" (rounded) or "system" (your computer's own font, no downloads).
     Try one before committing: add ?type=modern&color=%23e4572e to the page address. */
  theme: {
    color: "#3b4bf5",
    type: "modern",
  },

  settings: {
    openLinksInNewTab: true,
    demo: false,
  },

  // Heading over the sister-company cards.
  companiesTitle: "Schmidbauer Family Mills",

  /* Banner across the top. Shown only between `from` and `until`.
     tone: "info" | "warning" */
  announcements: [
    {
      text: "Open enrollment for 2027 benefits runs Oct 19 – Nov 6.",
      link: { label: "Review your options", url: "#" },
      from: "2026-10-01",
      until: "2026-11-06",
      tone: "info",
    },
  ],

  /* IT status light. level: "ok" | "notice" | "outage" */
  itStatus: {
    level: "ok",
    message: "All systems normal",
  },

  it: {
    phone: "(707) 442-8393",
    ext: "4357",
    email: "support@trustbiztech.com",
    // Paste a Teams chat link. For a single person or shared mailbox:
    // https://teams.microsoft.com/l/chat/0/0?users=support@trustbiztech.com
    teamsChat: "https://teams.microsoft.com/l/chat/0/0?users=support@trustbiztech.com",
    ticketUrl: "mailto:support@trustbiztech.com?subject=IT%20Ticket%3A%20",
    hours: "Mon – Fri · 7:30 AM – 5:30 PM",
    afterHours: "(707) 442-8393",
  },

  /* Launchpad. `tint` is the icon color. */
  apps: [
    {
      id: "outlook",
      name: "Outlook",
      description: "Email & calendar",
      url: "https://outlook.office.com/mail/",
      icon: "mail",
      tint: "#0f6cbd",
      keywords: "email mail calendar inbox m365",
    },
    {
      id: "teams",
      name: "Teams",
      description: "Chat & meetings",
      url: "https://teams.microsoft.com/",
      icon: "users",
      tint: "#5b5fc7",
      keywords: "chat meeting call video m365",
    },
    {
      id: "onedrive",
      name: "OneDrive",
      description: "Your files",
      url: "https://www.office.com/onedrive",
      icon: "cloud",
      tint: "#0a84d6",
      keywords: "files storage documents sharepoint m365",
    },
    {
      id: "m365",
      name: "Microsoft 365",
      description: "Word, Excel, PowerPoint",
      url: "https://www.office.com/",
      icon: "grid",
      tint: "#d9480f",
      keywords: "office word excel powerpoint apps",
    },
    {
      id: "adp",
      name: "ADP",
      description: "Pay stubs, W-2s & time",
      url: "https://workforcenow.adp.com/",
      icon: "payroll",
      tint: "#d0271d",
      keywords: "payroll paycheck pay stub w2 timesheet time clock hr",
    },
    {
      id: "401k",
      name: "401(k)",
      description: "Retirement account",
      url: "#",
      icon: "trend",
      tint: "#1f8a5b",
      keywords: "retirement 401k savings invest",
    },
    {
      id: "benefits",
      name: "Insurance",
      description: "Medical, dental & vision",
      url: "#",
      icon: "shield",
      tint: "#0e8f9c",
      keywords: "health medical dental vision insurance benefits",
    },
    {
      id: "website",
      name: "Company Website",
      description: "trustbiztech.com",
      url: "https://trustbiztech.com/",
      icon: "globe",
      tint: "#7c4dff",
      keywords: "site public web",
    },
  ],

  /* Files live in the /files folder next to index.html. */
  files: [
    {
      id: "phone-list",
      name: "Company Phone List",
      file: "files/phone-list.pdf",
      category: "Directory",
      updated: "Sep 2026",
      keywords: "extensions directory numbers staff employees",
    },
    {
      id: "pto",
      name: "Vacation / PTO Request",
      file: "files/pto-request.pdf",
      category: "Forms",
      updated: "Jan 2026",
      keywords: "vacation time off leave pto sick personal",
    },
    {
      id: "expense",
      name: "Expense Report",
      file: "files/expense-report.xlsx",
      category: "Forms",
      updated: "Jan 2026",
      keywords: "reimbursement mileage receipts travel",
    },
    {
      id: "holidays",
      name: "Holiday Schedule 2026",
      file: "files/holiday-schedule-2026.pdf",
      category: "Calendar",
      updated: "Dec 2025",
      keywords: "days off office closed",
    },
    {
      id: "letterhead",
      name: "Letterhead",
      file: "files/letterhead.docx",
      category: "Brand",
      updated: "Mar 2026",
      keywords: "template word stationery",
    },
    {
      id: "logos",
      name: "Logo Pack",
      file: "files/logo-pack.zip",
      category: "Brand",
      updated: "Mar 2026",
      keywords: "brand marks png svg images",
    },
  ],

  /* Drives the countdown. `scheduleFile` is the id of a file above. */
  holidays: {
    scheduleFile: "holidays",
    days: [
      { name: "New Year's Day", date: "2026-01-01" },
      { name: "Memorial Day", date: "2026-05-25" },
      { name: "Independence Day (observed)", date: "2026-07-03" },
      { name: "Labor Day", date: "2026-09-07" },
      { name: "Thanksgiving Day", date: "2026-11-26" },
      { name: "Day after Thanksgiving", date: "2026-11-27" },
      { name: "Christmas Eve", date: "2026-12-24" },
      { name: "Christmas Day", date: "2026-12-25" },
      { name: "New Year's Day", date: "2027-01-01" },
    ],
  },

  companies: [
    {
      name: "Schmidbauer Lumber Company",
      logo: "assets/logos/northwind.svg",
      phone: "(707) 014-2200",
      email: "info@schmidbauerlumber.com",
      website: "https://schmidbauerlumber.com/",
    },
    {
      name: "North Fork Lumber Company",
      logo: "assets/logos/harbor-pine.svg",
      phone: "(707) 018-7310",
      email: "info@nflmill.com",
      website: "https://northforklumbercompany.com/",
    },
    {
      name: "Trinity River Lumber Company",
      logo: "assets/logos/summit-ridge.svg",
      phone: "(530) 012-9045",
      email: "info@trlcmill.com",
      website: "https://trinityriverlumbercompany.com/",
    },
    {
      name: "Shasta SRM",
      logo: "assets/logos/bluefield.svg",
      phone: "(530) 016-3388",
      email: "info@srm-energy.com",
      website: "https://srm-energy.com/",
    },
    {
      name: "Spanish Trail Lumber Company",
      logo: "assets/logos/cedar-point.svg",
      phone: "(707) 011-5600",
      email: "info@spanishtrail.com",
      website: "https://spanishtraillumber.com/",
    },
    {
      name: "Grayson Lumber Company",
      logo: "assets/logos/cedar-point.svg",
      phone: "(707) 011-5600",
      email: "info@graysonlumber.com",
      website: "https://graysonlumber.com/",
    },
  ],
};
