import Global from "./Global";
import WeappUtil from "k8w-weapp-util";

export default class UIUtil {
    private static _hideLoadingTimes = 0;
    private static _loadingNum = 0;
    /** loading的超时自动隐藏的定时器 */
    private static _hideLoadingTimer: number = 0;
    static showLoading(title: string = '') {
        ++this._loadingNum;
        let curHideLoadingTimes = this._hideLoadingTimes;

        if (Global.hhgame.wegame) {
            wx.showLoading({ title: title, mask: true });
        }
        else {
            console.log('UIUtil.showLoading');
            if (CC_PREVIEW) {
                if (document.getElementById('uiutil_loading')) {
                    document.body.innerHTML += `<div id='uiutil_loading' style="position: fixed; background: rgba(255,255,255,0.8); width: 100%; height: 100%; z-index:99999; text-align: center; line-height: 100vh; font-size: 36px">Loading</div>`
                }
            }
        }

        // 15秒后自动超时隐藏
        if (!this._hideLoadingTimer) {
            this._hideLoadingTimer = setTimeout(() => {
                if (this._hideLoadingTimes === curHideLoadingTimes) {
                    this.hideLoading(true);
                }
            }, 15000);
        }
    }
    static hideLoading(force: boolean = false) {
        --this._loadingNum;
        if (force || this._loadingNum < 0) {
            this._loadingNum = 0;
        }

        if (this._loadingNum <= 0) {
            if (this._hideLoadingTimer) {
                clearTimeout(this._hideLoadingTimer);
                this._hideLoadingTimer = 0;
            }

            if (Global.hhgame.wegame) {
                wx.hideLoading();
            }
            else {
                console.log('UIUtil.hideLoading')
                if (CC_PREVIEW) {
                    let loading = document.getElementById('uiutil_loading');
                    loading && loading.remove();
                }
            }

            ++this._hideLoadingTimes;
        }
    }

    static showToast(string: string, icon?: 'success' | 'loading' | 'none', duration?: number) {
        if (Global.hhgame.wegame) {
            wx.showToast({
                title: string,
                icon: icon,
                duration: duration || 2000
            })
        }
        else {
            console.log('UIUtil.showToast', string);
        }
    }
}