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
    this.isTouch     = this.isTouchDevice();
    this.mql         = window.matchMedia('screen and (min-width: 768px)');
    this.target = document.getElementById('js-output');
  }

  //タッチデバイス判定
  isTouchDevice() {
    return !window.matchMedia("(any-hover:hover)").matches;
  }

  bind() {
    //初回実行
    this.detect(this.mql);

    //ブレークポイントが切り替わったタイミングで実行
    // this.mql.addEventListener('change', this.detect);
    
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
      //タッチデバイス判定の更新
      this.isTouch = this.isTouchDevice();
      //タッチデバイスの場合
      if(this.isTouch){
        this.target.textContent = 'タブレット';
        console.log('タブレット');
        this.isSp     = false;
        this.isTablet = true;
        this.isPC     = false;
      }
      //タッチデバイスでない場合
      else{
        this.target.textContent = 'PC';
        console.log('PC');
        this.isSp     = false;
        this.isTablet = false;
        this.isPC     = true;
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