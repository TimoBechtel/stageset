import { scrollListener } from './scrollListener';
import { cap } from '@compactjs/cap';

export const onStage = (actors, options) => {
  const _elements =
    typeof actors === 'string'
      ? Array.from(document.querySelectorAll(actors))
      : Array.isArray(actors)
      ? actors
      : [actors];

  const onStageCallstack = [];
  const leaveStageCallstack = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        onStageCallstack.forEach((c) => c(entry.target));
        if (leaveStageCallstack.length <= 0) {
          observer.unobserve(entry.target);
        }
      } else {
        leaveStageCallstack.forEach((c) => c(entry.target));
      }
    });
  }, options);

  _elements.forEach((element) => {
    observer.observe(element);
  });

  const api = (stack) => {
    return {
      addClass(className) {
        stack.push((e) => e.classList.add(className));
        return this;
      },
      removeClass(className) {
        stack.push((e) => e.classList.remove(className));
        return this;
      },
      toggle(className) {
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
  };

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
  };
};
