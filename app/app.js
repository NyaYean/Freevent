var Event = React.createClass({
	render: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
			<div id="eventBox" className="header-content-inner">
				<div id="mainDetails" className="header-content-inner">
					
					<h2>{this.props.name}</h2>

					<h4>{this.props.place}  {this.props.borough}</h4>
					
				</div>

				<div className="details">
					<h4 id="date">
						{this.props.date}
					</h4>
				</div>

				<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
			</div>
		)
	}
});


var EventList = React.createClass({
	render: function() {
		var eventNodes = this.props.data.map(function(event){
			return (
				<Event name={event.event_name} place={event.venue_name} 
				borough={event.borough} date={event.date_time_description}>
					{event.event_detail_url}
				</Event>
			);
		});
		return (
			<div className="eventList">
				{eventNodes}
			</div>
		);
	}
});


var EventBox = React.createClass({
	getInitialState: function() {
		
		return {data: []};
		console.log(data)
	},

	loadEventsFromServer: function() {
		$.ajax({
						url: this.props.url,
						dataType: 'json',
						success: function(data) {						
							var events = JSON.parse(data.body).results
							console.log(events)
							this.setState({ data: events });
						}.bind(this),
						error: function(xhr, status, err){
							console.error(this.props.url, status, err.toString());
						}.bind(this)
					})
	},
	componentDidMount: function() {
		this.loadEventsFromServer();
	},
	render: function() {
		return (
			<div className="eventBox">
				<h1>Events</h1>
				<EventList data={this.state.data} />
			</div>
		);
	}
});

// var EventForm = React.createClass({
// 	handleSubmit: function(e){
// 		e.preventDefault();
// 		var borough = React.findDOMNode(this.refs.borough).value.trim();
// 		this.props.onCommentSubmit({borough: borough});
// 		React.findDOMNode(this.refs.text).value = '';
// 	},
// 	render: function() {
// 		return (
// 			<form className="eventFrom" onSubmit={this.handleSubmit}>
// 				<select>
// 					<option value="Manhattan">Manhattan</option>
// 					<option value="Brooklyn">Brooklyn</option>
// 					<option value="The Bronx">Bronx</option>
// 				</select>
// 			</form>
// 		)
// 	}
// })

React.render(
	<EventBox url='/events/search' />,
	document.getElementById('content')
);



