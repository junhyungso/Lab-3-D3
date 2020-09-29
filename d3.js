d3.csv('cities.csv', d3.autoType).then(data=>{
	let filteredData = data.filter(e=>e.eu===true);
	d3.select('.city-count')
		.text(filteredData.length + ' European Cities');
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
				.append('svg')
    			.attr('width', width)
				.attr('height', height);
	
	svg.selectAll('circle')
	.data(filteredData)
	.enter()
	.append('circle')
	.attr('cx', (d, i) => {
		return (i * 23 + 20);
	})
	.attr('cy', 30)
	.attr('r', d => d.population < 1000000? 4 : 8)
	.attr("fill", "green")


	svg.selectAll("text")
	.data(filteredData)
	.enter()
	.append("text")
	.attr('dx', (d,i) => (i*23 + 20))
	.attr('dy', 50)
	.filter((d,i) => d.population >= 1000000)
	.text(d=>d.country)	
	.attr("font-size", "11px")
	.attr("text-anchor", "middle")
	.attr("fill", "blue")
})


d3.csv('buildings.csv', d3.autoType).then(data=>{
	let sortedData = data.sort((a,b) => b.height_ft - a.height_ft);
	d3.select('.building-height')
		.text('World Building Heights')
	const width = 500;
	const height = 500;
	const svg = d3.select('.bar-buildings')
				.append('svg')
				.attr('width', width)
				.attr('height', height);

	svg.selectAll('rect')
		.data(sortedData)
		.enter()
		.append('rect')
		.attr('x', 50)
		.attr('y', 50)
		.attr('width',  20)
		.attr('height', 100)
		.attr('x', (d,i) => 175)
		.attr('y', (d,i) => (i * width/sortedData.length) + 20)
		.attr('width', (d,i) => d.height_px)
		.attr('height', 20)
		.attr('class', 'bar-details')
		.on("click", (d, i) => {
			d3.select('.image').attr('src', "img/" + i.image)
			d3.select('.building-name').text(i.building)
			d3.select('.height').text(i.height_ft)
			d3.select('.city').text(i.city)
			d3.select('.country').text(i.country)

			svg.selectAll('table.height')
				.data(sortedData)
				.enter()
				.append('text')
			d3.select("td#height").append('span').text(i.height_ft)
			d3.select("td#city").text((i) => i.city)
			d3.select("td#country").text((i) => i.country)
		  });
						
	svg.selectAll("text.labels")
		.data(sortedData)
		.enter()
		.append("text")
		.attr('dx', 0)
		.attr('dy', (d,i) => (i * width/sortedData.length) + 32 )
		.text(d=>d.building)	
		.attr("font-size", "11px")
		.attr("text-anchor", "front")
		.attr("fill", "red")

	svg.selectAll("text.values")
		.data(sortedData)
		.enter()
		.append("text")
		.attr('dx', (d,i) => (d.height_px) + 170)
		.attr('dy', (d,i) => (i * width/sortedData.length) + 35 )
		.text(d=> (d.height_m + 'm'))	
		.attr("font-size", "11px")
		.attr("text-anchor", "end")
		.attr("fill", "white")
})