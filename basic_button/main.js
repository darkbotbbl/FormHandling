const ButtonRow = {
	template: `
		<div>
			<button class="btn btn-primary" @click="onButtonClick" name="fullstack-button" value="FullStack Jacket">FullStack Jacket</button>
			<button class="btn btn-primary" @click="onButtonClick" name="fullstack-cap" value="FullStack Cap">FullStack Cap</button>
			<button class="btn btn-primary" @click="onButtonClick" name="fullstack-hoodie" value="FullStack Hoodie">FullStack Hoodie</button>
			<button class="btn btn-primary" @click="onButtonClick" name="fullstack-sweater" value="FullStack Sweater">FullStack Sweater</button>
		</div>`,
	methods: {
		onButtonClick(evt) {
			let button = evt.target;
			console.log(`${button.name} clicked: ${button.value}`)
		}
	}
}


const vm = new Vue({
	el: "#app",
	components: {
		ButtonRow,
	}
})