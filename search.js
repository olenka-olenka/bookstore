document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search-form");
    const searchResults = document.getElementById("search-results");

    searchForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Зупиняємо стандартну поведінку форми
        const searchInput = document.getElementById("search-input").value;
        searchBooks(searchInput, searchResults);
    });
});

function searchBooks(query, container) {
    // Отримуємо всі книги на сторінці з класом .book
    const books = Array.from(document.querySelectorAll(".book"));

    // Відфільтровуємо книги за назвою, що містить пошуковий запит
    const filteredBooks = books.filter(book => {
        const title = book.querySelector("h3").textContent.toLowerCase();
        return title.includes(query.toLowerCase());
    });

    // Очищаємо контейнер перед відображенням нових результатів
    container.innerHTML = "";

    // Відображаємо результати пошуку
    if (filteredBooks.length > 0) {
        filteredBooks.forEach(book => {
            container.appendChild(book.cloneNode(true)); // Додаємо клоновані елементи книг до контейнера
        });
    } else {
        container.textContent = "Нічого не знайдено";
    }
}







