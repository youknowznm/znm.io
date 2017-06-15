import $ from './jquery';

export default function initMdButton() {

    $('body')
        .on('mousedown', '.md-button-flat:not(._disabled)', function(evt) {
            let $this = $(this);
            if ($this.data('animating') === false) {
                $this.data('clicked', true);
                let $ripple = $this.find('.ripple');
                let _x = evt.offsetX;
                let _y = evt.offsetY;
                let _width = $this.innerWidth();
                let _height = $this.innerHeight();
                // 根据事件坐标和按钮水平中点的距离，获取波纹的直径
                let offsetToHorizontalCenter = _width / 2 - _x;
                let offsetToVerticalCenter = _height / 2 - _y;
                let sideLength = _width + Math.abs(offsetToHorizontalCenter) * 2 + (_width / 10);
                $ripple.css({
                    width: sideLength,
                    height: sideLength,
                    left: (_width - sideLength) / 2 - offsetToHorizontalCenter,
                    top: (_height - sideLength) / 2 - offsetToVerticalCenter,
                });
                $this.addClass('mousedown');
            }
        })
        .on('mouseup mouseout', '.md-button-flat:not(._disabled)', function() {
            let $this = $(this);
            if ($this.data('animating') === false && $this.data('clicked') === true) {

                // 设置timeout，避免mousedown事件持续时间过短导致的闪烁
                setTimeout(function() {

                    $this.data({
                        animating: true,
                        clicked: false
                    });
                    $this.removeClass('mousedown').addClass('mouseup');
                    setTimeout(function() {
                        $this.removeClass('mouseup');
                        $this.data('animating', false);
                    }, 550);

                }, 250);

            }
        })

    $('body')
        .on('mousedown', '.md-button-round', function(evt) {
            $(this).addClass('mousedown');
        })
        .on('mouseup mouseout', '.md-button-round', function() {
            $(this).removeClass('mousedown');
        })

}