# DriveEase – Car Rental Website

## Project Overview
DriveEase is a modern and responsive car rental website developed as part of the CODRAX Internship Task. It allows users to explore cars, view rental prices, check car details, and submit booking requests. The website also includes a chatbot connected to a Python Flask backend.

## Features
- Home page
- Available Cars page
- Car Details page
- Booking page
- About Us page
- Contact Us page
- FAQs page
- Car images and rental prices
- Car search and filtering
- Booking form validation
- Rental cost calculation
- Responsive website design
- Interactive chatbot
- Flask API integration

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Python
- Flask
- Flask-CORS

## Project Structure

```text
car_rental_website/
├── backend/
│   ├── app.py
│   └── requirements.txt
├── images/
│   ├── Honda Civic.png
│   ├── Suzuki Alto.png
│   └── Toyota Corolla.png
├── Screenshots/
├── index.html
├── cars.html
├── car-details.html
├── cars.html
├── booking.html
├── about.html
├── contact.html
├── faqs.html
├── style.css
├── script.js
└── README.md
```

## Installation and Setup

### 1. Install Python
Make sure Python is installed on your computer.

### 2. Install Dependencies
Open the terminal in the main project folder and run:

```bash
pip install -r backend/requirements.txt
```

### 3. Start the Flask Backend
Run this command from the main project folder:

```bash
python backend/app.py
```

The backend will run at:

`http://127.0.0.1:5000`

Keep the backend terminal running while testing the chatbot.

### 4. Open the Website
Open `index.html` in your browser using the VS Code Live Server extension.

## Chatbot
The chatbot communicates with the Flask backend through the JavaScript Fetch API.

**API Endpoint:** `/api/chat`  
**Method:** POST  
**Data Format:** JSON

Example message:

```json
{
  "message": "Honda Civic price"
}
```

Example response:

```json
{
  "reply": "Honda Civic is available at Rs. 5000 per day."
}
```

## Sample Car Rental Prices
- Honda Civic: Rs. 5000 per day
- Toyota Corolla: Rs. 4000 per day
- Suzuki Alto: Rs. 2500 per day

## Testing
The following features should be tested:
- Navigation between pages
- Car search and filtering
- Booking form validation
- Rental cost calculation
- Responsive layout
- Chatbot messages and responses
- Flask backend connectivity

## Screenshots
The `Screenshots` folder contains screenshots of the website pages and working chatbot.

Recommended screenshot names:
- `01-home.png`
- `02-cars.png`
- `03-car-details.png`
- `04-booking.png`
- `05-about.png`
- `06-contact.png`
- `07-faqs.png`
- `08-chatbot.png`

## Optional Future Enhancements
Payment gateway integration, user authentication, and an admin dashboard can be added in the future. These features are optional for the current task.

## Internship Information
**Organization:** CODRAX (SMC-Private Limited)  
**Project Name:** DriveEase – Car Rental Website  
**Task:** Internship Task Assignment
