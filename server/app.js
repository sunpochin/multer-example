// call all the required packages
// load express
const express = require('express');
const app = express();
const multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
//const upload = multer({ dest: 'uploads/' }).single('demo_image');
var upload = multer({ storage: storage }).single('file');
var multi = multer({ storage: storage }).array('files');

app.get('/', (req, res) => {
	res.send('hello world');
});

app.post('/file', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(400).send('Something went wrong!');
		}
		res.send(req.file);
	});
});

// uploading multiple images together
app.post('/files', multi, (req, res) => {
	const files = req.files;
	if (!files) {
		const error = new Error('Please choose files');
		error.httpStatusCode = 400;
		return next(error);
	}
	res.send(files);
});

app.listen(4000, () => console.log('Server started on port 4000'));
