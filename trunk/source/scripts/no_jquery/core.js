/*!
 * MonkJs 1.0.0
 */
(function( window, undefined ) {
    var
        document = window.document,
        location = window.location,

        monk_version    = '1.0.0',
        //节点高速缓存
        monk_dom_cache  = [],
        //内部支持类型
        monk_class_type = {},
        //选择器
        selector =  "",
        //防止xss
        rquick_expr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/; ///^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        
     Monk = function( selector, context ) {
        if ( !selector ) {
            return this;
        }

        if ( typeof selector === "string" ) {
            if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
                match = [ null, selector, null ];
            } else {
                match = rquick_expr.exec( selector );
            }
            if ( match && (match[1] || !context) ) {
                if ( match[1] ) {
                    context = context instanceof Monk ? context[0] : context;
                    Monk.merge( this, Monk.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ) );
                    if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
                        for ( match in context ) {
                            if ( jQuery.isFunction( this[ match ] ) ) {
                                this[ match ]( context[ match ] );
                            } else {
                                this.attr( match, context[ match ] );
                            }
                        }
                    }

                    return this;
                } else {
                    elem = document.getElementById( match[2] );
                    if ( elem && elem.parentNode ) {
                        if ( elem.id !== match[2] ) {
                            return rootjQuery.find( selector );
                        }
                        this.length = 1;
                        this[0] = elem;
                    }

                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            } else if ( !context || context.jquery ) {
                return ( context || rootjQuery ).find( selector );
            } else {
                return this.constructor( context ).find( selector );
            }
        }
    };

    Monk.nod = Monk.prototype = {
        
    };

    //继承支持
    Monk.extend = Monk.nod.extend = function(options) {
        var src, copyIsArray, copy, name, clone, target = this;
        if ( options != null ) {
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];
                if ( target === copy ) {
                    continue;
                }
                if ( copy && ( Monk.isPlainObject(copy) || (copyIsArray = Monk.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && Monk.isArray(src) ? src : [];
                    } else {
                        clone = src && Monk.isPlainObject(src) ? src : {};
                    }
                    target[ name ] = Monk.extend( copy );
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
        return target;
    };

    Monk.extend({
        isWindow: function( obj ) {
            return obj != null && obj == obj.window;
        },
        isArray: Array.isArray || function( obj ) {
            return Monk.type(obj) === "array";
        },
        type: function( obj ) {
            if ( obj == null ) {
                return String( obj );
            }
            return typeof obj === "object" || typeof obj === "function" ?
                monk_class_type[ monk_class_type.toString.call(obj) ] || "object" :
                typeof obj;
        },
        isPlainObject: function( obj ) {
            if ( !obj || Monk.type(obj) !== "object" || obj.nodeType || Monk.isWindow( obj ) ) {
                return false;
            }
            try {
                if ( obj.constructor &&
                    !monk_class_type.hasOwnProperty.call(obj, "constructor") &&
                    !monk_class_type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
                    return false;
                }
            } catch ( e ) {
                return false;
            }
            var key;
            for ( key in obj ) {}

            return key === undefined || monk_class_type.hasOwnProperty.call( obj, key );
        }
    });
    window.Monk  = Monk;
    //是否支持amd规范?
})( window );