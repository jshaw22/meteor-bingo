import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class FileUpload extends Component {
	constructor(props){
		super(props);
		this.state = {};
		this.handleFile = this.handleFile.bind(this);
	}

	handleFile (e) {
		console.log("handle File called")
		let reader = new FileReader();
		let file = e.target.files[0];

		if (!file)
			return;

		reader.onload = function(img) {
			console.log("on load called", img);
			ReactDOM.findDOMNode(this.fileInput).value = '';
			this.props.handleFileChange(img.target.result);
		}.bind(this);
		reader.readAsDataURL(file);
	}

	render() {
		return (
			<input ref={(input)=>{this.fileInput = input;}} type="file" accept="image/*" onChange={this.handleFile} />
		)
	}
}

export default FileUpload;