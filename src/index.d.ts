declare module 'stageset';

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

/**
 * Chainable actions when scrolled into or out of view
 */
interface OnViewAPI {
  /**
   * Add class when scrolled into/out of view
   * @param className
   */
  addClass(className: string): OnViewAPI;

  /**
   * Remove class when scrolled into/out of view
   * @param className
   */
  removeClass(className: string): OnViewAPI;

  /**
   * Toggles a class name when scrolled into/out of view
   * @param className
   */
  toggle(className: string): OnViewAPI;

  /**
   * What to do when scrolled into/out of view
   * @param fun callback function
   */
  do(fun: (element: HTMLElement) => void): OnViewAPI;

  /**
   * Stop observing
   */
  end(): OnViewAPI;

  /**
   * Actions to do when scrolled out of view
   * Same api as when scrolled into view
   */
  else: OnViewAPI;
}

/**
 * Give it an element or list of elements to get an api object
 * that allows you to trigger actions when an object is scolled into or out of view.
 * @param actors single HTMLElement, Array or query selector string
 * @param options default IntersectionObserver options
 * @example onView('.my-class').toggle('visible')M
 */
export function onStage(
  actors: HTMLElement | HTMLElement[] | string,
  options?: IntersectionObserverOptions
): OnViewAPI;
