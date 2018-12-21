import UIUtil from "./UIUtil";
import Global from "./Global";
import { LevelSceneParams } from '../../scenes/LevelScene/scripts/LevelScene';

export default class SceneUtil {
    /** loadScene历史（最多保留5条） */
    static loadSceneHistory: LoadSceneHistoryItem[] = [];
    private static _loadSceneParams?: object;
    static loadScene(scene: 'GameStartScene'): void;
    static loadScene(scene: 'ChooseLevelScene'): void;
    static loadScene(scene: 'LevelScene', params: LevelSceneParams): void;
    static loadScene(scene: string, params: object = {}) {
        console.log('loadScene', scene, params)
        Global.hhgame.stat.submitAction('切换场景', {
            scene: scene,
            params: params
        })
        this._loadSceneParams = params || {};
        UIUtil.showLoading('加载中')
        cc.director.loadScene(scene, () => {
            UIUtil.hideLoading();
        });
        this.loadSceneHistory.push({ scene: scene, params: params } as LoadSceneHistoryItem);
        // 最多保留5条
        this.loadSceneHistory.splice(0, this.loadSceneHistory.length - 5);
    }
    static get sceneParams(): any {
        return this._loadSceneParams;
    }
}

type LoadSceneHistoryItem = { scene: string, params: any };