import { cap } from '@compactjs/cap';
import { select, UniversalElementSelector } from '@compactjs/uea';
import { ScrollListener, scrollListener } from './scrollListener';

/**
 * Give it an element or list of elements to get an api object
 * that allows you to trigger actions when an object is scrolled into or out of view.
 * @param actors single HTMLElement, Array or query selector string
 * @param options default IntersectionObserver options
 * @example onView('.my-class').toggle('visible')M
 */
export function onStage(
	actors: UniversalElementSelector,
	options?: IntersectionObserverOptions
): OnEnterViewAPI {
	const onStageCallstack: ((element: ExtendedHTMLElement) => void)[] = [];
	const leaveStageCallstack: ((element: ExtendedHTMLElement) => void)[] = [];

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.intersectionRatio > 0) {
				onStageCallstack.forEach((c) => c(entry.target as HTMLElement));
				if (leaveStageCallstack.length <= 0) {
					observer.unobserve(entry.target);
				}
			} else {
				leaveStageCallstack.forEach((c) => c(entry.target as HTMLElement));
			}
		});
	}, options);

	select(actors).forEach((element) => {
		observer.observe(element);
	});

	function api(
		stack: ((element: ExtendedHTMLElement) => void)[]
	): OnLeaveViewAPI {
		return {
			addClass(className: string) {
				stack.push((e) => e.classList.add(className));
				return this;
			},
			removeClass(className: string) {
				stack.push((e) => e.classList.remove(className));
				return this;
			},
			toggle(className: string) {
				if (stack === onStageCallstack) {
					onStageCallstack.push((e) => e.classList.add(className));
					leaveStageCallstack.push((e) => e.classList.remove(className));
				} else {
					leaveStageCallstack.push((e) => e.classList.add(className));
					onStageCallstack.push((e) => e.classList.remove(className));
				}
				return this;
			},
			do(fun) {
				stack.push(fun);
				return this;
			},
			end() {
				stack.push(() => observer.disconnect());
				return this;
			},
		};
	}

	return {
		...api(onStageCallstack),
		onScrollProgress(callback) {
			onStageCallstack.push((element) => {
				const windowHeight = document.documentElement.clientHeight;
				const startVisible = element.offsetTop - windowHeight;
				const endVisible = element.offsetTop + element.offsetHeight;

				const distance = endVisible - startVisible;

				const scrollCallback = () => {
					const currentRelativeScroll =
						(window.pageYOffset || document.documentElement.scrollTop) -
						startVisible;

					const progress = currentRelativeScroll / distance;

					callback(cap(progress, 0, 1), element);
				};
				// this adds the scroll callback directly to the element
				// this should be done in a cleaner way
				element.scrollCallback = scrollCallback;
				scrollListener.add(scrollCallback);
				scrollCallback();
			});
			leaveStageCallstack.push((element) => {
				if (element.scrollCallback)
					scrollListener.remove(element.scrollCallback);
			});
			return this;
		},
		else: {
			...api(leaveStageCallstack),
		},
	} as OnEnterViewAPI;
}

/**
 * Default IntersectionObserver Options:
 * An optional object which customizes the observer.
 * If options isn't specified, the observer uses the
 * document's viewport as the root, with no margin,
 * and a 0% threshold (meaning that even
 * a one-pixel change is enough to trigger a callback)
 */
interface IntersectionObserverOptions {
	root: HTMLElement;
	rootMargin: string;
	threshold: number | number[];
}

interface OnEnterViewAPI extends OnViewAPI<OnEnterViewAPI> {
	/**
	 * Use it to react to scroll events.
	 * It passed a relative progress variable to the callback function, that will be between 0 and 1.
	 * Everything between 0 and 1 means the element is in the visible area
	 * 0 = below visible area
	 * 1 = above visible area
	 * @param callback This callback will be called with a relative progress between 0-1
	 */
	onScrollProgress(
		callback: (progress: number, element: HTMLElement) => void
	): OnEnterViewAPI;
	/**
	 * Actions to do when scrolled out of view
	 * Same api as when scrolled into view
	 */
	else: OnLeaveViewAPI;
}

interface OnLeaveViewAPI extends OnViewAPI<OnLeaveViewAPI> {}

/**
 * Chainable actions when scrolled into or out of view
 */
interface OnViewAPI<T> {
	/**
	 * Add class when scrolled into/out of view
	 * @param className
	 */
	addClass: (className: string) => T;

	/**
	 * Remove class when scrolled into/out of view
	 * @param className
	 */
	removeClass: (className: string) => T;

	/**
	 * Toggles a class name when scrolled into/out of view
	 * @param className
	 */
	toggle: (className: string) => T;

	/**
	 * What to do when scrolled into/out of view
	 * @param fun callback function
	 */
	do: (fun: (element: HTMLElement) => void) => T;

	/**
	 * Stop observing
	 */
	end: () => this;
}

// this should be done in a cleaner way
type ExtendedHTMLElement = {
	scrollCallback?: ScrollListener;
} & HTMLElement;
