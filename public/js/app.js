

			var Display = React.createClass({
				render: function(){
					var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
					return (
						<div className="comment">
							<h2 className="commentAuthor">
							{this.props.events}
							</h2>
							<span dangerouslySetInnerHTML={{__html: rawMarkup}} />
						</div>

					)
				}
			})



			var EventGist = React.createClass({
				getInitialState: function(){
					return {
						eventName: '',
						venueName: '',
						borough: '',
						dateDescription: ''
					};
				},

				componentDidMount: function(){

				// 	$.get(this.props.source, function(data){
				// 		console.log(data);
				// 	})
				// 	.then(function(data){
				// 		this.setState({
				// 			event:data
				// 		})
				// 	}.bind(this));
					
				// },

					$.ajax({
						url: this.props.source,
						dataType: 'json',
						success: function(data) {
							console.log(JSON.parse(data.body).results[0])

							var eventList = JSON.parse(data.body).results
							console.log(eventList)

							var eventName = eventList.map(function(obj){
								return obj.event_name
							});

							var venueName = eventList.map(function(obj){
								return obj.venue_name
							});

							var borough = eventList.map(function(obj){
								return obj.borough
							});

							var dateDescription = eventList.map(function(obj){
								return obj.date_time_description
							});


							this.setState({
								eventName: eventName,
								venueName: venueName,
								borough: borough,
								dateDescription: dateDescription

							});
						}.bind(this),
						error: function(xhr, status, err){
							console.error(this.props.url, status, err.toString());
						}.bind(this)
					})
				},

				render: function(){

					return (
						<div>
							<h1>Events</h1>						
								<ol>
									{this.state.eventName}
								</ol>
							<h1>Venue</h1>		
								<ol>
									{this.state.venueName}
								</ol>
							<h1>Borough</h1>	
								<ol>
									{this.state.borough}
								</ol>
							<h1>Discription</h1>
								<ol>
									{this.state.dateDescription}
								</ol>
						</div>
					);
				}
			});

			React.render(
				<EventGist source = "/events/search" />,
					document.getElementById('events')
			);

