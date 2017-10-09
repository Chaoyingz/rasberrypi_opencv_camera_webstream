// 获取硬件信息
$(document).ready(function(){

	getInfoS();
  setInterval(getInfoS, 2000);

	var rightCircle = $('#rightCircle');
  var leftCircle = $('#leftCircle');
	var rightCircleS = $('#rightCircle-i');
	var leftCircleS = $('#leftCircle-i');

function getInfoS(){

$.ajax({
  type: 'GET',
  url:$SCRIPT_ROOT + '/server_info',
  success: function(data) {
		var memoryPercent = parseInt(data.memory_percent);
		var cpuPercent = parseInt(data.cpu_percent);

    if (memoryPercent > 50)
		{
			var memoryP = "rotate(" + (((memoryPercent-50) * 3.6) -135) + "deg)";
			rightCircle.css("transform", "rotate(45deg)");
			leftCircle.css("transform", memoryP);
		}
		else{
			var memoryP = "rotate(" + (((memoryPercent) * 3.6) - 135) + "deg)";
			rightCircle.css("transform", memoryP);
		};

    if (cpuPercent > 50)
		{
			var memoryP = "rotate(" + (((cpuPercent-50) * 3.6) -135) + "deg)";
			rightCircleS.css("transform", "rotate(45deg)");
			leftCircleS.css("transform", memoryP);
		}
		else{
			var memoryP = "rotate(" + (((cpuPercent) * 3.6) - 135) + "deg)";
			rightCircleS.css("transform", memoryP);
			leftCircleS.css("transform", "rotate(-135deg)");
		};
    }
});
};
});

//获取网络信息
$(document).ready(function(){

	getInfoN();

	setInterval(function(){
		getInfoN();
		myChart.update();
	},1000)

	function getInfoN(){
		$.ajax({
			type: 'GET',
			url:$SCRIPT_ROOT + '/net_info',
			success:function(data){
				updateData(data.bt_recv, data.bt_sent);
		}
		});
	};

	var momentList = new Array();
	for (var i=30; i>0; i--)
	{
		momentList[i-1] = moment().subtract(30-i, "seconds").format("HH:mm:ss");
	};
  
	var recvList = new Array(30);
	var sentList = new Array(30);

	function updateData(recvData, sentData){
		recvList.shift();
		recvList.push(recvData);

		sentList.shift();
		sentList.push(sentData);
	};

	var data = {
		labels: momentList,
		datasets: [
			{
				label: "收到的字节数",
				fill: false,
				pointColor: "rgba(220,220,220,1)",
				borderColor: "rgb(250,95,126)",
				data: recvList
			},
			{
				label: "发送的字节数",
				fill: false,
				pointColor: "rgba(220,220,220,1)",
				borderColor: "rgb(72,134,255)",
				data: sentList
			}
		]
	};

	var options = {
		responsive: false,
		legend: {
			display: false			
		},
		scales: {
			xAxes: [{
				position: 'right',
				gridLines: {
					color: "rgba(0,0,0,0)",
				},
				type: 'time',
				time: {
					parser: "HH:mm:ss",
					unit: 'second',
					unitStepSize: 5,
					displayFormats: {
						'minute': 'HH:mm:ss', 
						'hour': 'HH:mm:ss', 
						min: moment(),
						max: moment().subtract(30, "seconds")    
					},
				},
			}],
			yAxes: [{
				gridLines: {
					drawBorder: false,
				},
				ticks: {
					beginAtZero: true,
					display: false,
				}	
			}]
		}
	};

	var netGraph =  document.getElementById("net-graph");
	var ngc = netGraph.getContext("2d");


// 初始化
	var myChart = new Chart(ngc, {
		type: 'line',
		data: data,
		options: options
	})
});


