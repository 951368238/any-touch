import { Input } from '@any-touch/shared';
/**
 * 触发dom事件
 */
export default function (el: EventTarget, payload: Record<string, any> & Input, eventInit?: EventInit): boolean | void {
    // 过滤掉Event上保留的字段(target, currentTarget,type)
    let { target, currentTarget, type, ...data } = payload;
    let event: Event;
    if (void 0 !== Event) {
        event = new Event(type, eventInit);
    } else {
        event = document.createEvent('HTMLEvents');
        event.initEvent(type, eventInit?.bubbles, eventInit?.cancelable);
    }
    Object.assign(event, data, {
        exact: () =>
            payload.targets.every(target =>
                (event.currentTarget as HTMLElement).contains(target as HTMLElement)
            )
    });
    return el.dispatchEvent(event);
}