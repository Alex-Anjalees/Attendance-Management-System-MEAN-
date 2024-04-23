/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : employee-attendance

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 29/01/2024 12:13:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attendances
-- ----------------------------
DROP TABLE IF EXISTS `attendances`;
CREATE TABLE `attendances`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NULL DEFAULT NULL,
  `departmentId` int NULL DEFAULT NULL,
  `shiftId` int NULL DEFAULT NULL,
  `roleId` int NULL DEFAULT NULL,
  `attendanceDate` date NULL DEFAULT NULL,
  `attendanceTime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `present` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `approved` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `addedBy` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  INDEX `departmentId`(`departmentId` ASC) USING BTREE,
  INDEX `shiftId`(`shiftId` ASC) USING BTREE,
  INDEX `roleId`(`roleId` ASC) USING BTREE,
  CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attendances_ibfk_2` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attendances_ibfk_3` FOREIGN KEY (`shiftId`) REFERENCES `shifts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `attendances_ibfk_4` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 91 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendances
-- ----------------------------
INSERT INTO `attendances` VALUES (32, 2, 1, 3, 1, '2024-01-18', '12:28:29', 'present', '2024-01-18 06:15:32', '2024-01-18 06:58:29', 'yes', 'admin');
INSERT INTO `attendances` VALUES (34, 5, 2, 2, 1, '2024-01-17', '19:52:19', 'absent', '2024-01-18 06:17:51', '2024-01-19 14:22:19', 'yes', 'admin');
INSERT INTO `attendances` VALUES (36, 7, 1, 1, 1, '2024-01-18', '11:50:36', 'present', '2024-01-18 06:20:36', '2024-01-18 06:20:36', 'yes', 'admin');
INSERT INTO `attendances` VALUES (37, 3, 1, 1, 1, '2024-01-18', '00:52:07', 'present', '2024-01-18 06:39:03', '2024-01-19 19:22:07', 'yes', 'admin');
INSERT INTO `attendances` VALUES (38, 4, 2, 3, 1, '2024-01-18', '13:53:25', 'present', '2024-01-18 06:57:24', '2024-01-18 08:23:25', 'yes', 'admin');
INSERT INTO `attendances` VALUES (40, 8, 1, 4, 1, '2024-01-18', '13:53:30', 'present', '2024-01-18 08:23:30', '2024-01-18 08:23:30', 'yes', 'admin');
INSERT INTO `attendances` VALUES (41, 2, 1, 3, 1, '2024-01-19', '18:08:35', 'present', '2024-01-19 05:05:27', '2024-01-19 12:38:35', 'yes', 'admin');
INSERT INTO `attendances` VALUES (42, 3, 1, 1, 1, '2024-01-19', '10:35:28', 'present', '2024-01-19 05:05:28', '2024-01-19 05:05:28', 'yes', 'admin');
INSERT INTO `attendances` VALUES (43, 5, 2, 2, 1, '2024-01-19', '10:35:30', 'present', '2024-01-19 05:05:30', '2024-01-19 05:05:30', 'yes', 'admin');
INSERT INTO `attendances` VALUES (44, 4, 2, 3, 1, '2024-01-19', '13:51:54', 'present', '2024-01-19 08:21:54', '2024-01-19 08:21:54', 'yes', 'admin');
INSERT INTO `attendances` VALUES (45, 6, 2, 2, 1, '2024-01-19', '13:51:56', 'present', '2024-01-19 08:21:56', '2024-01-19 08:21:56', 'yes', 'admin');
INSERT INTO `attendances` VALUES (46, 10, 3, 4, 1, '2024-01-19', '13:51:58', 'present', '2024-01-19 08:21:58', '2024-01-19 08:21:58', 'yes', 'admin');
INSERT INTO `attendances` VALUES (47, 8, 1, 4, 1, '2024-01-19', '13:52:02', 'absent', '2024-01-19 08:22:01', '2024-01-19 08:22:02', 'yes', 'admin');
INSERT INTO `attendances` VALUES (48, 2, 1, 3, 1, '2024-01-12', '14:00:00', 'present', '2024-01-19 12:38:25', '2024-01-19 12:38:25', 'yes', 'admin');
INSERT INTO `attendances` VALUES (49, 2, 1, 3, 1, '2024-01-14', '18:08:27', 'present', '2024-01-19 12:38:27', '2024-01-19 12:38:27', 'yes', 'admin');
INSERT INTO `attendances` VALUES (50, 2, 1, 3, 1, '2024-01-16', '19:57:00', 'absent', '2024-01-19 12:38:29', '2024-01-19 14:27:00', 'yes', 'admin');
INSERT INTO `attendances` VALUES (53, 2, 1, 3, 1, '2024-01-15', '19:58:01', 'absent', '2024-01-19 14:26:18', '2024-01-19 14:28:01', 'yes', 'admin');
INSERT INTO `attendances` VALUES (54, 3, 1, 1, 1, '2024-01-17', '00:55:56', 'present', '2024-01-19 19:25:49', '2024-01-19 19:25:56', 'yes', 'admin');
INSERT INTO `attendances` VALUES (55, 6, 2, 2, 1, '2024-01-18', '00:57:52', 'absent', '2024-01-19 19:27:49', '2024-01-19 19:27:52', 'yes', 'admin');
INSERT INTO `attendances` VALUES (57, 4, 2, 3, 1, '2024-01-20', '10:15:47', 'present', '2024-01-20 04:45:47', '2024-01-20 04:45:47', 'yes', 'admin');
INSERT INTO `attendances` VALUES (58, 5, 2, 2, 1, '2024-01-20', '10:15:50', 'absent', '2024-01-20 04:45:49', '2024-01-20 04:45:50', 'yes', 'admin');
INSERT INTO `attendances` VALUES (59, 6, 2, 2, 1, '2024-01-20', '10:15:54', 'present', '2024-01-20 04:45:54', '2024-01-20 04:45:54', 'yes', 'admin');
INSERT INTO `attendances` VALUES (60, 8, 1, 4, 1, '2024-01-20', '10:15:57', 'present', '2024-01-20 04:45:57', '2024-01-20 04:45:57', 'yes', 'admin');
INSERT INTO `attendances` VALUES (61, 11, 2, 2, 1, '2024-01-20', '10:16:00', 'present', '2024-01-20 04:46:00', '2024-01-20 04:46:00', 'yes', 'admin');
INSERT INTO `attendances` VALUES (63, 10, 3, 4, 1, '2024-01-20', '10:16:05', 'present', '2024-01-20 04:46:05', '2024-01-20 18:58:03', 'yes', 'admin');
INSERT INTO `attendances` VALUES (65, 3, 1, 1, 1, '2024-01-20', '15:09:25', 'absent', '2024-01-20 09:39:22', '2024-01-20 18:32:44', 'yes', 'admin');
INSERT INTO `attendances` VALUES (69, 2, 1, 3, 1, '2024-01-20', '02:15:46', 'present', '2024-01-20 20:13:54', '2024-01-21 08:04:28', 'yes', 'user');
INSERT INTO `attendances` VALUES (77, 2, 1, 3, 1, '2024-01-21', '00:50:25', 'present', '2024-01-21 19:20:25', '2024-01-21 19:20:47', 'yes', 'user');
INSERT INTO `attendances` VALUES (79, 4, 2, 3, 1, '2024-01-22', '11:19:07', 'present', '2024-01-22 05:49:07', '2024-01-22 05:49:07', 'yes', 'admin');
INSERT INTO `attendances` VALUES (80, 5, 2, 2, 1, '2024-01-22', '11:19:09', 'absent', '2024-01-22 05:49:08', '2024-01-22 05:49:09', 'yes', 'admin');
INSERT INTO `attendances` VALUES (81, 7, 1, 1, 1, '2024-01-22', '11:19:14', 'present', '2024-01-22 05:49:14', '2024-01-22 05:49:14', 'yes', 'admin');
INSERT INTO `attendances` VALUES (82, 10, 3, 4, 1, '2024-01-22', '11:19:18', 'present', '2024-01-22 05:49:18', '2024-01-22 05:49:18', 'yes', 'admin');
INSERT INTO `attendances` VALUES (83, 6, 2, 2, 1, '2024-01-22', '11:19:21', 'absent', '2024-01-22 05:49:20', '2024-01-22 05:49:21', 'yes', 'admin');
INSERT INTO `attendances` VALUES (86, 11, 2, 2, 1, '2024-01-22', '11:19:40', 'absent', '2024-01-22 05:49:33', '2024-01-22 05:49:40', 'yes', 'admin');
INSERT INTO `attendances` VALUES (89, 2, 1, 3, 1, '2024-01-22', '11:36:38', 'present', '2024-01-22 06:06:38', '2024-01-22 06:06:57', 'yes', 'user');
INSERT INTO `attendances` VALUES (97, 3, 1, 1, 1, '2024-01-28', '21:09:21', 'present', '2024-01-28 15:39:21', '2024-01-28 15:39:21', 'yes', 'admin');
INSERT INTO `attendances` VALUES (98, 2, 1, 3, 1, '2024-01-27', '21:48:26', 'present', '2024-01-28 16:18:26', '2024-01-28 16:18:26', 'yes', 'admin');
INSERT INTO `attendances` VALUES (99, 2, 1, 3, 1, '2024-01-25', '21:48:29', 'present', '2024-01-28 16:18:29', '2024-01-28 16:18:29', 'yes', 'admin');
INSERT INTO `attendances` VALUES (100, 2, 1, 3, 1, '2024-01-28', '22:02:45', 'present', '2024-01-28 16:32:45', '2024-01-28 16:32:45', 'yes', 'admin');
INSERT INTO `attendances` VALUES (101, 5, 2, 2, 1, '2024-01-28', '22:02:48', 'present', '2024-01-28 16:32:48', '2024-01-28 16:32:48', 'yes', 'admin');
INSERT INTO `attendances` VALUES (102, 4, 2, 3, 1, '2024-01-28', '22:02:53', 'absent', '2024-01-28 16:32:52', '2024-01-28 16:32:53', 'yes', 'admin');
INSERT INTO `attendances` VALUES (103, 6, 2, 2, 1, '2024-01-28', '00:09:04', 'present', '2024-01-28 18:39:04', '2024-01-28 18:39:04', 'yes', 'admin');
INSERT INTO `attendances` VALUES (104, 8, 1, 4, 1, '2024-01-28', '00:09:06', 'present', '2024-01-28 18:39:06', '2024-01-28 18:39:06', 'yes', 'admin');
INSERT INTO `attendances` VALUES (105, 10, 3, 4, 1, '2024-01-28', '00:09:09', 'present', '2024-01-28 18:39:09', '2024-01-28 18:39:09', 'yes', 'admin');
INSERT INTO `attendances` VALUES (106, 11, 2, 2, 1, '2024-01-28', '00:09:10', 'present', '2024-01-28 18:39:10', '2024-01-28 18:39:10', 'yes', 'admin');
INSERT INTO `attendances` VALUES (107, 7, 1, 1, 1, '2024-01-28', '00:09:12', 'absent', '2024-01-28 18:39:12', '2024-01-28 18:39:12', 'yes', 'admin');
INSERT INTO `attendances` VALUES (108, 6, 2, 2, 1, '2024-01-29', '00:09:14', 'present', '2024-01-28 18:39:14', '2024-01-28 18:39:14', 'yes', 'admin');
INSERT INTO `attendances` VALUES (109, 7, 1, 1, 1, '2024-01-29', '00:09:15', 'present', '2024-01-28 18:39:15', '2024-01-28 18:39:15', 'yes', 'admin');
INSERT INTO `attendances` VALUES (110, 8, 1, 4, 1, '2024-01-29', '00:09:16', 'present', '2024-01-28 18:39:16', '2024-01-28 18:39:16', 'yes', 'admin');
INSERT INTO `attendances` VALUES (111, 10, 3, 4, 1, '2024-01-29', '00:09:18', 'absent', '2024-01-28 18:39:18', '2024-01-28 18:39:18', 'yes', 'admin');
INSERT INTO `attendances` VALUES (112, 11, 2, 2, 1, '2024-01-29', '00:09:20', 'present', '2024-01-28 18:39:20', '2024-01-28 18:39:20', 'yes', 'admin');
INSERT INTO `attendances` VALUES (113, 4, 2, 3, 1, '2024-01-29', '00:09:24', 'present', '2024-01-28 18:39:24', '2024-01-28 18:39:24', 'yes', 'admin');
INSERT INTO `attendances` VALUES (114, 5, 2, 2, 1, '2024-01-29', '00:09:27', 'absent', '2024-01-28 18:39:26', '2024-01-28 18:39:27', 'yes', 'admin');
INSERT INTO `attendances` VALUES (115, 3, 1, 1, 1, '2024-01-29', '00:09:28', 'present', '2024-01-28 18:39:28', '2024-01-28 18:39:28', 'yes', 'admin');
INSERT INTO `attendances` VALUES (116, 2, 1, 3, 1, '2024-01-29', '00:09:31', 'present', '2024-01-28 18:39:31', '2024-01-28 18:39:31', 'yes', 'admin');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `Dept_Code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Department_Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (1, 'DEVP', 'Developer', 'active', '2024-01-17 10:28:55', '2024-01-17 10:28:55');
INSERT INTO `departments` VALUES (2, 'TECH', 'Technician', 'active', '2024-01-17 10:32:43', '2024-01-17 10:32:43');
INSERT INTO `departments` VALUES (3, 'DESN', 'Designer', 'active', '2024-01-19 07:47:27', '2024-01-19 18:44:39');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'user', '2024-01-16 12:50:59', '2024-01-16 12:50:59');
INSERT INTO `roles` VALUES (2, 'moderator', '2024-01-16 12:50:59', '2024-01-16 12:50:59');
INSERT INTO `roles` VALUES (3, 'admin', '2024-01-16 12:50:59', '2024-01-16 12:50:59');

-- ----------------------------
-- Table structure for shifts
-- ----------------------------
DROP TABLE IF EXISTS `shifts`;
CREATE TABLE `shifts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `Shift` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TimeIn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TimeOut` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shifts
-- ----------------------------
INSERT INTO `shifts` VALUES (1, 'Morning Shift', '07:00', '10:00', '2024-01-17 14:00:04', '2024-01-20 10:27:03');
INSERT INTO `shifts` VALUES (2, 'Afternoon Shift', '10:00', '14:00', '2024-01-17 09:46:32', '2024-01-17 09:46:32');
INSERT INTO `shifts` VALUES (3, 'Evening Shift', '14:00', '18:00', '2024-01-17 09:49:07', '2024-01-17 09:49:07');
INSERT INTO `shifts` VALUES (4, 'Night Shift', '18:00', '20:00', '2024-01-17 09:50:41', '2024-01-17 09:50:41');
INSERT INTO `shifts` VALUES (7, 'OverNight Shift', '20:00', '07:00', '2024-01-20 08:07:51', '2024-01-20 08:07:51');

-- ----------------------------
-- Table structure for user_roles
-- ----------------------------
DROP TABLE IF EXISTS `user_roles`;
CREATE TABLE `user_roles`  (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`roleId`, `userId`) USING BTREE,
  INDEX `userId`(`userId` ASC) USING BTREE,
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles
-- ----------------------------
INSERT INTO `user_roles` VALUES ('2024-01-17 07:19:31', '2024-01-17 07:19:31', 1, 2);
INSERT INTO `user_roles` VALUES ('2024-01-17 12:15:19', '2024-01-17 12:15:19', 1, 3);
INSERT INTO `user_roles` VALUES ('2024-01-17 12:23:37', '2024-01-17 12:23:37', 1, 4);
INSERT INTO `user_roles` VALUES ('2024-01-17 12:25:06', '2024-01-17 12:25:06', 1, 5);
INSERT INTO `user_roles` VALUES ('2024-01-17 12:31:13', '2024-01-17 12:31:13', 1, 6);
INSERT INTO `user_roles` VALUES ('2024-01-17 12:34:22', '2024-01-17 12:34:22', 1, 7);
INSERT INTO `user_roles` VALUES ('2024-01-17 16:01:27', '2024-01-17 16:01:27', 1, 8);
INSERT INTO `user_roles` VALUES ('2024-01-19 08:04:23', '2024-01-19 08:04:23', 1, 10);
INSERT INTO `user_roles` VALUES ('2024-01-19 10:47:22', '2024-01-19 10:47:22', 1, 11);
INSERT INTO `user_roles` VALUES ('2024-01-16 12:51:48', '2024-01-16 12:51:48', 3, 1);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `shiftId` int NULL DEFAULT NULL,
  `departmentId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `key1`(`shiftId` ASC) USING BTREE,
  INDEX `key2`(`departmentId` ASC) USING BTREE,
  CONSTRAINT `key1` FOREIGN KEY (`shiftId`) REFERENCES `shifts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `key2` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', 'admin@admin.com', '$2a$08$MURoRn8OojnPxWFYhm3tMePUZUuG4q.7ApcB/91gR3Wk0nxCAItMe', '2024-01-16 12:51:48', '2024-01-16 12:51:48', NULL, NULL);
INSERT INTO `users` VALUES (2, 'Employee1', 'employee1@gmail.com', '$2a$08$vcHWWP2sjJT0bAxdlprPKuvB.Iniy/HhSMrd.ukf6bepLuH/fR9Ga', '2024-01-17 07:19:31', '2024-01-17 07:19:31', 3, 1);
INSERT INTO `users` VALUES (3, 'Employee5', 'employee3@gmail.com', '$2a$08$TeHY0sQjXi13p80dpvlAeOlk7oqNXDSfe.lhQwk.l.IKXy5agBG1e', '2024-01-17 12:15:19', '2024-01-20 08:25:20', 1, 1);
INSERT INTO `users` VALUES (4, 'Employee3', 'employe#@gmail.com', '$2a$08$rWgPBEWX8KwH6kpklyUq4O8/0sehRmMjnQcVwuqoRR99V6hQ0QO76', '2024-01-17 12:23:37', '2024-01-17 12:23:37', 3, 2);
INSERT INTO `users` VALUES (5, 'employee4', 'employee4@gmail.com', '$2a$08$aZvyfVxl746eaghtebnlgOM1w8Bni5duvVDEh1xrVcmXtuHN6SxgS', '2024-01-17 12:25:06', '2024-01-17 12:25:06', 2, 2);
INSERT INTO `users` VALUES (6, 'employee60', 'employee6@gmail.com', '$2a$08$QKAbEo4P3vhCAem9PCHoxuAegHW2GNTG8WI9Gb8ZIYFihv5p4r5E6', '2024-01-17 12:31:13', '2024-01-19 06:08:12', 2, 2);
INSERT INTO `users` VALUES (7, 'employee7', 'employee7@gmail.com', '$2a$08$Hp1j5RZu1bzBgN/MIF0z6eqC4O.GRmmDcq1/jSnaGCR9hxtu.S7Ju', '2024-01-17 12:34:22', '2024-01-17 12:34:22', 1, 1);
INSERT INTO `users` VALUES (8, 'Employee88', 'employee8@gmail.com', '$2a$08$n01Ug/O0846yif/LBSN9.O2gLUfwHlRqkk23lQt9UwjXee5VuDdae', '2024-01-17 16:01:27', '2024-01-19 18:54:32', 4, 1);
INSERT INTO `users` VALUES (10, 'Employee9', 'employee9@gmail.com', '$2a$08$kvZ./a7IKVm53Jojsy.MHO/PQVTmb7wmaXZGqyAbfX2Zr9GsEv56u', '2024-01-19 08:04:23', '2024-01-19 08:04:23', 4, 3);
INSERT INTO `users` VALUES (11, 'Employee12', 'employee12@gmail.com', '$2a$08$u.lhdqgbN4I.gldZXw8ptOwRrS2tQgVtYy1VUheJw51.al4B13CPe', '2024-01-19 10:47:22', '2024-01-19 10:54:25', 2, 2);

SET FOREIGN_KEY_CHECKS = 1;
