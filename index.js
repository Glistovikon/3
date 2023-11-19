$('input').focus()

let weather = {
	API: '0e888dae44d1eff3855e3412514353e4',
	fetchWeather: function (city) {
		fetch(
			'http://api.openweathermap.org/data/2.5/weather?q=' +
				city +
				'&appid=' +
				this.API
		)
			.then(response => response.json())
			.then(data => this.displayWeather(data))
	},
	displayWeather: function (data) {
		const { name } = data
		const { icon, description } = data.weather[0]
		const { temp, humidity } = data.main
		const { speed } = data.wind
		$('h1').text('Weather in ' + name)
		$('.info').text(description)
		$('.icon').attr(
			'src',
			'https://openweathermap.org/img/wn/' + icon + '@2x.png'
		)
		$('.humidity').text('Humidty: ' + humidity + '%')
		$('.temp').text(Math.floor(temp - 273.15) + '°C')
		$('.speed').text('Wind speed: ' + speed + ' km/h')
		$('.weather').removeClass('getting')
	},
	search: function () {
		this.fetchWeather($('input').val())
	},
}

$('.search-bar button').click(function () {
	weather.search()
})

$('input').keypress(function (btn) {
	if (btn.key == 'Enter') weather.search()
})
