;(function(m, o, d, u, l, a, r) {
  if(m[d]) return
  function f(n, t) { return function() { r.push(n, arguments); return t } }
  m[d] = a = { args: (r = []), config: f(0, a), use: f(1, a) }
  m.define = f(2)
  u = o.createElement('script')
  u.id = d + 'node'
  u.src = '/source/scripts/sea.js'
  l = o.getElementsByTagName('head')[0]
  a = o.getElementsByTagName('base')[0]
  a ? l.insertBefore(u, a) : l.appendChild(u)
})(window, document, 'seajs');

seajs.config({
	base: 'http://www.dinghaochi.com/Admin/source/scripts',
    alias: {
      'jquery': '/source/scripts/jquery-1.8.3-mini'
    },
	debug: 2
  })
