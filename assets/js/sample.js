/* Fills demo/sample.html for whichever placeholder link was clicked: sample.html?p=401k, ?p=company&name=…, etc. */
(() => {
  "use strict";
  const q = new URLSearchParams(location.search);
  const name = (q.get("name") || "").slice(0, 80);

  const PAGES = {
    "401k": {
      title: "401(k) retirement account",
      lead: "In your intranet, this opens your retirement plan provider, signed in with the employee's own account.",
      points: ["Check your balance and investment mix", "Change how much you contribute each paycheck", "Update beneficiaries"],
    },
    benefits: {
      title: "Benefits & insurance",
      lead: "In your intranet, this opens your benefits portal: medical, dental and vision in one place.",
      points: ["See plans and enroll during open enrollment", "Print an insurance card", "Find an in-network doctor"],
    },
    website: {
      title: "Company website",
      lead: "In your intranet, this opens your public website. Handy for grabbing an address or a product page to send a customer.",
      points: ["Products and services", "Locations and hours", "News and press"],
    },
    company: {
      title: name ? `${name} website` : "Sister company website",
      lead: `In your intranet, this opens ${name || "the sister company"}'s own website.`,
      points: ["Contact details and locations", "What they do and who to ask"],
    },
    news: {
      title: "Benefits open enrollment",
      lead: "Announcements can link to anything: an article on your SharePoint, a form, or a page like this one.",
      points: ["Review your medical, dental and vision options", "Make changes before the enrollment deadline", "Questions? Contact HR at ext. 1305"],
    },
    ticket: {
      title: "Submit an IT ticket",
      lead: "In your intranet, this opens your help desk's ticket form or portal. Here's a sample.",
      points: [],
      form: true,
    },
    teams: {
      title: "Chat with IT on Teams",
      lead: "In your intranet, this opens a Microsoft Teams chat with your help desk, already addressed and ready to type.",
      points: ["Fastest for quick questions", "Share a screenshot right in the chat"],
    },
  };

  const page = PAGES[q.get("p")] || { title: "Sample page", lead: "In your intranet, this link opens the real destination.", points: [] };
  document.title = `${page.title} · Sample page`;
  document.getElementById("sample-title").textContent = page.title;
  document.getElementById("sample-lead").textContent = page.lead;
  const list = document.getElementById("sample-list");
  for (const point of page.points) {
    const li = document.createElement("li");
    li.textContent = point;
    list.append(li);
  }
  list.hidden = !page.points.length;

  const form = document.getElementById("sample-form");
  if (page.form) {
    form.hidden = false;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById("sample-form-note").textContent = "Thanks! In your version, this goes straight to your help desk and you get a ticket number by email.";
    });
  }
})();
