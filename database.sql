CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks ("title", "completed")
VALUES 
('Washing Dishes', false),
('Laundry', false),
('Cleaning air filter', false);