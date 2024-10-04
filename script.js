// Algorytm swajpowania - kolejno wyświetlane obrazy
let currentImageIndex = 0;
const swipeImages = document.querySelectorAll('.swipe-img');

// Funkcja do wyświetlania obrazka na podstawie indeksu
function showImage(index) {
    swipeImages.forEach((img, idx) => {
        img.classList.toggle('active', idx === index);
        img.style.transform = 'translateX(0)';
        img.style.backgroundColor = '';
    });
}

// Inicjalnie pokaż pierwszy obraz
showImage(currentImageIndex);

// Inicjalizuj Hammer.js dla elementu, który zawiera zdjęcia
const swipeArea = document.querySelector('.swiper-container');
const hammer = new Hammer(swipeArea);

// Obsługa przeciągania (pan)
hammer.on('pan', function(event) {
    const image = swipeImages[currentImageIndex];

    // Zmiana pozycji obrazka w trakcie przeciągania
    image.style.transform = `translateX(${event.deltaX}px)`;

    // Podświetlanie na zielono lub czerwono w zależności od kierunku
    if (event.deltaX > 0) {
        // Przeciąganie w prawo (lajk)
        image.style.backgroundColor = `rgba(144, 238, 144, ${Math.min(event.deltaX / 100, 1)})`; // Zielony
    } else {
        // Przeciąganie w lewo (dislike)
        image.style.backgroundColor = `rgba(255, 99, 71, ${Math.min(Math.abs(event.deltaX) / 100, 1)})`; // Czerwony
    }
});

// Obsługa zakończenia przeciągania
hammer.on('panend', function(event) {
    const image = swipeImages[currentImageIndex];

    if (event.deltaX > 100) {
        // Akceptacja - przeciągnięcie w prawo (lajk)
        currentImageIndex = (currentIndex + 1) % swipeImages.length;
    } else if (event.deltaX < -100) {
        // Odrzucenie - przeciągnięcie w lewo (dislike)
        currentImageIndex = (currentIndex + 1) % swipeImages.length;
    }

    // Resetuj pozycję i kolor po zakończeniu gestu
    image.style.transform = 'translateX(0)';
    image.style.backgroundColor = '';

    // Pokaż kolejny obrazek
    showImage(currentImageIndex);
});

// Trenerzy - tabela z rekomendacjami i filtrowaniem
const trainers = [
    { name: 'Anna Nowak', sport: 'pilates', gender: 'female', experience: 8, recommended: true },
    { name: 'Jan Kowalski', sport: 'siłownia', gender: 'male', experience: 7, recommended: true },
    { name: 'Ewa Kwiatkowska', sport: 'joga', gender: 'female', experience: 5, recommended: false },
    { name: 'Adam Wiśniewski', sport: 'boks', gender: 'male', experience: 6, recommended: false },
    { name: 'Karolina Lewandowska', sport: 'cardio', gender: 'female', experience: 4, recommended: false },
    { name: 'Paweł Zieliński', sport: 'bieganie', gender: 'male', experience: 9, recommended: false },
    { name: 'Olga Malinowska', sport: 'crossfit', gender: 'female', experience: 7, recommended: false },
    { name: 'Michał Stasiak', sport: 'kulturystyka', gender: 'male', experience: 10, recommended: false }
];

// Funkcja wyświetlająca trenerów
function displayTrainers(filteredTrainers) {
    const tableBody = document.querySelector('#trainer-table tbody');
    tableBody.innerHTML = ''; // Wyczyść tabelę

    filteredTrainers.forEach(trainer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trainer.name}</td>
            <td>${capitalize(trainer.sport)}</td>
            <td>${trainer.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</td>
            <td>${trainer.experience}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Funkcja do filtrowania trenerów
function filterTrainers() {
    const sport = document.getElementById('sport').value;
    const gender = document.getElementById('gender').value;
    const experience = parseInt(document.getElementById('experience').value, 10);
    const goals = document.getElementById('goals').value.toLowerCase();

    let filteredTrainers = trainers.filter(trainer => {
        const sportMatch = sport === 'all' || trainer.sport === sport;
        const genderMatch = gender === 'all' || trainer.gender === gender;
        const experienceMatch = trainer.experience >= experience;
        const goalsMatch = goals === '' || trainer.goals?.toLowerCase().includes(goals); // Jeśli dodamy cele

        return sportMatch && genderMatch && experienceMatch && goalsMatch;
    });

    // Rekomendowani trenerzy zawsze na górze
    filteredTrainers = filteredTrainers.sort((a, b) => b.recommended - a.recommended);

    displayTrainers(filteredTrainers);
}

// Funkcja pomocnicza do kapitalizacji pierwszej litery
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Nasłuchiwanie zmian w formularzu filtrów
document.getElementById('filter-form').addEventListener('input', filterTrainers);

// Początkowe wyświetlenie trenerów
filterTrainers();
