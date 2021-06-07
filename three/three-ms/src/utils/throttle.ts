// Throttle with ensured final and immediate invocations
const throttle = <T extends []> (callback: (..._: T) => void, wait: number): (..._: T) => void => {
    let queuedToRun: any;
    let previouslyRun: number;
    return function invokeFn(...args: T) {
        const now = Date.now();
        queuedToRun = clearTimeout(queuedToRun) as undefined;
        if (!previouslyRun || (now - previouslyRun >= wait)) {
            callback(...args);
            previouslyRun = now;
        } else {
            //@ts-ignore
            queuedToRun = setTimeout(invokeFn.bind(null, ...args), wait - (now - previouslyRun));
        }
    };
};

export default throttle;