# HappyBuyers - Your Online Shopping Platform

![HappyBuyers Logo](./client/public/logo512.png)

Welcome to HappyBuyers, your one-stop destination for online shopping! HappyBuyers is a full-stack web application built using MERN stack (MongoDB, Express.js, React, Node.js) that allows users to browse and purchase a wide range of products. It also provides sellers with the ability to list their products for sale.

## Features

- **User Registration and Login:** Users can create an account and log in to access their profile and place orders.

- **Product Listing:** Sellers can list their products with detailed information such as name, price, description, and product images.

- **Cart Functionality:** Users can add products to their cart while shopping and review their cart items before proceeding to checkout.

- **Checkout and Payment:** Secure checkout process with shipping and payment information collection. Integration with a payment gateway for secure payments.

- **Order History:** Users can view their order history and track the status of their orders.

- **Responsive Design:** The website is fully responsive, ensuring a seamless shopping experience on various devices.

## Tech Stack

- **Frontend:** React, Chakra UI (for styling)

- **Backend:** Node.js, Express.js, MongoDB (with Mongoose)

- **State Management:** Redux (for global state management)

- **Authentication:** JSON Web Tokens (JWT)

## Setup and Installation

1. **Clone the repository:**

```
git clone https://github.com/sudama011/CodeClause_Ecommerce_Website.git
```

2. **Install dependencies for both the frontend and backend:**

```
cd happybuyers
cd frontend
npm install

cd ..
cd backend
npm install
```


3. **Configure Environment Variables:**

- Create a `.env` file in the `backend` directory and set the following variables:

  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```

4. **Start the Development Servers:**

- Run the backend server (from the `backend` directory):

  ```
  npm start
  ```

- Run the frontend server (from the `frontend` directory):

  ```
  npm start
  ```

5. **Open your browser and visit `http://localhost:3000` to access HappyBuyers.**


## Screenshots

![Homepage](<Screenshot (63).png>)
*Caption: HappyBuyers Homepage showcasing! featured products and search functionality.*

![Product Details](<Screenshot (64).png>)
*Caption: Product Details page displaying product information and reviews.*

![Cart Page](<Screenshot (65).png>)
*Caption: Cart Page showing added products and total price.*

![Add Product](<Screenshot (66).png>)
*Caption: Admin can add new products with details and images.*


## Demo

You can view a live demo of HappyBuyers at [https://www.happybuyers.com](https://www.happybuyers.com).

## Contributing

We welcome contributions to HappyBuyers! If you find a bug or have a suggestion for improvement, feel free to open an issue or submit a pull request.
<!-- 
## License

This project is licensed under the [MIT License](link_to_license). -->

## Contact

For any inquiries or support, contact us at support@happybuyers.com.

---

# Happy Shopping with HappyBuyers! 🛍️
