const InputForm = {
	template: `
		<div>
			<form @submit="submitForm">
				<div class="mt-3 form-group">
					<label>Item</label>
					<input v-model="fields.newItem" type="text" placeholder="Add an item" class="form-control">
					<span class="form-text text-info" style="float: right;">{{ fields.newItem.length }}/20</span>
					<span class="form-text text-danger">{{ fieldErrors.newItem }}</span>
					<span class="form-text text-danger" v-if="isNewItemInputLimitExceeded">Characters must not exceed 20</span>
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
					<span class="form-text text-danger" v-if="isNotUrgent">Must be moderate to urgent</span>
				</div>
				<div class="form-check">
					<label class="form-check-label">
						<input v-model="fields.termsAndConditions" type="checkbox" class="form-check-input" name="" id="" value="checkedValue" checked>
						I accept the terms and conditions
					</label>
					<span class="form-text text-danger">{{ fieldErrors.termsAndConditions }}</span>
				</div>
				<button type="submit" class="btn btn-success mt-2" :disabled="isNewItemInputLimitExceeded || isNotUrgent">Submit</button>
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
			loading: false,
			saveStatus: 'READY',
		}
	},
	computed: {
		isNewItemInputLimitExceeded() {
			return this.fields.newItem.length > 20;
		},
		isNotUrgent() {
			return this.fields.urgency === "Nonessential";
		},
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


let apiClient = {
	loadItems: function() {
		return {
			then: function(cb) {
				setTimeout(() => {
					cb(JSON.parse(localStorage.items || '[]'));
				}, 1000);
			}
		}
	},

	saveItems: function(items) {
		const success = !!(this.count++ % 2);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!success) return reject({success});

				localStorage.items = JSON.stringify(items);
				return resolve({success});
			}, 1000)
		});
	},

	count: 1,
}