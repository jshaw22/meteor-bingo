import React, { Component, PropTypes } from 'react';

export default class ParagraphSection extends Component {
	constructor(props){
		super(props);
		this.state = {
			isEditing: ""
		};
	}

	

	render () {
		return (
			<div className="paragraph">
				<button onClick={this.editAboutMe} className="paragraph-title profile-section-title">
					<span>{this.props.sectionTitle}</span>
					<span className="edit-title">Edit</span>
				</button>
				<div className="paragraph-content">
					{this.props.paragraphContent === '' ? <i>Say something about youreslf!</i> : `${this.props.paragraphContent}` }
				</div>
			</div>
		);
	}
}

ParagraphSection.propTypes = {
	sectionTitle: PropTypes.string.isRequired,
	paragraphContent: PropTypes.string.isRequired,
};
