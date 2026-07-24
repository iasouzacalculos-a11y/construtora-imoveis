CREATE TABLE `heroMedia` (
	`id` varchar(36) NOT NULL,
	`mediaUrl` varchar(500) NOT NULL,
	`mediaType` enum('image','video') NOT NULL DEFAULT 'image',
	`duration` int NOT NULL DEFAULT 5,
	`order` int NOT NULL DEFAULT 0,
	`active` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `heroMedia_id` PRIMARY KEY(`id`)
);
