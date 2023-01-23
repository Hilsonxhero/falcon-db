import { NOOP } from "@vue/shared";
// import { NOOP } from "@vue/shared"; "vite-plugin-babel";
import { watch, unref, onUnmounted } from "vue";

const EVENTS = ["mousedown", "touchstart", "pointerdown"];

function unrefElement(elRef: any) {
  return unref(elRef)?.$el ?? unref(elRef);
}

function useEventListener(...args: any) {
  let target: any;
  let event: any;
  let listener: any;
  let options: any;

  [target, event, listener, options] = args;

  if (!target) return;

  let cleanup = () => { };

  watch(
    () => unref(target),
    (el) => {
      cleanup();
      if (!el) return;

      el.addEventListener(event, listener, options);

      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = NOOP;
      };
    },
    { immediate: true }
  );

  onUnmounted(stop);

  return stop;
}

export default function useClickOutside() {
  function onClickOutside(target: any, callback: any) {
    const listener = (event: any) => {
      const el = unrefElement(target);
      if (!el) return;

      if (el === event.target || event.composedPath().includes(el)) return;

      callback(event);
    };

    let disposables = EVENTS.map((event) =>
      useEventListener(window, event, listener, { passive: true })
    );

    const stop = () => {
      disposables.forEach((stop) => stop?.());
      disposables = [];
    };

    onUnmounted(stop);

    return stop;
  }
  return {
    onClickOutside,
  };
}
