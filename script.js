// Znajdź elementy zdjęć i ustaw indeks początkowy
let currentIndex = 0;
const swipeImages = document.querySelectorAll('.swipe-img');

// Funkcja do wyświetlania obrazka na podstawie indeksu
function showImage(index) {
    swipeImages.forEach((img, idx) => {
        img.style.display = idx === index ? 'block' : 'none';
    });
}

// Inicjalnie pokaż pierwszy obraz
showImage(currentIndex);

// Inicjalizuj Hammer.js dla elementu, który zawiera zdjęcia
const swipeArea = document.querySelector('.swiper-container');
const hammer = new Hammer(swipeArea);

// Obsługa przeciągania (pan)
hammer.on('pan', function(event) {
    const image = swipeImages[currentIndex];

    // Zmiana pozycji obrazka w trakcie przeciągania
    image.style.transform = `translateX(${event.deltaX}px)`;

    // Podświetlanie na zielono (prawo - like) lub czerwono (lewo - dislike)
    if (event.deltaX > 0) {
        image.style.backgroundColor = `rgba(144, 238, 144, ${Math.min(event.deltaX / 100, 1)})`; // Zielony dla like
    } else {
        image.style.backgroundColor = `rgba(255, 99, 71, ${Math.min(Math.abs(event.deltaX) / 100, 1)})`; // Czerwony dla dislike
    }
});

// Obsługa zakończenia przeciągania (panend)
hammer.on('panend', function(event) {
    const image = swipeImages[currentIndex];

    // Sprawdź, czy przeciągnięcie przekroczyło próg (np. 100px)
    if (event.deltaX > 100) {
        // Akceptacja (przeciągnięcie w prawo - like)
        currentIndex = (currentIndex + 1) % swipeImages.length;
    } else if (event.deltaX < -100) {
        // Odrzucenie (przeciągnięcie w lewo - dislike)
        currentIndex = (currentIndex + 1) % swipeImages.length;
    }

    // Resetuj pozycję i kolor po zakończeniu gestu
    image.style.transform = 'translateX(0)';
    image.style.backgroundColor = '';

    // Pokaż kolejny obrazek
    showImage(currentIndex);
});
