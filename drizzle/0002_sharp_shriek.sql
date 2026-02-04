CREATE TABLE `brokerApplications` (
	`id` varchar(36) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`creci` varchar(50) NOT NULL,
	`experiencia` varchar(50),
	`regiao` varchar(100),
	`mensagem` text,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `brokerApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contactMessages` (
	`id` varchar(36) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`assunto` varchar(100) NOT NULL,
	`mensagem` text NOT NULL,
	`status` varchar(50) NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
