from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cars = [
    {
        "id": 1,
        "name": "Honda Civic",
        "type": "Sedan",
        "price": 5000
    },
    {
        "id": 2,
        "name": "Toyota Corolla",
        "type": "Sedan",
        "price": 4000
    },
    {
        "id": 3,
        "name": "Suzuki Alto",
        "type": "Hatchback",
        "price": 2500
    }
]


@app.route("/")
def home():
    return jsonify({
        "message": "DriveEase Car Rental API is running!"
    })


@app.route("/api/cars", methods=["GET"])
def get_cars():
    return jsonify(cars)


@app.route("/api/chat", methods=["POST"])
def chatbot():
    data = request.get_json(silent=True) or {}
    message = data.get("message", "").strip().lower()

    if not message:
        reply = "Please type a message."

    elif any(word in message for word in ["hello", "hi", "hey"]):
        reply = "Hello! Welcome to DriveEase Car Rental. How can I help you?"

    elif "civic" in message:
        reply = "Honda Civic is available at Rs. 5000 per day."

    elif "corolla" in message:
        reply = "Toyota Corolla is available at Rs. 4000 per day."

    elif "alto" in message:
        reply = "Suzuki Alto is available at Rs. 2500 per day."

    elif any(word in message for word in ["price", "rent", "cost"]):
        reply = (
            "Daily rental prices: Honda Civic Rs. 5000, "
            "Toyota Corolla Rs. 4000, Suzuki Alto Rs. 2500."
        )

    elif "booking" in message or "book" in message:
        reply = "You can book a car through our Booking page."

    elif "available" in message or "cars" in message:
        reply = (
            "We have Honda Civic, Toyota Corolla, and Suzuki Alto. "
            "Daily prices start from Rs. 2500."
        )

    elif "contact" in message or "phone" in message:
        reply = "Please visit the Contact page on our website."

    else:
        reply = (
            "I can help you with car prices, available cars, and bookings. "
            "What would you like to know?"
        )

    return jsonify({"reply": reply})
if __name__ == "__main__":
    app.run(debug=True, port=5000)