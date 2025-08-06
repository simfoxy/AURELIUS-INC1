// Minimal JS for sidebar menu (optional for expand/collapse)
document.querySelectorAll('.menu li').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.menu li').forEach(li => li.classList.remove('active'));
    item.classList.add('active');
  });
});

// Profile dropdown toggle
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

profileBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) {
    profileDropdown.classList.remove('active');
  }
});

function renderBalance() {
  let balance = parseFloat(localStorage.getItem('balance') || '20635944');
  // Format with commas
  function format(num) {
    return num.toLocaleString('en-US', {maximumFractionDigits: 0});
  }
  document.getElementById('mainBalance').textContent = format(balance);
  document.getElementById('mainBalanceSmall').textContent = format(balance);
}
renderBalance();
// Profile View functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const viewProfileBtn = document.querySelector('.profile-menu li:nth-child(1)');
  const profileView = document.getElementById('profileView');
  const closeProfile = document.getElementById('closeProfile');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  // Open profile view
  viewProfileBtn.addEventListener('click', function(e) {
    e.preventDefault();
    profileView.style.display = 'block';
    overlay.style.display = 'block';
    // Close dropdown if open
    document.getElementById('profileDropdown').style.display = 'none';
  });

  // Close profile view
  closeProfile.addEventListener('click', function() {
    profileView.style.display = 'none';
    overlay.style.display = 'none';
  });

  // Close when clicking overlay
  overlay.addEventListener('click', function() {
    profileView.style.display = 'none';
    overlay.style.display = 'none';
  });
});

// Set current date/time as last login
  function updateLastLogin() {
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    document.getElementById('lastLoginTime').textContent = now.toLocaleDateString('en-US', options);
    
    // Store in localStorage to remember between sessions
    localStorage.setItem('lastLogin', now.toString());
  }

  // Get IP address using a free API
  async function getUserIP() {
    try {
      // First try a reliable API
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error getting IP:", error);
      try {
        // Fallback API
        const fallback = await fetch('https://ipapi.co/json/');
        const data = await fallback.json();
        return data.ip;
      } catch (e) {
        console.error("Fallback IP API failed:", e);
        return "93.182.105.186"; // Default fallback
      }
    }
  }

  // Update IP display and flag
  async function updateIPDisplay() {
    const ipElement = document.getElementById('userIp');
    const ip = await getUserIP();
    ipElement.textContent = ip;
    
    // Get location info (country) for flag - this is approximate
    try {
      const response = await fetch(`https://ipapi.co/${ip}/country/`);
      const countryCode = await response.text();
      const flag = getFlagEmoji(countryCode);
      document.querySelector('.ip-address .flag').textContent = flag;
    } catch (e) {
      console.error("Couldn't get country:", e);
    }
  }

  // Helper function to convert country code to flag emoji
  function getFlagEmoji(countryCode) {
    if (!countryCode) return '🌐';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  // Call the functions when page loads
  document.addEventListener('DOMContentLoaded', function() {
    updateLastLogin();
    updateIPDisplay();
    
    // If you want to show the stored last login instead of current time:
    // const lastLogin = localStorage.getItem('lastLogin');
    // if (lastLogin) {
    //   document.getElementById('lastLoginTime').textContent = 
    //     new Date(lastLogin).toLocaleDateString('en-US', options);
    // } else {
    //   updateLastLogin();
    // }
  });

  // Account Summary functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const accountSummaryBtn = document.querySelector('.menu li:nth-child(3)'); // 3rd menu item
  const accountSummaryView = document.getElementById('accountSummaryView');
  const closeSummary = document.getElementById('closeSummary');
  const overlay = document.querySelector('.overlay');
  
  // Update summary time
  function updateSummaryTime() {
    const now = new Date();
    const options = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    document.getElementById('summaryUpdateTime').textContent = 
      now.toLocaleDateString('en-US', options);
  }
  
  // Open account summary
  accountSummaryBtn.addEventListener('click', function(e) {
    e.preventDefault();
    accountSummaryView.style.display = 'block';
    overlay.style.display = 'block';
    updateSummaryTime();
  });
  
  // Close account summary
  closeSummary.addEventListener('click', function() {
    accountSummaryView.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  // Print button functionality
  document.querySelector('.print-summary')?.addEventListener('click', function() {
    window.print();
  });
  
  // Download as PDF button functionality (mock)
  document.querySelector('.download-summary')?.addEventListener('click', function() {
    alert('PDF download would start here in a real application');
  });
});

// Virtual Cards functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const virtualCardsBtn = document.querySelector('.menu li:nth-child(8)'); // 8th menu item
  const virtualCardsView = document.getElementById('virtualCardsView');
  const closeCards = document.getElementById('closeCards');
  const overlay = document.querySelector('.overlay');
  const pinModal = document.getElementById('pinModal');
  const pinEntry = document.getElementById('pinEntry');
  const pinError = document.getElementById('pinError');
  const pinSubmit = document.getElementById('pinSubmit');
  const pinCancel = document.getElementById('pinCancel');
  const cardDetailsModal = document.getElementById('cardDetailsModal');
  const closeDetails = document.getElementById('closeDetails');
  const cardDetailsContent = document.getElementById('cardDetailsContent');
  
  let selectedCard = null;
  const CORRECT_PIN = "3090"; // Set your PIN here
  
  // Card details data
  const cardsData = {
    card1: {
      fullNumber: "4386 2947 7742 5921",
      cvv: "•••",
      expiry: "12/2028",
      cardHolder: "STEVE LANGEN",
      dailyLimit: "$25,000",
      status: "Active",
      issueDate: "03/15/2022"
    },
    card2: {
      fullNumber: "5921 8473 6294 4386",
      cvv: "•••",
      expiry: "09/2027",
      cardHolder: "STEVE LANGEN",
      dailyLimit: "$50,000",
      status: "Active",
      issueDate: "06/22/2023"
    }
  };
  
  // Open virtual cards view
  virtualCardsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    virtualCardsView.style.display = 'block';
    overlay.style.display = 'block';
  });
  
  // Close virtual cards view
  closeCards.addEventListener('click', function() {
    virtualCardsView.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  // Card click handler
  document.querySelectorAll('.virtual-card').forEach(card => {
    card.addEventListener('click', function() {
      selectedCard = this.id;
      pinModal.style.display = 'block';
      pinEntry.value = '';
      pinError.textContent = '';
    });
  });
  
  // PIN submission
  pinSubmit.addEventListener('click', function() {
    if (pinEntry.value === CORRECT_PIN) {
      pinModal.style.display = 'none';
      showCardDetails(selectedCard);
    } else {
      pinError.textContent = 'Incorrect PIN. Please try again.';
      pinEntry.value = '';
    }
  });
  
  // PIN cancel
  pinCancel.addEventListener('click', function() {
    pinModal.style.display = 'none';
    selectedCard = null;
  });
  
  // Close card details
  closeDetails.addEventListener('click', function() {
    cardDetailsModal.style.display = 'none';
  });
  
  // Show card details
  function showCardDetails(cardId) {
    const card = cardsData[cardId];
    let html = `
      <div class="card-details-row">
        <span class="card-details-label">Card Number:</span>
        <span class="card-details-value">${card.fullNumber}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">CVV:</span>
        <span class="card-details-value">${card.cvv}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">Expiry Date:</span>
        <span class="card-details-value">${card.expiry}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">Card Holder:</span>
        <span class="card-details-value">${card.cardHolder}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">Daily Limit:</span>
        <span class="card-details-value">${card.dailyLimit}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">Status:</span>
        <span class="card-details-value">${card.status}</span>
      </div>
      <div class="card-details-row">
        <span class="card-details-label">Issue Date:</span>
        <span class="card-details-value">${card.issueDate}</span>
      </div>
    `;
    
    cardDetailsContent.innerHTML = html;
    cardDetailsModal.style.display = 'block';
  }
  
  // Allow only numbers in PIN input
  pinEntry.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const depositBtn = document.querySelector('.btn.deposit');
  const depositModal = document.getElementById('depositModal');
  const closeDeposit = document.querySelector('.close-deposit');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const overlay = document.querySelector('.overlay');
  
  // Open deposit modal
  depositBtn.addEventListener('click', function() {
    depositModal.style.display = 'block';
    overlay.style.display = 'block';
  });
  
  // Close deposit modal
  closeDeposit.addEventListener('click', function() {
    depositModal.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and tabs
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding tab
      const tabId = this.getAttribute('data-tab') + '-tab';
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Close when clicking overlay
  overlay.addEventListener('click', function() {
    depositModal.style.display = 'none';
    this.style.display = 'none';
  });
});

// Handle sign out
document.getElementById('signOutBtn').addEventListener('click', function() {
  // Clear any session data if needed
  localStorage.removeItem('loggedIn');
  
  // Redirect to index.html
  window.location.href = 'index.html';
});

document.addEventListener('DOMContentLoaded', function() {
  // Get elements
  const depositBtn = document.querySelector('.btn.deposit');
  const depositModal = document.getElementById('depositModal');
  const closeDeposit = document.querySelector('.close-deposit');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const overlay = document.querySelector('.overlay');
  
  // Open deposit modal
  depositBtn.addEventListener('click', function() {
    depositModal.style.display = 'block';
    overlay.style.display = 'block';
  });
  
  // Close deposit modal
  closeDeposit.addEventListener('click', function() {
    depositModal.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons and tabs
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding tab
      const tabId = this.getAttribute('data-tab') + '-tab';
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // Close when clicking overlay
  overlay.addEventListener('click', function() {
    depositModal.style.display = 'none';
    this.style.display = 'none';
  });
});
document.getElementById('signOutBtn').addEventListener('click', function() {
    // Clear any session data if needed
    localStorage.removeItem('loggedIn');
    
    // Redirect to index.html
    window.location.href = 'index.html';
  });

  // Add this near your other JavaScript functions
function showTransactionDetails(transaction) {
  const modal = document.getElementById('transactionDetailsModal');
  const content = document.getElementById('transactionDetailsContent');
  
  // Customize this based on your transaction data
  let detailsHTML = `
    <div class="detail-row">
      <div class="detail-label">Recipient name:</div>
      <div class="detail-value">Zakat, Tax and Customs Authority</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Recipient address:</div>
      <div class="detail-value">Riyadh</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Recipient phone:</div>
      <div class="detail-value">+966112048598</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Bank Name:</div>
      <div class="detail-value">Saudi National Bank</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Account Number:</div>
      <div class="detail-value">53383308915</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Routing number:</div>
      <div class="detail-value">103103435</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Transfer Amount:</div>
      <div class="detail-value">$50,000 USD</div>
    </div>
  `;
  
  content.innerHTML = detailsHTML;
  modal.style.display = 'flex';
}

// Add event listeners for transaction details
document.addEventListener('DOMContentLoaded', function() {
  // Close modal when clicking X
  document.getElementById('closeTransactionDetails').addEventListener('click', function() {
    document.getElementById('transactionDetailsModal').style.display = 'none';
  });
  
  // Close modal when clicking outside
  document.getElementById('transactionDetailsModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
  
  // Handle click on view details buttons (delegated event)
  document.getElementById('transactionList').addEventListener('click', function(e) {
    if (e.target.classList.contains('view-details')) {
      e.preventDefault();
      const transactionElement = e.target.closest('.transaction');
      const transaction = {
        code: transactionElement.querySelector('.code').textContent,
        date: transactionElement.querySelector('.date').textContent,
        desc: transactionElement.querySelector('.desc').textContent,
        amount: transactionElement.querySelector('.amount').textContent
      };
      showTransactionDetails(transaction);
    }
  });
});