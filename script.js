
const cars = [
    {
        id: 1,
        name: "Honda Civic",
        type: "Sedan",
        price: 5000,
        image: "images/Honda Civic.png"
    },
    {
        id: 2,
        name: "Toyota Corolla",
        type: "Sedan",
        price: 4000,
        image: "images/Toyota Corolla.png"
    },
    {
        id: 3,
        name: "Suzuki Alto",
        type: "Hatchback",
        price: 2500,
        image: "images/Suzuki Alto.png"
    }
];

const container = document.getElementById("home-cars");

if (container) {
    container.innerHTML = cars.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Type: ${car.type}</p>
            <p class="price">
                Rs. ${car.price.toLocaleString()} / day
            </p>
            <a href="cars.html" class="btn">View Details</a>
        </div>
    `).join("");
}


const searchInput = document.getElementById("car-search");
const typeFilter = document.getElementById("type-filter");

function filterCars() {
    const keyword = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;

    const filteredCars = cars.filter(car => {
        const nameMatches = car.name.toLowerCase().includes(keyword);

        const typeMatches =
            selectedType === "All" || car.type === selectedType;

        return nameMatches && typeMatches;
    });

    containerForCars.innerHTML = "";
}

const containerForCars = document.getElementById("cars-list");

function showAvailableCars(list) {
    if (!containerForCars) return;

    if (list.length === 0) {
        containerForCars.innerHTML = "<p>No cars found.</p>";
        return;
    }

    containerForCars.innerHTML = list.map(car => `
        <div class="car-card">
            <img src="${car.image}" alt="${car.name}">
            <h3>${car.name}</h3>
            <p>Type: ${car.type}</p>
            <p class="price">Rs. ${car.price.toLocaleString()} / day</p>
            <a href="car-details.html?id=${car.id}" class="btn">View Details</a>
        </div>
    `).join("");
}

function updateAvailableCars() {
    if (!searchInput || !typeFilter) return;

    const keyword = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value;

    const filteredCars = cars.filter(car => {
        return car.name.toLowerCase().includes(keyword) &&
            (selectedType === "All" || car.type === selectedType);
    });

    showAvailableCars(filteredCars);
}

if (searchInput && typeFilter) {
    searchInput.addEventListener("input", updateAvailableCars);
    typeFilter.addEventListener("change", updateAvailableCars);
    updateAvailableCars();
}


const detailsContainer = document.getElementById("car-details");

if (detailsContainer) {
    const params = new URLSearchParams(window.location.search);
    const selectedId = Number(params.get("id"));

    const selectedCar = cars.find(car => car.id === selectedId);

    if (selectedCar) {
        detailsContainer.innerHTML = `
            <div class="car-card">
                <img src="${selectedCar.image}" alt="${selectedCar.name}">

                <h2>${selectedCar.name}</h2>

                <p>Car Type: ${selectedCar.type}</p>

                <p>Seats: ${selectedCar.type === "Hatchback" ? 4 : 5}</p>

                <p class="price">
                    Rs. ${selectedCar.price.toLocaleString()} / day
                </p>

                <a href="booking.html?car=${selectedCar.id}" class="btn">
                    Book This Car
                </a>
            </div>
        `;
    } else {
        detailsContainer.textContent = "Car not found. Please select a car.";
    }
}


const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
    const bookingParams = new URLSearchParams(window.location.search);
    const bookingCarId = Number(bookingParams.get("car"));

    const bookingCar = cars.find(car => car.id === bookingCarId);

    const bookingCarContainer = document.getElementById("booking-car");
    const pickupInput = document.getElementById("pickup-date");
    const returnInput = document.getElementById("return-date");
    const daysOutput = document.getElementById("rental-days");
    const rentOutput = document.getElementById("total-rent");
    const messageOutput = document.getElementById("booking-message");

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    pickupInput.min = todayString;
    returnInput.min = todayString;

    if (bookingCar) {
        bookingCarContainer.innerHTML = `
            <div class="car-card">
                <img src="${bookingCar.image}" alt="${bookingCar.name}">
                <h2>${bookingCar.name}</h2>
                <p>Type: ${bookingCar.type}</p>
                <p class="price">
                    Rs. ${bookingCar.price.toLocaleString()} / day
                </p>
            </div>
        `;
    } else {
        bookingCarContainer.innerHTML =
            "<p>Please select a car from the Available Cars page first.</p>";

        bookingForm.hidden = true;
    }

    function calculateRent() {
        const pickup = pickupInput.value;
        const returnDate = returnInput.value;

        returnInput.min = pickup || todayString;

        if (!bookingCar || !pickup || !returnDate || returnDate <= pickup) {
            daysOutput.textContent = "0";
            rentOutput.textContent = "0";
            return;
        }

        const start = new Date(pickup + "T00:00:00");
        const end = new Date(returnDate + "T00:00:00");

        const days = Math.round((end - start) / 86400000);

        daysOutput.textContent = days;
        rentOutput.textContent =
            (days * bookingCar.price).toLocaleString();
    }

    pickupInput.addEventListener("change", calculateRent);
    returnInput.addEventListener("change", calculateRent);

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        if (!bookingCar) return;

        if (!pickupInput.value || !returnInput.value ||
            returnInput.value <= pickupInput.value) {
            messageOutput.textContent =
                "Please select a valid return date after the pickup date.";
            messageOutput.style.color = "red";
            return;
        }

        calculateRent();

        messageOutput.textContent =
            "Booking request submitted successfully! This is a demo; the booking has not been saved to a database.";
        messageOutput.style.color = "green";
    });
}


const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const response = document.getElementById("contact-response");

        response.textContent =
            "Thank you! Your message has been received in this demo.";

        response.style.color = "green";

        contactForm.reset();
    });
}

// DriveEase Chatbot
// Open and close chatbot
function toggleChat() {
    const chatbot = document.getElementById("chatbot");
    chatbot.classList.toggle("chatbot-hidden");
}

// Send message to Flask chatbot
async function sendMessage() {
    const input = document.getElementById("chat-input");
    const messages = document.getElementById("chat-messages");

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    // Show user's message
    const userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    messages.appendChild(userMessage);

    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch("http://127.0.0.1:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error("Server response error");
        }

        const data = await response.json();

        // Show assistant's reply
        const botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = data.reply;
        messages.appendChild(botMessage);

    } catch (error) {
        const errorMessage = document.createElement("p");
        errorMessage.className = "bot-message";
        errorMessage.textContent =
            "Sorry, chatbot is not connected. Please try again.";
        messages.appendChild(errorMessage);
    }

    messages.scrollTop = messages.scrollHeight;
}

// Send message by pressing Enter
document.getElementById("chat-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});