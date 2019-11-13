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
		let elements = document.querySelectorAll('[data-match-item]');

		for (let i = 0; i < elements.length; i++) {
			elements[i].style.removeProperty('height');
		}
	}

	// Walk page
	walkPage() {
		let items = document.querySelectorAll('[data-match-item]');
		let rows = {};
		let buffer = null;

		if (!items.length) return;

		for (let i = 0; i < items.length; i++) {
			let item = items[i];

			item.style.removeProperty('height');

			if (item.parentNode === buffer) continue;

			let top = this.getTop(item.parentElement);

			rows[top] = rows[top] !== undefined ? rows[top] : [];
			rows[top][i] = item.parentNode;

			buffer = item.parentNode;
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

		row.forEach((group) => {
			heights = this.walkItems(group, heights);
		});

		return heights;
	}

	// Walk items
	walkItems(group, heights) {
		let items = group.querySelectorAll('[data-match-item]');

		items.forEach((item) => {
			let attribute = item.getAttribute('data-match-item');

			if (attribute) {
				let height = this.getHeight(item);

				if (heights[attribute] < height || heights[attribute] === undefined) {
					heights[attribute] = height;
				}
			}
		});

		return heights;
	}

	// Set heights
	setHeights(row, heights) {
		row.forEach((group) => {
			let items = group.querySelectorAll('[data-match-item]');

			items.forEach((item) => {
				let attribute = item.getAttribute('data-match-item');
				let height = heights[attribute];

				if (attribute) {
					item.style.height = height + 'px';
				}
			});
		});
	}

	getHeight(element) {
		return parseInt(getComputedStyle(element).getPropertyValue('height'));
	}

	// Get top
	getTop(element) {
		return element.getBoundingClientRect().top;
	}
}
