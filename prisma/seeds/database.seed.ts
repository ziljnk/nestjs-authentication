import * as bcrypt from "bcrypt"
import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();
async function main() {
	const saltOrRounds = 20

	const user = await prisma.user.create({
		data: {
			email: "duy0000linh0000@gmail.com",
			password: await bcrypt.hash("123456", saltOrRounds),
			name: "Duy Linh Dev",
		}
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
