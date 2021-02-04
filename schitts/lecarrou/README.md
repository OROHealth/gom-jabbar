# Schitt's Creek Cafe Tropical sale platform

## Description 

It happened: Cafe Tropical is going viral.

    if you don't know what Schitt's Creek Cafe Tropical is...(follow this link) https://en.wikipedia.org/wiki/Schitt%27s_Creek

The challenge is that Twyla, our fantastic waitress has sometime a tendency to forget things and screw up.

Now, we will not miss this opportunity to take over Starbuck!

To make sure that Twyla is not mixing up David's drinks with Alexis' salad and that Moira mocktails-with-alcohol are always rightly mixed, we need to build a very well-made API and tooling to scale correctly

This API will be able to efficiently

    store all customer's info
        type of customer: out of town, in town, or part of the Rose's familly
        their drinks preference
        their food preference
    store all customer's orders
        the hour at which the order was made
        the menu item
        the tone at which the order was passed: angry, happy, overwhelmed, pregnant, moody, bored, excited
        the number of customer on the order
        the split of the bill
            per group
            per person
            with ratios
    store all the menu items available
        the price
        the level of acceptable over-cookedness by Twyla in a scale from 1 to 10
        the last date where the item was made
        the length of time the item can be kept in the fridge and be served
    store the customer feedback once they've paid

Goals

    demonstrate recovery from a complete crash of all instances, or just one.

    simulate the insertion of 10.000 customer making between 2 to 14 orders per year on a span of 2 years

    optimize/find solution for the following question:
        how many 8-rated overcooked diner did Twyla serve in the last 6 month, how much money has been earned from those and what where the median ratings of these meals
        what is the evolution of the the number of drinks that Alexis and David have taken alone compared to the number together over time
        the evolution of Moira's mocktails choices compared to her review over time
        search an out of town customer's name

Bonus/optional

    show some vizualisation tools and generated examples
    pick different storage mechanisms for different parts and explain why


## Table of Contents


## Installation 

Run the command : docker-compose -f docker-compose.preprod.yml up -d --build --remove-orphans

Other usefull commands:
docker-compose -f docker-compose.preprod.yml build
docker-compose -f docker-compose.preprod.yml up
docker-compose -f docker-compose.preprod.yml down -v (option -v pour supprimer les volumes associés)
docker-compose -f docker-compose.preprod.yml logs

## Usage

Connect to the web site at url: localhost:1340
    Login/password: admin/admin
    other account already created:
        login: twyla
        password: cafetropical
        login: alexis.rose
        password: cafetropical
        login: david.rose
        password: cafetropical
        login: moira.rose
        password: cafetropical

Other usefull command:
    To connect to running web container: docker exec -it web sh
        cd backup
        all backup are available in backup folder

    To connect to running database (preprod) container: docker exec -it db psql -d db_preprod -U user_preprod

    To connect to running database (preprod) container: docker exec -it db sh

# To create an account
    click on Signup
    enter informations

# To make an order
    connect with twyla account
    click on Orders

# To make an comment
    connect with account you have created
    click on Comments
    enter your comment with Order ID # 46 (order you have just dne with twyla account)

# To test database recovery
docker exec -it web sh
python3 manage.py flush --no-input (supprime toutes les données) 
docker exec -it db psql -d db_preprod -U user_preprod
\i '/var/lib/postgresql/backup/backup/<file.psql>' # restore the database 

# To simulate the insertion of 10.000 customer making between 2 to 14 orders per year on a span of 2 years
docker exec -it web sh
python3 manage.py test

OR locally in a VSCode terminal
py manage.py test cafe.tests.CafeTestCase --settings=core.settings._test

## Contributing


## Credits


## License

