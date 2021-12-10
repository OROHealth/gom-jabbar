DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS robots;
DROP TABLE IF EXISTS steps;
DROP TABLE IF EXISTS actions;

CREATE TABLE actions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL
);

CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE robots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT NULL DEFAULT NULL,
    robot_id INTEGER NULL DEFAULT NULL,
    recipe_id INTEGER NULL DEFAULT NULL,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    quantity INTEGER NOT NULL,
    step_id INTEGER NULL DEFAULT NULL,
    recipe_id INTEGER NULL DEFAULT NULL,
    FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE step_ingredients (
      step_id INTEGER NOT NULL,
      ingredient_id INTEGER NOT NULL,
      PRIMARY KEY (step_id, ingredient_id),
      FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE recipe_ingredients (
      recipe_id INTEGER NOT NULL,
      ingredient_id INTEGER NOT NULL,
      PRIMARY KEY (recipe_id, ingredient_id),
      FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE robot_actions (
      action_id INTEGER NOT NULL,
      robot_id INTEGER NOT NULL,
      PRIMARY KEY (action_id, robot_id),
      FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (`robot_id`) REFERENCES `robots` (`id`)
          ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE step_actions (
     action_id INTEGER NOT NULL,
     step_id INTEGER NOT NULL,
     PRIMARY KEY (action_id, step_id),
     FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`)
         ON DELETE CASCADE ON UPDATE CASCADE,
     FOREIGN KEY (`step_id`) REFERENCES `steps` (`id`)
         ON DELETE CASCADE ON UPDATE CASCADE
);
