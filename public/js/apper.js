var Event = React.createClass({
	render: function(){
		var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return (
			<div className="eventBox">
				<div id="mainDetails">
					<h3>
					{this.props.name}
					{this.props.place}
					</h3>
					<h3>
					{this.props.place}
					</h3>
				</div>

				<div className="details">
					<h3 id="borough">
						{this.props.borough}
					</h3>
					<h3 id="date">
						{this.props.date}
					</h3>
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

React.render(
	<EventBox url='/events/search' />,
	document.getElementById('content')
);



