const Task = require('../models/Task');

module.exports.createTaskController = (req, res) => {
	console.log(req.body);
	
	Task.findOne({
		name : req.body.name
	}) .then(result => {
		console.log(result);
		
		if(result !== null && result.name === req.body.name){
			return res.send("Duplicate Task Found.")
		} else {
			
			let newTask = new Task({
				name: req.body.name
			})
			
			newTask.save()
			.then(result => res.send(result))
			.catch(err => res.send(err))
		}
	})
	.catch(err => res.send(err));
}

module.exports.getAllTasksController = (req,res)=>{

	Task.find({})
	.then(result => res.send(result))
	.catch(err => res.send(err));

}

module.exports.getSingleTaskController = (req, res) => {
	console.log(req.params);
	Task.findById(req.params.id, {_id: 0, name: 1})
	.then(result => res.send(result))
	.catch(err => res.send(err))
}

