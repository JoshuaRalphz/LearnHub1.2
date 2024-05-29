const {PrismaClient} = require ("@prisma/client");
const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data:[
                { name: "JavaScript" },
                { name: "TypeScript" },
                { name: "HTML/CSS" }, // after changing category seed the database instruction on schema
                { name: "Python" }, // go to categories to match after changing
                { name: "C++" },
                { name: "C#" },
                { name: "PHP" },
                { name: "Java" },
                { name: "React" },
                { name: "NextJS" },
            ]
        });
        console.log("Success");
    } catch (error) {
        console.log("error seeding the database categories",error);
    } finally {
        await database.$disconnect();
    }
}

main ();