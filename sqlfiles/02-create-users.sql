USE ynov_ci;

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(50) NOT NULL,
  nom VARCHAR(50) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE INTO utilisateurs (id, prenom, nom, email) VALUES
  (1, 'Arthur', 'Chesse', 'arthur.chesse@ynov.com'),
  (2, 'Cyril', 'Hanouna', 'cyril.hanouna@ynov.com'),
  (3, 'Rn', 'Boy', 'rn.boy@ynov.com'),
  (4, 'Patoche', 'Nowak', 'patoche.nowak@ynov.com')
ON DUPLICATE KEY UPDATE
  prenom = VALUES(prenom),
  nom = VALUES(nom),
  email = VALUES(email);
