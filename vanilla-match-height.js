class VanillaMatchHeight {
	// Constructor
	constructor() {
		this.collection = [];
	}

	// Apply init
	apply() {
		window.addEventListener('DOMContentLoaded', (event) => {
			//this.walkSections();
			//this.walkItems();
			let rows = this.walkRows();
			console.log(rows);
		});
	}

	walkRows() {
		let items = document.querySelectorAll('[data-match-item]');
		let rows = {};
		let i = 0;
		let buffer = null;

		items.forEach((item) => {
			if (item.parentNode !== buffer) {
				let top = this.getTop(item.parentElement);
				rows[top] = rows[top] !== undefined ? rows[top] : [];
				rows[top][i] = item.parentNode;
				buffer = item.parentNode;
				i++;
			}
		});

		return rows;
	}

	getTop(element) {
		return element.getBoundingClientRect().top;
	}

	// Walk items
	walkItems() {
		let items = document.querySelectorAll('[data-match-item]');
		let buffer = {};

		items.forEach((item) => {
			let attribute = item.getAttribute('data-match-item');

			if (attribute) {
				let start = item.parentNode.getBoundingClientRect().top;
				let inner = item.clientHeight;
				let outer = {};
				outer[start] = item.offsetHeight;

				console.log(start);

				buffer[start] = buffer[start] !== undefined ? buffer[start] : 0;

				if (outer[start] > buffer[start]) {
					this.collection[attribute] = {};
					this.collection[attribute][start] = {
						outer: outer[start],
						inner: inner
					};
					//buffer = this.collection[attribute][start].outer;
					buffer[start] = outer[start];
				}
			}
		});

		console.log(buffer);

		console.log(this.collection);
	}

	walkCollectionSections() {
		//console.log(this.collection);

		let sections = document.querySelectorAll('[data-match-group]');
		let section_id = 0;

		sections.forEach((section) => {
			this.walkCollectionGroups(section, section_id);
			section_id++;
		});
	}

	walkCollectionGroups(section, section_id) {
		let groups = Array.from(section.children);

		groups.forEach((group) => {
			this.walkCollectionItems(group, section_id);
		});
	}

	walkCollectionItems(group, section_id) {
		let items = Array.from(group.children);

		console.log(this.collection);

		items.forEach((item) => {
			let attribute = item.getAttribute('data-match-item');

			if (attribute) {
				let inner = this.collection[section_id][attribute].inner;
				console.log(inner);
				item = item.style.height = inner + 'px';
			}

			//console.log(section_id);
			//console.log(item);
		});
	}

	isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
}

// Resize event
// Row aware
// Kör igen efter ajax
// Callbacks before / after
// By row option
// match-group behövs ej?
