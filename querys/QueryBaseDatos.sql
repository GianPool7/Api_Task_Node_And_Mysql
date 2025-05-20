CREATE DATABASE task;
USE task;

CREATE TABLE users(
	id int auto_increment primary key,
    name varchar(50),
    lastName varchar(50),
    birthdate date,
    email varchar(50),
    password varchar(50)
);

CREATE TABLE projects(
	id int auto_increment primary key,
    id_user int,
    title varchar(50),
    description varchar(100),
    star_date date,
    end_date date,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE tasks(
	id int auto_increment primary key,
    id_projects int,
    title varchar(100),
    description text,
	star_date date,
    end_date date,
    FOREIGN KEY (id_projects) REFERENCES projects(id)
);


-- add data
-- for users
INSERT INTO users (name, lastName, birthdate, email, password) VALUES
('Juan', 'Pérez', '1990-05-12', 'juan.perez@example.com', 'pass123'),
('Ana', 'López', '1985-11-23', 'ana.lopez@example.com', 'secure456'),
('Carlos', 'Ramírez', '1993-08-15', 'carlos.ramirez@example.com', 'qwerty789');

SELECT * FROM users WHERE email="juan.perez@example.com" AND password="pass123";

-- for projects
INSERT INTO projects (id_user, title, description, star_date, end_date) VALUES
(1, 'Sitio Web Personal', 'Diseño y desarrollo de un portafolio web.', '2024-01-01', '2024-03-15'),
(1, 'Tienda Online', 'Desarrollo de e-commerce con carrito y pagos.', '2024-04-01', '2024-06-30'),
(2, 'Blog de Cocina', 'Blog con recetas e imágenes.', '2024-02-10', '2024-05-10');

-- for tasks
INSERT INTO tasks (id_projects, title, description, star_date, end_date) VALUES
(1, 'Diseñar maqueta', 'Diseñar la maqueta en Figma.', '2024-01-01', '2024-01-07'),
(1, 'Programar frontend', 'Codificar HTML, CSS, JS.', '2024-01-08', '2024-02-01'),
(2, 'Configurar base de datos', 'Definir estructura y relaciones.', '2024-04-02', '2024-04-05'),
(3, 'Escribir recetas', 'Subir contenido inicial de recetas.', '2024-02-15', '2024-03-01');


-- generating queries

SELECT * FROM users;
SELECT * FROM projects;
SELECT * FROM tasks;

-- DELETE USER WHERE ID

DELETE FROM users WHERE id=4;

-- update
UPDATE users SET name="Ana" WHERE id=2;
-- UPDATE projects SET id_user=?,title=?,title=?,description=?,star_date=?,end_date=? WHERE id=?


-- migrando a otra base de datos
CREATE DATABASE task_db;
use task_db;


-- seleccionando por una datao




