export type ScrollListener = (event: Event) => void;

let attached = false;
const scrollCallbacks = new Set<ScrollListener>();

function eventListener(event: Event) {
	scrollCallbacks.forEach((callback) => {
		callback(event);
	});
}

function attach() {
	window.addEventListener('scroll', eventListener);
	attached = true;
}

function destroy() {
	window.removeEventListener('scroll', eventListener);
	attached = false;
}

export const scrollListener = {
	add(callback: ScrollListener) {
		scrollCallbacks.add(callback);
		if (!attached) attach();
	},
	remove(callback: ScrollListener) {
		scrollCallbacks.delete(callback);
		if (attached && scrollCallbacks.size === 0) destroy();
	},
};
