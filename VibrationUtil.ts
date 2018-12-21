export default class VibrationUtil {
    static vibrateShort() {
        if (typeof wx !== 'undefined') {
            wx.vibrateShort();
        }
        else if (navigator.vibrate){
            navigator.vibrate(15);
            console.debug('Vibrate Short')
        }
    }

    static vibrateLong() {
        if (typeof wx !== 'undefined') {
            wx.vibrateLong();
        }
        else if (navigator.vibrate) {
            navigator.vibrate(400)
            console.debug('Vibrate Long')
        }
    }
}