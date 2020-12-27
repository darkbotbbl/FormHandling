const InputForm = {
	template: `
		<div>
			<form @submit="onFormSubmit">
				<div class="mt-3 form-group">
					<label>Item</label>
					<input v-model="fields.newItem" type="text" placeholder="Add an item" class="form-control">
				</div>
				<div class="mt-3 form-group">
					<label>Email</label>
					<input v-model="fields.email" type="email" placeholder="Enter your email" class="form-control">
				</div>
				<div class="form-group mt-3">
					<label for="">Urgency</label>
					<select v-model="fields.urgency" class="form-control" name="" id="">
						<option disabled value="">Please Select One</option>
						<option>Nonessential</option>
						<option>Moderate</option>
						<option>Urgent</option>
					</select>
				</div>
				<div class="form-check">
				  <label class="form-check-label">
					<input v-model="fields.termsAndConditions" type="checkbox" class="form-check-input" name="" id="" value="checkedValue" checked>
					I accept the terms and conditions
				  </label>
				</div>
				<button type="submit" class="btn btn-success mt-2">Submit</button>
			</form>

			<div class="items mt-3">
				<h4 class="text-center">Items</h4>
				<hr />

				<ol>
					<li v-for="item in items" :key="item">{{ item }}</li>
				</ol>
			</div>
		</div>
		`,
	data() {
		return {
			fields: {
				newItem: '',
				email: '',
				urgency: '',
				termsAndConditions: false,
			},
			fieldErrors: {
				newItem: undefined,
				email: undefined,
				urgency: undefined,
				termsAndConditions: undefined
			},
			items: [],
		}
	},
	methods: {
		onFormSubmit(event) {
			event.preventDefault();
			this.items.push(this.fields.newItem);
			this.fields.newItem = '';
		}
	}
}


const vm = new Vue({
	el: "#app",
	components: {
		InputForm
	}
})