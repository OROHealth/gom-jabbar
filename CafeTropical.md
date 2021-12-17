# Schitt's Creek Cafe Tropical sale platform

It happened: Cafe Tropical is going viral.

> if you don't know what Schitt's Creek Cafe Tropical is...([follow this link](https://en.wikipedia.org/wiki/Schitt%27s_Creek)) https://en.wikipedia.org/wiki/Schitt%27s_Creek



The challenge is that Twyla, our fantastic waitress has sometime a tendency to forget things and screw up.

Now, we will not miss this opportunity to take over Starbucks!

To make sure that Twyla is not mixing up David's drinks with Alexis' salad and that Moira mocktails-with-alcohol are 
always rightly mixed, we need to build a very well-made API and tooling to scale correctly

This API will be able to efficiently

- store all customer's info
  - type of customer: out of town, in town, or part of the Rose's family
  - their drinks preference
  - their food preference
- store all customer's orders
  - the hour at which the order was made
  - the menu item
  - the tone at which the order was passed: angry, happy, overwhelmed, pregnant, moody, bored, excited
  - the number of customer on the order
  - the split of the bill
    - per group
    - per person
    - with ratios
- store all the menu items available
  - the price
  - the level of acceptable over-cooked-ness by Twyla in a scale from 1 to 10
  - the last date where the item was made
  - the length of time the item can be kept in the fridge and be served
- store the customer feedback once they've paid



## Goals

-  demonstrate recovery from a complete crash of all instances, or just one.

- simulate the insertion of 10.000 customer making between 2 and 14 orders per year on a span of 2 years
- optimize/find solution for the following question:
  - how many 8-rated overcooked diner did Twyla serve	 in the last 6 month, how much money has been earned from those 
    and what where the median ratings of these meals
  - what is the evolution of the number of drinks that Alexis and David have taken alone compared to the number together
    over time
  - the evolution of Moira's mocktails choices compared to her review over time
  - search an out-of-town customer's name



### Bonus/optional

- show some visualization tools and generated examples
- pick different storage mechanisms for different parts and explain why