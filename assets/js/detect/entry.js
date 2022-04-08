export class DetectDevice {
  constructor() {
    window.addEventListener('DOMContentLoaded', () => {
      this.createModels();
      this.bind();
    });
  }

  createModels() {
    this.resizeFlag  = true;
    this.resizeTimer = null;
    //hover判定（hoverが使えるかどうか）
    this.isHover     = window.matchMedia("(any-hover:hover)").matches;
    this.mql         = window.matchMedia('screen and (min-width: 768px)');
    this.isSp        = null;
    this.isTablet    = null;
    this.isPC        = null;
    this.target      = document.getElementById('js-output');
  }

  bind() {
    //初回実行
    this.detect(this.mql);
    
    window.addEventListener('resize', () => {
      if(!this.resizeFlag){
        return;
      }

      this.resizeFlag = false;

      if(this.resizeTimer){
        window.clearTimeout(this.resizeTimer);
      }

      this.resizeTimer = window.setTimeout(() => {
        this.detect(this.mql);
        this.resizeFlag = true;
        window.clearTimeout(this.resizeTimer);
      }, 100);

    });
  }

  detect = (mql) => {
    //タブレットかPC
    if (mql.matches) {
      //hover判定の更新
      this.isHover  = window.matchMedia("(any-hover:hover)").matches;
      //タッチデバイスでない場合
      if(this.isHover){
        this.target.textContent = 'PC';
        console.log('PC');
        this.isSp     = false;
        this.isTablet = false;
        this.isPC     = true;
      }
      //タッチデバイスの場合
      else{
        this.target.textContent = 'タブレット（タッチデバイス）';
        console.log('タブレット（タッチデバイス）');
        this.isSp     = false;
        this.isTablet = true;
        this.isPC     = false;
      }

    }
    //スマホ
    else {
      this.target.textContent = 'スマホ';
      console.log('スマホ');
      this.isSp     = true;
      this.isTablet = false;
      this.isPC     = false;
    }
  }

}

new DetectDevice();