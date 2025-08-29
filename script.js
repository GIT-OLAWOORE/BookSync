document.title = "BookSync || Everbest";

function getSearch() {
  const query = document.getElementById("inputField");
  query.addEventListener("keyup", (event) => {
    if (event.key === `Enter`) {
      const queryValue = query.value.toLowerCase().trim();
      console.log(queryValue);
      query.value = "";
      const bookDiv = document.getElementById("bookList");
      bookDiv.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-10">
          <span class="text-gray-400 text-lg font-card">Processing your result...</span>
        </div>
      `;

      //   userinput as apirequest
      const request = queryValue;
      const apiKey = "AIzaSyAj4CL_VJkXO6lwLwfXTzuDqXr_Hxe-sJM";
      fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${request}&maxResults=40&key=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const all = data.items;
          bookDiv.innerHTML = "";
          all.forEach((book, index) => {
            console.log(book);
            const card = document.createElement("div");
            card.setAttribute("data-aos", "zoom-in-down");
            card.className =
              "relative max-w-xs bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 hover:shadow-lg transition h-max  md:h-auto";
            card.innerHTML = `
                    <div class="bg-red-900/80 backdrop-blur rounded-sm text-gray-100 text-sm font-card py-1 px-2 absolute top-5 right-5 shadow-sm">
      #${index + 1}
    </div>
            ${
              book.volumeInfo.imageLinks
                ? `<img src="${book.volumeInfo.imageLinks.thumbnail}" alt="Book cover" class="rounded-lg mb-3 w-full object-cover" />`
                : `
            <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <span class="text-gray-500 dark:text-gray-400">No Image</span>
            </div>
            `
            }
            <h2
              class="font-serif text-lg font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-300 pb-2 mb-2 shadow-sm"
            >
              ${book.volumeInfo.title}
              ${
                book.volumeInfo.subtitle
                  ? `:<span class="italic text-sm text-gray-500 dark:text-gray-400 font-card"> ${book.volumeInfo.subtitle}</span>`
                  : ""
              }
            </h2>
            <p class="font-card text-sm text-gray-600 dark:text-gray-300">
             Author(s): ${
               book.volumeInfo.authors
                 ? book.volumeInfo.authors.join(", ")
                 : "Unknown Author"
             }
            </p>
            <p class="font-card text-sm text-gray-600 dark:text-gray-300">  
              Pages: ${book.volumeInfo.pageCount} | 
            Published: ${
              book.volumeInfo.publishedDate
                ? book.volumeInfo.publishedDate
                : "N/A"
            }
            </p>
            ${
              book.volumeInfo.previewLink
                ? `<p class="font-card text-sm text-gray-600 dark:text-gray-500 break-words w-full font-card italic">Read here: <a href="${book.volumeInfo.previewLink}">${book.volumeInfo.previewLink}</a></p>`
                : ""
            }
      `;
            bookDiv.appendChild(card);
          });
          AOS.refresh();
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          bookDiv.innerHTML = `
          <div class="col-span-full flex justify-center items-center py-10">
            <span class="text-red-500 text-lg font-card">An error occurred while fetching data. Please try again later.</span>
          </div>
        `;
        });
    }
  });
}

// function calls
getSearch();
