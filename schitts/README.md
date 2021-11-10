# Schitt's Creek Cafe Tropical

The given application facilitates customer services ensuring effieciency for schitt's cafe tropical. It is divided into two 
parts frontend and backend, with the backendend built using python's [**Flask**](https://flask.palletsprojects.com/en/2.0.x/) framework and **PostgreSQL** as storage backend.
The frontend is built on javascript's [**ReactJS**](https://reactjs.org/). 

### Requirements

- [**docker**](https://www.docker.com/) for building and running API and Frontend containerize images images
- [**docker-compose**](https://docs.docker.com/compose/) for defining and running multi-container Docker applications

### Project Setup

For the project to be launch, with all the requirements met, navigate to the root of the 
project schitts diractory, you would notice a file  labeled **docker-compose.yaml**, in your terminal,
execute the command **docker-compose up --build** to build the images. Note that if it is your first
time to execute the command, it will take sometime to pull the images from docker's repository and build the respecitive containers. 
Once its complete you should be able to access the api from port **:5000** in your local machine, and the ui on port 
**:8080**. With that said, in order to completely the process a few migration defaults are expected. 

- Access the api on port **:5000**, navigate to the swagger documentation by clicking on the **ACCESS API V1** button in the home screen.
- Select the namespace migrations and perform the corresponding operations in the given order. It will generate the database schemas and perform default migrations.
  - Visit the route **/migrations/init-migrations** click on the try it out and execute.
  - Visit the route **/migrations/migrate-database** click on the try it out and execute.
  - Visit the route **/migrations/upgrade-database** click on the try it out and execute.
  - Visit the route **/migrations/defaults** click on the try it out and execute.
  
- One of the project requirements to simulate adding 10000 customers and their commands can be executed accessing the route **/migrations/simulate/customer-orders/{total}** passing in the required total (10000) or any of your choice in the input field and executing. 

### Expected database tables

After satisfying project requirements, and set up in your database, you should be able to see
the given set of tables below. Note that the column structure might differ given that this table structure
was prepared from  project descriptions.

- customers
  - id (int) PK
  - name (varchar(120)) : not null
  - customer_type_id (int) (FK) customer ->  id : not null
  - preferences -> relationship to customer_preferences table (one-to-many)
  - date_added (timestamp) -> default current date

- customer_preferences (many-to-many)
  - customer_id (int) FK customers -> id
  - menu_item_id (int) FK menu_items -> id
  - date_added (timestamp) -> default current date

- customer_type 
  - id (int) PK
  - name (varchar) 122
  - date_added (timestamp) -> default current date

- customer_reactions
  - id (int) PK
  - name (text)

- orders
  - id (int) PK
  - menu_item_id (int) FK menu_items -> id
  - customer_reaction_id (int) FK customer_reactions -> id : rep>tone
  - customer_count
  - bill_type (enum) GROUP, PERSON, RATIO
  - payment_status (enum) NOT PAID, PAID, CANCELLED [0]
  - ready_status (enum) READY, NOT READY -> default [1] 
  - date_added (timestamp) -> default current date

- menu_items
  - id (int) PK
  - name (text) unique 
  - price (float) 
  - overcooked_level (int) -> 1 -10
  - recent_date (date) 
  - storage_duration (int) in days 
  - date_added (timestamp) -> default current date
  - category (enum) "drink" | "food" -> default food
 
- feedback
  - id (int) PK
  - comments (text)
  - service_rating (int) 1 - 5 stars 
  - date_added (timestamp) -> default current date

### Project Screenshots
![Alt text](screenshots/0.png?raw=true "Optional Title")
![Alt text](screenshots/1.png?raw=true "Optional Title")
![Alt text](screenshots/2.png?raw=true "Optional Title")
![Alt text](screenshots/3.png?raw=true "Optional Title")
![Alt text](screenshots/4.png?raw=true "Optional Title")
![Alt text](screenshots/5.png?raw=true "Optional Title")

NB: from the ui to display customer orders click on the customer.