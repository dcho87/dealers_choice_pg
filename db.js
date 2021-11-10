const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/books');

const books = [
    { id: 1, title: "American Marxism", author: "Mark R. Levin", about: "Mark R. Levin, nationally syndicated talk radio host, host of LevinTV, chairman of Landmark Legal Foundation"},
    { id: 2, title: "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones", author: "James Clear", about: "James Clear is a writer and speaker focused on habits"},
    { id: 3, title: "The Four Agreements: A Practical Guide to Personal Freedom", author: "Don Miguel Ruiz", about: "Don Miguel Ruiz is a renowned spiritual teacher and internationally bestselling author of the “Toltec Wisdom Series,”"},
    { id: 4, title: "The Body Keeps the Score: Brain, Mind, and Body in the Healing of Trauma", author: "Bessel van der Kolk M.D.", about: "Bessel van der Kolk, M.D., is the founder and medical director of the Trauma Center in Brookline, Massachusetts."},
    { id: 5, title: "If Animals Kissed Good Night", author: "Ann Whitford Paul", about: "Ann Whitford Paul is the author of the bestselling If Animals series, including If Animals Kissed Good Night, which School Library Journal calls “charming”"},
    { id: 6, title: "The Boy, the Mole, the Fox and the Horse", author: "Charlie Mackesy", about: "Charlie Mackesy was born during a snowy winter in Northumberland."},
    { id: 7, title: "I Love You to the Moon and Back", author: "Amelia Hepworth", about: "Amelia Hepworth lives in London with her family and two elderly sausage dogs."},
    { id: 8, title: "The Four Winds: A Novel", author: "Kristin Hannah", about: "Kristin Hannah is the award-winning and bestselling author of more than 20 novels including the international blockbuster, The Nightingale, which was named Goodreads Best Historical fiction novel."},
    { id: 9, title: "The Very Hungry Caterpillar", author: "Eric Carle", about: "Eric Carle is acclaimed and beloved as the creator of brilliantly illustrated and innovatively designed picture books for very young children."},
    { id: 10, title: "The Midnight Library: A Novel", author: "Matt Haig", about: "Matt Haig is the number one bestselling author of Reasons to Stay Alive, Notes on a Nervous Planet and six highly acclaimed novels for adults."}
]

const Books = conn.define('books', {
    title: Sequelize.DataTypes.STRING,
    author: Sequelize.DataTypes.STRING,
    about: Sequelize.DataTypes.STRING
    })

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    await Promise.all(books.map (book => 
        Books.create(book)));
};

module.exports = {
    conn,
    syncAndSeed,
    models: {Books}
}