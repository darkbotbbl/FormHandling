const InputForm = {
	template: `
		<div>
			<form @submit="submitForm">
				<div class="mt-3 form-group">
					<label>Item</label>
					<input v-model="fields.newItem" type="text" placeholder="Add an item" class="form-control">
					<span class="form-text text-danger">{{ fieldErrors.newItem }}</span>
				</div>
				<div class="mt-3 form-group">
					<label>Email</label>
					<input v-model="fields.email" type="email" placeholder="Enter your email" class="form-control">
					<span class="form-text text-danger">{{ fieldErrors.email }}</span>
				</div>
				<div class="form-group mt-3">
					<label for="">Urgency</label>
					<select v-model="fields.urgency" class="form-control" name="" id="">
						<option disabled value="">Please Select One</option>
						<option>Nonessential</option>
						<option>Moderate</option>
						<option>Urgent</option>
					</select>
					<span class="form-text text-danger">{{ fieldErrors.urgency }}</span>
				</div>
				<div class="form-check">
					<label class="form-check-label">
						<input v-model="fields.termsAndConditions" type="checkbox" class="form-check-input" name="" id="" value="checkedValue" checked>
						I accept the terms and conditions
					</label>
					<span class="form-text text-danger">{{ fieldErrors.termsAndConditions }}</span>
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
		submitForm(event) {
			event.preventDefault();
			
			this.fieldErrors = this.validateForm(this.fields);
			if (Object.keys(this.fieldErrors).length) return;

			this.items.push(this.fields.newItem);
			this.fields.newItem = '';
			this.fields.email = '';
			this.fields.urgency = '';
			this.fields.termsAndConditions = false;

		},
		validateForm(fields) {
			const errors = {};
			if (!fields.newItem) errors.newItem = "Item field required";
			if (!fields.email) errors.email = "Email field required";
			if (!fields.urgency) errors.urgency = "Urgency required";
			if (!fields.termsAndConditions) {
				errors.termsAndConditions = "Terms and Conditions have to be accepted"
			}
			if (fields.email && !this.isEmail(fields.email)) {
				errors.email = "Invalid email";
			}
			return errors;
		},
		isEmail(email) {
			const re = /\S+@\S+.\S+/;
			return re.test(email);
		}
	}
}


const vm = new Vue({
	el: "#app",
	components: {
		InputForm
	}
})