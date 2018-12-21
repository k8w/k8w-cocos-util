export default class TimeUtil {
    static wait(ms: number) {
        return new Promise(rs => {
            setTimeout(rs, ms);
        })
    }

    static waitFrame(frame: number = 1) {
        return new Promise(rs => {
            let finished = 0;
            let wait = function () {
                requestAnimationFrame(() => {
                    if (++finished >= frame) {
                        rs();
                    }
                    else {
                        wait()
                    }
                })
            }
            wait();
        })
    }
}