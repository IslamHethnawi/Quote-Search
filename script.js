const apiURL = "https://dummyjson.com/quotes";
const searchInput = document.getElementById("searchInput");
const quotesContainer = document.getElementById("quotesContainer");
const errorElement = document.getElementById("error");

let allQuotes = []; // Store quotes after fetching

// Fetch data from API once
async function fetchQuotes() {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error("Failed to fetch quotes");
    const data = await response.json();
    allQuotes = data.quotes;
    displayQuotes(allQuotes);
  } catch (err) {
    errorElement.textContent = "Error fetching quotes. Please try again later.";
  }
}

// Display quotes
function displayQuotes(quotes) {
    quotesContainer.innerHTML = "";
  
    if (quotes.length === 0) {
      quotesContainer.innerHTML = "<p>لا توجد اقتباسات مطابقة لبحثك 😕</p>";
      return;
    }
  
    quotes.forEach(quote => {
      const div = document.createElement("div");
      div.className = "quote";
      div.textContent = quote.quote;
      quotesContainer.appendChild(div);
    });
  }
  

// Filter logic
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredQuotes = allQuotes.filter(q =>
    q.quote.toLowerCase().includes(searchTerm)
  );
  displayQuotes(filteredQuotes);
});




// Initial call
fetchQuotes();
