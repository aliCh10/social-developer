"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usermigration1727540621857 = void 0;
class Usermigration1727540621857 {
    constructor() {
        this.name = 'Usermigration1727540621857';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
exports.Usermigration1727540621857 = Usermigration1727540621857;
//# sourceMappingURL=1727540621857-usermigration.js.map