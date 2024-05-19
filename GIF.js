const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* Add a random GIF from the AJAX result to the page */
function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newCol.append($newGif);
    $gifArea.append($newCol);
  }
}

/* Handle form submission: clear search box & make AJAX call */
$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  // Make an AJAX call to the GIPHY API
  try {
    const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
      params: {
        q: searchTerm,
        api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
      }
    });
    addGif(response.data); // Add a GIF from the response to the page
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
});

/* Remove all GIFs from the page */
$("#remove").on("click", function() {
  $gifArea.empty();
});
