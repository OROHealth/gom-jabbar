INSERT INTO actions (name,value) VALUES
    ('TAKE_CHEESE','take cheese from a box'),
    ('SQUEEZE_CHEESE','squeeze cheese'),
    ('DETECT_DRUNK_PEOPLE','detect drunk people'),
    ('DISPLAY_LYRICS','display Leonard Cohen lyrics'),
    ('LISTEN_ENVIRONMENT','listen to other robots'' environment sounds'),
    ('CUT_POTATOES','cut potatoes in dynamically-sized cube'),
    ('ADD_SYRUP','dip potatoes in maple syrup'),
    ('BOIL_POTATOES','boil potatoes and give their current softness level'),
    ('FRY_POTATOES','fry potatoes with multiple oil choices'),
    ('REGULATE_TEMP','keep things at a specific temperature in a pot'),
    ('PACKAGE','mix ingredient in a cardboard, allow the box to be sent to needy user');

INSERT INTO ingredients (name,quantity,step_id,recipe_id) VALUES
    ('cheese',10,NULL,NULL),
    ('potatoes',10,NULL,NULL),
    ('syrup',10,NULL,NULL),
    ('water',10,NULL,NULL),
    ('oil',10,NULL,NULL),
    ('gravy sauce',10,NULL,NULL);

INSERT INTO recipe_ingredients (recipe_id,ingredient_id) VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (1,5),
    (1,6);

INSERT INTO recipes (name) VALUES ('Poutine');

INSERT INTO robot_actions (action_id,robot_id) VALUES
    (9,5),
    (1,1),
    (2,1),
    (6,3),
    (7,3),
    (8,4),
    (10,6),
    (11,7),
    (5,2),
    (4,2),
    (3,2);

INSERT INTO robots (name) VALUES
    ('Outremona'),
    ('Montroyashi'),
    ('Verduny'),
    ('Nordo'),
    ('Bizar'),
    ('Oldoporto'),
    ('Pierre');

INSERT INTO step_actions (action_id,step_id) VALUES
    (9,4),
    (8,3),
    (1,1),
    (2,1),
    (4,5),
    (10,6),
    (3,8),
    (11,7),
    (6,2),
    (7,2);

INSERT INTO step_ingredients (step_id,ingredient_id) VALUES
    (4,5),
    (3,4),
    (1,1),
    (6,6),
    (2,3),
    (2,2);

INSERT INTO steps (status,robot_id,recipe_id) VALUES
    (NULL,1,1),
    (NULL,3,1),
    (NULL,4,1),
    (NULL,5,1),
    (NULL,2,1),
    (NULL,6,1),
    (NULL,7,1),
    (NULL,2,1);