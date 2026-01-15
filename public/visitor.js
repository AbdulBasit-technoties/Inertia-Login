// Retrieve visited pages from local storage or initialize empty array
let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];

// Function to save visited pages to local storage
const saveVisitedPages = () => localStorage.setItem('visitedPages', JSON.stringify(visitedPages));

// Function to fetch visitor information
const saveVisitorInfo = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip } = await response.json();
    const ipInfoResponse = await fetch(`https://ipinfo.io/${ip}/json`);
    const details = await ipInfoResponse.json();
    
    // Extract necessary details
    const { country } = details;
    const browser = navigator.userAgent;
    const device = navigator.platform;
    const baseUrl = new URL(window.location.href).origin;
    const visitDateTime = new Date().toLocaleString(); // Get current date and time
    
    // Construct current page object
    const currentPage = { title: document.title, date: visitDateTime };
    
    // Check for duplicate entry
    const isPageVisited = visitedPages.some(page => page.title === currentPage.title && page.date === currentPage.date);
    
    // If page is not visited, add it to the list and save
    if (!isPageVisited) {
      visitedPages.push(currentPage);
      saveVisitedPages();
    }
    
    // Construct data object
    const data = { ...details, browser, device, page: visitedPages, site: baseUrl, visitDateTime };
    return data;
  } catch (error) {
    console.error(error);
    
    // Handle error by logging and constructing data object
    const browser = navigator.userAgent;
    const device = navigator.platform;
    const baseUrl = new URL(window.location.href).origin;
    const visitDateTime = Date.now(); // Get current date and time
    const currentPage = { title: document.title, date: visitDateTime }; // Include title and date
    
    // Check for duplicate entry
    const isPageVisited = visitedPages.some(page => page.title === currentPage.title && page.date === currentPage.date);
    
    // If page is not visited, add it to the list and save
    if (!isPageVisited) {
      visitedPages.push(currentPage);
      saveVisitedPages();
    }
    
    // Construct data object indicating API failure
    const data = { api: "failed", browser, device, page: visitedPages, site: baseUrl, visitDateTime };
    return data;
  }
};

// Function to update visitor information
const updateVisitorInfo = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const { ip } = await response.json();
    const visitDateTime = Date.now(); // Get current date and time
    const currentPage = { title: document.title, date: visitDateTime }; // Include title and date
    
    // Check for duplicate entry
    const isPageVisited = visitedPages.some(page => page.title === currentPage.title && page.date === currentPage.date);
    if (!isPageVisited) {
      visitedPages.push(currentPage);
      saveVisitedPages();
    }
    
    // Construct data object
    const data = { page: visitedPages, ip, visitDateTime };
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Function to check if visitor has returned
const isReturningVisitor = () => localStorage.getItem("visited") === "true";

// Function to set visitor as visited
const setVisitedLocalStorage = () => localStorage.setItem("visited", "true");

// Main logic to determine whether to save or update visitor info
if (isReturningVisitor()) {
  // Update visitor info for returning visitors
  updateVisitorInfo().then(data => 
    console.log(data)
  ).catch(error => console.error(error));
} else {
  // Save visitor info for new visitors
  setVisitedLocalStorage();
  saveVisitorInfo().then(data => 
    
    console.log(data)
  ).catch(error => console.error(error));
}
