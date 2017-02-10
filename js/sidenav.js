(function (win) {
  var sideNav = {
    Option : {
        width : "300", //sideNav width 250px
        subfix : "px",
        closeEvent : function(){
        },
        openEvent : function(){
        }
    },
    setOption : function (Opt) {
        if( typeof Opt === "object"){
            this.Option = tw_global.extends(this.Option , Opt);
        }else{
            throw new Error("Option은 객체여야합니다.");
        }
    },
    sideNavInit : function(){
        document.getElementById("openNav").addEventListener("click",tw_com.sideNav.OpensideNavbar);
        document.getElementById("closeNav").addEventListener("click",tw_com.sideNav.ClosesideNavbar);
        document.getElementById("tw-sideNav").style.width = this.Option.width + this.Option.subfix;
    },
    //sidenav open 함수
    OpensideNavbar : function(){
          tw_global.createShadow("sha-ray", tw_com.sideNav.ClosesideNavbar);
          var sidenavShadow = document.getElementById("sha-ray");
          requestAnimationFrame(function(){
            sidenavShadow.style.opacity = 1;
            document.getElementById("tw-sideNav").style.transform = "translateX(0px)";
          });
          //그림자 영역 설정완료시 그림자가없으면 엘리먼트 제거
          sidenavShadow.addEventListener("transitionend",tw_com.sideNav.eventCatch);
    },
    ClosesideNavbar : function(){
        document.getElementById("sha-ray").style.opacity = "0";
        document.getElementById("tw-sideNav").style.transform = "translateX(-100%)";
    },
    eventCatch : function(e){
      var shadowstyle = this.currentStyle || window.getComputedStyle(this);
      if(shadowstyle.opacity === "0" && this){
          tw_global.removeShadow(this.getAttribute("id"));
          tw_com.sideNav.Option.closeEvent();
      }
      if(shadowstyle.opacity === "1" && this){
          tw_com.sideNav.Option.openEvent();
      }
    }
  };

if(!win.tw_com.sideNav){
    win.tw_com.sideNav = sideNav;
}
})(window);
