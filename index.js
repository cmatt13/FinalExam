const express = require("express");
const mongoose = require("mongoose");

const app = express();

const port = 4000;

mongoose.connect("mongodb+srv://admin:admin123@mycluster.du705if.mongodb.net/pcco107_todoList123?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true

	}
);

app.listen(port, () => console.log(`Server is running at port ${port}`));

let db = mongoose.connection;

db.on("error", console.error.bind(console,"Connection Error."));
db.once("open", () => console.log("Connected to MongoDB."));

const User = mongoose.model('User', new mongoose.Schema({
	email: {type: String, required: true},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, default: false},
}));

const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}));

app.get('/hello', (req, res) => {
	res.send("Hello from our new Express API!")
})

app.use(express.json())

const taskRoutes = require('./routes/taskRoutes');
console.log(taskRoutes);
app.use('/', taskRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => console.log(`Server is running at port ${port}`))