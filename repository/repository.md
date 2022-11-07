## productRepository

create (productId, name, description, price): product
getAllProducts: array of product
search (name): array of product
getProduct (productId): product
update (productId, name, description, price): product
delete (productId): bool

## userRepository

registerUser (name, email, password): user
getUserById (userId): user
updateUser (userId, name, email, password): bool
deleteUser (userId): bool
getUserByEmail (email): user

## cartRepository

addProduct (userId, productId, quantity): cart
removeProduct (userId, productId): cart
getCart (userId): cart
clearCart (userId): bool

## orderRepository

createOrder (userId, products): order
getOrdersByUserId (userId): array of order
getOrderByOrderId (orderId): order

placeOrder(userId)
cart = cartRepository.getCart(userId)

    order = createOrder(userId, cart.products)

    clearCart(userId)

####

"/login" - authenticate (userRepository.getUserByEmail) get the Id

        - redirect "users/id"
        - failure redirect - "login"

"/register" - register user (input checks) (hash from Bcrypt) (userRepository.createUser)

        - redirect "users/id"
        - failure redirect (!getUserByEmail, )

"/logout" - redirect "/login"
