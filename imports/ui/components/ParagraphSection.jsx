import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';

export default class ParagraphSection extends Component {
	constructor(props){
		super(props);
		this.state = {
			isEditing: "",
			text: ''
		};
		this.openEditing = this.openEditing.bind(this);
		this.closeEditing = this.closeEditing.bind(this);
		this.onSave = this.onSave.bind(this);
		this.editText = this.editText.bind(this);
	}

	componentWillReceiveProps(nextProps){
		//pull the props of paragraph value prop to local state for edit
		this.setState({text: nextProps.paragraphContent});
	}

	openEditing () { 
		this.setState({isEditing: true})
	}

	closeEditing () {
		this.setState({isEditing: false})
	}

	onSave () {
		let update = {$set: {}};
		update.$set['profile.' + this.props.dbObjectName] = this.state.text;
		Meteor.call('saveParagraph', update, (err, response)=> {
			if (err)
				console.error("There was an error saving the paragraph", err);
			this.setState({isEditing: false});
		});
	}

	editText (e) {
		this.setState({text: e.target.value});
	}

	renderNormal () {
		let blankContent = 'User has not filled this section out';
		if (this.props.allowEdit)
			blankContent = "Fill me out!";

		return (
			<div className="paragraph">
				<div onClick={this.openEditing} className="paragraph-title profile-section-title">
					<span>{this.props.sectionTitle}</span>
					{!this.props.allowEdit ? <div></div> : <span className="edit-title">Edit</span>} 
				</div>
				<div className="paragraph-content">
					{this.props.paragraphContent === '' ? <i>{blankContent}</i> : `${this.props.paragraphContent}` }
				</div>
			</div>
		);
	}

	renderForm () {
		return (
			<div className="edit-textarea">
				<span>{this.props.sectionTitle}</span>
				<Textarea ref="editText" onChange={this.editText} value={this.state.text}></Textarea>
				<div className="paragraph-buttons">
					<button className="btn btn-primary mr-3" onClick={this.closeEditing}>Cancel</button>
					<button className="btn btn-success " onClick={this.onSave}>Save</button>
				</div>
			</div>
			)
	}

	render () {
		if (this.state.isEditing) 
			return this.renderForm();
		else 
			return this.renderNormal();
	}
}

ParagraphSection.propTypes = {
	sectionTitle: PropTypes.string.isRequired,
	paragraphContent: PropTypes.string,
	allowEdit: PropTypes.bool
};
