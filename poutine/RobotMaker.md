# Accelerating Poutine production

We have a problem: Poutine is taking the world over, but our production is constrained by the amount of cook we have 
available. 

***True*** poutine requires a complex step-by-step process that only the most talented Montrealer cook can pretend to 
master:

1. take a handful of squeaky cheese
2. squeeze it until it screams "I'm not a Montreal's bagel who are the best in the world, don't even talk to me about 
   New York bagels, amateur!" 
3. cut the potatoes in exactly 1 inch per 1 inch cube
4. dip the potatoes in maple sirup for 25 seconds
5. put the dipped potatoes directly in boiling water
6. let them cook until they get soft-ish
7. get them out of the boiling water and put them in a oil-filled fryer
8. retrieve the lyrics of a random Leonard Cohen song and sing it to the potatoes
9. stir up the secret gravyy sauce in a separate pot and keep it warm at the exact temperature before boiling
10. expertly mix up all of the fried potatoes, gravy and cheese into a cardboax
11. wait for people to get drunk and the hour to be past 2am



Now, since we are a smart company, we built Robot that are capable to individually (each line is a robot with a name):

- Outremona: take cheese from a box an squeeze it
- Montroyashi: listen to other robots' environment sounds and display Leonard Cohen lyrics, detect drunk people
- Verduny: cut potatoes in dynamically-sized cube and dip them in maple sirup
- Nordo: boil potatoes and give their current softness level
- Bizar: fry potatoes with multiple oil choices
- Oldoporto: keep things at a specific temperature in a pot
- Pierre: mix ingredient in a cardboard, allow the box to be sent to needy user



You are in charge of integrating all of this together.

The robot making team will take care of making sure the robot answer to the RESTful APIs as specified.

Now, we need to ensure the utmost quality and also be able to validate when we improve the design of the robots. For 
example, if we add a new oil choice, the whole process should still work perfectly.



## Goals

- design the current version of each robot APIs as you understand them, ideally in an OpenAPI compatible format
- build a test suite to automate the quality control of the Poutine making
- show a fake Poutine making process as it would happen and show that we can change the oil choice and guarantee the 
  delivery of a beautiful juicy Poutine



### Bonus/optional

- Differentiate the business critical part against the purely technical ones
- Identify the part that will be costly to maintain in your test suite, and propose solutions
- Pick GraphQL/gRPC or other non-RESTful API format to streamline part of the process and explain your choices