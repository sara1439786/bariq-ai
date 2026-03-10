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

  const defaultCampaign = {
    campaignName: "Laser Hair Reduction Launch",
    businessCategory: "Clinic / Aesthetic Center",
    campaignGoal: "Lead Generation",
    campaignCity: "Hyderabad",
    campaignBudget: "25000",
    campaignTimeline: "7 Days",
    campaignOffer: "Unlimited sessions from ₹8,999",
    collabType: "Reels + Stories",
    campaignAudience: "Women 23-45 seeking a safer, smarter alternative to waxing with better convenience and confidence.",
    campaignMessage: "Promote safe, women-focused Laser Hair Reduction in Hyderabad using strong offer messaging, confidence hooks, local trust, and creator-led reels.",
    status: "Draft"
  };

  const defaultGenerator = {
    currentCategory: "Clinic / Aesthetic Center",
    currentPrompt: "Offer-Based Lead Generation Prompt",
    goal: "Lead Generation",
    city: "Hyderabad",
    product: "Laser Hair Reduction",
    offer: "Unlimited sessions from ₹8,999",
    audience: "Women 23-45 looking for safe, hassle-free hair removal",
    platform: "Instagram + Meta Ads",
    promise: "Safe for women, cost-effective compared to waxing, premium clinic support, confidence boosting treatment, and long-term convenience.",
    tone: "Premium",
    outputs: ["Meta Ad Copy", "Reel Script", "Hooks & Headlines", "Creator Brief", "Campaign Export"]
  };

  function goTo(page) {
    window.location.href = page;
  }

  function copyTextById(id) {
    const el = document.getElementById(id);
    if (!el) {
      alert("Content not found");
      return;
    }
    const text = el.innerText || el.textContent || "";
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied successfully");
    }).catch(() => {
      alert("Copy failed");
    });
  }

  function saveGeneratorDataFromPage() {
    const data = {
      currentCategory: document.getElementById("selectedCategory")?.textContent || defaultGenerator.currentCategory,
      currentPrompt: document.getElementById("selectedPrompt")?.textContent || defaultGenerator.currentPrompt,
      goal: document.getElementById("campaignGoal")?.value || defaultGenerator.goal,
      city: document.getElementById("cityMarket")?.value || defaultGenerator.city,
      product: document.getElementById("productService")?.value || defaultGenerator.product,
      offer: document.getElementById("offerPrice")?.value || defaultGenerator.offer,
      audience: document.getElementById("targetAudience")?.value || defaultGenerator.audience,
      platform: document.getElementById("platformPriority")?.value || defaultGenerator.platform,
      promise: document.getElementById("businessPromise")?.value || defaultGenerator.promise,
      tone: document.querySelector("#brandTone .toggle-pill.active")?.dataset.tone || defaultGenerator.tone,
      outputs: Array.from(document.querySelectorAll("#outputTypes .toggle-pill.active")).map(el => el.dataset.type)
    };

    BariqStore.set("bariq_ai_connected_prompt", data);

    const aiOutputs = {
      meta: document.getElementById("metaOutput")?.innerText || "",
      reel: document.getElementById("reelOutput")?.innerText || "",
      hooks: document.getElementById("hooksOutput")?.innerText || "",
      creatorBrief: document.getElementById("creatorBriefOutput")?.innerText || "",
      exportSummary: document.getElementById("campaignExportOutput")?.innerText || ""
    };

    BariqStore.set("bariq_ai_outputs", aiOutputs);
    return { data, aiOutputs };
  }

  function loadPromptToGeneratorPage() {
    const data = BariqStore.get("bariq_ai_connected_prompt", defaultGenerator);

    const city = document.getElementById("cityMarket");
    const product = document.getElementById("productService");
    const offer = document.getElementById("offerPrice");
    const audience = document.getElementById("targetAudience");
    const platform = document.getElementById("platformPriority");
    const promise = document.getElementById("businessPromise");
    const goal = document.getElementById("campaignGoal");

    if (city) city.value = data.city || defaultGenerator.city;
    if (product) product.value = data.product || defaultGenerator.product;
    if (offer) offer.value = data.offer || defaultGenerator.offer;
    if (audience) audience.value = data.audience || defaultGenerator.audience;
    if (platform) platform.value = data.platform || defaultGenerator.platform;
    if (promise) promise.value = data.promise || defaultGenerator.promise;
    if (goal) goal.value = data.goal || defaultGenerator.goal;

    const selectedCategory = document.getElementById("selectedCategory");
    const selectedPrompt = document.getElementById("selectedPrompt");

    if (selectedCategory) selectedCategory.textContent = data.currentCategory || defaultGenerator.currentCategory;
    if (selectedPrompt) selectedPrompt.textContent = data.currentPrompt || defaultGenerator.currentPrompt;

    document.querySelectorAll("#brandTone .toggle-pill").forEach(pill => {
      pill.classList.toggle("active", pill.dataset.tone === data.tone);
    });

    document.querySelectorAll("#outputTypes .toggle-pill").forEach(pill => {
      pill.classList.toggle("active", (data.outputs || []).includes(pill.dataset.type));
    });

    alert("Saved prompt loaded");
  }

  function loadGeneratorDataToCampaign() {
    const prompt = BariqStore.get("bariq_ai_connected_prompt", defaultGenerator);
    const outputs = BariqStore.get("bariq_ai_outputs", {});

    const mapping = {
      campaignName: `${prompt.product || "Campaign"} Launch`,
      businessCategory: prompt.currentCategory || defaultCampaign.businessCategory,
      campaignGoal: prompt.goal || defaultCampaign.campaignGoal,
      campaignCity: prompt.city || defaultCampaign.campaignCity,
      campaignOffer: prompt.offer || defaultCampaign.campaignOffer,
      campaignAudience: prompt.audience || defaultCampaign.campaignAudience,
      campaignMessage: outputs.meta || prompt.promise || defaultCampaign.campaignMessage
    };

    Object.entries(mapping).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = value;
    });

    const assetList = document.getElementById("assetList");
    if (assetList) {
      assetList.innerHTML = `
        <div class="asset-card">
          <strong>Meta Ad Copy</strong>
          <span>${outputs.meta || "No AI meta copy found yet."}</span>
          <div class="tags"><div class="tag">Imported</div><div class="tag">Lead Gen</div></div>
        </div>
        <div class="asset-card">
          <strong>Reel Script</strong>
          <span>${outputs.reel || "No AI reel script found yet."}</span>
          <div class="tags"><div class="tag">Imported</div><div class="tag">Video</div></div>
        </div>
        <div class="asset-card">
          <strong>Creator Brief</strong>
          <span>${outputs.creatorBrief || "No creator brief found yet."}</span>
          <div class="tags"><div class="tag">Imported</div><div class="tag">Brief</div></div>
        </div>
      `;
    }

    alert("AI data loaded into Campaign Studio");
  }

  function saveCampaignDraftFromPage() {
    const draft = {
      campaignName: document.getElementById("campaignName")?.value || defaultCampaign.campaignName,
      businessCategory: document.getElementById("businessCategory")?.value || defaultCampaign.businessCategory,
      campaignGoal: document.getElementById("campaignGoal")?.value || defaultCampaign.campaignGoal,
      campaignCity: document.getElementById("campaignCity")?.value || defaultCampaign.campaignCity,
      campaignBudget: document.getElementById("campaignBudget")?.value || defaultCampaign.campaignBudget,
      campaignTimeline: document.getElementById("campaignTimeline")?.value || defaultCampaign.campaignTimeline,
      campaignOffer: document.getElementById("campaignOffer")?.value || defaultCampaign.campaignOffer,
      collabType: document.getElementById("collabType")?.value || defaultCampaign.collabType,
      campaignAudience: document.getElementById("campaignAudience")?.value || defaultCampaign.campaignAudience,
      campaignMessage: document.getElementById("campaignMessage")?.value || defaultCampaign.campaignMessage,
      status: "Draft"
    };

    BariqStore.set("bariq_campaign_draft", draft);
    alert("Campaign draft saved");
    return draft;
  }

  function loadCampaignDraftToPage() {
    const draft = BariqStore.get("bariq_campaign_draft", defaultCampaign);
    Object.entries(draft).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.value = value;
    });
  }

  function exportCampaignToBusiness() {
    const draft = BariqStore.get("bariq_campaign_draft", defaultCampaign);
    BariqStore.set("bariq_latest_campaign", draft);
    alert("Campaign exported to Business Dashboard");
  }

  function launchCampaign() {
    const draft = BariqStore.get("bariq_campaign_draft", defaultCampaign);
    draft.status = "Live";
    BariqStore.set("bariq_latest_campaign", draft);
    BariqStore.set("bariq_campaign_draft", draft);
    alert("Campaign launched successfully");
  }

  function applyBusinessDashboardData() {
    const latest = BariqStore.get("bariq_latest_campaign");
    if (!latest) return;

    const box = document.getElementById("businessAiOutput");
    if (box) {
      box.textContent =
`Connected Output Ready

Campaign Name: ${latest.campaignName}
Category: ${latest.businessCategory}
Goal: ${latest.campaignGoal}
City: ${latest.campaignCity}
Budget: ₹${latest.campaignBudget}
Offer: ${latest.campaignOffer}

Audience:
${latest.campaignAudience}

Campaign Direction:
${latest.campaignMessage}`;
    }
  }

  window.BariqApp = {
    goTo,
    copyTextById,
    saveGeneratorDataFromPage,
    loadPromptToGeneratorPage,
    loadGeneratorDataToCampaign,
    saveCampaignDraftFromPage,
    loadCampaignDraftToPage,
    exportCampaignToBusiness,
    launchCampaign,
    applyBusinessDashboardData
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("campaignName")) {
      loadCampaignDraftToPage();
    }
    if (document.getElementById("businessAiOutput")) {
      applyBusinessDashboardData();
    }
  });
})();
