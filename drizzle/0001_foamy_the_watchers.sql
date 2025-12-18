CREATE TABLE `properties` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`price` int NOT NULL,
	`address` varchar(255) NOT NULL,
	`city` varchar(100) NOT NULL,
	`state` varchar(2) NOT NULL,
	`latitude` decimal(10,8) NOT NULL,
	`longitude` decimal(11,8) NOT NULL,
	`bedrooms` int NOT NULL,
	`bathrooms` int NOT NULL,
	`area` int NOT NULL,
	`parking` int NOT NULL,
	`description` text,
	`status` varchar(50) NOT NULL DEFAULT 'available',
	`mainImageUrl` varchar(500),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `properties_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `propertyImages` (
	`id` varchar(36) NOT NULL,
	`propertyId` varchar(36) NOT NULL,
	`imageUrl` varchar(500) NOT NULL,
	`order` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `propertyImages_id` PRIMARY KEY(`id`)
);
