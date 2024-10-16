CREATE TABLE forms (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
    user_id INTEGER REFERENCES users(id);
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    form_id INTEGER REFERENCES forms(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    options TEXT [],
    position INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);


