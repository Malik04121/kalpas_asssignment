
# Bookkeeping Service API

This project is a bookkeeping service API that manages Books, Users, and Libraries. The API allows users to register, log in, and perform CRUD operations on Books and Libraries. Users can also borrow and return books.

## Features

- **Books**: Manage books including adding, updating, retrieving, and deleting books.
- **Users**: Register and authenticate users. Users can be either Authors or Borrowers.
- **Libraries**: Manage libraries including adding, updating, retrieving, and deleting libraries.
- **Borrowing**: Borrow and return books.
- **Multilingual Support**: Error and success messages are provided in English and Hindi.
- **Authentication**: JWT-based authentication for secure access to API endpoints.
- **Firebase Integration**: Book cover images are stored in Firebase Storage.

## API Endpoints

### Users

- **Register a New User**: `POST /api/users/register`
- **Login**: `POST /api/users/login`

### Books

- **Get All Books**: `GET /api/books`
- **Get Book by ID**: `GET /api/books/:id`
- **Create a New Book**: `POST /api/books`
- **Update a Book**: `PUT /api/books/:id`
- **Delete a Book**: `DELETE /api/books/:id`

### Libraries

- **Get All Libraries**: `GET /api/libraries`
- **Get Library by ID**: `GET /api/libraries/:id`
- **Create a New Library**: `POST /api/libraries`
- **Update a Library**: `PUT /api/libraries/:id`
- **Delete a Library**: `DELETE /api/libraries/:id`
- **Get Library Inventory**: `GET /api/libraries/:id/inventory`
- **Add Book to Library Inventory**: `POST /api/libraries/:id/inventory`
- **Remove Book from Library Inventory**: `DELETE /api/libraries/:id/inventory/:bookId`

### Borrowing

- **Borrow a Book**: `POST /api/borrow`
- **Return a Book**: `PUT /api/return/:id`

## Constraints

- Each Book object has an `image` field that stores a reference to the Book Cover stored in Firebase Storage.
- All APIs (except registration and login) require a valid JWT token for access.
- Only authenticated users with appropriate roles can add or remove books from the library inventory.

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or remote instance)
- Firebase account with Firebase Storage enabled
- Git

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

\`\`\`bash
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET_KEY=<Your JWT Secret Key>
FIREBASE_PROJECT_ID=<Your Firebase Project ID>
FIREBASE_PRIVATE_KEY=<Your Firebase Private Key>
FIREBASE_CLIENT_EMAIL=<Your Firebase Client Email>
FIREBASE_PRIVATE_KEY_ID=<Your Firebase Private Key ID>
FIREBASE_CLIENT_ID=<Your Firebase Client ID>
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx@<Your Firebase Project ID>.iam.gserviceaccount.com
\`\`\`

### Installation

1. **Clone the repository**:
   \`\`\`bash
   git clone https://github.com/your-username/kalpas_asssignment.git
   cd kalpas_asssignment
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the application**:
   \`\`\`bash
   npm start
   \`\`\`

### Testing the API

1. **Postman Collection**: Import the Postman collection using the URL: [Postman Collection Import URL] (replace with your actual URL).

2. **Testing**: You can test the API endpoints using Postman or any other API testing tool.


