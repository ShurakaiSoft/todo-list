/**
 * Model for the Todo objects.
 */

/**
 * Create and return model
 */
function getModel(mongoose) {

	// other model stuff goes here

	return mongoose.model('Todo', { text: String } );
}

module.exports = {
	getModel: getModel
};