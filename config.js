// Every business detail of the site lives here. Change a value, save, push: nothing else to edit.
window.MONOLITH = {
  // Whop plan ids (Whop dashboard -> your product -> Pricing -> each plan -> "plan_..." id).
  // A plan left empty shows "Available soon" instead of a buy button.
  plans: {
    monthly: { id: "", price: "$50", per: "per month", note: "Cancel any time." },
    yearly: { id: "", price: "$500", per: "per year", note: "$100 less than twelve monthly payments." },
    lifetime: { id: "", price: "$1,200", per: "once", note: "Your key never expires. All future updates." },
  },
  highlight: "yearly", // which plan card is outlined as best value
  checkoutBase: "https://whop.com/checkout/", // + plan id

  // The one download. The file name never changes between versions.
  downloadUrl: "https://github.com/gaged881-design/monolith-releases/releases/latest/download/MONOLITH-Toolbox-Setup.exe",
  toolboxVersion: "0.1.0",
  toolboxSha256: "003a92dccb527fea1253cabcc5b514741b0739475bbcb5503fba2b7dcd361940",

  supportEmail: "", // shown on the site when filled in
  supportNote: "Message us from the MONOLITH page on Whop.", // shown when there is no email
  refundPolicy: "", // plain sentence; the row is hidden while this is empty
  manageUrl: "https://whop.com/", // where subscribers manage or cancel their plan
  codeSigned: false, // false shows the Windows SmartScreen note on the download section
};
