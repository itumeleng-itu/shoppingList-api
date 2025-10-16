# ShoppingList API

This is a simple API for managing a shopping list.

## API Endpoints

### Products

**GET /products**
- Description: Get all products.
- Response: `200 OK` with an array of product objects.
  ```json
  [
    {
      "id": 1,
      "name": "Milk",
      "size": 1
    },
    {
      "id": 2,
      "name": "Bread",
      "size": 2
    }
  ]
  ```

**GET /products/:id**
- Description: Get a product by ID.
- Parameters: `:id` (number) - The ID of the product.
- Response:
  - `200 OK` with the product object if found.
    ```json
    {
      "id": 1,
      "name": "Milk",
      "size": 1
    }
    ```
  - `404 Not Found` if the product is not found.
    ```json
    {
      "message": "not found"
    }
    ```

**POST /products**
- Description: Add a new product.
- Request Body:
  ```json
  {
    "name": "Eggs",
    "size": 12
  }
  ```
- Response:
  - `201 Created` with the new product object if successful.
    ```json
    {
      "id": 3,
      "name": "Eggs",
      "size": 12
    }
    ```
  - `400 Bad Request` if `name` or `size` are missing or invalid.
    ```json
    {
      "message": "name and size are required"
    }
    ```
  - `400 Bad Request` if the JSON is invalid.
    ```json
    {
      "message": "invalid JSON"
    }
    ```

**DELETE /products/:id**
- Description: Delete a product by ID.
- Parameters: `:id` (number) - The ID of the product.
- Response:
  - `200 OK` if the product is deleted successfully.
    ```json
    {
      "message": "product deleted"
    }
    ```
  - `404 Not Found` if the product is not found.
    ```json
    {
      "message": "product not found"
    }
    ```

**PATCH /products/:id**
- Description: Update a product's size by ID.
- Parameters: `:id` (number) - The ID of the product.
- Request Body:
  ```json
  {
    "size": 6
  }
  ```
- Response:
  - `200 OK` with the updated product object if successful.
    ```json
    {
      "message": "product updated",
      "product": {
        "id": 1,
        "name": "Milk",
        "size": 6
      }
    }
    ```
  - `400 Bad Request` if `size` is missing or invalid.
    ```json
    {
      "message": "invalid size"
    }
    ```
  - `404 Not Found` if the product is not found.
    ```json
    {
      "message": "product not found"
    }
    ```
  - `400 Bad Request` if the JSON is invalid.
    ```json
    {
      "message": "invalid JSON"
    }
    ```
