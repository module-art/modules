
(function ($R) {
    $R.add('plugin', 'imagemanager', {
        translations: {
            en: {
                "choose": "Choose"
            }
        },
        init: function init(app) {
            this.app = app;
            this.lang = app.lang;
            this.opts = app.opts;
        },
        // messages
        onmodal: {
            image: {
                open: function open($modal, $form) {
                    if (!this.opts.imageManagerJson) return;
                    this._load($modal);
                }
            }
        },

        // private
        _load: function _load($modal) {
            var $body = $modal.getBody();

            this.$box = $R.dom('<div>');
            this.$box.attr('data-title', this.lang.get('choose'));
            this.$box.addClass('redactor-modal-tab');
            this.$box.hide();
            this.$box.css({
                overflow: 'auto',
                height: '300px',
                'line-height': 1
            });

            $body.append(this.$box);

            $R.ajax.get({
                url: this.opts.imageManagerJson,
                success: this._parse.bind(this)
            });
        },
        _parse: function _parse(json) {
            var data = json;

            for (var key in data) {
                var obj = data[key];
                var $img = $R.dom('<img>');

                $img.attr('src', obj.thumb);
                $img.attr('data-params', encodeURI(JSON.stringify(obj)));
                $img.css({
                    width: '96px',
                    height: '72px',
                    margin: '0 4px 2px 0',
                    cursor: 'pointer'
                });
                $img.on('click', this._insert.bind(this));

                this.$box.append($img);
            }
        },
        _insert: function _insert(e) {
            e.preventDefault();

            var $el = $R.dom(e.target);
            var data = JSON.parse(decodeURI($el.attr('data-params')));

            this.app.api('module.image.insert', { image: data });
        }
    });
})(Redactor);

