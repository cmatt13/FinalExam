const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	
	name: String,
	status: {
		type: String,
		default: "pending"
	}
});



module.exports = mongoose.model("Task",
	taskSchema);

