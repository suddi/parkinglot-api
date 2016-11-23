--
-- Table structure for table `credentials`
--
CREATE TABLE `credentials` (
    `id` varchar(40) NOT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT IGNORE INTO credentials (id) VALUES ("3299cd19-9960-4de4-a737-3882bfca64f1");

--
-- Table structure for table `pricing`
--
CREATE TABLE `pricing` (
    `id` int(11) unsigned NOT NULL,
    `currency` varchar(3) NOT NULL DEFAULT "EUR",
    `standardPricingInCents` int(11) unsigned NOT NULL,
    `discountPricingInCents` int(11) unsigned DEFAULT NULL,
    `discountAppliedAfter` int(11) unsigned DEFAULT NULL,
    `validFrom` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `validUntil` datetime DEFAULT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `cars`
--
CREATE TABLE `cars` (
    `id` varchar(100) NOT NULL,
    `brand` varchar(100) DEFAULT NULL,
    `licensePlate` varchar(100) NOT NULL,
    `parkingLotId` varchar(100) NOT NULL,
    `parkingTime` datetime NOT NULL,
    `pricingId` int(11) unsigned DEFAULT NULL,
    `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `fk_pricingId_idx` (`pricingId`),
    CONSTRAINT `fk_pricingId` FOREIGN KEY (`pricingId`) REFERENCES `pricing` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
