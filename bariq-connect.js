(function () {
  const BariqStore = {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key, fallback = null) {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      try {
        return JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    remove(key) {
      localStorage.removeItem(key);
    }
  };

  const BariqApp = {
    routes: {
      home: "index.html",
      ai: "ai-generator.html",
      business: "business-dashboard.html",
      creator: "creator-dashboard.html",
      marketplace: "creator-marketplace.html",
      creatorRegister: "creator-register.html",
      studio: "campaign-studio-pro.html",
      admin: "admin-dashboard.html",
      pricing: "pricing.html",
      payments: "payments.html",
      contact: "contact.html",
      terms: "terms.html",
      privacy: "privacy-policy.html",
      refund: "refund-policy.html",
      creatorPolicy: "creator-policy.html",
      businessPolicy: "business-policy.html",
      templates: "templates.html",
      videoCreator: "video-creator.html"
    },

    go(pageKey) {
      const url = this.routes[page
