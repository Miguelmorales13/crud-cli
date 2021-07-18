export enum enumDatabaseProviders {
	sequelize = "SEQUELIZE",
	mongo = "MONGO",
}


export function generatePassword(size: number): string {
	let chars = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
	let password = "";
	for (let i = 0; i < size; i++)
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	return password;
}
