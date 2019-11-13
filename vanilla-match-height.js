class VanillaMatchHeight {
	// Apply init
	init() {
		window.addEventListener('DOMContentLoaded', () => {
			this.resize();

			window.addEventListener('resize', () => {
				console.log('resize');
				this.resize();
			});
		});
	}

	// Resize
	resize() {
		let rows = this.walkPage();

		if (!rows) return;

		this.walkRows(rows);
	}

	reset() {
		let elements = this.getElements();

		for (let i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty('height');
		}
	}

	// Walk page
	walkPage() {
		this.elements = this.getElements();
		let rows = {};
		let buffer = null;

		if (!this.elements.length) return;

		for (let i = 0; i < this.elements.length; i++) {
			let element = this.elements[i];

			element.style.removeProperty('height');

			if (element.parentNode === buffer) continue;

			let top = this.getTop(element.parentElement);

			rows[top] = rows[top] !== undefined ? rows[top] : [];
			rows[top][i] = element.parentNode;

			buffer = element.parentNode;
		}

		return rows;
	}

	// Walk rows
	walkRows(rows) {
		for (let top in rows) {
			let row = rows[top];
			let heights = this.walkGroups(row);
			this.setHeights(row, heights);
		}
	}

	// Walk groups
	walkGroups(row) {
		let heights = {};

		row.forEach(() => {
			heights = this.walkItems(heights);
		});

		return heights;
	}

	// Walk items
	walkItems(heights) {
		this.elements.forEach((element) => {
			let attribute = element.getAttribute('data-match-item');

			if (attribute) {
				let height = this.getHeight(element);

				if (heights[attribute] < height || heights[attribute] === undefined) {
					heights[attribute] = height;
				}
			}
		});

		return heights;
	}

	// Set heights
	setHeights(row, heights) {
		row.forEach(() => {
			this.elements.forEach((element) => {
				let attribute = element.getAttribute('data-match-item');
				let height = heights[attribute];

				if (attribute) {
					element.style.height = height + 'px';
				}
			});
		});
	}

	// Get elements
	getElements() {
		return document.querySelectorAll('[data-match-item]');
	}

	// Get height
	getHeight(element) {
		return parseInt(getComputedStyle(element).getPropertyValue('height'));
	}

	// Get top
	getTop(element) {
		return element.getBoundingClientRect().top;
	}
}
