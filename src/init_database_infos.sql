INSERT INTO places (place_name, has_inn, is_beginning_town) VALUES
  ('Viceria', true, true);

INSERT INTO items (id, "name", "desc", "type", subtype, price, selling_price, effect)
VALUES(1, 'Health Potion', 'Use to recover 10 health point', 'consumable', NULL, 50, 10, 'HEAL10');


INSERT INTO monsters (id, monster_name, life_points, strength, speed, gold, experience) VALUES
  (1, 'Cockroach', 3, 1, 1, 0, 1),
  (2, 'Rat', 6, 1, 1, 1, 2),
  (3, 'Small Goblin', 10, 2, 3, 5, 5),
  (4, 'Goblin', 20, 6, 5, 10, 15);

INSERT INTO "monstersItemsList" ("monsterId", "itemId", drop_rate) VALUES
  (3, 1, 35);