(function ($R) {
    $R.add('plugin', 'video', {
        translations: {
            en: {
                "video": "Video",
                "video-html-code": "Video Embed Code or Youtube/Vimeo Link"
            }
        },
        modals: {
            'video': '<form action=""> \
                    <div class="form-item"> \
                        <label>## video-html-code ## <span class="req">*</span></label> \
                        <textarea name="video" style="height: 160px;"></textarea> \
                    </div> \
                </form>'
        },
        init: function init(app) {
            this.app = app;
            this.lang = app.lang;
            this.opts = app.opts;
            this.toolbar = app.toolbar;
            this.component = app.component;
            this.insertion = app.insertion;
            this.inspector = app.inspector;
        },
        // messages
        onmodal: {
            video: {
                opened: function opened($modal, $form) {
                    $form.getField('video').focus();
                },
                insert: function insert($modal, $form) {
                    var data = $form.getData();
                    this._insert(data);
                }
            }
        },
        oncontextbar: function oncontextbar(e, contextbar) {
            var data = this.inspector.parse(e.target);
            if (data.isComponentType('video')) {
                var node = data.getComponent();
                var buttons = {
                    "remove": {
                        title: this.lang.get('delete'),
                        api: 'plugin.video.remove',
                        args: node
                    }
                };

                contextbar.set(e, node, buttons, 'bottom');
            }
        },

        // public
        start: function start() {
            var obj = {
                title: this.lang.get('video'),
                api: 'plugin.video.open'
            };

            var $button = this.toolbar.addButtonAfter('image', 'video', obj);
            $button.setIcon('<i class="re-icon-video"></i>');
        },
        open: function open() {
            var options = {
                title: this.lang.get('video'),
                width: '600px',
                name: 'video',
                handle: 'insert',
                commands: {
                    insert: { title: this.lang.get('insert') },
                    cancel: { title: this.lang.get('cancel') }
                }
            };

            this.app.api('module.modal.build', options);
        },
        remove: function remove(node) {
            this.component.remove(node);
        },

        // private
        _insert: function _insert(data) {
            this.app.api('module.modal.close');

            if (data.video.trim() === '') {
                return;
            }

            // parsing
            data.video = this._matchData(data.video);

            // inserting
            if (this._isVideoIframe(data.video)) {
                var $video = this.component.create('video', data.video);
                this.insertion.insertHtml($video);
            }
        },

        _isVideoIframe: function _isVideoIframe(data) {
            return data.match(/<iframe|<video/gi) !== null;
        },
        _matchData: function _matchData(data) {
            var iframeStart = '<iframe style="width: 500px; height: 281px;" src="';
            var iframeEnd = '" frameborder="0" allowfullscreen></iframe>';
            if (this._isVideoIframe(data)) {
                var allowed = ['iframe', 'video'];
                var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;

                data = data.replace(tags, function ($0, $1) {
                    return allowed.indexOf($1.toLowerCase()) === -1 ? '' : $0;
                });
            }

            if (data.match(this.opts.regex.youtube)) {
                data = data.replace(this.opts.regex.youtube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
            } else if (data.match(this.opts.regex.vimeo)) {
                data = data.replace(this.opts.regex.vimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
            }

            return data;
        }
    });
})(Redactor);
(function ($R) {
    $R.add('class', 'video.component', {
        mixins: ['dom', 'component'],
        init: function init(app, el) {
            this.app = app;

            // init
            return el && el.cmnt !== undefined ? el : this._init(el);
        },

        // private
        _init: function _init(el) {
            if (typeof el !== 'undefined') {
                var $node = $R.dom(el);
                var $wrapper = $node.closest('figure');
                if ($wrapper.length !== 0) {
                    this.parse($wrapper);
                } else {
                    this.parse('<figure>');
                    this.append(el);
                }
            } else {
                this.parse('<figure>');
            }

            this._initWrapper();
        },
        _initWrapper: function _initWrapper() {
            this.addClass('redactor-component');
            this.attr({
                'data-redactor-type': 'video',
                'tabindex': '-1',
                'contenteditable': false
            });
        }
    });
})(Redactor);

