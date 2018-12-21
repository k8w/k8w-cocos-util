import LocalStorage from "k8w-local-storage";

// LocalStorage存储 Key的统一前缀
const LS_KEY_PREFIX = 'DailyLimit_';

export interface DailyLimitConf {
    key: string,
    limit: number
}

/**
 * 每次次数上限限制
 * 使用LocalStorage存储
 */
export default class DailylLimit {
    /**
     * 使用今天的次数
     * 增加成功返回true，
     * 如果增加失败（今日次数已经用完），返回false
     * @param key 
     * @param addNum 
     * @param limit 
     */
    static use(conf: DailyLimitConf, useNum: number): boolean {
        let countData: any = this._setIfNull(conf.key, conf.limit);
        let resetNum = countData.count - useNum;
        if (resetNum < 0) {
            return false;
        }
        else {
            countData.count = resetNum;
            LocalStorage.setItem(LS_KEY_PREFIX + conf.key, countData);
        }
        return true;
    }

    /**
     * 获取今日剩余次数
     * @param key 
     * @param limit 
     */
    static getRemainedNum(conf: DailyLimitConf): number {
        let countData: any = this._setIfNull(conf.key, conf.limit);
        return countData.count;
    }


    /**
     * 今日奖励次数是否已经用完
     * 小于等于0返回true
     * @param key 
     * @param limit 
     */
    static isUsedUp(conf: DailyLimitConf): boolean {
        let countData: any = this._setIfNull(conf.key, conf.limit);
        return countData.count <= 0;
    }

    private static _setIfNull(key: string, limit: number) {
        let countData: any = LocalStorage.getItem(LS_KEY_PREFIX + key);
        if (!countData || countData.date !== new Date().format("yyyy-MM-dd")) {
            countData = {};
            countData.count = limit;
            countData.date = new Date().format("yyyy-MM-dd");
            LocalStorage.setItem(LS_KEY_PREFIX + key, countData);
        }
        return countData;
    }
}