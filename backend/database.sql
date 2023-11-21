-- SQLBook: Code
-- Active: 1684935220439@@127.0.0.1@3306@afac974
-- SQLBook: Code

-- Active: 1684940650999@@127.0.0.1@3306@afac974

-- SQLBook: Code

DROP TABLE IF EXISTS biography;

DROP TABLE IF EXISTS user_favourites;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS articles;

DROP TABLE IF EXISTS works;

DROP TABLE IF EXISTS categories;

DROP TABLE IF EXISTS techniques;

DROP TABLE IF EXISTS about;

CREATE TABLE
    techniques (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    about (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        summary LONGTEXT NOT NULL,
        image_src VARCHAR(255) NOT NULL,
        image_alt VARCHAR(255) NOT NULL,
        url varchar(255)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    categories (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    works (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        summary_title VARCHAR(255),
        date VARCHAR (255) NOT NULL,
        image_src VARCHAR(255) NOT NULL,
        image_alt VARCHAR(255) NOT NULL,
        reference VARCHAR(255) NOT NULL,
        summary1 LONGTEXT NOT NULL,
        summary2 LONGTEXT,
        summary3 LONGTEXT,
        summary4 LONGTEXT,
        format VARCHAR(255) NOT NULL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        techniques_id INT,
        categories_id INT,
        CONSTRAINT techniques_id_fk FOREIGN KEY (techniques_id) REFERENCES techniques(id),
        CONSTRAINT categories_id_fk FOREIGN KEY (categories_id) REFERENCES categories(id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    articles (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        src VARCHAR(255) NOT NULL,
        works_id INTEGER NOT NULL,
        CONSTRAINT articles_fk FOREIGN KEY (works_id) REFERENCES works(id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    users (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        firstname VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        hashed_password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    user_favourites (
        users_id INT,
        works_id INT,
        CONSTRAINT users_id_fk FOREIGN KEY (users_id) REFERENCES users(id),
        CONSTRAINT works_id_forkey FOREIGN KEY (works_id) REFERENCES works(id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

CREATE TABLE
    biography (
        id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        title1 VARCHAR(255) NOT NULL,
        image1_src VARCHAR(255) NOT NULL,
        image1_alt VARCHAR(255) NOT NULL,
        text1 LONGTEXT NOT NULL,
        title2 VARCHAR(255),
        image2_src VARCHAR(255),
        image2_alt VARCHAR(255),
        text2 LONGTEXT,
        title3 VARCHAR(255),
        image3_src VARCHAR(255),
        image3_alt VARCHAR(255),
        text3 LONGTEXT
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
    biography (
        name,
        title1,
        image1_src,
        image1_alt,
        text1,
        title2,
        image2_src,
        image2_alt,
        text2,
        title3,
        image3_src,
        image3_alt,
        text3
    )
VALUES (
        "Biographie d'Hippolyte Mortier, Duc De Trévise",
        "Hippolyte Mortier, Duc De Trévise",
        "AFAC_974_7.jpg",
        "Autoportrait du jeune Mortier, en tenue de peintre aquarelliste",
        "Hippolyte Charles Napoléon Mortier, Duc de Trévise, est né le 4 mai 1835 à Paris, issu d'une famille de noblesse acquise grâce à Napoléon 1er.
        Il a eu une carrière prestigieuse, servant comme secrétaire d'ambassade sous Napoléon III, et occupant les postes de pair de France et sénateur.
        En 1860, il a épousé Emma, la fille de Gabriel Le Coat de K / véguen, un riche commerçant et industriel de l'île de La Réunion.
        Le couple a effectué deux voyages importants à La Réunion en 1860-1861 et 1865-1866, durant lesquels Hippolyte a réalisé de nombreuses aquarelles, un genre artistique en plein essor au 19e siècle.
        Ses œuvres capturent de façon délicate et fraîche les différentes scènes et personnes rencontrées au cours de ces voyages.
        Hippolyte a aussi montré un talent pour les affaires en s'associant à son beau - frère, Denis - André Le Coat de K / véguen, pour gérer un vaste empire foncier à La Réunion, laissé par son beau - père.
        Bien qu'il ait passé plus de temps à Paris qu'à La Réunion, il faisait partie de l'entourage immédiat du couple impérial jusqu'en 1870.
        L'arrivée de la IIIe République l'a éloigné du pouvoir politique, mais il a continué à exercer une certaine influence dans les cercles économiques.
        Le couple Mortier n'a pas eu d'enfants.",
        "Les Oeuvres",
        "AFAC_974_3.jpg ",
        "Illustration de travailleurs dans les champs",
        "Il y a des indications que Mortier a peut - être effectué plus de deux voyages à La Réunion, puisque certaines de ses œuvres d'art sont datées de différentes années.
        Il a laissé une collection remarquable d'œuvres d 'art, en particulier des scènes de l'usine du Tampon et des travailleurs du sud de l'île ainsi que des dessins de Géricault, qu'il admirait particulièrement.",
        "L’Héritage",
        "Château_de_Coupvray.png",
        "Lettre de la main de Hippolyte Ch.N.Mortier, Duc de Trévise, rédigée en 1891.",
        "Il a également passé du temps au château de Coupvray, en Seine - et - Marne, à partir de 1869.
        Après la guerre de 1870, il s'est investi dans la vie du village local, ouvrant une école privée pour jeunes filles et une classe maternelle.
        Après sa mort en 1892, son épouse Emma a géré le domaine, avant de le confier à son neveu Emmanuel. Il a continué à participer activement à la vie du village.
        Le vaste réseau de relations que Mortier avait établi durant sa vie est bien documenté dans ses souvenirs, témoignant de son engagement dans la communauté."
    );

INSERT INTO
    about (name, summary, image_src, image_alt, url)
VALUES (
        'AFAC 974',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu posuere nisi. Aenean rhoncus lorem sit amet nisi vehicula, id placerat tellus placerat pellentesque. Proin quis arcu ut metus mattis commodo ut eu massa. Morbi porta at elit sed tempor. \r\n
        In viverra mollis sem, eu accumsan leo pulvinar eu. Sed eu est pretium, pulvinar libero quis, egestas lectus. Mauris eget ligula ex. Mauris hendrerit erat tortor, non porttitor ex facilisis dictum. Proin dapibus a justo nec rhoncus. Cras nec felis at turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu posuere nisi. Aenean rhoncus lorem sit amet nisi vehicula, id placerat tellus placerat pellentesque. Proin quis arcu ut metus mattis commodo ut eu massa. Morbi porta at elit sed tempor. In viverra mollis sem, eu accumsan leo pulvinar eu. Sed eu est pretium, pulvinar libero quis, egestas lectus. Mauris eget ligula ex. Mauris hendrerit erat tortor, non porttitor ex facilisis dictum. Proin dapibus a justo nec rhoncus. Cras nec felis at turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu posuere nisi. Aenean rhoncus lorem sit amet nisi vehicula, id placerat tellus placerat pellentesque.
        ',
        'islandAbout.jpg',
        'AFAC 974 logo',
        ''
    ), (
        'Objet témoin',
        'Donec fringilla ipsum libero, quis fermentum mi gravida sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed semper mi. Fusce euismod orci mi, in suscipit est semper. Curabitur pulvinar massa sed risus fringilla.',
        'objet_temoin.png',
        'Objet témoin logo',
        'https://museo.vandanjon.com/index.php/en/'
    ), (
        'Département de la réunion',
        'Donec fringilla ipsum libero, quis fermentum mi gravida sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed semper mi. Fusce euismod orci mi, in suscipit est semper. Curabitur pulvinar massa sed risus fringilla.',
        'reunion.png',
        'Département de la réunion logo',
        'https://www.departement974.fr'
    ), (
        "Iconothèque historique de l'océan Indien",
        'Donec fringilla ipsum libero, quis fermentum mi gravida sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed semper mi. Fusce euismod orci mi, in suscipit est semper. Curabitur pulvinar massa sed risus fringilla.',
        'ihoi.png',
        "Iconothèque historique de l'océan Indien logo",
        'https://www.ihoi.org/app/photopro.sk/ihoi_icono/?'
    );

INSERT INTO techniques (name)
VALUES ('Aquarelle'), ('Dessin à la mine de plomb'), ('Dessin');

INSERT INTO categories (name)
VALUES ('Usines'), ('Travailleurs'), ('Lieux'), ('Animaux');

INSERT INTO
    works (
        title,
        summary_title,
        date,
        image_src,
        image_alt,
        reference,
        summary1,
        summary2,
        summary3,
        summary4,
        format,
        techniques_id,
        categories_id
    )
VALUES (
        "Effet de nuit sur la Cheminée usine du Tampon",
        "Lorem Ipsum",
        "1866",
        "AFAC_974_1.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        1
    ), (
        "Arrivée à l'établissement du Tampon",
        "Lorem Ipsum",
        "1866",
        "AFAC_974_2.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        1
    ), (
        "Tampon- Une usine",
        "Lorem Ipsum",
        "10 février 1866",
        "AFAC_974_3.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        2,
        1
    ), (
        "Quartier St Pierre. Etablissement de la Rivière, montagnes de l'Entre Deux",
        "Lorem Ipsum",
        "1861 ou 1866",
        "AFAC_974_4.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        1
    ), (
        "Boutchiana- Indien",
        "Lorem Ipsum",
        "juillet 1871",
        "AFAC_974_5.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "Boutchiana- Casernes",
        "Lorem Ipsum",
        "24 août 1865",
        "AFAC_974_6.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "Boutchiana-Casernes, de face",
        "Lorem Ipsum",
        "1865",
        "AFAC_974_7.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "Cafrine et son petit au Tampon",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_8.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "La vieille (Victorine) Mme Samsi Casernes",
        "Lorem Ipsum",
        "15 décembre 1865",
        "AFAC_974_9.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "Elise",
        "Lorem Ipsum",
        "août 1861",
        "AFAC_974_9.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "Lucie le ventre plein de cari",
        "Lorem Ipsum",
        "1866",
        "AFAC_974_11.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "La belle Tina",
        "Lorem Ipsum",
        "1866",
        "AFAC_974_12.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "Jamali, Cafre, Gardien",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_13.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "Le parapluie du pauvre Citoyen",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_14.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        2
    ), (
        "La pli y fait pas rien, ça ! Tampon",
        "Lorem Ipsum",
        "27 janvier 1866",
        "AFAC_974_15.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "Monsieur Bourrayne dans le jardin des Casernes",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_16.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "Chanvert descend le chemin de la Plaine, Golo est à ses côtés",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_18.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        2
    ), (
        "Sortie du Bras de Jean Payet en allant vers le Tampon",
        "Lorem Ipsum",
        "29 janvier 1865",
        "AFAC_974_19.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",        
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        3
    ), (
        "Le bassin rouge au Tampon, la ravine descend",
        "Lorem Ipsum",
        "10 février 1866",
        "AFAC_974_20.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        3
    ), (
        "Excursion au volcan de Bourbon",
        "Lorem Ipsum",
        "août 1861",
        "AFAC_974_21.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        3
    ), (
        "Le volcan de Bourbon vu du Pas de Bellecombre",
        "Lorem Ipsum",
        "août 1861",
        "AFAC_974_22.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        3
    ), (
        "Mamzelle",
        "Lorem Ipsum",
        "14 avril 1866",
        "AFAC_974_23.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        4
    ), (
        "Charrette tirée par des mulets",
        "Lorem Ipsum",
        "1861",
        "AFAC_974_24.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        3,
        4
    ), (
        "Caille de Bourbon",
        "Lorem Ipsum",
        "21 septembre 1861",
        "AFAC_974_2.jpg",
        "Lorem Ipsum",
        "Lorem Ipsum",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo vel orci porta. Dignissim convallis aenean et tortor at. Sed elementum tempus egestas sed sed risus. ",
        "Lorem Ipsum",
        1,
        4
    );

INSERT INTO
    articles (name, src, works_id)
VALUES (
        "La sucrerie de Bel Air",
        "https://view.genial.ly/5fb636d03636f40d7f883f24",
        3
    ), (
        "Victorine Samsi",
        "https://belair.hypotheses.org/389",
        9
    ), (
        "Jamali",
        "https://forgetmenot.objettemoin.org/index.php/fr/actus/36-jamali-gardien-de-cannes",
        13
    ), (
        "Golo",
        "https://belair.hypotheses.org/1351",
        17
    ), (
        "La caverne des Lataniers",
        "https://view.genial.ly/6432b64851cad10018f64868/interactive-image-caverne-lataniers",
        20
    ), (
        "Caille Peinte",
        "https://www.seor.fr/oiseau-25-caille-peinte.html",
        24
    );

INSERT INTO
    users (
        email,
        hashed_password,
        is_admin
    )
VALUES (
        "admin@admin.com",
        "$argon2id$v=19$m=65536,t=3,p=1$/CzR6UY8uiZYTaxJuv96vA$88z7x2E/HDrlbib+XWrj2EpgUPtoGioj3KtkZRFeAzY",
        1
    ), (
        "user@users.com",
        "$argon2id$v=19$m=65536,t=3,p=1$2On/bpEHz9AobMjjOuMxiA$IjDynbhQCWrFNVwyL1FquDH1y6Ym1ZjlwmqUFKdShxY",
        0
    );

    INSERT INTO
        user_favourites (
            users_id,
            works_id
        )
    VALUES (
        2, 1
    ) , (
        2,3
    ) , (
        2,8
    );