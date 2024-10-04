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

// Trenerzy - tabela z rekomendacjami i filtrowaniem
const trainers = [
    { name: 'Anna Nowak', sport: 'Pilates', gender: 'female', experience: 8, recommended: true },
    { name: 'Jan Kowalski', sport: 'Siłownia', gender: 'male', experience: 7, recommended: true },
    { name: 'Ewa Kwiatkowska', sport: 'Joga', gender: 'female', experience: 5, recommended: false },
    { name: 'Adam Wiśniewski', sport: 'Boks', gender: 'male', experience: 6, recommended: false },
    { name: 'Karolina Lewandowska', sport: 'Cardio', gender: 'female', experience: 4, recommended: false },
    { name: 'Paweł Zieliński', sport: 'Bieganie', gender: 'male', experience: 9, recommended: false },
    { name: 'Olga Malinowska', sport: 'CrossFit', gender: 'female', experience: 7, recommended: false },
    { name: 'Michał Stasiak', sport: 'Kulturystyka', gender: 'male', experience: 10, recommended: false }
];

// Funkcja wyświetlająca trenerów
function displayTrainers(filteredTrainers) {
    const tableBody = document.querySelector('#trainer-table tbody');
    tableBody.innerHTML = ''; // Wyczyść tabelę

    filteredTrainers.forEach(trainer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trainer.name}</td>
            <td>${trainer.sport}</td>
            <td>${trainer.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td>
            <td>${trainer.experience}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Filtruj trenerów według wybranych kryteriów
function filterTrainers() {
    const sport = document.getElementById('sport').value;
    const gender = document.getElementById('gender').value;
    const experience = document.getElementById('experience').value;

    let filteredTrainers = trainers.filter(trainer => {
        return (sport === 'all' || trainer.sport.toLowerCase() === sport.toLowerCase()) &&
               (gender === 'all' || trainer.gender === gender) &&
               trainer.experience >= experience;
    });

    // Rekomendowani trenerzy zawsze na górze
    filteredTrainers = filteredTrainers.sort((a, b) => b.recommended - a.recommended);

    displayTrainers(filteredTrainers);
}

// Nasłuchiwanie zmian w formularzu filtrów
document.getElementById('filter-form').addEventListener('input', filterTrainers);

// Początkowe wyświetlenie trenerów
filterTrainers();
