/*
 *  simple gallery with jQuery
 *	made by owenhong 2013-08-08
 *	作者：小欧(laohonghzy@qq.com) 2013-08-27
 *  http://www.520ued.com
 */
 
(function($) {
	$.fn.soChange=function(options){
		var defaults={
			thumbObj: null,
			btnPrev: null,
			btnNext: null,
			thumbNowClass: "current",
			thumbOverEvent: true,
			slideTime: 1000,
			autoChange: true,
			clickFalse: true,
			overStop: true,
			changeTime: 5000,
			delayTime: 300
		};
		var $obj = $.extend(defaults,options);	

		var $this = $(this);
		var i;  
		var $size = $this.size();
		var $idx = 0;
		var g;
		var c;
		var f;



		//初始化所有大图都隐藏只有第一贞显示
		$this.hide().eq(0).show();

		
		function j() {

			g = ($idx + 1) % $size;

			d();
		}

		function d() {
			if ($idx != g) {
				//切换控制器样式
				if ($obj.thumbObj != null) {
					$($obj.thumbObj).removeClass($obj.thumbNowClass).eq(g).addClass($obj.thumbNowClass)
				}

				console.log($idx);

				//根据切换设置时间选择相对应的方式
				if ($obj.slideTime <= 0) {
					$this.eq($idx).hide();
					$this.eq(g).show()
				} else {
					$this.eq($idx).fadeOut($obj.slideTime);
					$this.eq(g).fadeIn($obj.slideTime)
				}

				//切换完幻灯片后将$idx更新为最新值
				$idx = g;

				console.log($idx);

				if ($obj.autoChange == true) {
					clearInterval(c);
					c = setInterval(j, $obj.changeTime)
				}
			}
		}
		
		


		if ($obj.thumbObj != null) {
			i = $($obj.thumbObj);
			i.removeClass($obj.thumbNowClass).eq(0).addClass($obj.thumbNowClass);

			i.click(function() {
				g = i.index($(this));
				d();
				if ($obj.clickFalse == true) {
					return false
				}
			});
			if ($obj.thumbOverEvent == true) {
				i.mouseenter(function() {
					g = i.index($(this));
					f = setTimeout(d, $obj.delayTime)
				});
				i.mouseleave(function() {
					clearTimeout(f)
				})
			}
		}


		if ($obj.btnNext != null) {
			$($obj.btnNext).click(function() {
				if ($this.queue().length < 1) {
					j();
				}
				return false
			})
		}
		if ($obj.btnPrev != null) {
			$($obj.btnPrev).click(function() {
				if ($this.queue().length < 1) {
					g = ($idx + $size - 1) % $size;
					d();
				}
				return false
			})
		}

		if ($obj.autoChange == true) {
			c = setInterval(j, $obj.changeTime);

			if ($obj.overStop == true) {
				$this.mouseenter(function() {
					clearInterval(c)
				});
				$this.mouseleave(function() {
					c = setInterval(j, $obj.changeTime)
				})
			}
		}
	}	
})(jQuery);