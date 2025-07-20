# Stock Market Data API

## Overview
This project is a stock market data API built using Node.js and Express. It fetches real-time stock data, including Nifty and Sensex indices, company stock prices, and chart data using the Yahoo Finance API. The API also includes user authentication features such as signup, signin, and signout.

## Features
- **User Authentication**: Signup, Signin, and Signout functionalities using JWT authentication.
- **Stock Market Data**: Fetches real-time stock data including Nifty, Sensex, and company stock prices.
- **Chart Data**: Retrieves stock market charts for given symbols and time intervals.
- **Secure API**: Uses environment variables to store sensitive API keys and database credentials.
- **Error Handling**: Includes comprehensive error handling for API responses.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcrypt for password hashing
- **API Integration**: Yahoo Finance API (via RapidAPI)
- **Environment Management**: dotenv for managing API keys and database credentials

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or later)
- MongoDB
- npm (Node Package Manager)

### Steps to Install
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/stock-api.git
   cd stock-api
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   DB_URL=mongodb+srv://your-db-username:your-db-password@your-cluster.mongodb.net/stockdatabase?retryWrites=true&w=majority
   SECRET=your_jwt_secret
   RAPIDAPI_KEY=your_rapidapi_key
   ```

4. **Run the server**
   ```sh
   npm start
   ```

## API Endpoints
### Authentication
| Method | Endpoint  | Description |
|--------|----------|-------------|
| POST | `/signup` | Registers a new user |
| POST | `/signin` | Logs in a user and returns a JWT token |
| GET  | `/signout` | Logs out the user |

### Stock Data
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/niftysensex` | Fetches Nifty and Sensex stock data |
| GET | `/companiesData` | Retrieves stock data for specific companies |
| GET | `/chartData` | Fetches stock market chart data |

## Folder Structure
```
├── controllers      # Business logic and API handling
│   ├── auth.js     # Authentication controllers
│   ├── fetchCharts.js   # Fetch stock chart data
│   ├── niftySensexController.js  # Fetch Nifty & Sensex data
│   ├── companiesData.js   # Fetch stock data of companies
│
├── models          # Mongoose schemas
│   ├── user.js     # User schema and model
│
├── routes          # API route handlers
│   ├── auth.js     # Authentication routes
│   ├── stock.js    # Stock market-related routes
│
├── .env            # Environment variables (excluded from Git)
├── index.js        # Main server file
├── package.json    # Project metadata and dependencies
```

🔐 Security Considerations
Environment Variables: Store API keys and credentials securely in a .env file.

JWT Authentication: Uses JSON Web Tokens to manage and secure user sessions.

Robust Error Handling: Prevents server crashes through structured error management.

🚀 Future Enhancements
User-specific stock watchlists.

Real-time stock updates via WebSockets.

Enhanced caching for high-frequency API requests.

🤝 Contributing
We welcome contributions!
To get started:

Fork the repository.

Create a feature branch: git checkout -b feature/your-feature-name

Commit and push your changes. Submit a pull request.


4. Push to your branch and submit a pull request.

## License
This project is licensed under the MIT License.

