export default class CCUtil {

    static async loadRes<T>(url: string, type: { new(): T }): Promise<T> {
        return new Promise<T>((rs, rj) => {
            cc.loader.loadRes(url, type as any, (err, res: T) => {
                if (err) {
                    rj(err)
                    return;
                }
                rs(res);
            })
        })
    }

    static async loadRemote(url: string, type: 'png'): Promise<cc.Texture2D>;
    static async loadRemote(url: string): Promise<any>;
    static async loadRemote(url: string, type?: string): Promise<any> {
        return new Promise((rs, rj) => {
            cc.loader.load(type ? { url: url, type: type } : url, function (err: Error | null, res: any) {
                if (err) {
                    rj(err);
                }
                else {
                    rs(res);
                }
            });
        })
    }

    static getImage(url: string, onLoad?: (sf: cc.SpriteFrame) => void): cc.SpriteFrame {
        let output = new cc.SpriteFrame();
        CCUtil.loadRemote(url, 'png').then(tex => {
            output.setTexture(tex);
            onLoad && onLoad(output);
        })
        return output;
    }

    static ensureTextureLoaded(node: cc.Node): Promise<void[]> {
        let promises: Promise<any>[] = [];
        for (let child of node.children) {
            let sprite = child.getComponent(cc.Sprite);
            if (sprite) {
                if (!sprite.spriteFrame.textureLoaded()) {
                    promises.push(new Promise(rs => {
                        sprite.spriteFrame.on('load', () => { rs(); });
                        sprite.spriteFrame.ensureLoadTexture();
                    }))
                }
            }
            if (child.children.length) {
                promises.push(this.ensureTextureLoaded(child))
            }
        }
        return Promise.all(promises);
    }
}