$(function() {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '200px' });
  client.get('ticket.requester.id').then(function(data) {
	  console.log(data['ticket.requester.id']); // something like 29043265
	});

	function fill_email_tag(data){
		 console.log(data.user.email);
		$("#email-label").html(data.user.email);
		$("#requester-info").css('display', 'inline-block');
	}

	function fill_ticket_data(data){

	}

	function requestTicketInfo(client, id){
		console.log(id);
		var settings = {
			url: 'api/v2/tickets' + id + '.json',
			type: 'GET',
			dataType: 'json'
		};

		client.request(settings).then(
			function(data){
				console.log(data);
				fill_ticket_data(data)
			},
			function(response){
				console.log(response);
			}
		);
	}

	function requestUserInfo(client, id) {
		console.log(id);
	  var settings = {
	    url: '/api/v2/users/' + id + '.json',
	    type:'GET',
	    dataType: 'json',
	  };

	  client.request(settings).then(
	    function(data) {
	      fill_email_tag(data);
	    },
	    function(response) {
	      console.error(response);
	    }
	  );
	}


	$("#show-requester-info-btn").on('click', function(event){
		console.log("requester clicked the button");
		client.get('ticket.requester.id').then(function(data){
			console.log(data['ticket.requester.id']);
			var user_id = data['ticket.requester.id'];
			requestUserInfo(client, user_id);
		});
	});

	$("#show-ticket-info-btn").on('click', function(event){
		console.log("clicked ticket button");
		client.get(['ticket.subject', 'ticket.requester.name', 'ticket.id']).then(function(data){
			console.log(data);
			var table_body = "<td>" + data['ticket.subject'] + "</td><td>" + data['ticket.id'] + "</td><td>" + data['ticket.requester.name'] + "</td>";
			$("#ticket-body").append(table_body)
			$(".zui-table").css('display', 'inline-block');
		})
	});
});
