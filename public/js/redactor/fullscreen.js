(function ($R) {
    $R.add('plugin', 'fullscreen', {
        translations: {
            en: {
                "fullscreen": "Fullscreen"
            }
        },
        init: function init(app) {
            this.app = app;
            this.opts = app.opts;
            this.lang = app.lang;
            this.$win = app.$win;
            this.$doc = app.$doc;
            this.$body = app.$body;
            this.editor = app.editor;
            this.toolbar = app.toolbar;
            this.container = app.container;
            this.selection = app.selection;

            // local
            this.isOpen = false;
        },
        // public
        start: function start() {
            var data = {
                title: this.lang.get('fullscreen'),
                api: 'plugin.fullscreen.toggle'
            };

            var button = this.toolbar.addButton('fullscreen', data);
            button.setIcon('<i class="re-icon-expand"></i>');

            this.isTarget = this.opts.toolbarFixedTarget !== document;
            this.$target = this.isTarget ? $R.dom(this.opts.toolbarFixedTarget) : this.$body;

            if (this.opts.fullscreen) this.toggle();
        },
        toggle: function toggle() {
            return this.isOpen ? this.close() : this.open();
        },
        open: function open() {
            this._createPlacemarker();
            this.selection.save();

            var $container = this.container.getElement();
            var $editor = this.editor.getElement();
            var $html = this.isTarget ? $R.dom('body, html') : this.$target;

            if (this.opts.toolbarExternal) this._buildInternalToolbar();

            this.$target.prepend($container);
            this.$target.addClass('redactor-body-fullscreen');

            $container.addClass('redactor-box-fullscreen');
            if (this.isTarget) $container.addClass('redactor-box-fullscreen-target');

            $html.css('overflow', 'hidden');

            if (this.opts.maxHeight) $editor.css('max-height', '');
            if (this.opts.minHeight) $editor.css('min-height', '');

            this._resize();
            this.$win.on('resize.redactor-plugin-fullscreen', this._resize.bind(this));
            this.$doc.scrollTop(0);

            var button = this.toolbar.getButton('fullscreen');
            button.setIcon('<i class="re-icon-retract"></i>');

            this.selection.restore();
            this.isOpen = true;
            this.opts.zindex = 1051;
        },
        close: function close() {
            this.isOpen = false;
            this.opts.zindex = false;
            this.selection.save();

            var $container = this.container.getElement();
            var $editor = this.editor.getElement();
            var $html = $R.dom('body, html');

            if (this.opts.toolbarExternal) this._buildExternalToolbar();

            this.$target.removeClass('redactor-body-fullscreen');
            this.$win.off('resize.redactor-plugin-fullscreen');
            $html.css('overflow', '');

            $container.removeClass('redactor-box-fullscreen redactor-box-fullscreen-target');
            $editor.css('height', 'auto');

            if (this.opts.minHeight) $editor.css('minHeight', this.opts.minHeight);
            if (this.opts.maxHeight) $editor.css('maxHeight', this.opts.maxHeight);

            var button = this.toolbar.getButton('fullscreen');
            button.setIcon('<i class="re-icon-expand"></i>');

            this._removePlacemarker($container);
            this.selection.restore();
        },

        // private
        _resize: function _resize() {
            var $editor = this.editor.getElement();
            var height = this.$win.height();

            $editor.height(height);
        },
        _buildInternalToolbar: function _buildInternalToolbar() {
            var $wrapper = this.toolbar.getWrapper();
            var $toolbar = this.toolbar.getElement();

            $wrapper.addClass('redactor-toolbar-wrapper');
            $wrapper.append($toolbar);

            $toolbar.removeClass('redactor-toolbar-external');
            $container.prepend($wrapper);
        },
        _buildExternalToolbar: function _buildExternalToolbar() {
            var $wrapper = this.toolbar.getWrapper();
            var $toolbar = this.toolbar.getElement();

            this.$external = $R.dom(this.opts.toolbarExternal);

            $toolbar.addClass('redactor-toolbar-external');
            this.$external.append($toolbar);

            $wrapper.remove();
        },
        _createPlacemarker: function _createPlacemarker() {
            var $container = this.container.getElement();

            this.$placemarker = $R.dom('<span />');
            $container.after(this.$placemarker);
        },
        _removePlacemarker: function _removePlacemarker($container) {
            this.$placemarker.before($container);
            this.$placemarker.remove();
        }
    });
})(Redactor);

