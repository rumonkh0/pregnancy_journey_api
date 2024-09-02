user-> total points, last login, strike count

store the tasks and its consequetive points
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    points INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


for store history
CREATE TABLE user_rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    task_id INT,
    earned_points INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (task_id) REFERENCES tasks(id)
);

for store strike info of a user
CREATE TABLE strike_rewards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    strike_count INT UNIQUE NOT NULL,
    points INT NOT NULL
);

