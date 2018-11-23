const values = [
	{ name: 'Alpha' },
	{ name: 'Beta' },
	{ name: 'Gamma' }
];

export default {
	props: {
		values,
		selected: values[1]
	},

	html: `
		<label>
			<input type="radio" value="[object Object]"> Alpha
		</label>

		<label>
			<input type="radio" value="[object Object]"> Beta
		</label>

		<label>
			<input type="radio" value="[object Object]"> Gamma
		</label>

		<p>Beta</p>`,

	async test(assert, component, target, window) {
		const inputs = target.querySelectorAll('input');
		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, true);
		assert.equal(inputs[2].checked, false);

		const event = new window.Event('change');

		inputs[0].checked = true;
		await inputs[0].dispatchEvent(event);

		assert.htmlEqual(target.innerHTML, `
			<label>
				<input type="radio" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="radio" value="[object Object]"> Beta
			</label>

			<label>
				<input type="radio" value="[object Object]"> Gamma
			</label>

			<p>Alpha</p>
		`);

		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, false);

		component.selected = values[2];
		assert.equal(inputs[0].checked, false);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, true);

		assert.htmlEqual(target.innerHTML, `
			<label>
				<input type="radio" value="[object Object]"> Alpha
			</label>

			<label>
				<input type="radio" value="[object Object]"> Beta
			</label>

			<label>
				<input type="radio" value="[object Object]"> Gamma
			</label>

			<p>Gamma</p>
		`);
	}
};
