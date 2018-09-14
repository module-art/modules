-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 14 sep. 2018 à 12:51
-- Version du serveur :  10.1.26-MariaDB-0+deb9u1
-- Version de PHP :  7.2.9-1+0~20180910100512.5+stretch~1.gbpdaac35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `modular_baramots`
--

-- --------------------------------------------------------

--
-- Structure de la table `blocs`
--

CREATE TABLE `blocs` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `contenu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `place` smallint(6) DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rubrique_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `blocs`
--

INSERT INTO `blocs` (`id`, `created_at`, `updated_at`, `deleted_at`, `contenu`, `place`, `type`, `rubrique_id`) VALUES
(7, '2018-09-13 07:33:56', '2018-09-13 10:43:45', NULL, '<h2 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">bloc large</h2>', 1, 'large', 1),
(8, '2018-09-13 10:33:57', '2018-09-13 10:44:20', NULL, '<h3 style=\"text-align: left;\" data-mce-style=\"text-align: left;\">Bloc normal<br data-mce-bogus=\"1\"></h3><p>Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez ce vieux whisky au juge blond qui fume sur son île intérieure, à côté de l\'alcôve ovoïde, où les bûches se consument dans l\'âtre, ce qui lui permet de penser à la cænogenèse de l\'être dont il est question dans la cause ambiguë entendue à Moÿ, dans un capharnaüm qui, pense-t-il, diminue çà et là la qualité de son œuvre. Prouvez, beau juge, que le fameux sandwich au yak tue. L\'île exiguë, Où l\'obèse jury mûr Fête l\'haï volapük, Âne ex æquo au whist, Ôtez ce vœu déçu. Vieux pelage que je modifie : breitschwanz ou yak ? Dès Noël où un zéphyr haï me vêt de glaçons würmiens, je dîne d’exquis rôtis de bœuf au kir à l’aÿ d’âge mûr &amp; cætera ! Fougueux, j\'enivre la squaw au pack de beau zythum. Ketch, yawl, jonque flambant neuve… jugez des prix ! Voyez le brick géant que j\'examine près du wharf. Portez ce vieux whisky au juge blond qui fume. Bâchez la queue du wagon-taxi avec les pyjamas du fakir. Voix ambiguë d\'un cœur qui, au zéphyr, préfère les jattes de kiwis. Mon pauvre zébu ankylosé choque deux<br></p>', 2, 'normal', 1),
(9, '2018-09-12 22:00:00', '2018-09-13 11:32:10', NULL, '<p>Pied de page<br></p>', 1, 'normal', 4),
(10, '2018-09-12 22:00:00', '2018-09-13 11:36:19', NULL, '<p><span>© Module-art. Design:</span>Sylvestre<br></p>', 2, 'normal', 4),
(11, '2018-09-13 12:21:10', '2018-09-13 12:21:45', NULL, '<p style=\"text-align: center;\" data-mce-style=\"text-align: center;\">Cie Stomarabel, 14 rue Truc<br></p><p style=\"text-align: center;\" data-mce-style=\"text-align: center;\">46789, Lapampa<br></p><p style=\"text-align: center;\" data-mce-style=\"text-align: center;\">06 32 45 89 41</p>', 1, 'large', 5),
(13, '2018-09-14 06:36:18', '2018-09-14 08:40:48', NULL, '<h1 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">Les monts mots<br></h1>', 1, 'large', 2),
(14, '2018-09-14 07:26:45', '2018-09-14 08:41:04', NULL, '<p><img src=\"../storage/pictures/boby-lapointe.jpg\" alt=\"\" width=\"580\" height=\"580\"><br data-mce-bogus=\"1\"></p>', 3, 'normal', 2),
(15, '2018-09-14 07:31:57', '2018-09-14 08:41:04', NULL, '<p>Loin, très loin, au delà des monts Mots, à mille lieues des pays Voyellie et Consonnia, demeurent les Bolos Bolos. Ils vivent en retrait, à Bourg-en-Lettres, sur les côtes de la Sémantique, un vaste océan de langues. Un petit ruisseau, du nom de Larousse, coule en leur lieu et les approvisionne en règlalades nécessaires en tout genre; un pays paradisiagmatique, dans lequel des pans entiers de phrases prémâchées vous volent litéralement tout cuit dans la bouche. Pas même la toute puissante Ponctuation ne régit les Bolos Bolos - une vie on ne peut moins orthodoxographique. Un jour pourtant, une petite</p>', 2, 'normal', 2),
(16, '2018-09-14 07:47:58', '2018-09-14 08:39:22', NULL, '<p>Loin, très loin, au delà des monts Mots, à mille lieues des pays Voyellie et Consonnia, demeurent les Bolos Bolos. Ils vivent en retrait, à Bourg-en-Lettres, sur les côtes de la Sémantique, un vaste océan de langues. Un petit ruisseau, du nom de Larousse, coule en leur lieu et les approvisionne en règlalades nécessaires en tout genre; un pays paradisiagmatique, dans lequel des pans entiers de phrases prémâchées vous volent litéralement tout cuit dans la bouche. Pas même la toute puissante Ponctuation ne régit les Bolos Bolos - une vie on ne peut moins orthodoxographique. Un jour pourtant, une petite</p>', 4, 'normal', 2);

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2018_07_03_134552_create_pages_table', 1),
(4, '2018_07_03_135036_create_rubriques_table', 1),
(5, '2018_07_03_135404_create_blocs_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `pages`
--

CREATE TABLE `pages` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `menu_title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `place` smallint(6) NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publie` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pages`
--

INSERT INTO `pages` (`id`, `created_at`, `updated_at`, `deleted_at`, `title`, `menu_title`, `place`, `slug`, `publie`) VALUES
(1, '2018-09-10 13:27:33', '2018-09-13 08:08:59', NULL, 'Le bar à mots, caravane itinérante, compagnie Stomarabel', 'Accueil', 1, 'accueil', 1),
(2, '2018-09-13 05:54:09', '2018-09-14 05:49:03', NULL, 'Oulala la', 'Oula', 2, 'oula', 1),
(3, '2018-09-13 11:09:37', '2018-09-14 06:35:14', NULL, 'Contactez-nous !', 'Contact', 3, 'contact', 1);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rubriques`
--

CREATE TABLE `rubriques` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `contenu` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `place` smallint(6) NOT NULL,
  `cols` smallint(6) NOT NULL,
  `ascendant` tinyint(1) NOT NULL DEFAULT '1',
  `background_img_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_hd_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `page_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `rubriques`
--

INSERT INTO `rubriques` (`id`, `created_at`, `updated_at`, `deleted_at`, `contenu`, `place`, `cols`, `ascendant`, `background_img_url`, `background_hd_url`, `page_id`) VALUES
(1, '2018-09-10 13:27:33', '2018-09-13 11:00:58', NULL, '<h1>Le bar à mots</h1><h2><b>Caravane itinérante</b></h2><h2>Cie stomarabel</h2>', 1, 1, 1, 'storage/img/cerf.jpg', 'storage/img/cerf@2x.jpg', 1),
(2, '2018-09-13 05:54:09', '2018-09-14 08:40:54', NULL, '<h1 style=\"text-align: center;\" data-mce-style=\"text-align: center;\">Mes mots rient&nbsp; <img src=\"../storage/pictures/baramots_noir.png\" alt=\"timbre\" data-mce-src=\"../storage/pictures/baramots_noir.png\" width=\"400\" height=\"217\"><br></h1>', 1, 3, 1, 'storage/img/craft.jpg', 'storage/img/craft@2x.jpg', 2),
(4, '2018-09-12 22:00:00', '2018-09-12 22:00:00', NULL, 'footer', 0, 1, 1, NULL, NULL, NULL),
(5, '2018-09-13 11:09:37', '2018-09-13 12:11:54', NULL, '<h1>Contactez-nous !<br></h1>', 1, 2, 1, 'storage/img/craft.jpg', 'storage/img/craft@2x.jpg', 3);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', 'admin@admin.ad', '$2y$10$oLaVOd7MOZaOHv81DUS3IeR2j7Ca9FcvejXnWmilkIJiuJUTAHdHK', 'admin', 'znHoh8ALCy7m9cOtCAx3vGC6dbxTAHgySGQ1LgyjVu91n4OFxeM0Yxa643vA', '2018-09-10 13:27:33', '2018-09-10 13:27:33');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `blocs`
--
ALTER TABLE `blocs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blocs_rubrique_id_foreign` (`rubrique_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `rubriques`
--
ALTER TABLE `rubriques`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rubriques_page_id_foreign` (`page_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `blocs`
--
ALTER TABLE `blocs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `rubriques`
--
ALTER TABLE `rubriques`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `blocs`
--
ALTER TABLE `blocs`
  ADD CONSTRAINT `blocs_rubrique_id_foreign` FOREIGN KEY (`rubrique_id`) REFERENCES `rubriques` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `rubriques`
--
ALTER TABLE `rubriques`
  ADD CONSTRAINT `rubriques_page_id_foreign` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
