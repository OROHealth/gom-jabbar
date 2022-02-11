-- MySQL dump 10.13  Distrib 5.7.33, for Win64 (x86_64)
--
-- Host: localhost    Database: mens_db
-- ------------------------------------------------------
-- Server version	5.7.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `party_size` int(11) NOT NULL DEFAULT '1',
  `reference` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `reservation_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,3,'13ca0e88-b806-4f77-b0e0-63a65affb79b','2019-02-05 13:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,17),(2,4,'236003e1-6519-4a8b-b6f1-979e48ede4de','2019-02-05 13:30:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,45),(3,2,'5fb5de0c-ac5c-42ba-9c5a-2286729a3f9a','2019-02-06 19:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,51),(4,1,'99ff9be9-ccd6-4976-b812-d53e1d210f02','2019-02-06 10:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,89),(5,5,'7edc54aa-246d-41d1-9a82-56393e532085','2019-02-07 12:30:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,44),(6,4,'c6f78a1a-275b-4634-9a6b-bac31466753e','2019-02-08 09:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,39),(7,3,'5edddda4-0ae0-4730-ad37-a1a2f114217c','2019-02-08 14:15:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,86),(8,3,'bd12f265-95d1-43c8-bebc-e66f3684b34a','2019-02-09 12:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,17),(9,5,'b784f24b-1b16-4087-bc52-d289c51fb9c2','2019-02-09 09:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,39),(10,4,'4142fd61-c2f5-4772-8690-e3b037ed7399','2019-02-09 09:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,33),(11,3,'9fd752ba-3fbc-450b-b01c-049b8038fbeb','2019-02-06 13:30:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,78),(12,5,'b28b030e-30c2-4095-a75b-584609ebc88e','2019-02-06 17:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,84),(13,4,'beede63d-27c6-4586-9584-b30bd7ac5a9a','2019-02-06 14:00:00','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,9);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_dishes`
--

DROP TABLE IF EXISTS `customer_dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer_dishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `DishId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_dishes_DishId_CustomerId_unique` (`CustomerId`,`DishId`),
  KEY `DishId` (`DishId`),
  CONSTRAINT `customer_dishes_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_dishes_ibfk_2` FOREIGN KEY (`DishId`) REFERENCES `dishes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_dishes`
--

LOCK TABLES `customer_dishes` WRITE;
/*!40000 ALTER TABLE `customer_dishes` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `favorite_food` int(11) DEFAULT NULL,
  `favorite_drink` int(11) DEFAULT NULL,
  `bill_split` enum('PER GROUP','PER PERSON','WITH RATIOS') COLLATE utf8mb4_unicode_ci DEFAULT 'PER GROUP',
  `type` enum('OUT OF TOWN','IN TOWN','PART OF THE ROSE FAMILY') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_number` (`phone_number`),
  UNIQUE KEY `reference` (`reference`),
  KEY `favorite_food` (`favorite_food`),
  KEY `favorite_drink` (`favorite_drink`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`favorite_food`) REFERENCES `dishes` (`id`),
  CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`favorite_drink`) REFERENCES `dishes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Maggi','Domney','mdomney0@wisdompets.com','760-702-5469','944aa95f-47c9-4ce0-9574-e3c4bf79ccc3','53177 Fieldstone Pass','San Bernardino',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(2,'Javier','Dawks','jdawks1@red30design.com','860-906-1459','9ca6fffc-79e7-4022-abc3-4cf1c9eb3800','25629 Brown Trail','Hartford',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(3,'Aleen','Fasey','afasey2@kinetecoinc.com','561-410-2222','fc047aee-bc9a-4fe3-891f-561ec3afac9d','41967 Mockingbird Court','Boca Raton',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(4,'Taylor','Jenkins','tjenkins@rouxacademy.org','954-294-7424','a5766ef8-e079-48fa-861b-70122518f626','968 Bartillon Park','Fort Lauderdale',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(5,'Imogen','Kabsch','ikabsch@landonhotel.com','864-326-7456','a0f4aaad-42aa-4bc1-adc6-fd87d1c5b582','222 Hudson Point','Anderson',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(6,'Dunc','Winny','dwinny5@kinetecoinc.com','706-389-4923','f5408e34-5cdb-48a7-bb1b-6c4eba17e012','6 Derek Avenue','Columbus',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(7,'Cammi','Kynett','ckynett6@orangevalleycaa.org','202-798-6252','1eebc044-490d-4fe7-84fe-ff7af33a29a3','237 Homewood Hill','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(8,'Steffie','Kleis','skleis7@wisdompets.com','812-301-6915','30481241-6977-47d6-a1c0-3a0d37758f9a','360 Little Fleur Park','Evansville',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(9,'Carilyn','Calver','ccalver8@samoca.org','571-718-5931','c6bb1061-a93c-4eb1-973a-0ec525b77399','3664 Emmet Circle','Dulles',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(10,'Barbara-anne','Sweet','bsweet9@samoca.org','210-776-2859','08c2384f-d0c6-43c3-9a7e-22eafc344590','257 Mallory Drive','San Antonio',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(11,'Faina','Nelles','fnellesa@red30design.com','484-145-8882','6c5d9ad6-7dd7-4f5d-a8e0-0c50806fbf36','1143 Nevada Plaza','Reading',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(12,'Orton','Stavers','ostaversb@orangevalleycaa.org','571-414-2322','e679d041-4c33-4d82-b7a3-251935b05313','5 Pankratz Junction','Vienna',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(13,'Jobina','McKern','jmckernc@rouxacademy.org','805-540-9168','8816dff1-a2e3-4be8-9603-42c47ce978da','28 Dovetail Circle','San Mateo',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(14,'Paco','Yarranton','pyarrantond@rouxacademy.org','614-173-1770','ec5ca80b-bd1a-4476-9b82-e27f3b203b7d','1 Lighthouse Bay Hill','Columbus',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(15,'Chance','Todeo','ctodeoe@wisdompets.com','214-351-1058','fb609075-983e-447c-9af5-503716d16f85','2 Debra Trail','Dallas',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(16,'Carla','Swinfen','cswinfenf@kinetecoinc.com','574-883-7972','4df0b27b-5fc7-47c8-a759-eece28d442ff','949 Northview Junction','South Bend',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(17,'Lani','Over','loverg@wisdompets.com','719-792-4724','05968534-b822-4a2b-9b46-6e48d230c95c','8 Roxbury Point','Colorado Springs',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(18,'Anthe','Dinjes','adinjesh@samoca.org','202-164-5786','62f56c1b-ca06-457f-af7b-d59686b42026','4 American Road','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(19,'Amby','Harber','aharberi@hplussport.com','919-557-3321','9ca9f31a-18a6-4dde-83fb-8a1f377009ca','2985 Pearson Circle','Durham',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(20,'Jacinta','Vallis','jvallisj@kinetecoinc.com','661-103-5365','0722334d-67b9-4c37-b77a-a4fe64138785','9 Anzinger Lane','Bakersfield',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(21,'Henri','Pughe','hpughek@orangevalleycaa.org','434-339-5926','12cf71da-66d5-4c0c-8192-083234559c25','53 Blue Bill Park Point','Manassas',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(22,'Cassandre','Wragg','cwraggl@landonhotel.com','703-646-1738','98a5d257-6184-4b21-8a85-a87436d5224b','92285 Cascade Center','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(23,'Amory','Bunyard','abunyardm@samoca.org','785-691-3913','4ccb993d-a13b-40af-9e0e-e06592fd8cfc','9951 Buena Vista Point','Topeka',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(24,'Carny','Scamp','cscampn@wisdompets.com','212-198-3815','6961e14c-2735-445c-99b1-525797fc4cbc','9 Valley Edge Road','New York city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(25,'Paulie','Kinvig','pkinvigo@hplussport.com','215-647-3796','5b3b4f1c-efeb-4d09-b286-c1bf0a514333','564 Ryan Park','Philadelphia',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(26,'Taylor','Jenkins','tjenkins@redt30design.com','202-765-8011','1b92857a-6496-4ab1-b539-66bd1c705b2a','27170 6th Center','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(27,'Yves','Dell\'Abbate','ydellabbateq@rouxacademy.org','804-689-9010','809dd212-750f-452d-bc3c-4f9b3c092dba','68966 High Crossing Junction','Richmond',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(28,'Culley','Cawood','ccawoodr@samoca.org','202-959-7069','679ea931-ca6e-4c26-b6ed-049260a2082f','536 Darwin Trail','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(29,'Herby','Aspinal','haspinals@red30design.com','916-942-8188','7089876b-a3d9-45ac-9a01-d18ce58e7327','7 Maple Center','Sacramento',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(30,'Emlyn','Attwool','eattwoolt@hplussport.com','515-478-3690','caa904e3-b33d-4ead-aa61-ed33ed0815c0','289 Westridge Pass','Des Moines',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(31,'Osgood','Saunter','osaunteru@red30design.com','405-620-8345','7b183e2b-a1ec-43c4-8768-12fe1848c40b','9686 Havey Crossing','Oklahoma city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(32,'Demetri','Iacobacci','diacobacciv@landonhotel.com','302-843-4915','933754ab-56bb-4389-9ef7-37c31ee545ef','1727 Vermont Point','Newark',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(33,'Eloisa','Forster','eforsterw@wisdompets.com','269-400-8205','2a08d81f-77ee-4434-af72-a6dc2b5c2def','45084 Butterfield Point','Kalamazoo',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(34,'Carlin','Casterou','ccasteroux@landonhotel.com','915-815-0411','d673df63-5cfa-4e89-b6bc-52fa6fb7fa9a','17 Cordelia Trail','El Paso',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(35,'Luciano','Winton','lwintony@hplussport.com','336-968-8032','faecc6a7-e5f8-43d2-b0f6-b3bde0041d3a','386 Fairview Lane','Greensboro',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(36,'Allyson','Jira','ajiraz@wisdompets.com','315-720-5302','56db4425-b993-4a74-8097-0cd88cb2b176','51474 Northridge Pass','Syracuse',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(37,'Jillane','Livingstone','jlivingstone10@wisdompets.com','571-135-9052','582a41e6-ecc7-4c84-99d3-606b5a46b63a','4 Arizona Hill','Fairfax',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(38,'Christyna','McGilroy','cmcgilroy11@landonhotel.com','202-132-1057','7548c945-6ac1-4134-bc75-563760010f33','47989 East Court','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(39,'Oralla','Dayer','odayer12@samoca.org','916-274-8584','2ff8a8b3-5847-463e-b51b-6150a6a2a781','478 Sommers Pass','Sacramento',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(40,'Angelique','Farnham','afarnham13@wisdompets.com','479-118-1613','ccf082e3-dd52-475c-b16c-c2b46148abbf','564 Ohio Crossing','Fort Smith',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(41,'Lowrance','Gratton','lgratton14@hplussport.com','212-562-3242','242fa416-28b2-4a62-8c9a-1ee99caea403','675 Warner Street','New York city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(42,'Cleo','Goldwater','cgoldwater15@landonhotel.com','903-791-7266','658ca18f-1189-48e8-835d-ae6afa0779ff','9831 Evergreen Way','Tyler',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(43,'Menard','Pitone','mpitone16@red30design.com','318-237-8464','b43dc3b0-9d73-4cd6-997e-95a1ba21acac','8 Petterle Road','Boston',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(44,'Davy','Neely','dneely17@hplussport.com','407-752-8159','ee11ad7f-bfab-4bce-afbe-187443b35078','1 Shelley Road','Orlando',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(45,'Zechariah','Deniske','zdeniske18@kinetecoinc.com','256-909-6656','61b43072-eb9f-45e2-bf3c-f3f7ed47632b','78 Hayes Lane','Gadsden',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(46,'Serge','Pethrick','spethrick19@rouxacademy.org','724-424-9472','ab794ab7-94da-4727-b7df-0eb66eb85df3','65 Sunbrook Crossing','New Castle',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(47,'Lydie','Awmack','lawmack1a@samoca.org','571-709-9837','35386c67-4a13-4c1e-b51a-f031f0195d38','454 Prairie Rose Street','Springfield',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(48,'Clementia','Furminger','cfurminger1b@kinetecoinc.com','915-622-4479','f48d334b-bae8-4775-a6e1-dd58d6f266aa','78 Longview Avenue','El Paso',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(49,'Cathryn','Beau','cbeau1c@wisdompets.com','775-437-9114','887efa32-df00-44fb-b339-d6c32283a3e2','8860 Lien Road','Reno',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(50,'Jack','Vaan','jvaan1d@wisdompets.com','208-648-3163','0b040e09-1bd4-4361-81ed-1b60828ec434','75 Gateway Circle','Boise',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(51,'Romeo','Annett','rannett1e@samoca.org','212-548-7727','d1b9f39a-2c6a-4e0b-ae5e-623d3ac790d9','9229 Harbort Point','New York city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(52,'Arlen','O\'Fihillie','aofihillie1f@wisdompets.com','915-295-2257','a12fc959-09ec-4706-8318-ec01c5f9bbd2','20 Bartelt Circle','El Paso',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(53,'Perceval','Redpath','predpath1g@rouxacademy.org','301-713-2688','f844b865-066d-438f-987e-da88eed53ff5','98 Messerschmidt Court','Hyattsville',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(54,'Ive','Iles','iiles1h@samoca.org','415-544-7619','a3598afc-77a2-4667-bc35-dc5a8af0e280','75922 Fieldstone Terrace','San Francisco',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(55,'Robbert','Walkowski','rwalkowski1i@kinetecoinc.com','626-967-1974','38a9ce99-4390-4b84-b267-0c7645f304a0','43 Fair Oaks Crossing','Los Angeles',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(56,'Hagen','Itzhayek','hitzhayek1j@landonhotel.com','415-340-3585','79bf7e81-d651-40a0-b197-7072d0c735cb','32205 Drewry Plaza','San Francisco',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(57,'Kahaleel','Keaton','kkeaton1k@kinetecoinc.com','562-637-8856','5d920740-4a91-4f40-a780-29fa793a02bc','88256 Roxbury Pass','Long Beach',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(58,'Purcell','Llop','pllop1l@hplussport.com','727-959-7623','bc616d2a-1a09-486e-b768-95de25ef068d','8630 Loeprich Plaza','Clearwater',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(59,'Cornelia','Koppe','ckoppe1m@landonhotel.com','772-132-3079','3894ec01-ae38-4378-851f-c5737d2894b4','30278 Little Fleur Terrace','Vero Beach',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(60,'Olympia','Sansun','osansun1n@wisdompets.com','212-188-0416','cfe80203-4a53-4192-ab22-d19577c13aa5','76 Ruskin Street','Brooklyn',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(61,'Rubia','Fitzsymon','rfitzsymon1o@red30design.com','813-121-0276','4d9fcfcc-be22-44a8-9de3-1ab6b33457a5','79 Rieder Avenue','Tampa',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(62,'Tybie','Balme','tbalme1p@orangevalleycaa.org','423-364-2730','d09144d7-dde8-4898-8e3e-1bdcac0a18bc','17 Pine View Court','Johnson city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(63,'Forest','Dubock','fdubock1q@red30design.com','918-881-4322','e1f0b531-3241-4764-bc8d-2862eae10d86','3418 Maryland Circle','Tulsa',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(64,'Norby','Sleight','nsleight1r@kinetecoinc.com','405-786-8722','1f728890-a352-4cb9-b58c-76c086c943bf','16198 Welch Place','Oklahoma city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(65,'Hayyim','Rossander','hrossander1s@wisdompets.com','323-318-8768','90b26633-7a76-4331-9047-cede615fe674','5 American Ash Court','Long Beach',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(66,'Gilbert','Dupoy','gdupoy1t@rouxacademy.org','419-487-3597','65675a4b-352f-467b-9095-18e9f49a1ab8','90863 Hermina Center','Toledo',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(67,'Whitney','Lamberts','wlamberts1u@red30design.com','858-417-9425','b37f847e-5563-4de3-88ca-68b6d312562a','23 Fairview Lane','San Diego',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(68,'Anastasie','Ferguson','aferguson1v@landonhotel.com','801-920-5569','ecb141fd-fec4-460c-8726-e063afdc5a6c','28138 Kenwood Park','Salt Lake city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(69,'Alaster','Ruggles','aruggles1w@red30design.com','651-761-7780','398450ce-a361-4da8-b54a-7fc5f0872281','661 Grover Center','Saint Paul',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(70,'Loretta','Hundey','lhundey1x@kinetecoinc.com','310-730-8619','91dfd81f-ec40-4bad-8ea6-e7f0af4b3804','6939 Elka Place','Los Angeles',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(71,'Winnah','D\'Elia','wdelia1y@red30design.com','626-579-3814','f61a554f-ada8-4eb7-bca5-75c33a70e737','489 Almo Drive','Whittier',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(72,'Trip','Pond','tpond1z@wisdompets.com','408-716-4969','6246d0db-c5ec-4c68-b304-ddcdf70f83af','653 Manley Alley','San Jose',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(73,'Merle','Sukbhans','msukbhans20@orangevalleycaa.org','616-189-2213','2ececc7b-47ed-4ea8-b5c6-75123463bdd9','574 Cherokee Terrace','Grand Rapids',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(74,'Giraldo','Algar','galgar21@kinetecoinc.com','585-956-6225','087886a9-65e3-4550-a85d-ea742e94c212','17 Knutson Drive','Rochester',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(75,'Bevvy','Harrowsmith','bharrowsmith22@red30design.com','210-572-0107','dc406e7b-71b2-49a4-9abe-74b78b6020b7','33 Crescent Oaks Lane','San Antonio',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(76,'Dyanna','Fulger','dfulger23@red30design.com','540-320-0153','94192341-a182-452e-8dfa-0dff2c8be246','15859 Kings Pass','Roanoke',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(77,'Viola','McLarnon','vmclarnon24@orangevalleycaa.org','704-789-2133','60ed1412-673f-488d-a793-4564f17b7a04','16 Hanover Street','Charlotte',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(78,'Dorella','Linbohm','dlinbohm25@rouxacademy.org','203-835-7673','a1b243b9-b795-41b5-b472-7a4294d44a9b','531 Mccormick Street','Stamford',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(79,'Winslow','Klass','wklass26@kinetecoinc.com','318-130-3322','ccd3e1e6-12f2-42ec-b21d-b171ea84cf5a','7 Green Road','Shreveport',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(80,'Francisca','Cranmor','fcranmor27@wisdompets.com','757-141-3735','54f649a1-621a-40ad-a9cd-31a43d06a0e0','2161 Holy Cross Terrace','Norfolk',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(81,'Gustave','Alphonso','galphonso28@wisdompets.com','702-709-0059','7c0ace02-b9e2-48d1-bc4c-636539a3f813','4855 Messerschmidt Crossing','Las Vegas',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(82,'Jacquette','Spillard','jspillard29@red30design.com','253-406-0669','be38583d-045c-4d1b-bb5f-34d929628bbb','168 Clemons Avenue','Tacoma',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(83,'Caril','Matejic','cmatejic2a@orangevalleycaa.org','616-748-1299','881d33b4-b0e8-4c7d-8fd6-7e79b1c0dfb8','7 Texas Hill','Grand Rapids',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(84,'Sianna','Drewell','sdrewell2b@kinetecoinc.com','414-182-9923','2b6a3010-c769-4aa6-8451-aa8f6117f482','62198 Bultman Park','Milwaukee',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(85,'Sonnie','MatticcI','smatticci2c@rouxacademy.org','805-544-5902','47e20009-5cb5-4f57-9941-3b4f50536261','2 Roxbury Avenue','Simi Valley',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(86,'Brandais','Jeannaud','bjeannaud2d@hplussport.com','405-272-0078','3781d874-f021-4ba7-97bd-276eb2e85553','19539 Melvin Place','Oklahoma city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(87,'Junie','MacRury','jmacrury2e@wisdompets.com','337-515-7385','566cef5a-be90-47bc-8fd9-5cc2f5247ab2','2958 Maple Wood Road','Lake Charles',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(88,'Gus','Holyland','gholyland2f@red30design.com','425-916-5021','fd15ed6b-05aa-41e2-8ffa-3aef7c752c8e','62 8th Pass','Seattle',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(89,'Ab','Jurn','ajurn2g@samoca.org','415-269-1567','5863437d-5989-4d94-b693-613e79e32f45','11398 Norway Maple Place','Oakland',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(90,'Elmo','Ockland','eockland2h@landonhotel.com','202-866-5269','48c25676-982d-48c7-a492-2ff68d70220b','38494 Mitchell Park','Washington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(91,'Iver','Palke','ipalke2i@rouxacademy.org','215-247-9059','9eac9d02-f84e-4e7a-842d-43a3b5ba52d0','25182 Roxbury Avenue','Philadelphia',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(92,'Asher','Tapley','atapley2j@kinetecoinc.com','786-938-4977','f3c5436b-346a-4ec9-9e3a-48a958fb932c','720 Saint Paul Plaza','Hialeah',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(93,'Joel','Baignard','jbaignard2k@orangevalleycaa.org','806-995-6798','b9794ca8-91c1-4826-a5d7-f0117b145168','8 High Crossing Court','Amarillo',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(94,'Curr','Fittall','cfittall2l@orangevalleycaa.org','920-248-2709','96e2491c-6a0b-4005-bb26-eb57780f61c5','530 Mallory Pass','Green Bay',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(95,'Lelah','Seathwright','lseathwright2m@samoca.org','713-248-4719','608b2860-d5ed-4b21-958a-58a7304e2a37','2649 Bellgrove Way','Houston',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(96,'Melantha','Scowcroft','mscowcroft2n@kinetecoinc.com','212-694-0087','93655cbf-b78c-4f86-9950-814822de3e0f','23879 Reindahl Center','New York city',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(97,'Herb','McParland','hmcparland2o@rouxacademy.org','630-950-3309','2af3dbbe-f2e9-4f30-b568-66e0fc74336b','39 Algoma Park','Chicago',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(98,'Clem','Durdy','cdurdy2p@hplussport.com','515-680-5018','82a053af-9a77-4106-ad4d-ee65d488d71b','594 Bonner Point','Des Moines',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(99,'Kala','Simonian','ksimonian2q@landonhotel.com','304-681-5208','8d792047-ab97-414a-8ce0-e2ff39d2fa59','95 Waywood Street','Huntington',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(100,'Blythe','Leggan','bleggan2r@rouxacademy.org','334-770-7364','43ace082-62b6-4d32-9f13-05dc36e575a5','1622 Golf Course Hill','Montgomery',NULL,NULL,'PER GROUP','OUT OF TOWN','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dishes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` float NOT NULL,
  `last_preparation_date` datetime DEFAULT NULL,
  `conservation_time` int(11) NOT NULL DEFAULT '60' COMMENT 'the time of conservation at freeze',
  `type` enum('FOOD','DRINK') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'FOOD',
  `status` enum('PAID','UNPAID','REJECTED','ACCEPTED') COLLATE utf8mb4_unicode_ci DEFAULT 'ACCEPTED',
  `active` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes`
--

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES (1,'Parmesan Deviled Eggs ','These delectable little bites are made with organic eggs, fresh Parmesan, and chopped pine nuts.  ','06d77e15-da91-47bb-a073-0892dda87fd6',8,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(2,'Artichokes with Garlic Aioli','Our artichokes are brushed with an olive oil and rosemary blend and then broiled to perfection. Served with a side of creamy garlic aioli.','1bfdd957-c135-48e7-89cf-a5fde9e6a1d0',9,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(3,'French Onion Soup','Caramelized onions slow cooked in a savory broth, topped with sourdough and a provolone cheese blend. Served with sourdough bread.','8d900737-18e7-4a92-a94c-3ffc3f80c0c6',7,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(4,'Mini Cheeseburgers ','These mini cheeseburgers are served on a fresh baked pretzel bun with lettuce, tomato, avocado, and your choice of cheese.','a7fb7600-fff2-479f-a0a9-ae2839615434',8,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(5,'Panko Stuffed Mushrooms ','Large mushroom caps are filled a savory cream cheese, bacon and panko breadcrumb stuffing, topped with cheddar cheese. ','2b990fd5-e408-4f4d-bec2-66d067ff40e4',7,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(6,'Garden Buffet','Choose from our fresh local, organically grown ingredients to make a custom salad.','f217fc3a-969e-4fc5-ad9f-e8c496f705b1',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(7,'House Salad','Our house salad is made with romaine lettuce and spinach, topped with tomatoes, cucumbers, red onions and carrots. Served with a dressing of your choice.','81ff9c8c-ac45-4f4a-815d-27a3e66edf3d',7,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(8,'Chef\'s Salad','The chef\'s salad has cucumber, tomatoes, red onions, mushrooms, hard-boiled eggs, cheese, and hot grilled chicken on a bed of romaine lettuce. Served with croutons and your choice of dressing.','44bb420e-d911-4ebc-bb61-0273edceadae',9,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(9,'Quinoa Salmon Salad','Our quinoa salad is served with quinoa, tomatoes, cucumber, scallions, and smoked salmon. Served with your choice of dressing.','1b8a6259-a7be-491e-9a6b-bff7d57706e9',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(10,'Classic Burger','Our classic burger is made with 100% pure angus beef, served with lettuce, tomatoes, onions, pickles, and cheese of your choice. Veggie burger available upon request. Served with French fries, fresh fruit, or a side salad.','c88ec20d-1883-4c66-ae3e-2014f11baa7a',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(11,'Tomato Bruschetta Tortellini','This classic cheese tortellini is cooked in a sundried tomato sauce. Served with bruschetta topped with a tomato and basil marinara.','a98cfdfa-f523-4323-90b7-e812d2582a22',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(12,'Handcrafted Pizza','Our thin crust pizzas are made fresh daily and topped with your choices of fresh meats, veggies, cheese, and sauce.  Price includes two toppings. Add $1 for each additional topping.','62bc917c-ce90-4d28-b84f-8148d2a7be25',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(13,'Barbecued Tofu Skewers','Our barbecued skewers include tofu, cherry tomatoes, bell peppers, and zucchini marinated in a ginger sesame sauce and charbroiled. Served with steamed rice.','2e4ac144-782c-42e5-91c9-cbab34983ec8',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(14,'Fiesta Family Platter','This platter is perfect for sharing! Enjoy our spicy buffalo wings, traditional nachos, and cheese quesadillas served with freshly made guacamole dip.','bcbf1968-a7a1-4eea-9405-20145e378e21',9.99,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(15,'Creme Brulee','Elegantly crafted creamy vanilla custard with a caramelized crunchy layer on top. Served with seasonal fruit.','559dcb1a-9924-48c4-a813-ef8f5c56f88a',9,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(16,'Cheesecake','Our New York Style Cheesecake is rich, smooth, and creamy. Available in various flavors, and with seasonal fruit toppings.','19a1d2a8-a1cb-412b-b37d-89af3b546382',9,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(17,'Chocolate Chip Brownie ','A warm chocolate chip brownie served with chocolate or vanilla ice cream and rich chocolate sauce.','13430bc6-0e76-4e7e-8ee0-7e73445f93cf',6,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(18,'Apple Pie','Made with local granny smith apples to bring you the freshest classic apple pie available.','8399b13f-b56e-4af3-9252-2a98e4bda389',5,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(19,'Mixed Berry Tart','Raspberries, blueberries, and strawberries on top of a creamy filling served in a crispy tart.','03990a53-dafd-4e6a-b927-99d542e9dd25',7,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(20,'Tropical Blue Smoothie','This blueberry mint-based smoothie is refreshing and perfect for any celebration.','af069761-db5d-4264-b1a4-d23a0ccd7ef2',6,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(21,'Pomegranate Iced Tea','Our unique blend of pomegranate juice, black Rooibos, and mint tea creates this light fusion of flavors.  ','717e5901-f231-4a05-9e84-7ea22af80b3d',4,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL),(22,'Cafe Latte','Our house blend of espresso and foamed milk. Can be served with flavored syrups and over ice.  Non-dairy substitutions available upon request.','a07bd17f-b7e6-4ac0-82c6-cd175919fabf',6,NULL,60,'FOOD','ACCEPTED',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL);
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes_orders`
--

DROP TABLE IF EXISTS `dishes_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dishes_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT '1',
  `price` float NOT NULL,
  `over_cooked_level` enum('1','2','3','4','5','6','7','8','9','10') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '5',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `DishId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dishes_orders_OrderId_DishId_unique` (`DishId`,`OrderId`),
  KEY `OrderId` (`OrderId`),
  CONSTRAINT `dishes_orders_ibfk_1` FOREIGN KEY (`DishId`) REFERENCES `dishes` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `dishes_orders_ibfk_2` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes_orders`
--

LOCK TABLES `dishes_orders` WRITE;
/*!40000 ALTER TABLE `dishes_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `dishes_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `tone` enum('angry','happy','overhelmed','pregnant','moody','bored','excited') COLLATE utf8mb4_unicode_ci NOT NULL,
  `party_size` int(11) DEFAULT NULL,
  `customers` text COLLATE utf8mb4_unicode_ci,
  `feedback` text COLLATE utf8mb4_unicode_ci,
  `server` int(11) DEFAULT NULL,
  `status` enum('PAID','UNPAID','REJECTED','ACCEPTED') COLLATE utf8mb4_unicode_ci DEFAULT 'ACCEPTED',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  KEY `server` (`server`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`server`) REFERENCES `servers` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'30dc96df-c99c-4154-bbdd-964f423ab98c','2019-02-01 16:32:00','happy',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,17),(2,'962ad49d-a856-4b76-9874-f776aaebec4b','2019-02-02 15:52:00','angry',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,17),(3,'f6d03ac8-eac3-47c5-91f2-b21d5dd9c909','2019-02-02 15:53:00','pregnant',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,2),(4,'b78acfb8-37b5-4921-a742-acce8c101614','2019-02-02 15:58:00','overhelmed',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,45),(5,'466c9d52-e2bb-4bf7-a354-1829d318b49a','2019-02-03 11:04:00','moody',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,86),(6,'352eb35b-29cd-4e08-ae5b-1a8572f5cd7e','2019-02-04 13:31:00','bored',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,39),(7,'32652fb9-7e43-40a5-b58a-2bbd121defd0','2019-03-15 10:31:00','excited',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,71),(8,'dce0efbb-9217-41d3-a7f1-cd6455c58243','2019-03-15 15:22:00','happy',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,17),(9,'301fd906-10c0-4e8c-90c0-4c56c56eee22','2019-03-15 17:29:00','angry',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,51),(10,'99cd4fbc-e229-469b-84ef-5a83bfb2efce','2019-03-15 18:25:00','overhelmed',0,'[]','',1,'ACCEPTED','2022-01-15 20:04:01','2022-01-15 20:04:01',NULL,66);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` int(11) DEFAULT '0',
  `description` text COLLATE utf8mb4_unicode_ci,
  `published` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `published` tinyint(1) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servers`
--

DROP TABLE IF EXISTS `servers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `servers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci,
  `token` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servers`
--

LOCK TABLES `servers` WRITE;
/*!40000 ALTER TABLE `servers` DISABLE KEYS */;
INSERT INTO `servers` VALUES (1,'john','Doe','johndoe@example.com','53177XFieldstoneXPass','San Bernardino',1,'2022-01-15 20:04:01','2022-01-15 20:04:01',NULL);
/*!40000 ALTER TABLE `servers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-16  0:16:02
