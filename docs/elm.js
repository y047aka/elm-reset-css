(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEBUG mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// HELPERS


function _Debugger_unsafeCoerce(value)
{
	return value;
}



// PROGRAMS


var _Debugger_element = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			var currNode = _VirtualDom_virtualize(domNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			var cornerNode = _VirtualDom_doc.createElement('div');
			domNode.parentNode.insertBefore(cornerNode, domNode.nextSibling);
			var cornerCurr = _VirtualDom_virtualize(cornerNode);

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = A2(_VirtualDom_map, $elm$browser$Debugger$Main$UserMsg, view($elm$browser$Debugger$Main$getUserModel(model)));
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view corner

				var cornerNext = $elm$browser$Debugger$Main$cornerView(model);
				var cornerPatches = _VirtualDom_diff(cornerCurr, cornerNext);
				cornerNode = _VirtualDom_applyPatches(cornerNode, cornerCurr, cornerPatches, sendToApp);
				cornerCurr = cornerNext;

				if (!model.popout.b)
				{
					currPopout = undefined;
					return;
				}

				// view popout

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


var _Debugger_document = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		A3($elm$browser$Debugger$Main$wrapInit, _Json_wrap(debugMetadata), _Debugger_popout(), impl.init),
		$elm$browser$Debugger$Main$wrapUpdate(impl.update),
		$elm$browser$Debugger$Main$wrapSubs(impl.subscriptions),
		function(sendToApp, initialModel)
		{
			var divertHrefToApp = impl.setup && impl.setup(function(x) { return sendToApp($elm$browser$Debugger$Main$UserMsg(x)); });
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			var currBlocker = $elm$browser$Debugger$Main$toBlockerType(initialModel);
			var currPopout;

			initialModel.popout.a = sendToApp;

			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view($elm$browser$Debugger$Main$getUserModel(model));
				var nextNode = _VirtualDom_node('body')(_List_Nil)(
					_Utils_ap(
						A2($elm$core$List$map, _VirtualDom_map($elm$browser$Debugger$Main$UserMsg), doc.body),
						_List_Cons($elm$browser$Debugger$Main$cornerView(model), _List_Nil)
					)
				);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);

				// update blocker

				var nextBlocker = $elm$browser$Debugger$Main$toBlockerType(model);
				_Debugger_updateBlocker(currBlocker, nextBlocker);
				currBlocker = nextBlocker;

				// view popout

				if (!model.popout.b) { currPopout = undefined; return; }

				_VirtualDom_doc = model.popout.b; // SWITCH TO POPOUT DOC
				currPopout || (currPopout = _VirtualDom_virtualize(model.popout.b));
				var nextPopout = $elm$browser$Debugger$Main$popoutView(model);
				var popoutPatches = _VirtualDom_diff(currPopout, nextPopout);
				_VirtualDom_applyPatches(model.popout.b.body, currPopout, popoutPatches, sendToApp);
				currPopout = nextPopout;
				_VirtualDom_doc = document; // SWITCH BACK TO NORMAL DOC
			});
		}
	);
});


function _Debugger_popout()
{
	return {
		b: undefined,
		a: undefined
	};
}

function _Debugger_isOpen(popout)
{
	return !!popout.b;
}

function _Debugger_open(popout)
{
	return _Scheduler_binding(function(callback)
	{
		_Debugger_openWindow(popout);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}

function _Debugger_openWindow(popout)
{
	var w = $elm$browser$Debugger$Main$initialWindowWidth,
		h = $elm$browser$Debugger$Main$initialWindowHeight,
	 	x = screen.width - w,
		y = screen.height - h;

	var debuggerWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);
	var doc = debuggerWindow.document;
	doc.title = 'Elm Debugger';

	// handle arrow keys
	doc.addEventListener('keydown', function(event) {
		event.metaKey && event.which === 82 && window.location.reload();
		event.key === 'ArrowUp'   && (popout.a($elm$browser$Debugger$Main$Up  ), event.preventDefault());
		event.key === 'ArrowDown' && (popout.a($elm$browser$Debugger$Main$Down), event.preventDefault());
	});

	// handle window close
	window.addEventListener('unload', close);
	debuggerWindow.addEventListener('unload', function() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		window.removeEventListener('unload', close);
	});

	function close() {
		popout.b = undefined;
		popout.a($elm$browser$Debugger$Main$NoOp);
		debuggerWindow.close();
	}

	// register new window
	popout.b = doc;
}



// SCROLL


function _Debugger_scroll(popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msgs = popout.b.getElementById('elm-debugger-sidebar');
			if (msgs && msgs.scrollTop !== 0)
			{
				msgs.scrollTop = 0;
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


var _Debugger_scrollTo = F2(function(id, popout)
{
	return _Scheduler_binding(function(callback)
	{
		if (popout.b)
		{
			var msg = popout.b.getElementById(id);
			if (msg)
			{
				msg.scrollIntoView(false);
			}
		}
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});



// UPLOAD


function _Debugger_upload(popout)
{
	return _Scheduler_binding(function(callback)
	{
		var doc = popout.b || document;
		var element = doc.createElement('input');
		element.setAttribute('type', 'file');
		element.setAttribute('accept', 'text/json');
		element.style.display = 'none';
		element.addEventListener('change', function(event)
		{
			var fileReader = new FileReader();
			fileReader.onload = function(e)
			{
				callback(_Scheduler_succeed(e.target.result));
			};
			fileReader.readAsText(event.target.files[0]);
			doc.body.removeChild(element);
		});
		doc.body.appendChild(element);
		element.click();
	});
}



// DOWNLOAD


var _Debugger_download = F2(function(historyLength, json)
{
	return _Scheduler_binding(function(callback)
	{
		var fileName = 'history-' + historyLength + '.txt';
		var jsonString = JSON.stringify(json);
		var mime = 'text/plain;charset=utf-8';
		var done = _Scheduler_succeed(_Utils_Tuple0);

		// for IE10+
		if (navigator.msSaveBlob)
		{
			navigator.msSaveBlob(new Blob([jsonString], {type: mime}), fileName);
			return callback(done);
		}

		// for HTML5
		var element = document.createElement('a');
		element.setAttribute('href', 'data:' + mime + ',' + encodeURIComponent(jsonString));
		element.setAttribute('download', fileName);
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		callback(done);
	});
});



// POPOUT CONTENT


function _Debugger_messageToString(value)
{
	if (typeof value === 'boolean')
	{
		return value ? 'True' : 'False';
	}

	if (typeof value === 'number')
	{
		return value + '';
	}

	if (typeof value === 'string')
	{
		return '"' + _Debugger_addSlashes(value, false) + '"';
	}

	if (value instanceof String)
	{
		return "'" + _Debugger_addSlashes(value, true) + "'";
	}

	if (typeof value !== 'object' || value === null || !('$' in value))
	{
		return '…';
	}

	if (typeof value.$ === 'number')
	{
		return '…';
	}

	var code = value.$.charCodeAt(0);
	if (code === 0x23 /* # */ || /* a */ 0x61 <= code && code <= 0x7A /* z */)
	{
		return '…';
	}

	if (['Array_elm_builtin', 'Set_elm_builtin', 'RBNode_elm_builtin', 'RBEmpty_elm_builtin'].indexOf(value.$) >= 0)
	{
		return '…';
	}

	var keys = Object.keys(value);
	switch (keys.length)
	{
		case 1:
			return value.$;
		case 2:
			return value.$ + ' ' + _Debugger_messageToString(value.a);
		default:
			return value.$ + ' … ' + _Debugger_messageToString(value[keys[keys.length - 1]]);
	}
}


function _Debugger_init(value)
{
	if (typeof value === 'boolean')
	{
		return A3($elm$browser$Debugger$Expando$Constructor, $elm$core$Maybe$Just(value ? 'True' : 'False'), true, _List_Nil);
	}

	if (typeof value === 'number')
	{
		return $elm$browser$Debugger$Expando$Primitive(value + '');
	}

	if (typeof value === 'string')
	{
		return $elm$browser$Debugger$Expando$S('"' + _Debugger_addSlashes(value, false) + '"');
	}

	if (value instanceof String)
	{
		return $elm$browser$Debugger$Expando$S("'" + _Debugger_addSlashes(value, true) + "'");
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (tag === '::' || tag === '[]')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ListSeq, true,
				A2($elm$core$List$map, _Debugger_init, value)
			);
		}

		if (tag === 'Set_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$SetSeq, true,
				A3($elm$core$Set$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (tag === 'RBNode_elm_builtin' || tag == 'RBEmpty_elm_builtin')
		{
			return A2($elm$browser$Debugger$Expando$Dictionary, true,
				A3($elm$core$Dict$foldr, _Debugger_initKeyValueCons, _List_Nil, value)
			);
		}

		if (tag === 'Array_elm_builtin')
		{
			return A3($elm$browser$Debugger$Expando$Sequence, $elm$browser$Debugger$Expando$ArraySeq, true,
				A3($elm$core$Array$foldr, _Debugger_initCons, _List_Nil, value)
			);
		}

		if (typeof tag === 'number')
		{
			return $elm$browser$Debugger$Expando$Primitive('<internals>');
		}

		var char = tag.charCodeAt(0);
		if (char === 35 || 65 <= char && char <= 90)
		{
			var list = _List_Nil;
			for (var i in value)
			{
				if (i === '$') continue;
				list = _List_Cons(_Debugger_init(value[i]), list);
			}
			return A3($elm$browser$Debugger$Expando$Constructor, char === 35 ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(tag), true, $elm$core$List$reverse(list));
		}

		return $elm$browser$Debugger$Expando$Primitive('<internals>');
	}

	if (typeof value === 'object')
	{
		var dict = $elm$core$Dict$empty;
		for (var i in value)
		{
			dict = A3($elm$core$Dict$insert, i, _Debugger_init(value[i]), dict);
		}
		return A2($elm$browser$Debugger$Expando$Record, true, dict);
	}

	return $elm$browser$Debugger$Expando$Primitive('<internals>');
}

var _Debugger_initCons = F2(function initConsHelp(value, list)
{
	return _List_Cons(_Debugger_init(value), list);
});

var _Debugger_initKeyValueCons = F3(function(key, value, list)
{
	return _List_Cons(
		_Utils_Tuple2(_Debugger_init(key), _Debugger_init(value)),
		list
	);
});

function _Debugger_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}



// BLOCK EVENTS


function _Debugger_updateBlocker(oldBlocker, newBlocker)
{
	if (oldBlocker === newBlocker) return;

	var oldEvents = _Debugger_blockerToEvents(oldBlocker);
	var newEvents = _Debugger_blockerToEvents(newBlocker);

	// remove old blockers
	for (var i = 0; i < oldEvents.length; i++)
	{
		document.removeEventListener(oldEvents[i], _Debugger_blocker, true);
	}

	// add new blockers
	for (var i = 0; i < newEvents.length; i++)
	{
		document.addEventListener(newEvents[i], _Debugger_blocker, true);
	}
}


function _Debugger_blocker(event)
{
	if (event.type === 'keydown' && event.metaKey && event.which === 82)
	{
		return;
	}

	var isScroll = event.type === 'scroll' || event.type === 'wheel';
	for (var node = event.target; node; node = node.parentNode)
	{
		if (isScroll ? node.id === 'elm-debugger-details' : node.id === 'elm-debugger-overlay')
		{
			return;
		}
	}

	event.stopPropagation();
	event.preventDefault();
}

function _Debugger_blockerToEvents(blocker)
{
	return blocker === $elm$browser$Debugger$Overlay$BlockNone
		? []
		: blocker === $elm$browser$Debugger$Overlay$BlockMost
			? _Debugger_mostEvents
			: _Debugger_allEvents;
}

var _Debugger_mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var _Debugger_allEvents = _Debugger_mostEvents.concat('wheel', 'scroll');




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Debugger$Expando$ArraySeq = {$: 'ArraySeq'};
var $elm$browser$Debugger$Overlay$BlockMost = {$: 'BlockMost'};
var $elm$browser$Debugger$Overlay$BlockNone = {$: 'BlockNone'};
var $elm$browser$Debugger$Expando$Constructor = F3(
	function (a, b, c) {
		return {$: 'Constructor', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Dictionary = F2(
	function (a, b) {
		return {$: 'Dictionary', a: a, b: b};
	});
var $elm$browser$Debugger$Main$Down = {$: 'Down'};
var $elm$browser$Debugger$Expando$ListSeq = {$: 'ListSeq'};
var $elm$browser$Debugger$Main$NoOp = {$: 'NoOp'};
var $elm$browser$Debugger$Expando$Primitive = function (a) {
	return {$: 'Primitive', a: a};
};
var $elm$browser$Debugger$Expando$Record = F2(
	function (a, b) {
		return {$: 'Record', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$S = function (a) {
	return {$: 'S', a: a};
};
var $elm$browser$Debugger$Expando$Sequence = F3(
	function (a, b, c) {
		return {$: 'Sequence', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$SetSeq = {$: 'SetSeq'};
var $elm$browser$Debugger$Main$Up = {$: 'Up'};
var $elm$browser$Debugger$Main$UserMsg = function (a) {
	return {$: 'UserMsg', a: a};
};
var $elm$browser$Debugger$Main$Export = {$: 'Export'};
var $elm$browser$Debugger$Main$Import = {$: 'Import'};
var $elm$browser$Debugger$Main$Open = {$: 'Open'};
var $elm$browser$Debugger$Main$OverlayMsg = function (a) {
	return {$: 'OverlayMsg', a: a};
};
var $elm$browser$Debugger$Main$Resume = {$: 'Resume'};
var $elm$browser$Debugger$Main$isPaused = function (state) {
	if (state.$ === 'Running') {
		return false;
	} else {
		return true;
	}
};
var $elm$browser$Debugger$History$size = function (history) {
	return history.numMessages;
};
var $elm$browser$Debugger$Overlay$Accept = function (a) {
	return {$: 'Accept', a: a};
};
var $elm$browser$Debugger$Overlay$Choose = F2(
	function (a, b) {
		return {$: 'Choose', a: a, b: b};
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm$browser$Debugger$Overlay$goodNews1 = '\nThe good news is that having values like this in your message type is not\nso great in the long run. You are better off using simpler data, like\n';
var $elm$browser$Debugger$Overlay$goodNews2 = '\nfunction can pattern match on that data and call whatever functions, JSON\ndecoders, etc. you need. This makes the code much more explicit and easy to\nfollow for other readers (or you in a few months!)\n';
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm$html$Html$code = _VirtualDom_node('code');
var $elm$browser$Debugger$Overlay$viewCode = function (name) {
	return A2(
		$elm$html$Html$code,
		_List_Nil,
		_List_fromArray(
			[
				$elm$html$Html$text(name)
			]));
};
var $elm$browser$Debugger$Overlay$addCommas = function (items) {
	if (!items.b) {
		return '';
	} else {
		if (!items.b.b) {
			var item = items.a;
			return item;
		} else {
			if (!items.b.b.b) {
				var item1 = items.a;
				var _v1 = items.b;
				var item2 = _v1.a;
				return item1 + (' and ' + item2);
			} else {
				var lastItem = items.a;
				var otherItems = items.b;
				return A2(
					$elm$core$String$join,
					', ',
					_Utils_ap(
						otherItems,
						_List_fromArray(
							[' and ' + lastItem])));
			}
		}
	}
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$browser$Debugger$Overlay$problemToString = function (problem) {
	switch (problem.$) {
		case 'Function':
			return 'functions';
		case 'Decoder':
			return 'JSON decoders';
		case 'Task':
			return 'tasks';
		case 'Process':
			return 'processes';
		case 'Socket':
			return 'web sockets';
		case 'Request':
			return 'HTTP requests';
		case 'Program':
			return 'programs';
		default:
			return 'virtual DOM values';
	}
};
var $elm$browser$Debugger$Overlay$viewProblemType = function (_v0) {
	var name = _v0.name;
	var problems = _v0.problems;
	return A2(
		$elm$html$Html$li,
		_List_Nil,
		_List_fromArray(
			[
				$elm$browser$Debugger$Overlay$viewCode(name),
				$elm$html$Html$text(
				' can contain ' + ($elm$browser$Debugger$Overlay$addCommas(
					A2($elm$core$List$map, $elm$browser$Debugger$Overlay$problemToString, problems)) + '.'))
			]));
};
var $elm$browser$Debugger$Overlay$viewBadMetadata = function (_v0) {
	var message = _v0.message;
	var problems = _v0.problems;
	return _List_fromArray(
		[
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('The '),
					$elm$browser$Debugger$Overlay$viewCode(message),
					$elm$html$Html$text(' type of your program cannot be reliably serialized for history files.')
				])),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text('Functions cannot be serialized, nor can values that contain functions. This is a problem in these places:')
				])),
			A2(
			$elm$html$Html$ul,
			_List_Nil,
			A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewProblemType, problems)),
			A2(
			$elm$html$Html$p,
			_List_Nil,
			_List_fromArray(
				[
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews1),
					A2(
					$elm$html$Html$a,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$href('https://guide.elm-lang.org/types/custom_types.html')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('custom types')
						])),
					$elm$html$Html$text(', in your messages. From there, your '),
					$elm$browser$Debugger$Overlay$viewCode('update'),
					$elm$html$Html$text($elm$browser$Debugger$Overlay$goodNews2)
				]))
		]);
};
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $elm$browser$Debugger$Overlay$Cancel = {$: 'Cancel'};
var $elm$browser$Debugger$Overlay$Proceed = {$: 'Proceed'};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$browser$Debugger$Overlay$viewButtons = function (buttons) {
	var btn = F2(
		function (msg, string) {
			return A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'margin-right', '20px'),
						$elm$html$Html$Events$onClick(msg)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(string)
					]));
		});
	var buttonNodes = function () {
		if (buttons.$ === 'Accept') {
			var proceed = buttons.a;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		} else {
			var cancel = buttons.a;
			var proceed = buttons.b;
			return _List_fromArray(
				[
					A2(btn, $elm$browser$Debugger$Overlay$Cancel, cancel),
					A2(btn, $elm$browser$Debugger$Overlay$Proceed, proceed)
				]);
		}
	}();
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '60px'),
				A2($elm$html$Html$Attributes$style, 'line-height', '60px'),
				A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		buttonNodes);
};
var $elm$browser$Debugger$Overlay$viewMessage = F4(
	function (config, title, details, buttons) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-overlay'),
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100vw'),
					A2($elm$html$Html$Attributes$style, 'height', '100vh'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'none'),
					A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
							A2($elm$html$Html$Attributes$style, 'width', '600px'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', 'calc(50% - 300px)'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '36px'),
									A2($elm$html$Html$Attributes$style, 'height', '80px'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)'),
									A2($elm$html$Html$Attributes$style, 'padding-left', '22px'),
									A2($elm$html$Html$Attributes$style, 'vertical-align', 'middle'),
									A2($elm$html$Html$Attributes$style, 'line-height', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(title)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$id('elm-debugger-details'),
									A2($elm$html$Html$Attributes$style, 'padding', ' 8px 20px'),
									A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
									A2($elm$html$Html$Attributes$style, 'max-height', 'calc(100vh - 156px)'),
									A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)')
								]),
							details),
							A2(
							$elm$html$Html$map,
							config.wrap,
							$elm$browser$Debugger$Overlay$viewButtons(buttons))
						]))
				]));
	});
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$browser$Debugger$Overlay$viewShape = F4(
	function (x, y, angle, coordinates) {
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'polygon',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'points', coordinates),
					A2(
					$elm$virtual_dom$VirtualDom$attribute,
					'transform',
					'translate(' + ($elm$core$String$fromFloat(x) + (' ' + ($elm$core$String$fromFloat(y) + (') rotate(' + ($elm$core$String$fromFloat(-angle) + ')'))))))
				]),
			_List_Nil);
	});
var $elm$browser$Debugger$Overlay$elmLogo = A4(
	$elm$virtual_dom$VirtualDom$nodeNS,
	'http://www.w3.org/2000/svg',
	'svg',
	_List_fromArray(
		[
			A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '-300 -300 600 600'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'width', '24px'),
			A2($elm$virtual_dom$VirtualDom$attribute, 'height', '24px')
		]),
	_List_fromArray(
		[
			A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			'http://www.w3.org/2000/svg',
			'g',
			_List_fromArray(
				[
					A2($elm$virtual_dom$VirtualDom$attribute, 'transform', 'scale(1 -1)')
				]),
			_List_fromArray(
				[
					A4($elm$browser$Debugger$Overlay$viewShape, 0, -210, 0, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, -210, 0, 90, '-280,-90 0,190 280,-90'),
					A4($elm$browser$Debugger$Overlay$viewShape, 207, 207, 45, '-198,-66 0,132 198,-66'),
					A4($elm$browser$Debugger$Overlay$viewShape, 150, 0, 0, '-130,0 0,-130 130,0 0,130'),
					A4($elm$browser$Debugger$Overlay$viewShape, -89, 239, 0, '-191,61 69,61 191,-61 -69,-61'),
					A4($elm$browser$Debugger$Overlay$viewShape, 0, 106, 180, '-130,-44 0,86  130,-44'),
					A4($elm$browser$Debugger$Overlay$viewShape, 256, -150, 270, '-130,-44 0,86  130,-44')
				]))
		]));
var $elm$core$String$length = _String_length;
var $elm$browser$Debugger$Overlay$viewMiniControls = F2(
	function (config, numMsgs) {
		var string = $elm$core$String$fromInt(numMsgs);
		var width = $elm$core$String$fromInt(
			2 + $elm$core$String$length(string));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
					A2($elm$html$Html$Attributes$style, 'bottom', '2em'),
					A2($elm$html$Html$Attributes$style, 'right', '2em'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(42px + ' + (width + 'ch)')),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', '#1293D8'),
					A2($elm$html$Html$Attributes$style, 'color', 'white'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
					A2($elm$html$Html$Attributes$style, 'z-index', '2147483647'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(config.open)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Overlay$elmLogo,
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', 'calc(1ch + 6px)'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '1ch')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(string)
						]))
				]));
	});
var $elm$browser$Debugger$Overlay$explanationBad = '\nThe messages in this history do not match the messages handled by your\nprogram. I noticed changes in the following types:\n';
var $elm$browser$Debugger$Overlay$explanationRisky = '\nThis history seems old. It will work with this program, but some\nmessages have been added since the history was created:\n';
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $elm$browser$Debugger$Overlay$viewMention = F2(
	function (tags, verbed) {
		var _v0 = A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Overlay$viewCode,
			$elm$core$List$reverse(tags));
		if (!_v0.b) {
			return $elm$html$Html$text('');
		} else {
			if (!_v0.b.b) {
				var tag = _v0.a;
				return A2(
					$elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							$elm$html$Html$text(verbed),
							tag,
							$elm$html$Html$text('.')
						]));
			} else {
				if (!_v0.b.b.b) {
					var tag2 = _v0.a;
					var _v1 = _v0.b;
					var tag1 = _v1.a;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(verbed),
								tag1,
								$elm$html$Html$text(' and '),
								tag2,
								$elm$html$Html$text('.')
							]));
				} else {
					var lastTag = _v0.a;
					var otherTags = _v0.b;
					return A2(
						$elm$html$Html$li,
						_List_Nil,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$text(verbed),
							_Utils_ap(
								A2(
									$elm$core$List$intersperse,
									$elm$html$Html$text(', '),
									$elm$core$List$reverse(otherTags)),
								_List_fromArray(
									[
										$elm$html$Html$text(', and '),
										lastTag,
										$elm$html$Html$text('.')
									]))));
				}
			}
		}
	});
var $elm$browser$Debugger$Overlay$viewChange = function (change) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'margin', '8px 0')
			]),
		function () {
			if (change.$ === 'AliasChange') {
				var name = change.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							]))
					]);
			} else {
				var name = change.a;
				var removed = change.b.removed;
				var changed = change.b.changed;
				var added = change.b.added;
				var argsMatch = change.b.argsMatch;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-size', '1.5em')
							]),
						_List_fromArray(
							[
								$elm$browser$Debugger$Overlay$viewCode(name)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'disc'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '2em')
							]),
						_List_fromArray(
							[
								A2($elm$browser$Debugger$Overlay$viewMention, removed, 'Removed '),
								A2($elm$browser$Debugger$Overlay$viewMention, changed, 'Changed '),
								A2($elm$browser$Debugger$Overlay$viewMention, added, 'Added ')
							])),
						argsMatch ? $elm$html$Html$text('') : $elm$html$Html$text('This may be due to the fact that the type variable names changed.')
					]);
			}
		}());
};
var $elm$browser$Debugger$Overlay$viewReport = F2(
	function (isBad, report) {
		switch (report.$) {
			case 'CorruptHistory':
				return _List_fromArray(
					[
						$elm$html$Html$text('Looks like this history file is corrupt. I cannot understand it.')
					]);
			case 'VersionChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('This history was created with Elm ' + (old + (', but you are using Elm ' + (_new + ' right now.'))))
					]);
			case 'MessageChanged':
				var old = report.a;
				var _new = report.b;
				return _List_fromArray(
					[
						$elm$html$Html$text('To import some other history, the overall message type must' + ' be the same. The old history has '),
						$elm$browser$Debugger$Overlay$viewCode(old),
						$elm$html$Html$text(' messages, but the new program works with '),
						$elm$browser$Debugger$Overlay$viewCode(_new),
						$elm$html$Html$text(' messages.')
					]);
			default:
				var changes = report.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								isBad ? $elm$browser$Debugger$Overlay$explanationBad : $elm$browser$Debugger$Overlay$explanationRisky)
							])),
						A2(
						$elm$html$Html$ul,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'list-style-type', 'none'),
								A2($elm$html$Html$Attributes$style, 'padding-left', '20px')
							]),
						A2($elm$core$List$map, $elm$browser$Debugger$Overlay$viewChange, changes))
					]);
		}
	});
var $elm$browser$Debugger$Overlay$view = F5(
	function (config, isPaused, isOpen, numMsgs, state) {
		switch (state.$) {
			case 'None':
				return isOpen ? $elm$html$Html$text('') : (isPaused ? A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$id('elm-debugger-overlay'),
							A2($elm$html$Html$Attributes$style, 'position', 'fixed'),
							A2($elm$html$Html$Attributes$style, 'top', '0'),
							A2($elm$html$Html$Attributes$style, 'left', '0'),
							A2($elm$html$Html$Attributes$style, 'width', '100vw'),
							A2($elm$html$Html$Attributes$style, 'height', '100vh'),
							A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto'),
							A2($elm$html$Html$Attributes$style, 'background-color', 'rgba(200, 200, 200, 0.7)'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'font-family', '\'Trebuchet MS\', \'Lucida Grande\', \'Bitstream Vera Sans\', \'Helvetica Neue\', sans-serif'),
							A2($elm$html$Html$Attributes$style, 'z-index', '2147483646'),
							$elm$html$Html$Events$onClick(config.resume)
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-size', '80px')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('Click to Resume')
								])),
							A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs)
						])) : A2($elm$browser$Debugger$Overlay$viewMiniControls, config, numMsgs));
			case 'BadMetadata':
				var badMetadata_ = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot use Import or Export',
					$elm$browser$Debugger$Overlay$viewBadMetadata(badMetadata_),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			case 'BadImport':
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Cannot Import History',
					A2($elm$browser$Debugger$Overlay$viewReport, true, report),
					$elm$browser$Debugger$Overlay$Accept('Ok'));
			default:
				var report = state.a;
				return A4(
					$elm$browser$Debugger$Overlay$viewMessage,
					config,
					'Warning',
					A2($elm$browser$Debugger$Overlay$viewReport, false, report),
					A2($elm$browser$Debugger$Overlay$Choose, 'Cancel', 'Import Anyway'));
		}
	});
var $elm$browser$Debugger$Main$cornerView = function (model) {
	return A5(
		$elm$browser$Debugger$Overlay$view,
		{exportHistory: $elm$browser$Debugger$Main$Export, importHistory: $elm$browser$Debugger$Main$Import, open: $elm$browser$Debugger$Main$Open, resume: $elm$browser$Debugger$Main$Resume, wrap: $elm$browser$Debugger$Main$OverlayMsg},
		$elm$browser$Debugger$Main$isPaused(model.state),
		_Debugger_isOpen(model.popout),
		$elm$browser$Debugger$History$size(model.history),
		model.overlay);
};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Set$foldr = F3(
	function (func, initialState, _v0) {
		var dict = _v0.a;
		return A3(
			$elm$core$Dict$foldr,
			F3(
				function (key, _v1, state) {
					return A2(func, key, state);
				}),
			initialState,
			dict);
	});
var $elm$browser$Debugger$Main$getCurrentModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.b;
		return model;
	}
};
var $elm$browser$Debugger$Main$getUserModel = function (model) {
	return $elm$browser$Debugger$Main$getCurrentModel(model.state);
};
var $elm$browser$Debugger$Main$initialWindowHeight = 420;
var $elm$browser$Debugger$Main$initialWindowWidth = 900;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$browser$Debugger$Main$cachedHistory = function (model) {
	var _v0 = model.state;
	if (_v0.$ === 'Running') {
		return model.history;
	} else {
		var history = _v0.e;
		return history;
	}
};
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$node = $elm$virtual_dom$VirtualDom$node;
var $elm$browser$Debugger$Main$DragEnd = {$: 'DragEnd'};
var $elm$browser$Debugger$Main$getDragStatus = function (layout) {
	if (layout.$ === 'Horizontal') {
		var status = layout.a;
		return status;
	} else {
		var status = layout.a;
		return status;
	}
};
var $elm$browser$Debugger$Main$Drag = function (a) {
	return {$: 'Drag', a: a};
};
var $elm$browser$Debugger$Main$DragInfo = F5(
	function (x, y, down, width, height) {
		return {down: down, height: height, width: width, x: x, y: y};
	});
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$browser$Debugger$Main$decodeDimension = function (field) {
	return A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['currentTarget', 'ownerDocument', 'defaultView', field]),
		$elm$json$Json$Decode$float);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map5 = _Json_map5;
var $elm$browser$Debugger$Main$onMouseMove = A2(
	$elm$html$Html$Events$on,
	'mousemove',
	A2(
		$elm$json$Json$Decode$map,
		$elm$browser$Debugger$Main$Drag,
		A6(
			$elm$json$Json$Decode$map5,
			$elm$browser$Debugger$Main$DragInfo,
			A2($elm$json$Json$Decode$field, 'pageX', $elm$json$Json$Decode$float),
			A2($elm$json$Json$Decode$field, 'pageY', $elm$json$Json$Decode$float),
			A2(
				$elm$json$Json$Decode$field,
				'buttons',
				A2(
					$elm$json$Json$Decode$map,
					function (v) {
						return v === 1;
					},
					$elm$json$Json$Decode$int)),
			$elm$browser$Debugger$Main$decodeDimension('innerWidth'),
			$elm$browser$Debugger$Main$decodeDimension('innerHeight'))));
var $elm$html$Html$Events$onMouseUp = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseup',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toDragListeners = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				$elm$browser$Debugger$Main$onMouseMove,
				$elm$html$Html$Events$onMouseUp($elm$browser$Debugger$Main$DragEnd)
			]);
	}
};
var $elm$browser$Debugger$Main$toFlexDirection = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'row';
	} else {
		return 'column-reverse';
	}
};
var $elm$browser$Debugger$Main$DragStart = {$: 'DragStart'};
var $elm$html$Html$Events$onMouseDown = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mousedown',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$browser$Debugger$Main$toPercent = function (fraction) {
	return $elm$core$String$fromFloat(100 * fraction) + '%';
};
var $elm$browser$Debugger$Main$viewDragZone = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2($elm$html$Html$Attributes$style, 'top', '0'),
					A2(
					$elm$html$Html$Attributes$style,
					'left',
					$elm$browser$Debugger$Main$toPercent(x)),
					A2($elm$html$Html$Attributes$style, 'margin-left', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '10px'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'col-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	} else {
		var y = layout.c;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
					A2(
					$elm$html$Html$Attributes$style,
					'top',
					$elm$browser$Debugger$Main$toPercent(y)),
					A2($elm$html$Html$Attributes$style, 'left', '0'),
					A2($elm$html$Html$Attributes$style, 'margin-top', '-5px'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '10px'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'row-resize'),
					$elm$html$Html$Events$onMouseDown($elm$browser$Debugger$Main$DragStart)
				]),
			_List_Nil);
	}
};
var $elm$browser$Debugger$Main$TweakExpandoModel = function (a) {
	return {$: 'TweakExpandoModel', a: a};
};
var $elm$browser$Debugger$Main$TweakExpandoMsg = function (a) {
	return {$: 'TweakExpandoMsg', a: a};
};
var $elm$browser$Debugger$Main$toExpandoPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(1 - x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(y));
	}
};
var $elm$browser$Debugger$Main$toMouseBlocker = function (layout) {
	var _v0 = $elm$browser$Debugger$Main$getDragStatus(layout);
	if (_v0.$ === 'Static') {
		return 'auto';
	} else {
		return 'none';
	}
};
var $elm$browser$Debugger$Expando$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$browser$Debugger$Expando$Index = F3(
	function (a, b, c) {
		return {$: 'Index', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Expando$Key = {$: 'Key'};
var $elm$browser$Debugger$Expando$None = {$: 'None'};
var $elm$browser$Debugger$Expando$Toggle = {$: 'Toggle'};
var $elm$browser$Debugger$Expando$Value = {$: 'Value'};
var $elm$browser$Debugger$Expando$blue = A2($elm$html$Html$Attributes$style, 'color', 'rgb(28, 0, 207)');
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$browser$Debugger$Expando$leftPad = function (maybeKey) {
	if (maybeKey.$ === 'Nothing') {
		return _List_Nil;
	} else {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding-left', '4ch')
			]);
	}
};
var $elm$browser$Debugger$Expando$makeArrow = function (arrow) {
	return A2(
		$elm$html$Html$span,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'color', '#777'),
				A2($elm$html$Html$Attributes$style, 'padding-left', '2ch'),
				A2($elm$html$Html$Attributes$style, 'width', '2ch'),
				A2($elm$html$Html$Attributes$style, 'display', 'inline-block')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(arrow)
			]));
};
var $elm$browser$Debugger$Expando$purple = A2($elm$html$Html$Attributes$style, 'color', 'rgb(136, 19, 145)');
var $elm$browser$Debugger$Expando$lineStarter = F3(
	function (maybeKey, maybeIsClosed, description) {
		var arrow = function () {
			if (maybeIsClosed.$ === 'Nothing') {
				return $elm$browser$Debugger$Expando$makeArrow('');
			} else {
				if (maybeIsClosed.a) {
					return $elm$browser$Debugger$Expando$makeArrow('▸');
				} else {
					return $elm$browser$Debugger$Expando$makeArrow('▾');
				}
			}
		}();
		if (maybeKey.$ === 'Nothing') {
			return A2($elm$core$List$cons, arrow, description);
		} else {
			var key = maybeKey.a;
			return A2(
				$elm$core$List$cons,
				arrow,
				A2(
					$elm$core$List$cons,
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$purple]),
						_List_fromArray(
							[
								$elm$html$Html$text(key)
							])),
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(' = '),
						description)));
		}
	});
var $elm$browser$Debugger$Expando$red = A2($elm$html$Html$Attributes$style, 'color', 'rgb(196, 26, 22)');
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$browser$Debugger$Expando$seqTypeToString = F2(
	function (n, seqType) {
		switch (seqType.$) {
			case 'ListSeq':
				return 'List(' + ($elm$core$String$fromInt(n) + ')');
			case 'SetSeq':
				return 'Set(' + ($elm$core$String$fromInt(n) + ')');
			default:
				return 'Array(' + ($elm$core$String$fromInt(n) + ')');
		}
	});
var $elm$core$String$slice = _String_slice;
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			$elm$core$String$slice,
			-n,
			$elm$core$String$length(string),
			string);
	});
var $elm$browser$Debugger$Expando$elideMiddle = function (str) {
	return ($elm$core$String$length(str) <= 18) ? str : (A2($elm$core$String$left, 8, str) + ('...' + A2($elm$core$String$right, 8, str)));
};
var $elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === 'RBEmpty_elm_builtin') {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Expando$viewExtraTinyRecord = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 1,
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					]));
		} else {
			var field = entries.a;
			var rest = entries.b;
			var nextLength = (length + $elm$core$String$length(field)) + 1;
			if (nextLength > 18) {
				return _Utils_Tuple2(
					length + 2,
					_List_fromArray(
						[
							$elm$html$Html$text('…}')
						]));
			} else {
				var _v1 = A3($elm$browser$Debugger$Expando$viewExtraTinyRecord, nextLength, ',', rest);
				var finalLength = _v1.a;
				var otherHtmls = _v1.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							otherHtmls)));
			}
		}
	});
var $elm$browser$Debugger$Expando$viewTinyHelp = function (str) {
	return _Utils_Tuple2(
		$elm$core$String$length(str),
		_List_fromArray(
			[
				$elm$html$Html$text(str)
			]));
};
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $elm$browser$Debugger$Expando$viewExtraTiny = function (value) {
	if (value.$ === 'Record') {
		var record = value.b;
		return A3(
			$elm$browser$Debugger$Expando$viewExtraTinyRecord,
			0,
			'{',
			$elm$core$Dict$keys(record));
	} else {
		return $elm$browser$Debugger$Expando$viewTiny(value);
	}
};
var $elm$browser$Debugger$Expando$viewTiny = function (value) {
	switch (value.$) {
		case 'S':
			var stringRep = value.a;
			var str = $elm$browser$Debugger$Expando$elideMiddle(stringRep);
			return _Utils_Tuple2(
				$elm$core$String$length(str),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$red]),
						_List_fromArray(
							[
								$elm$html$Html$text(str)
							]))
					]));
		case 'Primitive':
			var stringRep = value.a;
			return _Utils_Tuple2(
				$elm$core$String$length(stringRep),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[$elm$browser$Debugger$Expando$blue]),
						_List_fromArray(
							[
								$elm$html$Html$text(stringRep)
							]))
					]));
		case 'Sequence':
			var seqType = value.a;
			var valueList = value.c;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				A2(
					$elm$browser$Debugger$Expando$seqTypeToString,
					$elm$core$List$length(valueList),
					seqType));
		case 'Dictionary':
			var keyValuePairs = value.b;
			return $elm$browser$Debugger$Expando$viewTinyHelp(
				'Dict(' + ($elm$core$String$fromInt(
					$elm$core$List$length(keyValuePairs)) + ')'));
		case 'Record':
			var record = value.b;
			return $elm$browser$Debugger$Expando$viewTinyRecord(record);
		default:
			if (!value.c.b) {
				var maybeName = value.a;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					A2($elm$core$Maybe$withDefault, 'Unit', maybeName));
			} else {
				var maybeName = value.a;
				var valueList = value.c;
				return $elm$browser$Debugger$Expando$viewTinyHelp(
					function () {
						if (maybeName.$ === 'Nothing') {
							return 'Tuple(' + ($elm$core$String$fromInt(
								$elm$core$List$length(valueList)) + ')');
						} else {
							var name = maybeName.a;
							return name + ' …';
						}
					}());
			}
	}
};
var $elm$browser$Debugger$Expando$viewTinyRecord = function (record) {
	return $elm$core$Dict$isEmpty(record) ? _Utils_Tuple2(
		2,
		_List_fromArray(
			[
				$elm$html$Html$text('{}')
			])) : A3(
		$elm$browser$Debugger$Expando$viewTinyRecordHelp,
		0,
		'{ ',
		$elm$core$Dict$toList(record));
};
var $elm$browser$Debugger$Expando$viewTinyRecordHelp = F3(
	function (length, starter, entries) {
		if (!entries.b) {
			return _Utils_Tuple2(
				length + 2,
				_List_fromArray(
					[
						$elm$html$Html$text(' }')
					]));
		} else {
			var _v1 = entries.a;
			var field = _v1.a;
			var value = _v1.b;
			var rest = entries.b;
			var fieldLen = $elm$core$String$length(field);
			var _v2 = $elm$browser$Debugger$Expando$viewExtraTiny(value);
			var valueLen = _v2.a;
			var valueHtmls = _v2.b;
			var newLength = ((length + fieldLen) + valueLen) + 5;
			if (newLength > 60) {
				return _Utils_Tuple2(
					length + 4,
					_List_fromArray(
						[
							$elm$html$Html$text(', … }')
						]));
			} else {
				var _v3 = A3($elm$browser$Debugger$Expando$viewTinyRecordHelp, newLength, ', ', rest);
				var finalLength = _v3.a;
				var otherHtmls = _v3.b;
				return _Utils_Tuple2(
					finalLength,
					A2(
						$elm$core$List$cons,
						$elm$html$Html$text(starter),
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$purple]),
								_List_fromArray(
									[
										$elm$html$Html$text(field)
									])),
							A2(
								$elm$core$List$cons,
								$elm$html$Html$text(' = '),
								A2(
									$elm$core$List$cons,
									A2($elm$html$Html$span, _List_Nil, valueHtmls),
									otherHtmls)))));
			}
		}
	});
var $elm$browser$Debugger$Expando$view = F2(
	function (maybeKey, expando) {
		switch (expando.$) {
			case 'S':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$red]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Primitive':
				var stringRep = expando.a;
				return A2(
					$elm$html$Html$div,
					$elm$browser$Debugger$Expando$leftPad(maybeKey),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Nothing,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[$elm$browser$Debugger$Expando$blue]),
								_List_fromArray(
									[
										$elm$html$Html$text(stringRep)
									]))
							])));
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewSequence, maybeKey, seqType, isClosed, valueList);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return A3($elm$browser$Debugger$Expando$viewDictionary, maybeKey, isClosed, keyValuePairs);
			case 'Record':
				var isClosed = expando.a;
				var valueDict = expando.b;
				return A3($elm$browser$Debugger$Expando$viewRecord, maybeKey, isClosed, valueDict);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var valueList = expando.c;
				return A4($elm$browser$Debugger$Expando$viewConstructor, maybeKey, maybeName, isClosed, valueList);
		}
	});
var $elm$browser$Debugger$Expando$viewConstructor = F4(
	function (maybeKey, maybeName, isClosed, valueList) {
		var tinyArgs = A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $elm$core$Tuple$second, $elm$browser$Debugger$Expando$viewExtraTiny),
			valueList);
		var description = function () {
			var _v7 = _Utils_Tuple2(maybeName, tinyArgs);
			if (_v7.a.$ === 'Nothing') {
				if (!_v7.b.b) {
					var _v8 = _v7.a;
					return _List_fromArray(
						[
							$elm$html$Html$text('()')
						]);
				} else {
					var _v9 = _v7.a;
					var _v10 = _v7.b;
					var x = _v10.a;
					var xs = _v10.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text('( '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(', '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_fromArray(
									[
										$elm$html$Html$text(' )')
									]),
								xs)));
				}
			} else {
				if (!_v7.b.b) {
					var name = _v7.a.a;
					return _List_fromArray(
						[
							$elm$html$Html$text(name)
						]);
				} else {
					var name = _v7.a.a;
					var _v11 = _v7.b;
					var x = _v11.a;
					var xs = _v11.b;
					return A2(
						$elm$core$List$cons,
						$elm$html$Html$text(name + ' '),
						A2(
							$elm$core$List$cons,
							A2($elm$html$Html$span, _List_Nil, x),
							A3(
								$elm$core$List$foldr,
								F2(
									function (args, rest) {
										return A2(
											$elm$core$List$cons,
											$elm$html$Html$text(' '),
											A2(
												$elm$core$List$cons,
												A2($elm$html$Html$span, _List_Nil, args),
												rest));
									}),
								_List_Nil,
								xs)));
				}
			}
		}();
		var _v4 = function () {
			if (!valueList.b) {
				return _Utils_Tuple2(
					$elm$core$Maybe$Nothing,
					A2($elm$html$Html$div, _List_Nil, _List_Nil));
			} else {
				if (!valueList.b.b) {
					var entry = valueList.a;
					switch (entry.$) {
						case 'S':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Primitive':
							return _Utils_Tuple2(
								$elm$core$Maybe$Nothing,
								A2($elm$html$Html$div, _List_Nil, _List_Nil));
						case 'Sequence':
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewSequenceOpen(subValueList)));
						case 'Dictionary':
							var keyValuePairs = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)));
						case 'Record':
							var record = entry.b;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewRecordOpen(record)));
						default:
							var subValueList = entry.c;
							return _Utils_Tuple2(
								$elm$core$Maybe$Just(isClosed),
								isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : A2(
									$elm$html$Html$map,
									A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, 0),
									$elm$browser$Debugger$Expando$viewConstructorOpen(subValueList)));
					}
				} else {
					return _Utils_Tuple2(
						$elm$core$Maybe$Just(isClosed),
						isClosed ? A2($elm$html$Html$div, _List_Nil, _List_Nil) : $elm$browser$Debugger$Expando$viewConstructorOpen(valueList));
				}
			}
		}();
		var maybeIsClosed = _v4.a;
		var openHtml = _v4.b;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3($elm$browser$Debugger$Expando$lineStarter, maybeKey, maybeIsClosed, description)),
					openHtml
				]));
	});
var $elm$browser$Debugger$Expando$viewConstructorEntry = F2(
	function (index, value) {
		return A2(
			$elm$html$Html$map,
			A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$None, index),
			A2(
				$elm$browser$Debugger$Expando$view,
				$elm$core$Maybe$Just(
					$elm$core$String$fromInt(index)),
				value));
	});
var $elm$browser$Debugger$Expando$viewConstructorOpen = function (valueList) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, valueList));
};
var $elm$browser$Debugger$Expando$viewDictionary = F3(
	function (maybeKey, isClosed, keyValuePairs) {
		var starter = 'Dict(' + ($elm$core$String$fromInt(
			$elm$core$List$length(keyValuePairs)) + ')');
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewDictionaryOpen(keyValuePairs)
				]));
	});
var $elm$browser$Debugger$Expando$viewDictionaryEntry = F2(
	function (index, _v2) {
		var key = _v2.a;
		var value = _v2.b;
		switch (key.$) {
			case 'S':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			case 'Primitive':
				var stringRep = key.a;
				return A2(
					$elm$html$Html$map,
					A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
					A2(
						$elm$browser$Debugger$Expando$view,
						$elm$core$Maybe$Just(stringRep),
						value));
			default:
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Key, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('key'),
								key)),
							A2(
							$elm$html$Html$map,
							A2($elm$browser$Debugger$Expando$Index, $elm$browser$Debugger$Expando$Value, index),
							A2(
								$elm$browser$Debugger$Expando$view,
								$elm$core$Maybe$Just('value'),
								value))
						]));
		}
	});
var $elm$browser$Debugger$Expando$viewDictionaryOpen = function (keyValuePairs) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewDictionaryEntry, keyValuePairs));
};
var $elm$browser$Debugger$Expando$viewRecord = F3(
	function (maybeKey, isClosed, record) {
		var _v1 = isClosed ? _Utils_Tuple3(
			$elm$browser$Debugger$Expando$viewTinyRecord(record).b,
			$elm$html$Html$text(''),
			$elm$html$Html$text('')) : _Utils_Tuple3(
			_List_fromArray(
				[
					$elm$html$Html$text('{')
				]),
			$elm$browser$Debugger$Expando$viewRecordOpen(record),
			A2(
				$elm$html$Html$div,
				$elm$browser$Debugger$Expando$leftPad(
					$elm$core$Maybe$Just(_Utils_Tuple0)),
				_List_fromArray(
					[
						$elm$html$Html$text('}')
					])));
		var start = _v1.a;
		var middle = _v1.b;
		var end = _v1.c;
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						start)),
					middle,
					end
				]));
	});
var $elm$browser$Debugger$Expando$viewRecordEntry = function (_v0) {
	var field = _v0.a;
	var value = _v0.b;
	return A2(
		$elm$html$Html$map,
		$elm$browser$Debugger$Expando$Field(field),
		A2(
			$elm$browser$Debugger$Expando$view,
			$elm$core$Maybe$Just(field),
			value));
};
var $elm$browser$Debugger$Expando$viewRecordOpen = function (record) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2(
			$elm$core$List$map,
			$elm$browser$Debugger$Expando$viewRecordEntry,
			$elm$core$Dict$toList(record)));
};
var $elm$browser$Debugger$Expando$viewSequence = F4(
	function (maybeKey, seqType, isClosed, valueList) {
		var starter = A2(
			$elm$browser$Debugger$Expando$seqTypeToString,
			$elm$core$List$length(valueList),
			seqType);
		return A2(
			$elm$html$Html$div,
			$elm$browser$Debugger$Expando$leftPad(maybeKey),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick($elm$browser$Debugger$Expando$Toggle)
						]),
					A3(
						$elm$browser$Debugger$Expando$lineStarter,
						maybeKey,
						$elm$core$Maybe$Just(isClosed),
						_List_fromArray(
							[
								$elm$html$Html$text(starter)
							]))),
					isClosed ? $elm$html$Html$text('') : $elm$browser$Debugger$Expando$viewSequenceOpen(valueList)
				]));
	});
var $elm$browser$Debugger$Expando$viewSequenceOpen = function (values) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		A2($elm$core$List$indexedMap, $elm$browser$Debugger$Expando$viewConstructorEntry, values));
};
var $elm$browser$Debugger$Main$viewExpando = F3(
	function (expandoMsg, expandoModel, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toExpandoPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'block'),
					A2($elm$html$Html$Attributes$style, 'width', 'calc(' + (w + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(' + (h + ' - 4em)')),
					A2($elm$html$Html$Attributes$style, 'padding', '2em'),
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'overflow', 'auto'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, '-webkit-user-select', block),
					A2($elm$html$Html$Attributes$style, '-moz-user-select', block),
					A2($elm$html$Html$Attributes$style, '-ms-user-select', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '0 0 1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MESSAGE')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoMsg,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoMsg)),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', '#ccc'),
							A2($elm$html$Html$Attributes$style, 'padding', '1em 0')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('-- MODEL')
						])),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$TweakExpandoModel,
					A2($elm$browser$Debugger$Expando$view, $elm$core$Maybe$Nothing, expandoModel))
				]));
	});
var $elm$browser$Debugger$Main$Jump = function (a) {
	return {$: 'Jump', a: a};
};
var $elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var $elm$html$Html$Lazy$lazy = $elm$virtual_dom$VirtualDom$lazy;
var $elm$browser$Debugger$Main$toHistoryPercents = function (layout) {
	if (layout.$ === 'Horizontal') {
		var x = layout.b;
		return _Utils_Tuple2(
			$elm$browser$Debugger$Main$toPercent(x),
			'100%');
	} else {
		var y = layout.c;
		return _Utils_Tuple2(
			'100%',
			$elm$browser$Debugger$Main$toPercent(1 - y));
	}
};
var $elm$virtual_dom$VirtualDom$lazy3 = _VirtualDom_lazy3;
var $elm$html$Html$Lazy$lazy3 = $elm$virtual_dom$VirtualDom$lazy3;
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$browser$Debugger$History$idForMessageIndex = function (index) {
	return 'msg-' + $elm$core$String$fromInt(index);
};
var $elm$html$Html$Attributes$title = $elm$html$Html$Attributes$stringProperty('title');
var $elm$browser$Debugger$History$viewMessage = F3(
	function (currentIndex, index, msg) {
		var messageName = _Debugger_messageToString(msg);
		var className = _Utils_eq(currentIndex, index) ? 'elm-debugger-entry elm-debugger-entry-selected' : 'elm-debugger-entry';
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id(
					$elm$browser$Debugger$History$idForMessageIndex(index)),
					$elm$html$Html$Attributes$class(className),
					$elm$html$Html$Events$onClick(index)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$title(messageName),
							$elm$html$Html$Attributes$class('elm-debugger-entry-content')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(messageName)
						])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('elm-debugger-entry-index')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$elm$core$String$fromInt(index))
						]))
				]));
	});
var $elm$browser$Debugger$History$consMsg = F3(
	function (currentIndex, msg, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		return _Utils_Tuple2(
			index + 1,
			A2(
				$elm$core$List$cons,
				_Utils_Tuple2(
					$elm$core$String$fromInt(index),
					A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewMessage, currentIndex, index, msg)),
				rest));
	});
var $elm$core$Array$length = function (_v0) {
	var len = _v0.a;
	return len;
};
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$html$Html$Keyed$node = $elm$virtual_dom$VirtualDom$keyedNode;
var $elm$browser$Debugger$History$maxSnapshotSize = 31;
var $elm$browser$Debugger$History$showMoreButton = function (numMessages) {
	var nextIndex = (numMessages - 1) - ($elm$browser$Debugger$History$maxSnapshotSize * 2);
	var labelText = 'View more messages';
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('elm-debugger-entry'),
				$elm$html$Html$Events$onClick(nextIndex)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$title(labelText),
						$elm$html$Html$Attributes$class('elm-debugger-entry-content')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(labelText)
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('elm-debugger-entry-index')
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$History$styles = A3(
	$elm$html$Html$node,
	'style',
	_List_Nil,
	_List_fromArray(
		[
			$elm$html$Html$text('\n\n.elm-debugger-entry {\n  cursor: pointer;\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}\n\n.elm-debugger-entry:hover {\n  background-color: rgb(41, 41, 41);\n}\n\n.elm-debugger-entry-selected, .elm-debugger-entry-selected:hover {\n  background-color: rgb(10, 10, 10);\n}\n\n.elm-debugger-entry-content {\n  width: calc(100% - 40px);\n  padding: 0 5px;\n  box-sizing: border-box;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  display: inline-block;\n}\n\n.elm-debugger-entry-index {\n  color: #666;\n  width: 40px;\n  text-align: right;\n  display: block;\n  float: right;\n}\n\n')
		]));
var $elm$core$Basics$ge = _Utils_ge;
var $elm$browser$Debugger$History$viewSnapshot = F3(
	function (selectedIndex, index, _v0) {
		var messages = _v0.messages;
		return A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$Array$foldr,
				$elm$browser$Debugger$History$consMsg(selectedIndex),
				_Utils_Tuple2(index, _List_Nil),
				messages).b);
	});
var $elm$browser$Debugger$History$consSnapshot = F3(
	function (selectedIndex, snapshot, _v0) {
		var index = _v0.a;
		var rest = _v0.b;
		var nextIndex = index + $elm$core$Array$length(snapshot.messages);
		var selectedIndexHelp = ((_Utils_cmp(nextIndex, selectedIndex) > 0) && (_Utils_cmp(selectedIndex, index) > -1)) ? selectedIndex : (-1);
		return _Utils_Tuple2(
			nextIndex,
			A2(
				$elm$core$List$cons,
				A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewSnapshot, selectedIndexHelp, index, snapshot),
				rest));
	});
var $elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var $elm$core$Array$foldl = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldl, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldl, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldl,
			func,
			A3($elm$core$Elm$JsArray$foldl, helper, baseCase, tree),
			tail);
	});
var $elm$browser$Debugger$History$viewAllSnapshots = F3(
	function (selectedIndex, startIndex, snapshots) {
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			A3(
				$elm$core$Array$foldl,
				$elm$browser$Debugger$History$consSnapshot(selectedIndex),
				_Utils_Tuple2(startIndex, _List_Nil),
				snapshots).b);
	});
var $elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, list);
			var jsArray = _v0.a;
			var remainingItems = _v0.b;
			if (_Utils_cmp(
				$elm$core$Elm$JsArray$length(jsArray),
				$elm$core$Array$branchFactor) < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					$elm$core$List$cons,
					$elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var $elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return $elm$core$Array$empty;
	} else {
		return A3($elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $elm$core$Array$bitMask = 4294967295 >>> (32 - $elm$core$Array$shiftStep);
var $elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var $elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = $elm$core$Array$bitMask & (index >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var subTree = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _v0.a;
				return A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, values);
			}
		}
	});
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var $elm$core$Array$get = F2(
	function (index, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? $elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			$elm$core$Array$tailIndex(len)) > -1) ? $elm$core$Maybe$Just(
			A2($elm$core$Elm$JsArray$unsafeGet, $elm$core$Array$bitMask & index, tail)) : $elm$core$Maybe$Just(
			A3($elm$core$Array$getHelp, startShift, index, tree)));
	});
var $elm$core$Elm$JsArray$appendN = _JsArray_appendN;
var $elm$core$Elm$JsArray$slice = _JsArray_slice;
var $elm$core$Array$appendHelpBuilder = F2(
	function (tail, builder) {
		var tailLen = $elm$core$Elm$JsArray$length(tail);
		var notAppended = ($elm$core$Array$branchFactor - $elm$core$Elm$JsArray$length(builder.tail)) - tailLen;
		var appended = A3($elm$core$Elm$JsArray$appendN, $elm$core$Array$branchFactor, builder.tail, tail);
		return (notAppended < 0) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: A3($elm$core$Elm$JsArray$slice, notAppended, tailLen, tail)
		} : ((!notAppended) ? {
			nodeList: A2(
				$elm$core$List$cons,
				$elm$core$Array$Leaf(appended),
				builder.nodeList),
			nodeListSize: builder.nodeListSize + 1,
			tail: $elm$core$Elm$JsArray$empty
		} : {nodeList: builder.nodeList, nodeListSize: builder.nodeListSize, tail: appended});
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$Array$sliceLeft = F2(
	function (from, array) {
		var len = array.a;
		var tree = array.c;
		var tail = array.d;
		if (!from) {
			return array;
		} else {
			if (_Utils_cmp(
				from,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					len - from,
					$elm$core$Array$shiftStep,
					$elm$core$Elm$JsArray$empty,
					A3(
						$elm$core$Elm$JsArray$slice,
						from - $elm$core$Array$tailIndex(len),
						$elm$core$Elm$JsArray$length(tail),
						tail));
			} else {
				var skipNodes = (from / $elm$core$Array$branchFactor) | 0;
				var helper = F2(
					function (node, acc) {
						if (node.$ === 'SubTree') {
							var subTree = node.a;
							return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
						} else {
							var leaf = node.a;
							return A2($elm$core$List$cons, leaf, acc);
						}
					});
				var leafNodes = A3(
					$elm$core$Elm$JsArray$foldr,
					helper,
					_List_fromArray(
						[tail]),
					tree);
				var nodesToInsert = A2($elm$core$List$drop, skipNodes, leafNodes);
				if (!nodesToInsert.b) {
					return $elm$core$Array$empty;
				} else {
					var head = nodesToInsert.a;
					var rest = nodesToInsert.b;
					var firstSlice = from - (skipNodes * $elm$core$Array$branchFactor);
					var initialBuilder = {
						nodeList: _List_Nil,
						nodeListSize: 0,
						tail: A3(
							$elm$core$Elm$JsArray$slice,
							firstSlice,
							$elm$core$Elm$JsArray$length(head),
							head)
					};
					return A2(
						$elm$core$Array$builderToArray,
						true,
						A3($elm$core$List$foldl, $elm$core$Array$appendHelpBuilder, initialBuilder, rest));
				}
			}
		}
	});
var $elm$core$Array$fetchNewTail = F4(
	function (shift, end, treeEnd, tree) {
		fetchNewTail:
		while (true) {
			var pos = $elm$core$Array$bitMask & (treeEnd >>> shift);
			var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_v0.$ === 'SubTree') {
				var sub = _v0.a;
				var $temp$shift = shift - $elm$core$Array$shiftStep,
					$temp$end = end,
					$temp$treeEnd = treeEnd,
					$temp$tree = sub;
				shift = $temp$shift;
				end = $temp$end;
				treeEnd = $temp$treeEnd;
				tree = $temp$tree;
				continue fetchNewTail;
			} else {
				var values = _v0.a;
				return A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, values);
			}
		}
	});
var $elm$core$Array$hoistTree = F3(
	function (oldShift, newShift, tree) {
		hoistTree:
		while (true) {
			if ((_Utils_cmp(oldShift, newShift) < 1) || (!$elm$core$Elm$JsArray$length(tree))) {
				return tree;
			} else {
				var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, 0, tree);
				if (_v0.$ === 'SubTree') {
					var sub = _v0.a;
					var $temp$oldShift = oldShift - $elm$core$Array$shiftStep,
						$temp$newShift = newShift,
						$temp$tree = sub;
					oldShift = $temp$oldShift;
					newShift = $temp$newShift;
					tree = $temp$tree;
					continue hoistTree;
				} else {
					return tree;
				}
			}
		}
	});
var $elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var $elm$core$Array$sliceTree = F3(
	function (shift, endIdx, tree) {
		var lastPos = $elm$core$Array$bitMask & (endIdx >>> shift);
		var _v0 = A2($elm$core$Elm$JsArray$unsafeGet, lastPos, tree);
		if (_v0.$ === 'SubTree') {
			var sub = _v0.a;
			var newSub = A3($elm$core$Array$sliceTree, shift - $elm$core$Array$shiftStep, endIdx, sub);
			return (!$elm$core$Elm$JsArray$length(newSub)) ? A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree) : A3(
				$elm$core$Elm$JsArray$unsafeSet,
				lastPos,
				$elm$core$Array$SubTree(newSub),
				A3($elm$core$Elm$JsArray$slice, 0, lastPos + 1, tree));
		} else {
			return A3($elm$core$Elm$JsArray$slice, 0, lastPos, tree);
		}
	});
var $elm$core$Array$sliceRight = F2(
	function (end, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		if (_Utils_eq(end, len)) {
			return array;
		} else {
			if (_Utils_cmp(
				end,
				$elm$core$Array$tailIndex(len)) > -1) {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					startShift,
					tree,
					A3($elm$core$Elm$JsArray$slice, 0, $elm$core$Array$bitMask & end, tail));
			} else {
				var endIdx = $elm$core$Array$tailIndex(end);
				var depth = $elm$core$Basics$floor(
					A2(
						$elm$core$Basics$logBase,
						$elm$core$Array$branchFactor,
						A2($elm$core$Basics$max, 1, endIdx - 1)));
				var newShift = A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep);
				return A4(
					$elm$core$Array$Array_elm_builtin,
					end,
					newShift,
					A3(
						$elm$core$Array$hoistTree,
						startShift,
						newShift,
						A3($elm$core$Array$sliceTree, startShift, endIdx, tree)),
					A4($elm$core$Array$fetchNewTail, startShift, end, endIdx, tree));
			}
		}
	});
var $elm$core$Array$translateIndex = F2(
	function (index, _v0) {
		var len = _v0.a;
		var posIndex = (index < 0) ? (len + index) : index;
		return (posIndex < 0) ? 0 : ((_Utils_cmp(posIndex, len) > 0) ? len : posIndex);
	});
var $elm$core$Array$slice = F3(
	function (from, to, array) {
		var correctTo = A2($elm$core$Array$translateIndex, to, array);
		var correctFrom = A2($elm$core$Array$translateIndex, from, array);
		return (_Utils_cmp(correctFrom, correctTo) > 0) ? $elm$core$Array$empty : A2(
			$elm$core$Array$sliceLeft,
			correctFrom,
			A2($elm$core$Array$sliceRight, correctTo, array));
	});
var $elm$browser$Debugger$History$viewRecentSnapshots = F3(
	function (selectedIndex, recentMessagesNum, snapshots) {
		var messagesToFill = $elm$browser$Debugger$History$maxSnapshotSize - recentMessagesNum;
		var arrayLength = $elm$core$Array$length(snapshots);
		var snapshotsToRender = function () {
			var _v0 = _Utils_Tuple2(
				A2($elm$core$Array$get, arrayLength - 2, snapshots),
				A2($elm$core$Array$get, arrayLength - 1, snapshots));
			if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
				var fillerSnapshot = _v0.a.a;
				var recentSnapshot = _v0.b.a;
				return $elm$core$Array$fromList(
					_List_fromArray(
						[
							{
							messages: A3($elm$core$Array$slice, 0, messagesToFill, fillerSnapshot.messages),
							model: fillerSnapshot.model
						},
							recentSnapshot
						]));
			} else {
				return snapshots;
			}
		}();
		var startingIndex = ((arrayLength * $elm$browser$Debugger$History$maxSnapshotSize) - $elm$browser$Debugger$History$maxSnapshotSize) - messagesToFill;
		return A3($elm$browser$Debugger$History$viewAllSnapshots, selectedIndex, startingIndex, snapshotsToRender);
	});
var $elm$browser$Debugger$History$view = F2(
	function (maybeIndex, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var recentMessageStartIndex = numMessages - recent.numMessages;
		var index = A2($elm$core$Maybe$withDefault, -1, maybeIndex);
		var newStuff = A3(
			$elm$html$Html$Keyed$node,
			'div',
			_List_Nil,
			A3(
				$elm$core$List$foldr,
				$elm$browser$Debugger$History$consMsg(index),
				_Utils_Tuple2(recentMessageStartIndex, _List_Nil),
				recent.messages).b);
		var onlyRenderRecentMessages = (!_Utils_eq(index, -1)) || ($elm$core$Array$length(snapshots) < 2);
		var oldStuff = onlyRenderRecentMessages ? A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewAllSnapshots, index, 0, snapshots) : A4($elm$html$Html$Lazy$lazy3, $elm$browser$Debugger$History$viewRecentSnapshots, index, recent.numMessages, snapshots);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$id('elm-debugger-sidebar'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'overflow-y', 'auto'),
					A2($elm$html$Html$Attributes$style, 'height', 'calc(100% - 72px)')
				]),
			A2(
				$elm$core$List$cons,
				$elm$browser$Debugger$History$styles,
				A2(
					$elm$core$List$cons,
					newStuff,
					A2(
						$elm$core$List$cons,
						oldStuff,
						onlyRenderRecentMessages ? _List_Nil : _List_fromArray(
							[
								$elm$browser$Debugger$History$showMoreButton(numMessages)
							])))));
	});
var $elm$browser$Debugger$Main$SwapLayout = {$: 'SwapLayout'};
var $elm$browser$Debugger$Main$toHistoryIcon = function (layout) {
	if (layout.$ === 'Horizontal') {
		return 'M13 1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M13 3h-10a1 1 0 0 0-1 1v5h12v-5a1 1 0 0 0-1-1z M14 10h-12v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1z';
	} else {
		return 'M0 4a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3z M2 4v8a1 1 0 0 0 1 1h2v-10h-2a1 1 0 0 0-1 1z M6 3v10h7a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z';
	}
};
var $elm$browser$Debugger$Main$icon = function (path) {
	return A4(
		$elm$virtual_dom$VirtualDom$nodeNS,
		'http://www.w3.org/2000/svg',
		'svg',
		_List_fromArray(
			[
				A2($elm$virtual_dom$VirtualDom$attribute, 'viewBox', '0 0 16 16'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'xmlns', 'http://www.w3.org/2000/svg'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'fill', 'currentColor'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'width', '16px'),
				A2($elm$virtual_dom$VirtualDom$attribute, 'height', '16px')
			]),
		_List_fromArray(
			[
				A4(
				$elm$virtual_dom$VirtualDom$nodeNS,
				'http://www.w3.org/2000/svg',
				'path',
				_List_fromArray(
					[
						A2($elm$virtual_dom$VirtualDom$attribute, 'd', path)
					]),
				_List_Nil)
			]));
};
var $elm$browser$Debugger$Main$viewHistoryButton = F3(
	function (label, msg, path) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'background', 'none'),
					A2($elm$html$Html$Attributes$style, 'border', 'none'),
					A2($elm$html$Html$Attributes$style, 'color', 'inherit'),
					A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
					$elm$html$Html$Events$onClick(msg)
				]),
			_List_fromArray(
				[
					$elm$browser$Debugger$Main$icon(path),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', '6px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $elm$browser$Debugger$Main$viewHistoryOptions = function (layout) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'width', '100%'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				A2($elm$html$Html$Attributes$style, 'display', 'flex'),
				A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
				A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
				A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between'),
				A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
			]),
		_List_fromArray(
			[
				A3(
				$elm$browser$Debugger$Main$viewHistoryButton,
				'Swap Layout',
				$elm$browser$Debugger$Main$SwapLayout,
				$elm$browser$Debugger$Main$toHistoryIcon(layout)),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'display', 'flex'),
						A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
						A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
						A2($elm$html$Html$Attributes$style, 'justify-content', 'space-between')
					]),
				_List_fromArray(
					[
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Import', $elm$browser$Debugger$Main$Import, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M10 2a1 1 0 0 0 -2 0v6a1 1 0 0 0 1 1h6a1 1 0 0 0 0-2h-3.586l4.293-4.293a1 1 0 0 0-1.414-1.414l-4.293 4.293z'),
						A3($elm$browser$Debugger$Main$viewHistoryButton, 'Export', $elm$browser$Debugger$Main$Export, 'M5 1a1 1 0 0 1 0 2h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1 a1 1 0 0 1 2 0a3 3 0 0 1-3 3h-10a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z M9 3a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-3.586l-5.293 5.293 a1 1 0 0 1-1.414-1.414l5.293 -5.293z')
					]))
			]));
};
var $elm$browser$Debugger$Main$SliderJump = function (a) {
	return {$: 'SliderJump', a: a};
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$browser$Debugger$Main$isPlaying = function (maybeIndex) {
	if (maybeIndex.$ === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$Attributes$max = $elm$html$Html$Attributes$stringProperty('max');
var $elm$html$Html$Attributes$min = $elm$html$Html$Attributes$stringProperty('min');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$core$String$toInt = _String_toInt;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $elm$browser$Debugger$Main$viewPlayButton = function (playing) {
	return A2(
		$elm$html$Html$button,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'background', '#1293D8'),
				A2($elm$html$Html$Attributes$style, 'border', 'none'),
				A2($elm$html$Html$Attributes$style, 'color', 'white'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				A2($elm$html$Html$Attributes$style, 'width', '36px'),
				A2($elm$html$Html$Attributes$style, 'height', '36px'),
				$elm$html$Html$Events$onClick($elm$browser$Debugger$Main$Resume)
			]),
		_List_fromArray(
			[
				playing ? $elm$browser$Debugger$Main$icon('M2 2h4v12h-4v-12z M10 2h4v12h-4v-12z') : $elm$browser$Debugger$Main$icon('M2 2l12 7l-12 7z')
			]));
};
var $elm$browser$Debugger$Main$viewHistorySlider = F2(
	function (history, maybeIndex) {
		var lastIndex = $elm$browser$Debugger$History$size(history) - 1;
		var selectedIndex = A2($elm$core$Maybe$withDefault, lastIndex, maybeIndex);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '36px'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(50, 50, 50)')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$Lazy$lazy,
					$elm$browser$Debugger$Main$viewPlayButton,
					$elm$browser$Debugger$Main$isPlaying(maybeIndex)),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('range'),
							A2($elm$html$Html$Attributes$style, 'width', 'calc(100% - 56px)'),
							A2($elm$html$Html$Attributes$style, 'height', '36px'),
							A2($elm$html$Html$Attributes$style, 'margin', '0 10px'),
							$elm$html$Html$Attributes$min('0'),
							$elm$html$Html$Attributes$max(
							$elm$core$String$fromInt(lastIndex)),
							$elm$html$Html$Attributes$value(
							$elm$core$String$fromInt(selectedIndex)),
							$elm$html$Html$Events$onInput(
							A2(
								$elm$core$Basics$composeR,
								$elm$core$String$toInt,
								A2(
									$elm$core$Basics$composeR,
									$elm$core$Maybe$withDefault(lastIndex),
									$elm$browser$Debugger$Main$SliderJump)))
						]),
					_List_Nil)
				]));
	});
var $elm$browser$Debugger$Main$viewHistory = F3(
	function (maybeIndex, history, layout) {
		var block = $elm$browser$Debugger$Main$toMouseBlocker(layout);
		var _v0 = $elm$browser$Debugger$Main$toHistoryPercents(layout);
		var w = _v0.a;
		var h = _v0.b;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'width', w),
					A2($elm$html$Html$Attributes$style, 'height', h),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'flex-direction', 'column'),
					A2($elm$html$Html$Attributes$style, 'color', '#DDDDDD'),
					A2($elm$html$Html$Attributes$style, 'background-color', 'rgb(61, 61, 61)'),
					A2($elm$html$Html$Attributes$style, 'pointer-events', block),
					A2($elm$html$Html$Attributes$style, 'user-select', block)
				]),
			_List_fromArray(
				[
					A2($elm$browser$Debugger$Main$viewHistorySlider, history, maybeIndex),
					A2(
					$elm$html$Html$map,
					$elm$browser$Debugger$Main$Jump,
					A2($elm$browser$Debugger$History$view, maybeIndex, history)),
					A2($elm$html$Html$Lazy$lazy, $elm$browser$Debugger$Main$viewHistoryOptions, layout)
				]));
	});
var $elm$browser$Debugger$Main$popoutView = function (model) {
	var maybeIndex = function () {
		var _v0 = model.state;
		if (_v0.$ === 'Running') {
			return $elm$core$Maybe$Nothing;
		} else {
			var index = _v0.a;
			return $elm$core$Maybe$Just(index);
		}
	}();
	var historyToRender = $elm$browser$Debugger$Main$cachedHistory(model);
	return A3(
		$elm$html$Html$node,
		'body',
		_Utils_ap(
			$elm$browser$Debugger$Main$toDragListeners(model.layout),
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'margin', '0'),
					A2($elm$html$Html$Attributes$style, 'padding', '0'),
					A2($elm$html$Html$Attributes$style, 'width', '100%'),
					A2($elm$html$Html$Attributes$style, 'height', '100%'),
					A2($elm$html$Html$Attributes$style, 'font-family', 'monospace'),
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(
					$elm$html$Html$Attributes$style,
					'flex-direction',
					$elm$browser$Debugger$Main$toFlexDirection(model.layout))
				])),
		_List_fromArray(
			[
				A3($elm$browser$Debugger$Main$viewHistory, maybeIndex, historyToRender, model.layout),
				$elm$browser$Debugger$Main$viewDragZone(model.layout),
				A3($elm$browser$Debugger$Main$viewExpando, model.expandoMsg, model.expandoModel, model.layout)
			]));
};
var $elm$browser$Debugger$Overlay$BlockAll = {$: 'BlockAll'};
var $elm$browser$Debugger$Overlay$toBlockerType = F2(
	function (isPaused, state) {
		switch (state.$) {
			case 'None':
				return isPaused ? $elm$browser$Debugger$Overlay$BlockAll : $elm$browser$Debugger$Overlay$BlockNone;
			case 'BadMetadata':
				return $elm$browser$Debugger$Overlay$BlockMost;
			case 'BadImport':
				return $elm$browser$Debugger$Overlay$BlockMost;
			default:
				return $elm$browser$Debugger$Overlay$BlockMost;
		}
	});
var $elm$browser$Debugger$Main$toBlockerType = function (model) {
	return A2(
		$elm$browser$Debugger$Overlay$toBlockerType,
		$elm$browser$Debugger$Main$isPaused(model.state),
		model.overlay);
};
var $elm$browser$Debugger$Main$Horizontal = F3(
	function (a, b, c) {
		return {$: 'Horizontal', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$Running = function (a) {
	return {$: 'Running', a: a};
};
var $elm$browser$Debugger$Main$Static = {$: 'Static'};
var $elm$browser$Debugger$Metadata$Error = F2(
	function (message, problems) {
		return {message: message, problems: problems};
	});
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$browser$Debugger$Metadata$Metadata = F2(
	function (versions, types) {
		return {types: types, versions: versions};
	});
var $elm$browser$Debugger$Metadata$Types = F3(
	function (message, aliases, unions) {
		return {aliases: aliases, message: message, unions: unions};
	});
var $elm$browser$Debugger$Metadata$Alias = F2(
	function (args, tipe) {
		return {args: args, tipe: tipe};
	});
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$browser$Debugger$Metadata$decodeAlias = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Alias,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$Union = F2(
	function (args, tags) {
		return {args: args, tags: tags};
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $elm$browser$Debugger$Metadata$decodeUnion = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Union,
	A2(
		$elm$json$Json$Decode$field,
		'args',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'tags',
		$elm$json$Json$Decode$dict(
			$elm$json$Json$Decode$list($elm$json$Json$Decode$string))));
var $elm$json$Json$Decode$map3 = _Json_map3;
var $elm$browser$Debugger$Metadata$decodeTypes = A4(
	$elm$json$Json$Decode$map3,
	$elm$browser$Debugger$Metadata$Types,
	A2($elm$json$Json$Decode$field, 'message', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'aliases',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeAlias)),
	A2(
		$elm$json$Json$Decode$field,
		'unions',
		$elm$json$Json$Decode$dict($elm$browser$Debugger$Metadata$decodeUnion)));
var $elm$browser$Debugger$Metadata$Versions = function (elm) {
	return {elm: elm};
};
var $elm$browser$Debugger$Metadata$decodeVersions = A2(
	$elm$json$Json$Decode$map,
	$elm$browser$Debugger$Metadata$Versions,
	A2($elm$json$Json$Decode$field, 'elm', $elm$json$Json$Decode$string));
var $elm$browser$Debugger$Metadata$decoder = A3(
	$elm$json$Json$Decode$map2,
	$elm$browser$Debugger$Metadata$Metadata,
	A2($elm$json$Json$Decode$field, 'versions', $elm$browser$Debugger$Metadata$decodeVersions),
	A2($elm$json$Json$Decode$field, 'types', $elm$browser$Debugger$Metadata$decodeTypes));
var $elm$browser$Debugger$Metadata$ProblemType = F2(
	function (name, problems) {
		return {name: name, problems: problems};
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$core$String$contains = _String_contains;
var $elm$browser$Debugger$Metadata$hasProblem = F2(
	function (tipe, _v0) {
		var problem = _v0.a;
		var token = _v0.b;
		return A2($elm$core$String$contains, token, tipe) ? $elm$core$Maybe$Just(problem) : $elm$core$Maybe$Nothing;
	});
var $elm$browser$Debugger$Metadata$Decoder = {$: 'Decoder'};
var $elm$browser$Debugger$Metadata$Function = {$: 'Function'};
var $elm$browser$Debugger$Metadata$Process = {$: 'Process'};
var $elm$browser$Debugger$Metadata$Program = {$: 'Program'};
var $elm$browser$Debugger$Metadata$Request = {$: 'Request'};
var $elm$browser$Debugger$Metadata$Socket = {$: 'Socket'};
var $elm$browser$Debugger$Metadata$Task = {$: 'Task'};
var $elm$browser$Debugger$Metadata$VirtualDom = {$: 'VirtualDom'};
var $elm$browser$Debugger$Metadata$problemTable = _List_fromArray(
	[
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Function, '->'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Decoder, 'Json.Decode.Decoder'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Task, 'Task.Task'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Process, 'Process.Id'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Socket, 'WebSocket.LowLevel.WebSocket'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Request, 'Http.Request'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$Program, 'Platform.Program'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Node'),
		_Utils_Tuple2($elm$browser$Debugger$Metadata$VirtualDom, 'VirtualDom.Attribute')
	]);
var $elm$browser$Debugger$Metadata$findProblems = function (tipe) {
	return A2(
		$elm$core$List$filterMap,
		$elm$browser$Debugger$Metadata$hasProblem(tipe),
		$elm$browser$Debugger$Metadata$problemTable);
};
var $elm$browser$Debugger$Metadata$collectBadAliases = F3(
	function (name, _v0, list) {
		var tipe = _v0.tipe;
		var _v1 = $elm$browser$Debugger$Metadata$findProblems(tipe);
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$Dict$values = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2($elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var $elm$browser$Debugger$Metadata$collectBadUnions = F3(
	function (name, _v0, list) {
		var tags = _v0.tags;
		var _v1 = A2(
			$elm$core$List$concatMap,
			$elm$browser$Debugger$Metadata$findProblems,
			$elm$core$List$concat(
				$elm$core$Dict$values(tags)));
		if (!_v1.b) {
			return list;
		} else {
			var problems = _v1;
			return A2(
				$elm$core$List$cons,
				A2($elm$browser$Debugger$Metadata$ProblemType, name, problems),
				list);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$browser$Debugger$Metadata$isPortable = function (_v0) {
	var types = _v0.types;
	var badAliases = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadAliases, _List_Nil, types.aliases);
	var _v1 = A3($elm$core$Dict$foldl, $elm$browser$Debugger$Metadata$collectBadUnions, badAliases, types.unions);
	if (!_v1.b) {
		return $elm$core$Maybe$Nothing;
	} else {
		var problems = _v1;
		return $elm$core$Maybe$Just(
			A2($elm$browser$Debugger$Metadata$Error, types.message, problems));
	}
};
var $elm$browser$Debugger$Metadata$decode = function (value) {
	var _v0 = A2($elm$json$Json$Decode$decodeValue, $elm$browser$Debugger$Metadata$decoder, value);
	if (_v0.$ === 'Err') {
		return $elm$core$Result$Err(
			A2($elm$browser$Debugger$Metadata$Error, 'The compiler is generating bad metadata. This is a compiler bug!', _List_Nil));
	} else {
		var metadata = _v0.a;
		var _v1 = $elm$browser$Debugger$Metadata$isPortable(metadata);
		if (_v1.$ === 'Nothing') {
			return $elm$core$Result$Ok(metadata);
		} else {
			var error = _v1.a;
			return $elm$core$Result$Err(error);
		}
	}
};
var $elm$browser$Debugger$History$History = F3(
	function (snapshots, recent, numMessages) {
		return {numMessages: numMessages, recent: recent, snapshots: snapshots};
	});
var $elm$browser$Debugger$History$RecentHistory = F3(
	function (model, messages, numMessages) {
		return {messages: messages, model: model, numMessages: numMessages};
	});
var $elm$browser$Debugger$History$empty = function (model) {
	return A3(
		$elm$browser$Debugger$History$History,
		$elm$core$Array$empty,
		A3($elm$browser$Debugger$History$RecentHistory, model, _List_Nil, 0),
		0);
};
var $elm$core$Dict$map = F2(
	function (func, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				A2(func, key, value),
				A2($elm$core$Dict$map, func, left),
				A2($elm$core$Dict$map, func, right));
		}
	});
var $elm$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var left = dict.d;
				var right = dict.e;
				var $temp$n = A2($elm$core$Dict$sizeHelp, n + 1, right),
					$temp$dict = left;
				n = $temp$n;
				dict = $temp$dict;
				continue sizeHelp;
			}
		}
	});
var $elm$core$Dict$size = function (dict) {
	return A2($elm$core$Dict$sizeHelp, 0, dict);
};
var $elm$browser$Debugger$Expando$initHelp = F2(
	function (isOuter, expando) {
		switch (expando.$) {
			case 'S':
				return expando;
			case 'Primitive':
				return expando;
			case 'Sequence':
				var seqType = expando.a;
				var isClosed = expando.b;
				var items = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Sequence,
					seqType,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						items)) : (($elm$core$List$length(items) <= 8) ? A3($elm$browser$Debugger$Expando$Sequence, seqType, false, items) : expando);
			case 'Dictionary':
				var isClosed = expando.a;
				var keyValuePairs = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Dictionary,
					false,
					A2(
						$elm$core$List$map,
						function (_v1) {
							var k = _v1.a;
							var v = _v1.b;
							return _Utils_Tuple2(
								k,
								A2($elm$browser$Debugger$Expando$initHelp, false, v));
						},
						keyValuePairs)) : (($elm$core$List$length(keyValuePairs) <= 8) ? A2($elm$browser$Debugger$Expando$Dictionary, false, keyValuePairs) : expando);
			case 'Record':
				var isClosed = expando.a;
				var entries = expando.b;
				return isOuter ? A2(
					$elm$browser$Debugger$Expando$Record,
					false,
					A2(
						$elm$core$Dict$map,
						F2(
							function (_v2, v) {
								return A2($elm$browser$Debugger$Expando$initHelp, false, v);
							}),
						entries)) : (($elm$core$Dict$size(entries) <= 4) ? A2($elm$browser$Debugger$Expando$Record, false, entries) : expando);
			default:
				var maybeName = expando.a;
				var isClosed = expando.b;
				var args = expando.c;
				return isOuter ? A3(
					$elm$browser$Debugger$Expando$Constructor,
					maybeName,
					false,
					A2(
						$elm$core$List$map,
						$elm$browser$Debugger$Expando$initHelp(false),
						args)) : (($elm$core$List$length(args) <= 4) ? A3($elm$browser$Debugger$Expando$Constructor, maybeName, false, args) : expando);
		}
	});
var $elm$browser$Debugger$Expando$init = function (value) {
	return A2(
		$elm$browser$Debugger$Expando$initHelp,
		true,
		_Debugger_init(value));
};
var $elm$core$Platform$Cmd$map = _Platform_map;
var $elm$browser$Debugger$Overlay$None = {$: 'None'};
var $elm$browser$Debugger$Overlay$none = $elm$browser$Debugger$Overlay$None;
var $elm$browser$Debugger$Main$wrapInit = F4(
	function (metadata, popout, init, flags) {
		var _v0 = init(flags);
		var userModel = _v0.a;
		var userCommands = _v0.b;
		return _Utils_Tuple2(
			{
				expandoModel: $elm$browser$Debugger$Expando$init(userModel),
				expandoMsg: $elm$browser$Debugger$Expando$init(_Utils_Tuple0),
				history: $elm$browser$Debugger$History$empty(userModel),
				layout: A3($elm$browser$Debugger$Main$Horizontal, $elm$browser$Debugger$Main$Static, 0.3, 0.5),
				metadata: $elm$browser$Debugger$Metadata$decode(metadata),
				overlay: $elm$browser$Debugger$Overlay$none,
				popout: popout,
				state: $elm$browser$Debugger$Main$Running(userModel)
			},
			A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCommands));
	});
var $elm$browser$Debugger$Main$getLatestModel = function (state) {
	if (state.$ === 'Running') {
		var model = state.a;
		return model;
	} else {
		var model = state.c;
		return model;
	}
};
var $elm$core$Platform$Sub$map = _Platform_map;
var $elm$browser$Debugger$Main$wrapSubs = F2(
	function (subscriptions, model) {
		return A2(
			$elm$core$Platform$Sub$map,
			$elm$browser$Debugger$Main$UserMsg,
			subscriptions(
				$elm$browser$Debugger$Main$getLatestModel(model.state)));
	});
var $elm$browser$Debugger$Main$Moving = {$: 'Moving'};
var $elm$browser$Debugger$Main$Paused = F5(
	function (a, b, c, d, e) {
		return {$: 'Paused', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$browser$Debugger$History$Snapshot = F2(
	function (model, messages) {
		return {messages: messages, model: model};
	});
var $elm$browser$Debugger$History$addRecent = F3(
	function (msg, newModel, _v0) {
		var model = _v0.model;
		var messages = _v0.messages;
		var numMessages = _v0.numMessages;
		return _Utils_eq(numMessages, $elm$browser$Debugger$History$maxSnapshotSize) ? _Utils_Tuple2(
			$elm$core$Maybe$Just(
				A2(
					$elm$browser$Debugger$History$Snapshot,
					model,
					$elm$core$Array$fromList(messages))),
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				newModel,
				_List_fromArray(
					[msg]),
				1)) : _Utils_Tuple2(
			$elm$core$Maybe$Nothing,
			A3(
				$elm$browser$Debugger$History$RecentHistory,
				model,
				A2($elm$core$List$cons, msg, messages),
				numMessages + 1));
	});
var $elm$core$Elm$JsArray$push = _JsArray_push;
var $elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var $elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = $elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			$elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					$elm$core$Elm$JsArray$push,
					$elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, $elm$core$Elm$JsArray$empty));
				return A2($elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2($elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = $elm$core$Array$SubTree(
					A4($elm$core$Array$insertTailInTree, shift - $elm$core$Array$shiftStep, index, tail, subTree));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = $elm$core$Array$SubTree(
					A4(
						$elm$core$Array$insertTailInTree,
						shift - $elm$core$Array$shiftStep,
						index,
						tail,
						$elm$core$Elm$JsArray$singleton(value)));
				return A3($elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var $elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _v0) {
		var len = _v0.a;
		var startShift = _v0.b;
		var tree = _v0.c;
		var tail = _v0.d;
		var originalTailLen = $elm$core$Elm$JsArray$length(tail);
		var newTailLen = $elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, $elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> $elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + $elm$core$Array$shiftStep;
				var newTree = A4(
					$elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					$elm$core$Elm$JsArray$singleton(
						$elm$core$Array$SubTree(tree)));
				return A4($elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, $elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					$elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4($elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					$elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4($elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var $elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			$elm$core$Array$unsafeReplaceTail,
			A2($elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var $elm$browser$Debugger$History$add = F3(
	function (msg, model, _v0) {
		var snapshots = _v0.snapshots;
		var recent = _v0.recent;
		var numMessages = _v0.numMessages;
		var _v1 = A3($elm$browser$Debugger$History$addRecent, msg, model, recent);
		if (_v1.a.$ === 'Just') {
			var snapshot = _v1.a.a;
			var newRecent = _v1.b;
			return A3(
				$elm$browser$Debugger$History$History,
				A2($elm$core$Array$push, snapshot, snapshots),
				newRecent,
				numMessages + 1);
		} else {
			var _v2 = _v1.a;
			var newRecent = _v1.b;
			return A3($elm$browser$Debugger$History$History, snapshots, newRecent, numMessages + 1);
		}
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$browser$Debugger$Overlay$BadImport = function (a) {
	return {$: 'BadImport', a: a};
};
var $elm$browser$Debugger$Overlay$RiskyImport = F2(
	function (a, b) {
		return {$: 'RiskyImport', a: a, b: b};
	});
var $elm$browser$Debugger$Report$VersionChanged = F2(
	function (a, b) {
		return {$: 'VersionChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$MessageChanged = F2(
	function (a, b) {
		return {$: 'MessageChanged', a: a, b: b};
	});
var $elm$browser$Debugger$Report$SomethingChanged = function (a) {
	return {$: 'SomethingChanged', a: a};
};
var $elm$browser$Debugger$Report$AliasChange = function (a) {
	return {$: 'AliasChange', a: a};
};
var $elm$browser$Debugger$Metadata$checkAlias = F4(
	function (name, old, _new, changes) {
		return (_Utils_eq(old.tipe, _new.tipe) && _Utils_eq(old.args, _new.args)) ? changes : A2(
			$elm$core$List$cons,
			$elm$browser$Debugger$Report$AliasChange(name),
			changes);
	});
var $elm$browser$Debugger$Report$UnionChange = F2(
	function (a, b) {
		return {$: 'UnionChange', a: a, b: b};
	});
var $elm$browser$Debugger$Metadata$addTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				added: A2($elm$core$List$cons, tag, changes.added)
			});
	});
var $elm$browser$Debugger$Metadata$checkTag = F4(
	function (tag, old, _new, changes) {
		return _Utils_eq(old, _new) ? changes : _Utils_update(
			changes,
			{
				changed: A2($elm$core$List$cons, tag, changes.changed)
			});
	});
var $elm$browser$Debugger$Report$TagChanges = F4(
	function (removed, changed, added, argsMatch) {
		return {added: added, argsMatch: argsMatch, changed: changed, removed: removed};
	});
var $elm$browser$Debugger$Report$emptyTagChanges = function (argsMatch) {
	return A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, argsMatch);
};
var $elm$browser$Debugger$Report$hasTagChanges = function (tagChanges) {
	return _Utils_eq(
		tagChanges,
		A4($elm$browser$Debugger$Report$TagChanges, _List_Nil, _List_Nil, _List_Nil, true));
};
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Debugger$Metadata$removeTag = F3(
	function (tag, _v0, changes) {
		return _Utils_update(
			changes,
			{
				removed: A2($elm$core$List$cons, tag, changes.removed)
			});
	});
var $elm$browser$Debugger$Metadata$checkUnion = F4(
	function (name, old, _new, changes) {
		var tagChanges = A6(
			$elm$core$Dict$merge,
			$elm$browser$Debugger$Metadata$removeTag,
			$elm$browser$Debugger$Metadata$checkTag,
			$elm$browser$Debugger$Metadata$addTag,
			old.tags,
			_new.tags,
			$elm$browser$Debugger$Report$emptyTagChanges(
				_Utils_eq(old.args, _new.args)));
		return $elm$browser$Debugger$Report$hasTagChanges(tagChanges) ? changes : A2(
			$elm$core$List$cons,
			A2($elm$browser$Debugger$Report$UnionChange, name, tagChanges),
			changes);
	});
var $elm$browser$Debugger$Metadata$ignore = F3(
	function (key, value, report) {
		return report;
	});
var $elm$browser$Debugger$Metadata$checkTypes = F2(
	function (old, _new) {
		return (!_Utils_eq(old.message, _new.message)) ? A2($elm$browser$Debugger$Report$MessageChanged, old.message, _new.message) : $elm$browser$Debugger$Report$SomethingChanged(
			A6(
				$elm$core$Dict$merge,
				$elm$browser$Debugger$Metadata$ignore,
				$elm$browser$Debugger$Metadata$checkUnion,
				$elm$browser$Debugger$Metadata$ignore,
				old.unions,
				_new.unions,
				A6($elm$core$Dict$merge, $elm$browser$Debugger$Metadata$ignore, $elm$browser$Debugger$Metadata$checkAlias, $elm$browser$Debugger$Metadata$ignore, old.aliases, _new.aliases, _List_Nil)));
	});
var $elm$browser$Debugger$Metadata$check = F2(
	function (old, _new) {
		return (!_Utils_eq(old.versions.elm, _new.versions.elm)) ? A2($elm$browser$Debugger$Report$VersionChanged, old.versions.elm, _new.versions.elm) : A2($elm$browser$Debugger$Metadata$checkTypes, old.types, _new.types);
	});
var $elm$browser$Debugger$Report$CorruptHistory = {$: 'CorruptHistory'};
var $elm$browser$Debugger$Overlay$corruptImport = $elm$browser$Debugger$Overlay$BadImport($elm$browser$Debugger$Report$CorruptHistory);
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$browser$Debugger$Report$Fine = {$: 'Fine'};
var $elm$browser$Debugger$Report$Impossible = {$: 'Impossible'};
var $elm$browser$Debugger$Report$Risky = {$: 'Risky'};
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$browser$Debugger$Report$some = function (list) {
	return !$elm$core$List$isEmpty(list);
};
var $elm$browser$Debugger$Report$evaluateChange = function (change) {
	if (change.$ === 'AliasChange') {
		return $elm$browser$Debugger$Report$Impossible;
	} else {
		var removed = change.b.removed;
		var changed = change.b.changed;
		var added = change.b.added;
		var argsMatch = change.b.argsMatch;
		return ((!argsMatch) || ($elm$browser$Debugger$Report$some(changed) || $elm$browser$Debugger$Report$some(removed))) ? $elm$browser$Debugger$Report$Impossible : ($elm$browser$Debugger$Report$some(added) ? $elm$browser$Debugger$Report$Risky : $elm$browser$Debugger$Report$Fine);
	}
};
var $elm$browser$Debugger$Report$worstCase = F2(
	function (status, statusList) {
		worstCase:
		while (true) {
			if (!statusList.b) {
				return status;
			} else {
				switch (statusList.a.$) {
					case 'Impossible':
						var _v1 = statusList.a;
						return $elm$browser$Debugger$Report$Impossible;
					case 'Risky':
						var _v2 = statusList.a;
						var rest = statusList.b;
						var $temp$status = $elm$browser$Debugger$Report$Risky,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
					default:
						var _v3 = statusList.a;
						var rest = statusList.b;
						var $temp$status = status,
							$temp$statusList = rest;
						status = $temp$status;
						statusList = $temp$statusList;
						continue worstCase;
				}
			}
		}
	});
var $elm$browser$Debugger$Report$evaluate = function (report) {
	switch (report.$) {
		case 'CorruptHistory':
			return $elm$browser$Debugger$Report$Impossible;
		case 'VersionChanged':
			return $elm$browser$Debugger$Report$Impossible;
		case 'MessageChanged':
			return $elm$browser$Debugger$Report$Impossible;
		default:
			var changes = report.a;
			return A2(
				$elm$browser$Debugger$Report$worstCase,
				$elm$browser$Debugger$Report$Fine,
				A2($elm$core$List$map, $elm$browser$Debugger$Report$evaluateChange, changes));
	}
};
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $elm$browser$Debugger$Overlay$uploadDecoder = A3(
	$elm$json$Json$Decode$map2,
	F2(
		function (x, y) {
			return _Utils_Tuple2(x, y);
		}),
	A2($elm$json$Json$Decode$field, 'metadata', $elm$browser$Debugger$Metadata$decoder),
	A2($elm$json$Json$Decode$field, 'history', $elm$json$Json$Decode$value));
var $elm$browser$Debugger$Overlay$assessImport = F2(
	function (metadata, jsonString) {
		var _v0 = A2($elm$json$Json$Decode$decodeString, $elm$browser$Debugger$Overlay$uploadDecoder, jsonString);
		if (_v0.$ === 'Err') {
			return $elm$core$Result$Err($elm$browser$Debugger$Overlay$corruptImport);
		} else {
			var _v1 = _v0.a;
			var foreignMetadata = _v1.a;
			var rawHistory = _v1.b;
			var report = A2($elm$browser$Debugger$Metadata$check, foreignMetadata, metadata);
			var _v2 = $elm$browser$Debugger$Report$evaluate(report);
			switch (_v2.$) {
				case 'Impossible':
					return $elm$core$Result$Err(
						$elm$browser$Debugger$Overlay$BadImport(report));
				case 'Risky':
					return $elm$core$Result$Err(
						A2($elm$browser$Debugger$Overlay$RiskyImport, report, rawHistory));
				default:
					return $elm$core$Result$Ok(rawHistory);
			}
		}
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$browser$Debugger$Overlay$close = F2(
	function (msg, state) {
		switch (state.$) {
			case 'None':
				return $elm$core$Maybe$Nothing;
			case 'BadMetadata':
				return $elm$core$Maybe$Nothing;
			case 'BadImport':
				return $elm$core$Maybe$Nothing;
			default:
				var rawHistory = state.b;
				if (msg.$ === 'Cancel') {
					return $elm$core$Maybe$Nothing;
				} else {
					return $elm$core$Maybe$Just(rawHistory);
				}
		}
	});
var $elm$browser$Debugger$History$elmToJs = A2($elm$core$Basics$composeR, _Json_wrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$encodeHelp = F2(
	function (snapshot, allMessages) {
		return A3($elm$core$Array$foldl, $elm$core$List$cons, allMessages, snapshot.messages);
	});
var $elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				$elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(_Utils_Tuple0),
				entries));
	});
var $elm$browser$Debugger$History$encode = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	return A2(
		$elm$json$Json$Encode$list,
		$elm$browser$Debugger$History$elmToJs,
		A3(
			$elm$core$Array$foldr,
			$elm$browser$Debugger$History$encodeHelp,
			$elm$core$List$reverse(recent.messages),
			snapshots));
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$browser$Debugger$Metadata$encodeAlias = function (_v0) {
	var args = _v0.args;
	var tipe = _v0.tipe;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'type',
				$elm$json$Json$Encode$string(tipe))
			]));
};
var $elm$browser$Debugger$Metadata$encodeDict = F2(
	function (f, dict) {
		return $elm$json$Json$Encode$object(
			$elm$core$Dict$toList(
				A2(
					$elm$core$Dict$map,
					F2(
						function (key, value) {
							return f(value);
						}),
					dict)));
	});
var $elm$browser$Debugger$Metadata$encodeUnion = function (_v0) {
	var args = _v0.args;
	var tags = _v0.tags;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'args',
				A2($elm$json$Json$Encode$list, $elm$json$Json$Encode$string, args)),
				_Utils_Tuple2(
				'tags',
				A2(
					$elm$browser$Debugger$Metadata$encodeDict,
					$elm$json$Json$Encode$list($elm$json$Json$Encode$string),
					tags))
			]));
};
var $elm$browser$Debugger$Metadata$encodeTypes = function (_v0) {
	var message = _v0.message;
	var unions = _v0.unions;
	var aliases = _v0.aliases;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'message',
				$elm$json$Json$Encode$string(message)),
				_Utils_Tuple2(
				'aliases',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeAlias, aliases)),
				_Utils_Tuple2(
				'unions',
				A2($elm$browser$Debugger$Metadata$encodeDict, $elm$browser$Debugger$Metadata$encodeUnion, unions))
			]));
};
var $elm$browser$Debugger$Metadata$encodeVersions = function (_v0) {
	var elm = _v0.elm;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'elm',
				$elm$json$Json$Encode$string(elm))
			]));
};
var $elm$browser$Debugger$Metadata$encode = function (_v0) {
	var versions = _v0.versions;
	var types = _v0.types;
	return $elm$json$Json$Encode$object(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'versions',
				$elm$browser$Debugger$Metadata$encodeVersions(versions)),
				_Utils_Tuple2(
				'types',
				$elm$browser$Debugger$Metadata$encodeTypes(types))
			]));
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Debugger$Main$download = F2(
	function (metadata, history) {
		var historyLength = $elm$browser$Debugger$History$size(history);
		return A2(
			$elm$core$Task$perform,
			function (_v0) {
				return $elm$browser$Debugger$Main$NoOp;
			},
			A2(
				_Debugger_download,
				historyLength,
				_Json_unwrap(
					$elm$json$Json$Encode$object(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'metadata',
								$elm$browser$Debugger$Metadata$encode(metadata)),
								_Utils_Tuple2(
								'history',
								$elm$browser$Debugger$History$encode(history))
							])))));
	});
var $elm$browser$Debugger$Main$Vertical = F3(
	function (a, b, c) {
		return {$: 'Vertical', a: a, b: b, c: c};
	});
var $elm$browser$Debugger$Main$drag = F2(
	function (info, layout) {
		if (layout.$ === 'Horizontal') {
			var status = layout.a;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, info.x / info.width, y);
		} else {
			var status = layout.a;
			var x = layout.b;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, info.y / info.height);
		}
	});
var $elm$browser$Debugger$History$Stepping = F2(
	function (a, b) {
		return {$: 'Stepping', a: a, b: b};
	});
var $elm$browser$Debugger$History$Done = F2(
	function (a, b) {
		return {$: 'Done', a: a, b: b};
	});
var $elm$browser$Debugger$History$getHelp = F3(
	function (update, msg, getResult) {
		if (getResult.$ === 'Done') {
			return getResult;
		} else {
			var n = getResult.a;
			var model = getResult.b;
			return (!n) ? A2(
				$elm$browser$Debugger$History$Done,
				msg,
				A2(update, msg, model).a) : A2(
				$elm$browser$Debugger$History$Stepping,
				n - 1,
				A2(update, msg, model).a);
		}
	});
var $elm$browser$Debugger$History$undone = function (getResult) {
	undone:
	while (true) {
		if (getResult.$ === 'Done') {
			var msg = getResult.a;
			var model = getResult.b;
			return _Utils_Tuple2(model, msg);
		} else {
			var $temp$getResult = getResult;
			getResult = $temp$getResult;
			continue undone;
		}
	}
};
var $elm$browser$Debugger$History$get = F3(
	function (update, index, history) {
		get:
		while (true) {
			var recent = history.recent;
			var snapshotMax = history.numMessages - recent.numMessages;
			if (_Utils_cmp(index, snapshotMax) > -1) {
				return $elm$browser$Debugger$History$undone(
					A3(
						$elm$core$List$foldr,
						$elm$browser$Debugger$History$getHelp(update),
						A2($elm$browser$Debugger$History$Stepping, index - snapshotMax, recent.model),
						recent.messages));
			} else {
				var _v0 = A2($elm$core$Array$get, (index / $elm$browser$Debugger$History$maxSnapshotSize) | 0, history.snapshots);
				if (_v0.$ === 'Nothing') {
					var $temp$update = update,
						$temp$index = index,
						$temp$history = history;
					update = $temp$update;
					index = $temp$index;
					history = $temp$history;
					continue get;
				} else {
					var model = _v0.a.model;
					var messages = _v0.a.messages;
					return $elm$browser$Debugger$History$undone(
						A3(
							$elm$core$Array$foldr,
							$elm$browser$Debugger$History$getHelp(update),
							A2($elm$browser$Debugger$History$Stepping, index % $elm$browser$Debugger$History$maxSnapshotSize, model),
							messages));
				}
			}
		}
	});
var $elm$browser$Debugger$History$getRecentMsg = function (history) {
	getRecentMsg:
	while (true) {
		var _v0 = history.recent.messages;
		if (!_v0.b) {
			var $temp$history = history;
			history = $temp$history;
			continue getRecentMsg;
		} else {
			var first = _v0.a;
			return first;
		}
	}
};
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$browser$Debugger$Expando$mergeDictHelp = F3(
	function (oldDict, key, value) {
		var _v12 = A2($elm$core$Dict$get, key, oldDict);
		if (_v12.$ === 'Nothing') {
			return value;
		} else {
			var oldValue = _v12.a;
			return A2($elm$browser$Debugger$Expando$mergeHelp, oldValue, value);
		}
	});
var $elm$browser$Debugger$Expando$mergeHelp = F2(
	function (old, _new) {
		var _v3 = _Utils_Tuple2(old, _new);
		_v3$6:
		while (true) {
			switch (_v3.b.$) {
				case 'S':
					return _new;
				case 'Primitive':
					return _new;
				case 'Sequence':
					if (_v3.a.$ === 'Sequence') {
						var _v4 = _v3.a;
						var isClosed = _v4.b;
						var oldValues = _v4.c;
						var _v5 = _v3.b;
						var seqType = _v5.a;
						var newValues = _v5.c;
						return A3(
							$elm$browser$Debugger$Expando$Sequence,
							seqType,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
				case 'Dictionary':
					if (_v3.a.$ === 'Dictionary') {
						var _v6 = _v3.a;
						var isClosed = _v6.a;
						var _v7 = _v3.b;
						var keyValuePairs = _v7.b;
						return A2($elm$browser$Debugger$Expando$Dictionary, isClosed, keyValuePairs);
					} else {
						break _v3$6;
					}
				case 'Record':
					if (_v3.a.$ === 'Record') {
						var _v8 = _v3.a;
						var isClosed = _v8.a;
						var oldDict = _v8.b;
						var _v9 = _v3.b;
						var newDict = _v9.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A2(
								$elm$core$Dict$map,
								$elm$browser$Debugger$Expando$mergeDictHelp(oldDict),
								newDict));
					} else {
						break _v3$6;
					}
				default:
					if (_v3.a.$ === 'Constructor') {
						var _v10 = _v3.a;
						var isClosed = _v10.b;
						var oldValues = _v10.c;
						var _v11 = _v3.b;
						var maybeName = _v11.a;
						var newValues = _v11.c;
						return A3(
							$elm$browser$Debugger$Expando$Constructor,
							maybeName,
							isClosed,
							A2($elm$browser$Debugger$Expando$mergeListHelp, oldValues, newValues));
					} else {
						break _v3$6;
					}
			}
		}
		return _new;
	});
var $elm$browser$Debugger$Expando$mergeListHelp = F2(
	function (olds, news) {
		var _v0 = _Utils_Tuple2(olds, news);
		if (!_v0.a.b) {
			return news;
		} else {
			if (!_v0.b.b) {
				return news;
			} else {
				var _v1 = _v0.a;
				var x = _v1.a;
				var xs = _v1.b;
				var _v2 = _v0.b;
				var y = _v2.a;
				var ys = _v2.b;
				return A2(
					$elm$core$List$cons,
					A2($elm$browser$Debugger$Expando$mergeHelp, x, y),
					A2($elm$browser$Debugger$Expando$mergeListHelp, xs, ys));
			}
		}
	});
var $elm$browser$Debugger$Expando$merge = F2(
	function (value, expando) {
		return A2(
			$elm$browser$Debugger$Expando$mergeHelp,
			expando,
			_Debugger_init(value));
	});
var $elm$browser$Debugger$Main$jumpUpdate = F3(
	function (update, index, model) {
		var history = $elm$browser$Debugger$Main$cachedHistory(model);
		var currentMsg = $elm$browser$Debugger$History$getRecentMsg(history);
		var currentModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
		var _v0 = A3($elm$browser$Debugger$History$get, update, index, history);
		var indexModel = _v0.a;
		var indexMsg = _v0.b;
		return _Utils_update(
			model,
			{
				expandoModel: A2($elm$browser$Debugger$Expando$merge, indexModel, model.expandoModel),
				expandoMsg: A2($elm$browser$Debugger$Expando$merge, indexMsg, model.expandoMsg),
				state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, currentModel, currentMsg, history)
			});
	});
var $elm$browser$Debugger$History$jsToElm = A2($elm$core$Basics$composeR, _Json_unwrap, _Debugger_unsafeCoerce);
var $elm$browser$Debugger$History$decoder = F2(
	function (initialModel, update) {
		var addMessage = F2(
			function (rawMsg, _v0) {
				var model = _v0.a;
				var history = _v0.b;
				var msg = $elm$browser$Debugger$History$jsToElm(rawMsg);
				return _Utils_Tuple2(
					A2(update, msg, model),
					A3($elm$browser$Debugger$History$add, msg, model, history));
			});
		var updateModel = function (rawMsgs) {
			return A3(
				$elm$core$List$foldl,
				addMessage,
				_Utils_Tuple2(
					initialModel,
					$elm$browser$Debugger$History$empty(initialModel)),
				rawMsgs);
		};
		return A2(
			$elm$json$Json$Decode$map,
			updateModel,
			$elm$json$Json$Decode$list($elm$json$Json$Decode$value));
	});
var $elm$browser$Debugger$History$getInitialModel = function (_v0) {
	var snapshots = _v0.snapshots;
	var recent = _v0.recent;
	var _v1 = A2($elm$core$Array$get, 0, snapshots);
	if (_v1.$ === 'Just') {
		var model = _v1.a.model;
		return model;
	} else {
		return recent.model;
	}
};
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$browser$Debugger$Main$loadNewHistory = F3(
	function (rawHistory, update, model) {
		var pureUserUpdate = F2(
			function (msg, userModel) {
				return A2(update, msg, userModel).a;
			});
		var initialUserModel = $elm$browser$Debugger$History$getInitialModel(model.history);
		var decoder = A2($elm$browser$Debugger$History$decoder, initialUserModel, pureUserUpdate);
		var _v0 = A2($elm$json$Json$Decode$decodeValue, decoder, rawHistory);
		if (_v0.$ === 'Err') {
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{overlay: $elm$browser$Debugger$Overlay$corruptImport}),
				$elm$core$Platform$Cmd$none);
		} else {
			var _v1 = _v0.a;
			var latestUserModel = _v1.a;
			var newHistory = _v1.b;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						expandoModel: $elm$browser$Debugger$Expando$init(latestUserModel),
						expandoMsg: $elm$browser$Debugger$Expando$init(
							$elm$browser$Debugger$History$getRecentMsg(newHistory)),
						history: newHistory,
						overlay: $elm$browser$Debugger$Overlay$none,
						state: $elm$browser$Debugger$Main$Running(latestUserModel)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$scroll = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
		_Debugger_scroll(popout));
};
var $elm$browser$Debugger$Main$scrollTo = F2(
	function (id, popout) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
			A2(_Debugger_scrollTo, id, popout));
	});
var $elm$browser$Debugger$Main$setDragStatus = F2(
	function (status, layout) {
		if (layout.$ === 'Horizontal') {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Horizontal, status, x, y);
		} else {
			var x = layout.b;
			var y = layout.c;
			return A3($elm$browser$Debugger$Main$Vertical, status, x, y);
		}
	});
var $elm$browser$Debugger$Main$swapLayout = function (layout) {
	if (layout.$ === 'Horizontal') {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Vertical, s, x, y);
	} else {
		var s = layout.a;
		var x = layout.b;
		var y = layout.c;
		return A3($elm$browser$Debugger$Main$Horizontal, s, x, y);
	}
};
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$browser$Debugger$Expando$updateIndex = F3(
	function (n, func, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			var x = list.a;
			var xs = list.b;
			return (n <= 0) ? A2(
				$elm$core$List$cons,
				func(x),
				xs) : A2(
				$elm$core$List$cons,
				x,
				A3($elm$browser$Debugger$Expando$updateIndex, n - 1, func, xs));
		}
	});
var $elm$browser$Debugger$Expando$update = F2(
	function (msg, value) {
		switch (value.$) {
			case 'S':
				return value;
			case 'Primitive':
				return value;
			case 'Sequence':
				var seqType = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Sequence, seqType, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v3 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Sequence,
								seqType,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
			case 'Dictionary':
				var isClosed = value.a;
				var keyValuePairs = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Dictionary, !isClosed, keyValuePairs);
					case 'Index':
						var redirect = msg.a;
						var index = msg.b;
						var subMsg = msg.c;
						switch (redirect.$) {
							case 'None':
								return value;
							case 'Key':
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v6) {
											var k = _v6.a;
											var v = _v6.b;
											return _Utils_Tuple2(
												A2($elm$browser$Debugger$Expando$update, subMsg, k),
												v);
										},
										keyValuePairs));
							default:
								return A2(
									$elm$browser$Debugger$Expando$Dictionary,
									isClosed,
									A3(
										$elm$browser$Debugger$Expando$updateIndex,
										index,
										function (_v7) {
											var k = _v7.a;
											var v = _v7.b;
											return _Utils_Tuple2(
												k,
												A2($elm$browser$Debugger$Expando$update, subMsg, v));
										},
										keyValuePairs));
						}
					default:
						return value;
				}
			case 'Record':
				var isClosed = value.a;
				var valueDict = value.b;
				switch (msg.$) {
					case 'Toggle':
						return A2($elm$browser$Debugger$Expando$Record, !isClosed, valueDict);
					case 'Index':
						return value;
					default:
						var field = msg.a;
						var subMsg = msg.b;
						return A2(
							$elm$browser$Debugger$Expando$Record,
							isClosed,
							A3(
								$elm$core$Dict$update,
								field,
								$elm$browser$Debugger$Expando$updateField(subMsg),
								valueDict));
				}
			default:
				var maybeName = value.a;
				var isClosed = value.b;
				var valueList = value.c;
				switch (msg.$) {
					case 'Toggle':
						return A3($elm$browser$Debugger$Expando$Constructor, maybeName, !isClosed, valueList);
					case 'Index':
						if (msg.a.$ === 'None') {
							var _v10 = msg.a;
							var index = msg.b;
							var subMsg = msg.c;
							return A3(
								$elm$browser$Debugger$Expando$Constructor,
								maybeName,
								isClosed,
								A3(
									$elm$browser$Debugger$Expando$updateIndex,
									index,
									$elm$browser$Debugger$Expando$update(subMsg),
									valueList));
						} else {
							return value;
						}
					default:
						return value;
				}
		}
	});
var $elm$browser$Debugger$Expando$updateField = F2(
	function (msg, maybeExpando) {
		if (maybeExpando.$ === 'Nothing') {
			return maybeExpando;
		} else {
			var expando = maybeExpando.a;
			return $elm$core$Maybe$Just(
				A2($elm$browser$Debugger$Expando$update, msg, expando));
		}
	});
var $elm$browser$Debugger$Main$Upload = function (a) {
	return {$: 'Upload', a: a};
};
var $elm$browser$Debugger$Main$upload = function (popout) {
	return A2(
		$elm$core$Task$perform,
		$elm$browser$Debugger$Main$Upload,
		_Debugger_upload(popout));
};
var $elm$browser$Debugger$Overlay$BadMetadata = function (a) {
	return {$: 'BadMetadata', a: a};
};
var $elm$browser$Debugger$Overlay$badMetadata = $elm$browser$Debugger$Overlay$BadMetadata;
var $elm$browser$Debugger$Main$withGoodMetadata = F2(
	function (model, func) {
		var _v0 = model.metadata;
		if (_v0.$ === 'Ok') {
			var metadata = _v0.a;
			return func(metadata);
		} else {
			var error = _v0.a;
			return _Utils_Tuple2(
				_Utils_update(
					model,
					{
						overlay: $elm$browser$Debugger$Overlay$badMetadata(error)
					}),
				$elm$core$Platform$Cmd$none);
		}
	});
var $elm$browser$Debugger$Main$wrapUpdate = F3(
	function (update, msg, model) {
		wrapUpdate:
		while (true) {
			switch (msg.$) {
				case 'NoOp':
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				case 'UserMsg':
					var userMsg = msg.a;
					var userModel = $elm$browser$Debugger$Main$getLatestModel(model.state);
					var newHistory = A3($elm$browser$Debugger$History$add, userMsg, userModel, model.history);
					var _v1 = A2(update, userMsg, userModel);
					var newUserModel = _v1.a;
					var userCmds = _v1.b;
					var commands = A2($elm$core$Platform$Cmd$map, $elm$browser$Debugger$Main$UserMsg, userCmds);
					var _v2 = model.state;
					if (_v2.$ === 'Running') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, newUserModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									history: newHistory,
									state: $elm$browser$Debugger$Main$Running(newUserModel)
								}),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										commands,
										$elm$browser$Debugger$Main$scroll(model.popout)
									])));
					} else {
						var index = _v2.a;
						var indexModel = _v2.b;
						var history = _v2.e;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									history: newHistory,
									state: A5($elm$browser$Debugger$Main$Paused, index, indexModel, newUserModel, userMsg, history)
								}),
							commands);
					}
				case 'TweakExpandoMsg':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoMsg: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoMsg)
							}),
						$elm$core$Platform$Cmd$none);
				case 'TweakExpandoModel':
					var eMsg = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								expandoModel: A2($elm$browser$Debugger$Expando$update, eMsg, model.expandoModel)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Resume':
					var _v3 = model.state;
					if (_v3.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var userModel = _v3.c;
						var userMsg = _v3.d;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									expandoModel: A2($elm$browser$Debugger$Expando$merge, userModel, model.expandoModel),
									expandoMsg: A2($elm$browser$Debugger$Expando$merge, userMsg, model.expandoMsg),
									state: $elm$browser$Debugger$Main$Running(userModel)
								}),
							$elm$browser$Debugger$Main$scroll(model.popout));
					}
				case 'Jump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						$elm$core$Platform$Cmd$none);
				case 'SliderJump':
					var index = msg.a;
					return _Utils_Tuple2(
						A3($elm$browser$Debugger$Main$jumpUpdate, update, index, model),
						A2(
							$elm$browser$Debugger$Main$scrollTo,
							$elm$browser$Debugger$History$idForMessageIndex(index),
							model.popout));
				case 'Open':
					return _Utils_Tuple2(
						model,
						A2(
							$elm$core$Task$perform,
							$elm$core$Basics$always($elm$browser$Debugger$Main$NoOp),
							_Debugger_open(model.popout)));
				case 'Up':
					var _v4 = model.state;
					if (_v4.$ === 'Running') {
						return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
					} else {
						var i = _v4.a;
						var history = _v4.e;
						var targetIndex = i + 1;
						if (_Utils_cmp(
							targetIndex,
							$elm$browser$Debugger$History$size(history)) < 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(targetIndex),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$Resume,
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						}
					}
				case 'Down':
					var _v5 = model.state;
					if (_v5.$ === 'Running') {
						var $temp$update = update,
							$temp$msg = $elm$browser$Debugger$Main$Jump(
							$elm$browser$Debugger$History$size(model.history) - 1),
							$temp$model = model;
						update = $temp$update;
						msg = $temp$msg;
						model = $temp$model;
						continue wrapUpdate;
					} else {
						var index = _v5.a;
						if (index > 0) {
							var $temp$update = update,
								$temp$msg = $elm$browser$Debugger$Main$SliderJump(index - 1),
								$temp$model = model;
							update = $temp$update;
							msg = $temp$msg;
							model = $temp$model;
							continue wrapUpdate;
						} else {
							return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
						}
					}
				case 'Import':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (_v6) {
							return _Utils_Tuple2(
								model,
								$elm$browser$Debugger$Main$upload(model.popout));
						});
				case 'Export':
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							return _Utils_Tuple2(
								model,
								A2($elm$browser$Debugger$Main$download, metadata, model.history));
						});
				case 'Upload':
					var jsonString = msg.a;
					return A2(
						$elm$browser$Debugger$Main$withGoodMetadata,
						model,
						function (metadata) {
							var _v7 = A2($elm$browser$Debugger$Overlay$assessImport, metadata, jsonString);
							if (_v7.$ === 'Err') {
								var newOverlay = _v7.a;
								return _Utils_Tuple2(
									_Utils_update(
										model,
										{overlay: newOverlay}),
									$elm$core$Platform$Cmd$none);
							} else {
								var rawHistory = _v7.a;
								return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
							}
						});
				case 'OverlayMsg':
					var overlayMsg = msg.a;
					var _v8 = A2($elm$browser$Debugger$Overlay$close, overlayMsg, model.overlay);
					if (_v8.$ === 'Nothing') {
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{overlay: $elm$browser$Debugger$Overlay$none}),
							$elm$core$Platform$Cmd$none);
					} else {
						var rawHistory = _v8.a;
						return A3($elm$browser$Debugger$Main$loadNewHistory, rawHistory, update, model);
					}
				case 'SwapLayout':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: $elm$browser$Debugger$Main$swapLayout(model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'DragStart':
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Moving, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				case 'Drag':
					var info = msg.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$drag, info, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
				default:
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								layout: A2($elm$browser$Debugger$Main$setDragStatus, $elm$browser$Debugger$Main$Static, model.layout)
							}),
						$elm$core$Platform$Cmd$none);
			}
		}
	});
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Main$init = function (_v0) {
	return _Utils_Tuple2(
		{resetCss_1: $elm$core$Maybe$Nothing, resetCss_2: $elm$core$Maybe$Nothing, resetCss_3: $elm$core$Maybe$Nothing},
		$elm$core$Platform$Cmd$none);
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Platform$Sub$none = $elm$core$Platform$Sub$batch(_List_Nil);
var $author$project$Data$ResetCss$Destyle = {$: 'Destyle'};
var $author$project$Data$ResetCss$EricMeyer = {$: 'EricMeyer'};
var $author$project$Data$ResetCss$Html5Doctor = {$: 'Html5Doctor'};
var $author$project$Data$ResetCss$Normalize = {$: 'Normalize'};
var $author$project$Data$ResetCss$Ress = {$: 'Ress'};
var $author$project$Data$ResetCss$Sanitize = {$: 'Sanitize'};
var $author$project$Data$ResetCss$TheNewCssReset = {$: 'TheNewCssReset'};
var $author$project$Data$ResetCss$fromString = function (str) {
	switch (str) {
		case 'EricMeyer':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$EricMeyer);
		case 'Html5Doctor':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$Html5Doctor);
		case 'Destyle':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$Destyle);
		case 'Normalize':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$Normalize);
		case 'Ress':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$Ress);
		case 'Sanitize':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$Sanitize);
		case 'TheNewCssReset':
			return $elm$core$Maybe$Just($author$project$Data$ResetCss$TheNewCssReset);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.a.$) {
			case 'Slot_1':
				var _v1 = msg.a;
				var str = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							resetCss_1: $author$project$Data$ResetCss$fromString(str)
						}),
					$elm$core$Platform$Cmd$none);
			case 'Slot_2':
				var _v2 = msg.a;
				var str = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							resetCss_2: $author$project$Data$ResetCss$fromString(str)
						}),
					$elm$core$Platform$Cmd$none);
			default:
				var _v3 = msg.a;
				var str = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							resetCss_3: $author$project$Data$ResetCss$fromString(str)
						}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$Slot_1 = {$: 'Slot_1'};
var $author$project$Main$Slot_2 = {$: 'Slot_2'};
var $author$project$Main$Slot_3 = {$: 'Slot_3'};
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$backgroundColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'background-color', c.value);
};
var $rtfeldman$elm_css$Css$Structure$Child = {$: 'Child'};
var $rtfeldman$elm_css$Css$Preprocess$NestSnippet = F2(
	function (a, b) {
		return {$: 'NestSnippet', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Global$children = $rtfeldman$elm_css$Css$Preprocess$NestSnippet($rtfeldman$elm_css$Css$Structure$Child);
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	var _v1 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v1.a;
	var compactedDeclarations = _v1.b;
	var finalDeclarations = A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				$elm$core$String$join,
				' and ',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var $rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap($rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var $rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var $rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $rtfeldman$elm_css$Css$Structure$Output$indent, $rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				$elm$core$String$join,
				'',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				'',
				A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		$elm$core$String$append,
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		var selectorStr = A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2($elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					$rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2($rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, $rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				$elm$core$String$join,
				',\n',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				$elm$core$String$join,
				'\n\n',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						$rtfeldman$elm_css$Css$Structure$Output$indent,
						$rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock($rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					$elm$core$String$join,
					'\n\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _v9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $elm$core$String$cons = _String_cons;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1 = 3432918353;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$c2 = 461845907;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Bitwise$or = _Bitwise_or;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
		$rtfeldman$elm_css$ElmCssVendor$Murmur3$c2,
		A2(
			$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
			15,
			A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
			5,
			A2(
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy,
					$rtfeldman$elm_css$ElmCssVendor$Murmur3$c2,
					A2(
						$rtfeldman$elm_css$ElmCssVendor$Murmur3$rotlBy,
						15,
						A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$multiplyBy, $rtfeldman$elm_css$ElmCssVendor$Murmur3$c1, k1))))) + 3864292196;
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString = F2(
	function (seed, str) {
		return $rtfeldman$elm_css$ElmCssVendor$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$hashFold,
				A4($rtfeldman$elm_css$ElmCssVendor$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$murmurSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString, $rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return $elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2(
				$rtfeldman$elm_css$ElmCssVendor$Murmur3$hashString,
				$rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					$elm$core$List$singleton(
						$rtfeldman$elm_css$Css$Preprocess$stylesheet(
							$elm$core$List$singleton(
								A2(
									$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = $rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		$elm$virtual_dom$VirtualDom$property,
		'className',
		$elm$json$Json$Encode$string(classname));
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$display = $rtfeldman$elm_css$Css$prop1('display');
var $rtfeldman$elm_css$Css$displayFlex = A2($rtfeldman$elm_css$Css$property, 'display', 'flex');
var $rtfeldman$elm_css$Css$Structure$TypeSelector = function (a) {
	return {$: 'TypeSelector', a: a};
};
var $rtfeldman$elm_css$Css$Global$typeSelector = F2(
	function (selectorStr, styles) {
		var sequence = A2(
			$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
			$rtfeldman$elm_css$Css$Structure$TypeSelector(selectorStr),
			_List_Nil);
		var sel = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, sel, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$Css$Global$div = $rtfeldman$elm_css$Css$Global$typeSelector('div');
var $rtfeldman$elm_css$Css$Global$body = $rtfeldman$elm_css$Css$Global$typeSelector('body');
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$borderBox = {backgroundClip: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'border-box'};
var $rtfeldman$elm_css$Css$boxSizing = $rtfeldman$elm_css$Css$prop1('box-sizing');
var $rtfeldman$elm_css$Css$Global$everything = function (styles) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil));
};
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode = $rtfeldman$elm_css$VirtualDom$Styled$Unstyled;
var $rtfeldman$elm_css$Css$Global$global = function (snippets) {
	return $rtfeldman$elm_css$VirtualDom$Styled$unstyledNode(
		A3(
			$elm$virtual_dom$VirtualDom$node,
			'style',
			_List_Nil,
			$elm$core$List$singleton(
				$elm$virtual_dom$VirtualDom$text(
					$rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
						$elm$core$List$singleton(
							$rtfeldman$elm_css$Css$Preprocess$stylesheet(snippets)))))));
};
var $rtfeldman$elm_css$Css$height = $rtfeldman$elm_css$Css$prop1('height');
var $rtfeldman$elm_css$Css$Global$html = $rtfeldman$elm_css$Css$Global$typeSelector('html');
var $rtfeldman$elm_css$Css$margin = $rtfeldman$elm_css$Css$prop1('margin');
var $rtfeldman$elm_css$Css$PercentageUnits = {$: 'PercentageUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$pct = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PercentageUnits, '%');
var $rtfeldman$elm_css$Css$UnitlessInteger = {$: 'UnitlessInteger'};
var $rtfeldman$elm_css$Css$zero = {length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, number: $rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: $rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: $rtfeldman$elm_css$Css$UnitlessInteger, value: '0'};
var $author$project$Main$globalReset = $rtfeldman$elm_css$Css$Global$global(
	_List_fromArray(
		[
			$rtfeldman$elm_css$Css$Global$everything(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox)
				])),
			$rtfeldman$elm_css$Css$Global$html(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$height(
					$rtfeldman$elm_css$Css$pct(100))
				])),
			$rtfeldman$elm_css$Css$Global$body(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$height(
					$rtfeldman$elm_css$Css$pct(100)),
					$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
				]))
		]));
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$header = $rtfeldman$elm_css$Html$Styled$node('header');
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ', ', args) + ')'));
	});
var $elm$core$Basics$pi = _Basics_pi;
var $rtfeldman$elm_css$Css$degreesToRadians = function (degrees) {
	return (degrees * 180) / $elm$core$Basics$pi;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$Basics$degrees = function (angleInDegrees) {
	return (angleInDegrees * $elm$core$Basics$pi) / 180;
};
var $rtfeldman$elm_css$Css$fmod = F2(
	function (f, n) {
		var integer = $elm$core$Basics$floor(f);
		return (A2($elm$core$Basics$modBy, n, integer) + f) - integer;
	});
var $rtfeldman$elm_css$Css$hslToRgb = F3(
	function (hueVal, saturationVal, lightness) {
		var normHue = hueVal / $elm$core$Basics$degrees(60);
		var chroma = (1 - $elm$core$Basics$abs((2 * lightness) - 1)) * saturationVal;
		var m = lightness - (chroma / 2);
		var x = chroma * (1 - $elm$core$Basics$abs(
			A2($rtfeldman$elm_css$Css$fmod, normHue, 2) - 1));
		var _v0 = (normHue < 0) ? _Utils_Tuple3(0, 0, 0) : ((normHue < 1) ? _Utils_Tuple3(chroma, x, 0) : ((normHue < 2) ? _Utils_Tuple3(x, chroma, 0) : ((normHue < 3) ? _Utils_Tuple3(0, chroma, x) : ((normHue < 4) ? _Utils_Tuple3(0, x, chroma) : ((normHue < 5) ? _Utils_Tuple3(x, 0, chroma) : ((normHue < 6) ? _Utils_Tuple3(chroma, 0, x) : _Utils_Tuple3(0, 0, 0)))))));
		var r = _v0.a;
		var g = _v0.b;
		var b = _v0.c;
		return _Utils_Tuple3(r + m, g + m, b + m);
	});
var $rtfeldman$elm_css$Css$hslaToRgba = F5(
	function (value, hueVal, saturationVal, lightness, hslAlpha) {
		var _v0 = A3(
			$rtfeldman$elm_css$Css$hslToRgb,
			$rtfeldman$elm_css$Css$degreesToRadians(hueVal),
			saturationVal,
			lightness);
		var red = _v0.a;
		var green = _v0.b;
		var blue = _v0.c;
		return {
			alpha: hslAlpha,
			blue: $elm$core$Basics$floor(blue),
			color: $rtfeldman$elm_css$Css$Structure$Compatible,
			green: $elm$core$Basics$floor(green),
			red: $elm$core$Basics$floor(red),
			value: value
		};
	});
var $rtfeldman$elm_css$Css$numericalPercentageToString = function (value) {
	return $elm$core$String$fromFloat(value * 100) + '%';
};
var $rtfeldman$elm_css$Css$hsla = F4(
	function (hueVal, saturationVal, lightnessVal, alpha) {
		var valuesList = _List_fromArray(
			[
				$elm$core$String$fromFloat(hueVal),
				$rtfeldman$elm_css$Css$numericalPercentageToString(saturationVal),
				$rtfeldman$elm_css$Css$numericalPercentageToString(lightnessVal),
				$elm$core$String$fromFloat(alpha)
			]);
		var value = A2($rtfeldman$elm_css$Css$cssFunction, 'hsla', valuesList);
		return A5($rtfeldman$elm_css$Css$hslaToRgba, value, hueVal, saturationVal, lightnessVal, alpha);
	});
var $rtfeldman$elm_css$Html$Styled$main_ = $rtfeldman$elm_css$Html$Styled$node('main');
var $rtfeldman$elm_css$Css$Media$feature = F2(
	function (key, _v0) {
		var value = _v0.value;
		return {
			feature: key,
			value: $elm$core$Maybe$Just(value)
		};
	});
var $rtfeldman$elm_css$Css$Media$maxWidth = function (value) {
	return A2($rtfeldman$elm_css$Css$Media$feature, 'max-width', value);
};
var $rtfeldman$elm_css$Css$Media$minWidth = function (value) {
	return A2($rtfeldman$elm_css$Css$Media$feature, 'min-width', value);
};
var $rtfeldman$elm_css$Css$none = {backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, blockAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, hoverCapability: $rtfeldman$elm_css$Css$Structure$Compatible, inlineAxisOverflow: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, outline: $rtfeldman$elm_css$Css$Structure$Compatible, pointerDevice: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, resize: $rtfeldman$elm_css$Css$Structure$Compatible, scriptingSupport: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, transform: $rtfeldman$elm_css$Css$Structure$Compatible, updateFrequency: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'};
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$nthChild = function (str) {
	return $rtfeldman$elm_css$Css$pseudoClass('nth-child(' + (str + ')'));
};
var $rtfeldman$elm_css$Css$Structure$OnlyQuery = F2(
	function (a, b) {
		return {$: 'OnlyQuery', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Media$only = $rtfeldman$elm_css$Css$Structure$OnlyQuery;
var $rtfeldman$elm_css$Css$prop2 = F3(
	function (key, argA, argB) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value])));
	});
var $rtfeldman$elm_css$Css$padding2 = $rtfeldman$elm_css$Css$prop2('padding');
var $rtfeldman$elm_css$Css$paddingLeft = $rtfeldman$elm_css$Css$prop1('padding-left');
var $rtfeldman$elm_css$Css$position = $rtfeldman$elm_css$Css$prop1('position');
var $author$project$Data$Tag$ActionButtons = {$: 'ActionButtons'};
var $author$project$Data$Tag$Address = {$: 'Address'};
var $author$project$Data$Tag$Audio = {$: 'Audio'};
var $author$project$Data$Tag$Blockquotes = {$: 'Blockquotes'};
var $author$project$Data$Tag$Checkboxes = {$: 'Checkboxes'};
var $author$project$Data$Tag$Code = {$: 'Code'};
var $author$project$Data$Tag$Headings = {$: 'Headings'};
var $author$project$Data$Tag$HorizontalRules = {$: 'HorizontalRules'};
var $author$project$Data$Tag$Html5Inputs = {$: 'Html5Inputs'};
var $author$project$Data$Tag$IFrames = {$: 'IFrames'};
var $author$project$Data$Tag$Images = {$: 'Images'};
var $author$project$Data$Tag$InlineElements = {$: 'InlineElements'};
var $author$project$Data$Tag$InlineSvg = {$: 'InlineSvg'};
var $author$project$Data$Tag$InputFields = {$: 'InputFields'};
var $author$project$Data$Tag$Lists = {$: 'Lists'};
var $author$project$Data$Tag$Meter = {$: 'Meter'};
var $author$project$Data$Tag$Paragraphs = {$: 'Paragraphs'};
var $author$project$Data$Tag$Progress = {$: 'Progress'};
var $author$project$Data$Tag$RadioButtons = {$: 'RadioButtons'};
var $author$project$Data$Tag$SelectMenus = {$: 'SelectMenus'};
var $author$project$Data$Tag$TabularData = {$: 'TabularData'};
var $author$project$Data$Tag$Textareas = {$: 'Textareas'};
var $author$project$Data$Tag$Video = {$: 'Video'};
var $author$project$Data$Tag$all = _List_fromArray(
	[$author$project$Data$Tag$Headings, $author$project$Data$Tag$Paragraphs, $author$project$Data$Tag$Blockquotes, $author$project$Data$Tag$Address, $author$project$Data$Tag$Lists, $author$project$Data$Tag$HorizontalRules, $author$project$Data$Tag$TabularData, $author$project$Data$Tag$Code, $author$project$Data$Tag$InlineElements, $author$project$Data$Tag$Images, $author$project$Data$Tag$Audio, $author$project$Data$Tag$Video, $author$project$Data$Tag$Meter, $author$project$Data$Tag$Progress, $author$project$Data$Tag$InlineSvg, $author$project$Data$Tag$IFrames, $author$project$Data$Tag$InputFields, $author$project$Data$Tag$SelectMenus, $author$project$Data$Tag$Checkboxes, $author$project$Data$Tag$RadioButtons, $author$project$Data$Tag$Textareas, $author$project$Data$Tag$Html5Inputs, $author$project$Data$Tag$ActionButtons]);
var $rtfeldman$elm_css$VirtualDom$Styled$attribute = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$attribute, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$attribute = $rtfeldman$elm_css$VirtualDom$Styled$attribute;
var $rtfeldman$elm_css$Css$bold = {fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'bold'};
var $rtfeldman$elm_css$Css$prop3 = F4(
	function (key, argA, argB, argC) {
		return A2(
			$rtfeldman$elm_css$Css$property,
			key,
			A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					[argA.value, argB.value, argC.value])));
	});
var $rtfeldman$elm_css$Css$borderBottom3 = $rtfeldman$elm_css$Css$prop3('border-bottom');
var $rtfeldman$elm_css$Css$borderLeft3 = $rtfeldman$elm_css$Css$prop3('border-left');
var $rtfeldman$elm_css$Css$Structure$Descendant = {$: 'Descendant'};
var $rtfeldman$elm_css$Css$Global$descendants = $rtfeldman$elm_css$Css$Preprocess$NestSnippet($rtfeldman$elm_css$Css$Structure$Descendant);
var $rtfeldman$elm_css$Html$Styled$details = $rtfeldman$elm_css$Html$Styled$node('details');
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$Css$fontSize = $rtfeldman$elm_css$Css$prop1('font-size');
var $rtfeldman$elm_css$Css$fontWeight = function (_v0) {
	var value = _v0.value;
	return A2($rtfeldman$elm_css$Css$property, 'font-weight', value);
};
var $rtfeldman$elm_css$Css$withPrecedingHash = function (str) {
	return A2($elm$core$String$startsWith, '#', str) ? str : A2(
		$elm$core$String$cons,
		_Utils_chr('#'),
		str);
};
var $rtfeldman$elm_css$Css$erroneousHex = function (str) {
	return {
		alpha: 1,
		blue: 0,
		color: $rtfeldman$elm_css$Css$Structure$Compatible,
		green: 0,
		red: 0,
		value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
	};
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$pow = _Basics_pow;
var $rtfeldman$elm_hex$Hex$fromStringHelp = F3(
	function (position, chars, accumulated) {
		fromStringHelp:
		while (true) {
			if (!chars.b) {
				return $elm$core$Result$Ok(accumulated);
			} else {
				var _char = chars.a;
				var rest = chars.b;
				switch (_char.valueOf()) {
					case '0':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated;
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '1':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + A2($elm$core$Basics$pow, 16, position);
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '2':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (2 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '3':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (3 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '4':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (4 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '5':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (5 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '6':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (6 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '7':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (7 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '8':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (8 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case '9':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (9 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'a':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (10 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'b':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (11 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'c':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (12 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'd':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (13 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'e':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (14 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					case 'f':
						var $temp$position = position - 1,
							$temp$chars = rest,
							$temp$accumulated = accumulated + (15 * A2($elm$core$Basics$pow, 16, position));
						position = $temp$position;
						chars = $temp$chars;
						accumulated = $temp$accumulated;
						continue fromStringHelp;
					default:
						var nonHex = _char;
						return $elm$core$Result$Err(
							$elm$core$String$fromChar(nonHex) + ' is not a valid hexadecimal character.');
				}
			}
		}
	});
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $rtfeldman$elm_hex$Hex$fromString = function (str) {
	if ($elm$core$String$isEmpty(str)) {
		return $elm$core$Result$Err('Empty strings are not valid hexadecimal strings.');
	} else {
		var result = function () {
			if (A2($elm$core$String$startsWith, '-', str)) {
				var list = A2(
					$elm$core$Maybe$withDefault,
					_List_Nil,
					$elm$core$List$tail(
						$elm$core$String$toList(str)));
				return A2(
					$elm$core$Result$map,
					$elm$core$Basics$negate,
					A3(
						$rtfeldman$elm_hex$Hex$fromStringHelp,
						$elm$core$List$length(list) - 1,
						list,
						0));
			} else {
				return A3(
					$rtfeldman$elm_hex$Hex$fromStringHelp,
					$elm$core$String$length(str) - 1,
					$elm$core$String$toList(str),
					0);
			}
		}();
		var formatError = function (err) {
			return A2(
				$elm$core$String$join,
				' ',
				_List_fromArray(
					['\"' + (str + '\"'), 'is not a valid hexadecimal string because', err]));
		};
		return A2($elm$core$Result$mapError, formatError, result);
	}
};
var $elm$core$String$toLower = _String_toLower;
var $rtfeldman$elm_css$Css$validHex = F5(
	function (str, _v0, _v1, _v2, _v3) {
		var r1 = _v0.a;
		var r2 = _v0.b;
		var g1 = _v1.a;
		var g2 = _v1.b;
		var b1 = _v2.a;
		var b2 = _v2.b;
		var a1 = _v3.a;
		var a2 = _v3.b;
		var toResult = A2(
			$elm$core$Basics$composeR,
			$elm$core$String$fromList,
			A2($elm$core$Basics$composeR, $elm$core$String$toLower, $rtfeldman$elm_hex$Hex$fromString));
		var results = _Utils_Tuple2(
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[r1, r2])),
				toResult(
					_List_fromArray(
						[g1, g2]))),
			_Utils_Tuple2(
				toResult(
					_List_fromArray(
						[b1, b2])),
				toResult(
					_List_fromArray(
						[a1, a2]))));
		if ((((results.a.a.$ === 'Ok') && (results.a.b.$ === 'Ok')) && (results.b.a.$ === 'Ok')) && (results.b.b.$ === 'Ok')) {
			var _v5 = results.a;
			var red = _v5.a.a;
			var green = _v5.b.a;
			var _v6 = results.b;
			var blue = _v6.a.a;
			var alpha = _v6.b.a;
			return {
				alpha: alpha / 255,
				blue: blue,
				color: $rtfeldman$elm_css$Css$Structure$Compatible,
				green: green,
				red: red,
				value: $rtfeldman$elm_css$Css$withPrecedingHash(str)
			};
		} else {
			return $rtfeldman$elm_css$Css$erroneousHex(str);
		}
	});
var $rtfeldman$elm_css$Css$hex = function (str) {
	var withoutHash = A2($elm$core$String$startsWith, '#', str) ? A2($elm$core$String$dropLeft, 1, str) : str;
	var _v0 = $elm$core$String$toList(withoutHash);
	_v0$4:
	while (true) {
		if ((_v0.b && _v0.b.b) && _v0.b.b.b) {
			if (!_v0.b.b.b.b) {
				var r = _v0.a;
				var _v1 = _v0.b;
				var g = _v1.a;
				var _v2 = _v1.b;
				var b = _v2.a;
				return A5(
					$rtfeldman$elm_css$Css$validHex,
					str,
					_Utils_Tuple2(r, r),
					_Utils_Tuple2(g, g),
					_Utils_Tuple2(b, b),
					_Utils_Tuple2(
						_Utils_chr('f'),
						_Utils_chr('f')));
			} else {
				if (!_v0.b.b.b.b.b) {
					var r = _v0.a;
					var _v3 = _v0.b;
					var g = _v3.a;
					var _v4 = _v3.b;
					var b = _v4.a;
					var _v5 = _v4.b;
					var a = _v5.a;
					return A5(
						$rtfeldman$elm_css$Css$validHex,
						str,
						_Utils_Tuple2(r, r),
						_Utils_Tuple2(g, g),
						_Utils_Tuple2(b, b),
						_Utils_Tuple2(a, a));
				} else {
					if (_v0.b.b.b.b.b.b) {
						if (!_v0.b.b.b.b.b.b.b) {
							var r1 = _v0.a;
							var _v6 = _v0.b;
							var r2 = _v6.a;
							var _v7 = _v6.b;
							var g1 = _v7.a;
							var _v8 = _v7.b;
							var g2 = _v8.a;
							var _v9 = _v8.b;
							var b1 = _v9.a;
							var _v10 = _v9.b;
							var b2 = _v10.a;
							return A5(
								$rtfeldman$elm_css$Css$validHex,
								str,
								_Utils_Tuple2(r1, r2),
								_Utils_Tuple2(g1, g2),
								_Utils_Tuple2(b1, b2),
								_Utils_Tuple2(
									_Utils_chr('f'),
									_Utils_chr('f')));
						} else {
							if (_v0.b.b.b.b.b.b.b.b && (!_v0.b.b.b.b.b.b.b.b.b)) {
								var r1 = _v0.a;
								var _v11 = _v0.b;
								var r2 = _v11.a;
								var _v12 = _v11.b;
								var g1 = _v12.a;
								var _v13 = _v12.b;
								var g2 = _v13.a;
								var _v14 = _v13.b;
								var b1 = _v14.a;
								var _v15 = _v14.b;
								var b2 = _v15.a;
								var _v16 = _v15.b;
								var a1 = _v16.a;
								var _v17 = _v16.b;
								var a2 = _v17.a;
								return A5(
									$rtfeldman$elm_css$Css$validHex,
									str,
									_Utils_Tuple2(r1, r2),
									_Utils_Tuple2(g1, g2),
									_Utils_Tuple2(b1, b2),
									_Utils_Tuple2(a1, a2));
							} else {
								break _v0$4;
							}
						}
					} else {
						break _v0$4;
					}
				}
			}
		} else {
			break _v0$4;
		}
	}
	return $rtfeldman$elm_css$Css$erroneousHex(str);
};
var $rtfeldman$elm_css$Css$padding = $rtfeldman$elm_css$Css$prop1('padding');
var $rtfeldman$elm_css$Css$paddingBottom = $rtfeldman$elm_css$Css$prop1('padding-bottom');
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $rtfeldman$elm_css$Html$Styled$a = $rtfeldman$elm_css$Html$Styled$node('a');
var $rtfeldman$elm_css$Html$Styled$abbr = $rtfeldman$elm_css$Html$Styled$node('abbr');
var $rtfeldman$elm_css$Html$Styled$address = $rtfeldman$elm_css$Html$Styled$node('address');
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$alt = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('alt');
var $rtfeldman$elm_css$Html$Styled$audio = $rtfeldman$elm_css$Html$Styled$node('audio');
var $rtfeldman$elm_css$Html$Styled$b = $rtfeldman$elm_css$Html$Styled$node('b');
var $rtfeldman$elm_css$Html$Styled$blockquote = $rtfeldman$elm_css$Html$Styled$node('blockquote');
var $rtfeldman$elm_css$Html$Styled$br = $rtfeldman$elm_css$Html$Styled$node('br');
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Html$Styled$caption = $rtfeldman$elm_css$Html$Styled$node('caption');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$checked = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('checked');
var $rtfeldman$elm_css$VirtualDom$Styled$NodeNS = F4(
	function (a, b, c, d) {
		return {$: 'NodeNS', a: a, b: b, c: c, d: d};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$nodeNS = $rtfeldman$elm_css$VirtualDom$Styled$NodeNS;
var $rtfeldman$elm_css$Svg$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$nodeNS('http://www.w3.org/2000/svg');
var $rtfeldman$elm_css$Svg$Styled$circle = $rtfeldman$elm_css$Svg$Styled$node('circle');
var $rtfeldman$elm_css$Html$Styled$cite = $rtfeldman$elm_css$Html$Styled$node('cite');
var $rtfeldman$elm_css$Html$Styled$Attributes$cite = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('cite');
var $rtfeldman$elm_css$Html$Styled$code = $rtfeldman$elm_css$Html$Styled$node('code');
var $rtfeldman$elm_css$Html$Styled$Attributes$cols = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'cols',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Html$Styled$Attributes$controls = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('controls');
var $rtfeldman$elm_css$Svg$Styled$Attributes$cx = $rtfeldman$elm_css$VirtualDom$Styled$attribute('cx');
var $rtfeldman$elm_css$Svg$Styled$Attributes$cy = $rtfeldman$elm_css$VirtualDom$Styled$attribute('cy');
var $rtfeldman$elm_css$Html$Styled$datalist = $rtfeldman$elm_css$Html$Styled$node('datalist');
var $rtfeldman$elm_css$Html$Styled$Attributes$datetime = $rtfeldman$elm_css$VirtualDom$Styled$attribute('datetime');
var $rtfeldman$elm_css$Html$Styled$dd = $rtfeldman$elm_css$Html$Styled$node('dd');
var $rtfeldman$elm_css$Html$Styled$del = $rtfeldman$elm_css$Html$Styled$node('del');
var $rtfeldman$elm_css$Html$Styled$dfn = $rtfeldman$elm_css$Html$Styled$node('dfn');
var $rtfeldman$elm_css$Html$Styled$dl = $rtfeldman$elm_css$Html$Styled$node('dl');
var $rtfeldman$elm_css$Html$Styled$dt = $rtfeldman$elm_css$Html$Styled$node('dt');
var $rtfeldman$elm_css$Html$Styled$em = $rtfeldman$elm_css$Html$Styled$node('em');
var $rtfeldman$elm_css$Html$Styled$figcaption = $rtfeldman$elm_css$Html$Styled$node('figcaption');
var $rtfeldman$elm_css$Html$Styled$figure = $rtfeldman$elm_css$Html$Styled$node('figure');
var $rtfeldman$elm_css$Svg$Styled$Attributes$fill = $rtfeldman$elm_css$VirtualDom$Styled$attribute('fill');
var $rtfeldman$elm_css$Html$Styled$Attributes$for = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('htmlFor');
var $rtfeldman$elm_css$Html$Styled$form = $rtfeldman$elm_css$Html$Styled$node('form');
var $rtfeldman$elm_css$Html$Styled$h1 = $rtfeldman$elm_css$Html$Styled$node('h1');
var $rtfeldman$elm_css$Html$Styled$h2 = $rtfeldman$elm_css$Html$Styled$node('h2');
var $rtfeldman$elm_css$Html$Styled$h3 = $rtfeldman$elm_css$Html$Styled$node('h3');
var $rtfeldman$elm_css$Html$Styled$h4 = $rtfeldman$elm_css$Html$Styled$node('h4');
var $rtfeldman$elm_css$Html$Styled$h5 = $rtfeldman$elm_css$Html$Styled$node('h5');
var $rtfeldman$elm_css$Html$Styled$h6 = $rtfeldman$elm_css$Html$Styled$node('h6');
var $rtfeldman$elm_css$Html$Styled$Attributes$height = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'height',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Svg$Styled$Attributes$height = $rtfeldman$elm_css$VirtualDom$Styled$attribute('height');
var $rtfeldman$elm_css$Html$Styled$hr = $rtfeldman$elm_css$Html$Styled$node('hr');
var $rtfeldman$elm_css$Html$Styled$Attributes$href = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'href', url);
};
var $rtfeldman$elm_css$Html$Styled$i = $rtfeldman$elm_css$Html$Styled$node('i');
var $rtfeldman$elm_css$Html$Styled$Attributes$id = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('id');
var $rtfeldman$elm_css$Html$Styled$iframe = $rtfeldman$elm_css$Html$Styled$node('iframe');
var $rtfeldman$elm_css$Html$Styled$img = $rtfeldman$elm_css$Html$Styled$node('img');
var $rtfeldman$elm_css$Html$Styled$input = $rtfeldman$elm_css$Html$Styled$node('input');
var $rtfeldman$elm_css$Html$Styled$ins = $rtfeldman$elm_css$Html$Styled$node('ins');
var $rtfeldman$elm_css$Html$Styled$kbd = $rtfeldman$elm_css$Html$Styled$node('kbd');
var $rtfeldman$elm_css$Html$Styled$label = $rtfeldman$elm_css$Html$Styled$node('label');
var $rtfeldman$elm_css$Html$Styled$li = $rtfeldman$elm_css$Html$Styled$node('li');
var $rtfeldman$elm_css$Html$Styled$Attributes$list = $rtfeldman$elm_css$VirtualDom$Styled$attribute('list');
var $rtfeldman$elm_css$Html$Styled$mark = $rtfeldman$elm_css$Html$Styled$node('mark');
var $rtfeldman$elm_css$Html$Styled$Attributes$max = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('max');
var $rtfeldman$elm_css$Html$Styled$Attributes$media = $rtfeldman$elm_css$VirtualDom$Styled$attribute('media');
var $rtfeldman$elm_css$Html$Styled$meter = $rtfeldman$elm_css$Html$Styled$node('meter');
var $rtfeldman$elm_css$Html$Styled$Attributes$min = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('min');
var $rtfeldman$elm_css$Html$Styled$Attributes$multiple = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('multiple');
var $rtfeldman$elm_css$Html$Styled$Attributes$name = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('name');
var $rtfeldman$elm_css$Html$Styled$ol = $rtfeldman$elm_css$Html$Styled$node('ol');
var $rtfeldman$elm_css$Html$Styled$optgroup = $rtfeldman$elm_css$Html$Styled$node('optgroup');
var $rtfeldman$elm_css$Html$Styled$option = $rtfeldman$elm_css$Html$Styled$node('option');
var $rtfeldman$elm_css$Html$Styled$p = $rtfeldman$elm_css$Html$Styled$node('p');
var $rtfeldman$elm_css$Html$Styled$Attributes$placeholder = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('placeholder');
var $rtfeldman$elm_css$Html$Styled$pre = $rtfeldman$elm_css$Html$Styled$node('pre');
var $rtfeldman$elm_css$Html$Styled$progress = $rtfeldman$elm_css$Html$Styled$node('progress');
var $rtfeldman$elm_css$Html$Styled$q = $rtfeldman$elm_css$Html$Styled$node('q');
var $rtfeldman$elm_css$Svg$Styled$Attributes$r = $rtfeldman$elm_css$VirtualDom$Styled$attribute('r');
var $rtfeldman$elm_css$Html$Styled$Attributes$rows = function (n) {
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $rtfeldman$elm_css$Html$Styled$s = $rtfeldman$elm_css$Html$Styled$node('s');
var $rtfeldman$elm_css$Html$Styled$samp = $rtfeldman$elm_css$Html$Styled$node('samp');
var $rtfeldman$elm_css$Html$Styled$select = $rtfeldman$elm_css$Html$Styled$node('select');
var $rtfeldman$elm_css$Html$Styled$small = $rtfeldman$elm_css$Html$Styled$node('small');
var $rtfeldman$elm_css$Html$Styled$source = $rtfeldman$elm_css$Html$Styled$node('source');
var $rtfeldman$elm_css$Html$Styled$Attributes$src = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'src', url);
};
var $rtfeldman$elm_css$Html$Styled$strong = $rtfeldman$elm_css$Html$Styled$node('strong');
var $rtfeldman$elm_css$Html$Styled$sub = $rtfeldman$elm_css$Html$Styled$node('sub');
var $rtfeldman$elm_css$Html$Styled$sup = $rtfeldman$elm_css$Html$Styled$node('sup');
var $rtfeldman$elm_css$Svg$Styled$svg = $rtfeldman$elm_css$Svg$Styled$node('svg');
var $rtfeldman$elm_css$Html$Styled$table = $rtfeldman$elm_css$Html$Styled$node('table');
var $rtfeldman$elm_css$Html$Styled$tbody = $rtfeldman$elm_css$Html$Styled$node('tbody');
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $rtfeldman$elm_css$Html$Styled$textarea = $rtfeldman$elm_css$Html$Styled$node('textarea');
var $rtfeldman$elm_css$Html$Styled$tfoot = $rtfeldman$elm_css$Html$Styled$node('tfoot');
var $rtfeldman$elm_css$Html$Styled$thead = $rtfeldman$elm_css$Html$Styled$node('thead');
var $rtfeldman$elm_css$Html$Styled$time = $rtfeldman$elm_css$Html$Styled$node('time');
var $rtfeldman$elm_css$Html$Styled$Attributes$title = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('title');
var $rtfeldman$elm_css$Html$Styled$tr = $rtfeldman$elm_css$Html$Styled$node('tr');
var $rtfeldman$elm_css$Html$Styled$Attributes$type_ = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('type');
var $rtfeldman$elm_css$Html$Styled$u = $rtfeldman$elm_css$Html$Styled$node('u');
var $rtfeldman$elm_css$Html$Styled$ul = $rtfeldman$elm_css$Html$Styled$node('ul');
var $rtfeldman$elm_css$Html$Styled$Attributes$value = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('value');
var $rtfeldman$elm_css$Html$Styled$var = $rtfeldman$elm_css$Html$Styled$node('var');
var $rtfeldman$elm_css$Html$Styled$video = $rtfeldman$elm_css$Html$Styled$node('video');
var $rtfeldman$elm_css$Svg$Styled$Attributes$width = $rtfeldman$elm_css$VirtualDom$Styled$attribute('width');
var $author$project$Data$Tag$render = function (tag) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		function () {
			switch (tag.$) {
				case 'Headings':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h1,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 1')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h2,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 2')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 3')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h4,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 4')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h5,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 5')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h6,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Heading 6')
								]))
						]);
				case 'Paragraphs':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.')
								]))
						]);
				case 'Blockquotes':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$blockquote,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$cite,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$a,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$href('#!')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Said no one, ever.')
												]))
										]))
								]))
						]);
				case 'Address':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$address,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Written by '),
									A2(
									$rtfeldman$elm_css$Html$Styled$a,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$href('mailto:webmaster@example.com')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Jon Doe')
										])),
									$rtfeldman$elm_css$Html$Styled$text('.'),
									A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
									$rtfeldman$elm_css$Html$Styled$text('Visit us at:'),
									A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
									$rtfeldman$elm_css$Html$Styled$text('Example.com'),
									A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
									$rtfeldman$elm_css$Html$Styled$text('Box 564, Disneyland'),
									A2($rtfeldman$elm_css$Html$Styled$br, _List_Nil, _List_Nil),
									$rtfeldman$elm_css$Html$Styled$text('USA')
								]))
						]);
				case 'Lists':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Definition list')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$dl,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$dt,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Definition List Title')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$dd,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This is a definition list division.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Ordered List')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$ol,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$type_('1')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 1')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 2'),
											A2(
											$rtfeldman$elm_css$Html$Styled$ol,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('A')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 1')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 2'),
															A2(
															$rtfeldman$elm_css$Html$Styled$ol,
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Html$Styled$Attributes$type_('a')
																]),
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 1')
																		])),
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 2')
																		])),
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 3')
																		]))
																]))
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 3')
														]))
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 3')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Unordered List')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$ul,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 1')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 2'),
											A2(
											$rtfeldman$elm_css$Html$Styled$ul,
											_List_Nil,
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 1')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 2'),
															A2(
															$rtfeldman$elm_css$Html$Styled$ul,
															_List_Nil,
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 1')
																		])),
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 2')
																		])),
																	A2(
																	$rtfeldman$elm_css$Html$Styled$li,
																	_List_Nil,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Html$Styled$text('List Item 3')
																		]))
																]))
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$li,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('List Item 3')
														]))
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('List Item 3')
										]))
								]))
						]);
				case 'HorizontalRules':
					return _List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$hr, _List_Nil, _List_Nil)
						]);
				case 'TabularData':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$table,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$caption,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Table Caption')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$thead,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$tr,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Table Heading 1'),
													$rtfeldman$elm_css$Html$Styled$text('Table Heading 2'),
													$rtfeldman$elm_css$Html$Styled$text('Table Heading 3'),
													$rtfeldman$elm_css$Html$Styled$text('Table Heading 4'),
													$rtfeldman$elm_css$Html$Styled$text('Table Heading 5')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$tfoot,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$tr,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Table Footer 1'),
													$rtfeldman$elm_css$Html$Styled$text('Table Footer 2'),
													$rtfeldman$elm_css$Html$Styled$text('Table Footer 3'),
													$rtfeldman$elm_css$Html$Styled$text('Table Footer 4'),
													$rtfeldman$elm_css$Html$Styled$text('Table Footer 5')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$tbody,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$tr,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 1'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 2'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 3'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 4'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 5')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$tr,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 1'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 2'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 3'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 4'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 5')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$tr,
											_List_Nil,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 1'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 2'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 3'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 4'),
													$rtfeldman$elm_css$Html$Styled$text('Table Cell 5')
												]))
										]))
								]))
						]);
				case 'Code':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$strong,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Keyboard input:')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' '),
									A2(
									$rtfeldman$elm_css$Html$Styled$kbd,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Cmd')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$strong,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Inline code:')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<div>code</div>')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$strong,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Sample output:')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' '),
									A2(
									$rtfeldman$elm_css$Html$Styled$samp,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This is sample output from a computer program.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h2,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Pre-formatted text')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$pre,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('P R E F O R M A T T E D T E X T\n! " # $ % &amp; \' ( ) * + , - . /\n0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?\n@ A B C D E F G H I J K L M N O\nP Q R S T U V W X Y Z [ \\ ] ^ _\n` a b c d e f g h i j k l m n o\np q r s t u v w x y z { | } ~ ')
								]))
						]);
				case 'InlineElements':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$a,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$href('#!')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This is a text link.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$strong,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Strong is used to indicate strong importance.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$em,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This text has added emphasis.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$b,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('b element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' is stylistically different text from normal text, without any special importance.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$i,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('i element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' is text that is offset from the normal text.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$u,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('u element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' is text with an unarticulated, though explicitly rendered, non-textual annotation.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$del,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This text is deleted')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' and '),
									A2(
									$rtfeldman$elm_css$Html$Styled$ins,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This text is inserted')
										])),
									$rtfeldman$elm_css$Html$Styled$text('.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$s,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This text has a strikethrough.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Superscript'),
									A2(
									$rtfeldman$elm_css$Html$Styled$sup,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('®')
										])),
									$rtfeldman$elm_css$Html$Styled$text('.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Subscript for things like H'),
									A2(
									$rtfeldman$elm_css$Html$Styled$sub,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('2')
										])),
									$rtfeldman$elm_css$Html$Styled$text('O.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$small,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This small text is small for fine print, etc.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Abbreviation: '),
									A2(
									$rtfeldman$elm_css$Html$Styled$abbr,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$title('HyperText Markup Language')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('HTML')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$q,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$cite('https://developer.mozilla.org/en-US/docs/HTML/Element/q')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This text is a short inline quotation.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$cite,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('This is a citation.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$dfn,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('dfn element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' indicates a definition.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$mark,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('mark element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' indicates a highlight.')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The '),
									A2(
									$rtfeldman$elm_css$Html$Styled$var,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('variable element')
										])),
									$rtfeldman$elm_css$Html$Styled$text(', such as '),
									A2(
									$rtfeldman$elm_css$Html$Styled$var,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('x')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' = '),
									A2(
									$rtfeldman$elm_css$Html$Styled$var,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('y.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('The time element: '),
									A2(
									$rtfeldman$elm_css$Html$Styled$time,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$datetime('2013-04-06T12:32+00:00')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('2 weeks ago')
										]))
								]))
						]);
				case 'Images':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Plain '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<img>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$img,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$src('https://placekitten.com/280/280'),
											$rtfeldman$elm_css$Html$Styled$Attributes$alt('Photo of a kitten')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<figure>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element with '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<img>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$figure,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$img,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$src('https://placekitten.com/280/280'),
											$rtfeldman$elm_css$Html$Styled$Attributes$alt('Photo of a kitten')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<figure>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element with '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<img>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' and '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<figcaption>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' elements')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$figure,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$img,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$src('https://placekitten.com/280/280'),
											$rtfeldman$elm_css$Html$Styled$Attributes$alt('Photo of a kitten')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$figcaption,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Here is a caption for this image.')
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$h3,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<figure>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element with a '),
									A2(
									$rtfeldman$elm_css$Html$Styled$code,
									_List_Nil,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<picture>')
										])),
									$rtfeldman$elm_css$Html$Styled$text(' element')
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$figure,
							_List_Nil,
							_List_fromArray(
								[
									A3(
									$rtfeldman$elm_css$Html$Styled$node,
									'picture',
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$source,
											_List_fromArray(
												[
													A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'srcset', 'https://placekitten.com/280/280'),
													$rtfeldman$elm_css$Html$Styled$Attributes$media('(min-width: 280px)')
												]),
											_List_Nil),
											A2(
											$rtfeldman$elm_css$Html$Styled$img,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$src('https://placekitten.com/280/280'),
													$rtfeldman$elm_css$Html$Styled$Attributes$alt('Photo of a kitten')
												]),
											_List_Nil)
										]))
								]))
						]);
				case 'Audio':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$audio,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$controls(true)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('audio')
								]))
						]);
				case 'Video':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$video,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$controls(true)
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('video')
								]))
						]);
				case 'Meter':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$meter,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$value('2'),
									$rtfeldman$elm_css$Html$Styled$Attributes$min('0'),
									$rtfeldman$elm_css$Html$Styled$Attributes$max('10')
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('2 out of 10')
								]))
						]);
				case 'Progress':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$progress,
							_List_Nil,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('progress')
								]))
						]);
				case 'InlineSvg':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Svg$Styled$svg,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Svg$Styled$Attributes$width('100px'),
									$rtfeldman$elm_css$Svg$Styled$Attributes$height('100px')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Svg$Styled$circle,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Svg$Styled$Attributes$cx('100'),
											$rtfeldman$elm_css$Svg$Styled$Attributes$cy('100'),
											$rtfeldman$elm_css$Svg$Styled$Attributes$r('100'),
											$rtfeldman$elm_css$Svg$Styled$Attributes$fill('#1fa3ec')
										]),
									_List_Nil)
								]))
						]);
				case 'IFrames':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$iframe,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$src('index.html'),
									$rtfeldman$elm_css$Html$Styled$Attributes$height(300)
								]),
							_List_Nil)
						]);
				case 'InputFields':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$form,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__text')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Text Input')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__text'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Text Input')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__password')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Password')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__password'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('password'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Type your Password')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__webaddress')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Web Address')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__webaddress'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('url'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('https://yoursite.com')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__emailaddress')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Email Address')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__emailaddress'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('email'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('name@email.com')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__phone')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Phone Number')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__phone'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('tel'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('(999) 999-9999')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__search')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Search')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__search'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('search'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Enter Search Term')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__text2')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('Number Input')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__text2'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('number'),
													$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Enter a Number')
												]),
											_List_Nil)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('input__file')
												]),
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$text('File Input')
												])),
											A2(
											$rtfeldman$elm_css$Html$Styled$input,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$id('input__file'),
													$rtfeldman$elm_css$Html$Styled$Attributes$type_('file')
												]),
											_List_Nil)
										]))
								]))
						]);
				case 'SelectMenus':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('select')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Select')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$select,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$id('select')
										]),
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$optgroup,
											_List_fromArray(
												[
													A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'label', 'Option Group')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option One')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option Two')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option Three')
														]))
												]))
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('select_multiple')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Select (multiple)')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$select,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$id('select_multiple'),
											$rtfeldman$elm_css$Html$Styled$Attributes$multiple(true)
										]),
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$optgroup,
											_List_fromArray(
												[
													A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'label', 'Option Group')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option One')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option Two')
														])),
													A2(
													$rtfeldman$elm_css$Html$Styled$option,
													_List_Nil,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$text('Option Three')
														]))
												]))
										]))
								]))
						]);
				case 'Checkboxes':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$ul,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('checkbox1')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('checkbox1'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('checkbox'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('checkbox'),
															$rtfeldman$elm_css$Html$Styled$Attributes$checked(true)
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Choice A')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('checkbox2')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('checkbox2'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('checkbox'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('checkbox')
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Choice B')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('checkbox3')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('checkbox3'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('checkbox'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('checkbox')
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Choice C')
												]))
										]))
								]))
						]);
				case 'RadioButtons':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$ul,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('radio1')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('radio1'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('radio'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('radio'),
															$rtfeldman$elm_css$Html$Styled$Attributes$checked(true)
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Option 1')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('radio2')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('radio2'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('radio'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('radio')
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Option 2')
												]))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$li,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$label,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$for('radio3')
												]),
											_List_fromArray(
												[
													A2(
													$rtfeldman$elm_css$Html$Styled$input,
													_List_fromArray(
														[
															$rtfeldman$elm_css$Html$Styled$Attributes$id('radio3'),
															$rtfeldman$elm_css$Html$Styled$Attributes$name('radio'),
															$rtfeldman$elm_css$Html$Styled$Attributes$type_('radio')
														]),
													_List_Nil),
													$rtfeldman$elm_css$Html$Styled$text('Option 3')
												]))
										]))
								]))
						]);
				case 'Textareas':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('textarea')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Textarea')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$textarea,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$id('textarea'),
											$rtfeldman$elm_css$Html$Styled$Attributes$rows(8),
											$rtfeldman$elm_css$Html$Styled$Attributes$cols(48),
											$rtfeldman$elm_css$Html$Styled$Attributes$placeholder('Enter your message here')
										]),
									_List_Nil)
								]))
						]);
				case 'Html5Inputs':
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('ic')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Color input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('color'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('ic'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('#000000')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('in')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Number input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('number'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('in'),
											$rtfeldman$elm_css$Html$Styled$Attributes$min('0'),
											$rtfeldman$elm_css$Html$Styled$Attributes$max('10'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('5')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('ir')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Range input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('range'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('ir'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('10')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idd')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Date input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('date'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idd'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('1970-01-01')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idm')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Month input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('month'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idm'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('1970-01')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Week input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('week'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idw'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('1970-W01')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idt')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Datetime input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('datetime'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idt'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('1970-01-01T00:00:00Z')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idtl')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Datetime-local input')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('datetime-local'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idtl'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('1970-01-01T00:00')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$label,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$for('idl')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Datalist')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('text'),
											$rtfeldman$elm_css$Html$Styled$Attributes$id('idl'),
											$rtfeldman$elm_css$Html$Styled$Attributes$list('example-list')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$datalist,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$id('example-list')
										]),
									_List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Html$Styled$option,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$value('Example #1')
												]),
											_List_Nil),
											A2(
											$rtfeldman$elm_css$Html$Styled$option,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$value('Example #2')
												]),
											_List_Nil),
											A2(
											$rtfeldman$elm_css$Html$Styled$option,
											_List_fromArray(
												[
													$rtfeldman$elm_css$Html$Styled$Attributes$value('Example #3')
												]),
											_List_Nil)
										]))
								]))
						]);
				default:
					return _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('submit'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('<input type=submit>')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('<input type=button>')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('reset'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('<input type=reset>')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$input,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('submit'),
											$rtfeldman$elm_css$Html$Styled$Attributes$value('<input disabled>'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'disabled', '')
										]),
									_List_Nil)
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$p,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$button,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('submit')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<button type=submit>')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$button,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('button')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<button type=button>')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$button,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('reset')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<button type=reset>')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$button,
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$Attributes$type_('button'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'disabled', '')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('<button disabled>')
										]))
								]))
						]);
			}
		}());
};
var $rtfeldman$elm_css$Css$Structure$Screen = {$: 'Screen'};
var $rtfeldman$elm_css$Css$Media$screen = $rtfeldman$elm_css$Css$Structure$Screen;
var $rtfeldman$elm_css$Css$solid = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'solid'};
var $rtfeldman$elm_css$Html$Styled$summary = $rtfeldman$elm_css$Html$Styled$node('summary');
var $rtfeldman$elm_css$Css$lineHeight = $rtfeldman$elm_css$Css$prop1('line-height');
var $rtfeldman$elm_css$Css$UnitlessFloat = {$: 'UnitlessFloat'};
var $rtfeldman$elm_css$Css$num = function (val) {
	return {
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessFloat,
		value: $elm$core$String$fromFloat(val)
	};
};
var $y047aka$elm_reset_css$Css$Reset$Destyle$document = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$html(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$num(1.15)),
				A2($rtfeldman$elm_css$Css$property, '-webkit-text-size-adjust', '100%'),
				A2($rtfeldman$elm_css$Css$property, '-webkit-tap-highlight-color', 'transparent')
			]))
	]);
var $rtfeldman$elm_css$Css$auto = {alignItemsOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContentOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'auto'};
var $rtfeldman$elm_css$Css$baseline = $rtfeldman$elm_css$Css$prop1('baseline');
var $rtfeldman$elm_css$Css$borderRadius = $rtfeldman$elm_css$Css$prop1('border-radius');
var $rtfeldman$elm_css$Css$Global$button = $rtfeldman$elm_css$Css$Global$typeSelector('button');
var $rtfeldman$elm_css$Css$color = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'color', c.value);
};
var $rtfeldman$elm_css$Css$cursor = $rtfeldman$elm_css$Css$prop1('cursor');
var $rtfeldman$elm_css$Css$default = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'default'};
var $rtfeldman$elm_css$Css$Global$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v5 = declarations.a.a;
				var firstSelector = _v5.a;
				var otherSelectors = _v5.b;
				var styles = _v5.c;
				var rest = declarations.b;
				return _Utils_ap(
					A2(
						$elm$core$List$cons,
						A2($rtfeldman$elm_css$Css$Global$unwrapSelector, firstSelector, styles),
						otherSelectors),
					$rtfeldman$elm_css$Css$Global$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Global$unwrapSelector = F2(
	function (_v0, styles) {
		var sequence = _v0.a;
		var combinators = _v0.b;
		var mPseudo = _v0.c;
		var unwrapSequenceSelector = F2(
			function (style, s) {
				if (style.$ === 'ExtendSelector') {
					var nestedSelector = style.a;
					var evenMoreNestedStyles = style.b;
					return A3(
						$elm$core$List$foldr,
						unwrapSequenceSelector,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, nestedSelector, s),
						evenMoreNestedStyles);
				} else {
					return s;
				}
			});
		var unwrapCombinatorSelector = F2(
			function (style, cs) {
				if (style.$ === 'NestSnippet') {
					var combinator = style.a;
					var snippets = style.b;
					return A2(
						$elm$core$List$append,
						cs,
						A2(
							$elm$core$List$map,
							function (_v3) {
								var s = _v3.a;
								return _Utils_Tuple2(combinator, s);
							},
							A2(
								$elm$core$List$concatMap,
								A2($elm$core$Basics$composeR, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, $rtfeldman$elm_css$Css$Global$collectSelectors),
								snippets)));
				} else {
					return cs;
				}
			});
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			A3($elm$core$List$foldr, unwrapSequenceSelector, sequence, styles),
			A3($elm$core$List$foldr, unwrapCombinatorSelector, combinators, styles),
			mPseudo);
	});
var $rtfeldman$elm_css$Css$Global$each = F2(
	function (snippetCreators, styles) {
		var selectorsToSnippet = function (selectors) {
			if (!selectors.b) {
				return $rtfeldman$elm_css$Css$Preprocess$Snippet(_List_Nil);
			} else {
				var first = selectors.a;
				var rest = selectors.b;
				return $rtfeldman$elm_css$Css$Preprocess$Snippet(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
							A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, first, rest, styles))
						]));
			}
		};
		return selectorsToSnippet(
			$rtfeldman$elm_css$Css$Global$collectSelectors(
				A2(
					$elm$core$List$concatMap,
					$rtfeldman$elm_css$Css$Preprocess$unwrapSnippet,
					A2(
						$elm$core$List$map,
						$elm$core$Basics$apR(_List_Nil),
						snippetCreators))));
	});
var $rtfeldman$elm_css$Css$Global$fieldset = $rtfeldman$elm_css$Css$Global$typeSelector('fieldset');
var $rtfeldman$elm_css$Css$Internal$IncompatibleUnits = {$: 'IncompatibleUnits'};
var $rtfeldman$elm_css$Css$initial = {alignItems: $rtfeldman$elm_css$Css$Structure$Compatible, all: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundAttachment: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundBlendMode: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundImage: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundOrigin: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeat: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeatShorthand: $rtfeldman$elm_css$Css$Structure$Compatible, borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, color: $rtfeldman$elm_css$Css$Structure$Compatible, cursor: $rtfeldman$elm_css$Css$Structure$Compatible, display: $rtfeldman$elm_css$Css$Structure$Compatible, flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirection: $rtfeldman$elm_css$Css$Structure$Compatible, flexDirectionOrWrap: $rtfeldman$elm_css$Css$Structure$Compatible, flexWrap: $rtfeldman$elm_css$Css$Structure$Compatible, fontFamily: $rtfeldman$elm_css$Css$Structure$Compatible, fontSize: $rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: $rtfeldman$elm_css$Css$Structure$Compatible, fontVariant: $rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, justifyContent: $rtfeldman$elm_css$Css$Structure$Compatible, keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, length: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible, lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible, listStylePosition: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleType: $rtfeldman$elm_css$Css$Structure$Compatible, listStyleTypeOrPositionOrImage: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, number: $rtfeldman$elm_css$Css$Structure$Compatible, numericValue: 0, outline: $rtfeldman$elm_css$Css$Structure$Compatible, overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, tableLayout: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textIndent: $rtfeldman$elm_css$Css$Structure$Compatible, textRendering: $rtfeldman$elm_css$Css$Structure$Compatible, textTransform: $rtfeldman$elm_css$Css$Structure$Compatible, touchAction: $rtfeldman$elm_css$Css$Structure$Compatible, unitLabel: '', units: $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, value: 'initial', visibility: $rtfeldman$elm_css$Css$Structure$Compatible, whiteSpace: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$inherit = _Utils_update(
	$rtfeldman$elm_css$Css$initial,
	{value: 'inherit'});
var $rtfeldman$elm_css$Css$Global$input = $rtfeldman$elm_css$Css$Global$typeSelector('input');
var $rtfeldman$elm_css$Css$Global$legend = $rtfeldman$elm_css$Css$Global$typeSelector('legend');
var $rtfeldman$elm_css$Css$middle = $rtfeldman$elm_css$Css$prop1('middle');
var $rtfeldman$elm_css$Css$minWidth = $rtfeldman$elm_css$Css$prop1('min-width');
var $rtfeldman$elm_css$Css$opacity = $rtfeldman$elm_css$Css$prop1('opacity');
var $rtfeldman$elm_css$Css$Global$optgroup = $rtfeldman$elm_css$Css$Global$typeSelector('optgroup');
var $rtfeldman$elm_css$Css$Global$option = $rtfeldman$elm_css$Css$Global$typeSelector('option');
var $rtfeldman$elm_css$Css$outlineOffset = $rtfeldman$elm_css$Css$prop1('outline-offset');
var $rtfeldman$elm_css$Css$overflow = $rtfeldman$elm_css$Css$prop1('overflow');
var $rtfeldman$elm_css$Css$pointer = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'pointer'};
var $rtfeldman$elm_css$Css$Global$progress = $rtfeldman$elm_css$Css$Global$typeSelector('progress');
var $rtfeldman$elm_css$Css$Global$select = $rtfeldman$elm_css$Css$Global$typeSelector('select');
var $rtfeldman$elm_css$Css$Global$selector = F2(
	function (selectorStr, styles) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
			styles,
			A2($rtfeldman$elm_css$Css$Structure$CustomSelector, selectorStr, _List_Nil));
	});
var $rtfeldman$elm_css$Css$textTransform = $rtfeldman$elm_css$Css$prop1('text-transform');
var $rtfeldman$elm_css$Css$Global$textarea = $rtfeldman$elm_css$Css$Global$typeSelector('textarea');
var $rtfeldman$elm_css$Css$Preprocess$ApplyStyles = function (a) {
	return {$: 'ApplyStyles', a: a};
};
var $rtfeldman$elm_css$Css$Internal$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$Internal$getOverloadedProperty = F3(
	function (functionName, desiredKey, style) {
		getOverloadedProperty:
		while (true) {
			switch (style.$) {
				case 'AppendProperty':
					var str = style.a;
					var key = A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$List$head(
							A2($elm$core$String$split, ':', str)));
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, key);
				case 'ExtendSelector':
					var selector = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-selector'));
				case 'NestSnippet':
					var combinator = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-combinator'));
				case 'WithPseudoElement':
					var pseudoElement = style.a;
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-pseudo-element setter'));
				case 'WithMedia':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-media-query'));
				case 'WithKeyframes':
					return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-inapplicable-Style-for-keyframes'));
				default:
					if (!style.a.b) {
						return A2($rtfeldman$elm_css$Css$Internal$property, desiredKey, 'elm-css-error-cannot-apply-' + (functionName + '-with-empty-Style'));
					} else {
						if (!style.a.b.b) {
							var _v1 = style.a;
							var only = _v1.a;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = only;
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						} else {
							var _v2 = style.a;
							var first = _v2.a;
							var rest = _v2.b;
							var $temp$functionName = functionName,
								$temp$desiredKey = desiredKey,
								$temp$style = $rtfeldman$elm_css$Css$Preprocess$ApplyStyles(rest);
							functionName = $temp$functionName;
							desiredKey = $temp$desiredKey;
							style = $temp$style;
							continue getOverloadedProperty;
						}
					}
			}
		}
	});
var $rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty = A3($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$Internal$IncompatibleUnits, '', 0);
var $rtfeldman$elm_css$Css$verticalAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'verticalAlign',
		'vertical-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $y047aka$elm_reset_css$Css$Reset$Destyle$forms = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$input, $rtfeldman$elm_css$Css$Global$optgroup, $rtfeldman$elm_css$Css$Global$select, $rtfeldman$elm_css$Css$Global$textarea]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none'),
				A2($rtfeldman$elm_css$Css$property, 'appearance', 'none'),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$middle),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit'),
				A2($rtfeldman$elm_css$Css$property, 'background', 'transparent'),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$borderRadius($rtfeldman$elm_css$Css$zero),
				A2($rtfeldman$elm_css$Css$property, 'text-align', 'inherit'),
				$rtfeldman$elm_css$Css$textTransform($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type="checkbox"]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'checkbox'),
				A2($rtfeldman$elm_css$Css$property, 'appearance', 'checkbox')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type="radio"]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'radio'),
				A2($rtfeldman$elm_css$Css$property, 'appearance', 'radio')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$button,
				$rtfeldman$elm_css$Css$Global$selector('[type="button"]'),
				$rtfeldman$elm_css$Css$Global$selector('[type="reset"]'),
				$rtfeldman$elm_css$Css$Global$selector('[type="submit"]')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('button:disabled'),
				$rtfeldman$elm_css$Css$Global$selector('[type="button"]:disabled'),
				$rtfeldman$elm_css$Css$Global$selector('[type="reset"]:disabled'),
				$rtfeldman$elm_css$Css$Global$selector('[type="submit"]:disabled')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':-moz-focusring',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'outline', 'auto')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'select:disabled',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$opacity($rtfeldman$elm_css$Css$inherit)
			])),
		$rtfeldman$elm_css$Css$Global$option(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$fieldset(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$minWidth($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$legend(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$progress(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		$rtfeldman$elm_css$Css$Global$textarea(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('[type="number"]::-webkit-inner-spin-button'),
				$rtfeldman$elm_css$Css$Global$selector('[type="number"]::-webkit-outer-spin-button')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type="search"]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$outlineOffset(
				$rtfeldman$elm_css$Css$px(-2))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type="search"]::-webkit-search-decoration',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-file-upload-button',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button'),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'label[for]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
			]))
	]);
var $rtfeldman$elm_css$Css$borderTopWidth = $rtfeldman$elm_css$Css$prop1('border-top-width');
var $rtfeldman$elm_css$Css$contentBox = {backgroundClip: $rtfeldman$elm_css$Css$Structure$Compatible, boxSizing: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'content-box'};
var $rtfeldman$elm_css$Css$stringsToValue = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				function (s) {
					return s;
				},
				list))
	};
};
var $rtfeldman$elm_css$Css$fontFamilies = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('font-family'),
	$rtfeldman$elm_css$Css$stringsToValue);
var $rtfeldman$elm_css$Css$fontStyle = $rtfeldman$elm_css$Css$prop1('font-style');
var $rtfeldman$elm_css$Css$Global$hr = $rtfeldman$elm_css$Css$Global$typeSelector('hr');
var $rtfeldman$elm_css$Css$monospace = {fontFamily: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'monospace'};
var $rtfeldman$elm_css$Css$Global$pre = $rtfeldman$elm_css$Css$Global$typeSelector('pre');
var $rtfeldman$elm_css$Css$visible = {overflow: $rtfeldman$elm_css$Css$Structure$Compatible, pointerEvents: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'visible', visibility: $rtfeldman$elm_css$Css$Structure$Compatible};
var $y047aka$elm_reset_css$Css$Reset$Destyle$groupingContent = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$hr(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$contentBox),
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$visible),
				$rtfeldman$elm_css$Css$borderTopWidth(
				$rtfeldman$elm_css$Css$px(1)),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				A2($rtfeldman$elm_css$Css$property, 'clear', 'both'),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit)
			])),
		$rtfeldman$elm_css$Css$Global$pre(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'address',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontStyle($rtfeldman$elm_css$Css$inherit)
			]))
	]);
var $rtfeldman$elm_css$Css$Global$h1 = $rtfeldman$elm_css$Css$Global$typeSelector('h1');
var $rtfeldman$elm_css$Css$Global$h2 = $rtfeldman$elm_css$Css$Global$typeSelector('h2');
var $rtfeldman$elm_css$Css$Global$h3 = $rtfeldman$elm_css$Css$Global$typeSelector('h3');
var $rtfeldman$elm_css$Css$Global$h4 = $rtfeldman$elm_css$Css$Global$typeSelector('h4');
var $rtfeldman$elm_css$Css$Global$h5 = $rtfeldman$elm_css$Css$Global$typeSelector('h5');
var $rtfeldman$elm_css$Css$Global$h6 = $rtfeldman$elm_css$Css$Global$typeSelector('h6');
var $y047aka$elm_reset_css$Css$Reset$Destyle$headings = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$h1, $rtfeldman$elm_css$Css$Global$h2, $rtfeldman$elm_css$Css$Global$h3, $rtfeldman$elm_css$Css$Global$h4, $rtfeldman$elm_css$Css$Global$h5, $rtfeldman$elm_css$Css$Global$h6]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $rtfeldman$elm_css$Css$block = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'block'};
var $rtfeldman$elm_css$Css$Global$details = $rtfeldman$elm_css$Css$Global$typeSelector('details');
var $rtfeldman$elm_css$Css$listItem = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'list-item'};
var $rtfeldman$elm_css$Css$Global$summary = $rtfeldman$elm_css$Css$Global$typeSelector('summary');
var $y047aka$elm_reset_css$Css$Reset$Destyle$interactive = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$details(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$summary(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$listItem)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[contenteditable]:focus',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'outline', 'auto')
			]))
	]);
var $rtfeldman$elm_css$Css$Global$dd = $rtfeldman$elm_css$Css$Global$typeSelector('dd');
var $rtfeldman$elm_css$Css$Global$dt = $rtfeldman$elm_css$Css$Global$typeSelector('dt');
var $rtfeldman$elm_css$Css$marginLeft = $rtfeldman$elm_css$Css$prop1('margin-left');
var $y047aka$elm_reset_css$Css$Reset$Destyle$lists_definition = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$dt(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
			])),
		$rtfeldman$elm_css$Css$Global$dd(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$marginLeft($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $rtfeldman$elm_css$Css$listStyle = $rtfeldman$elm_css$Css$prop1('list-style');
var $rtfeldman$elm_css$Css$Global$ol = $rtfeldman$elm_css$Css$Global$typeSelector('ol');
var $rtfeldman$elm_css$Css$Global$ul = $rtfeldman$elm_css$Css$Global$typeSelector('ul');
var $y047aka$elm_reset_css$Css$Reset$Destyle$lists_enumeration = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$ul, $rtfeldman$elm_css$Css$Global$ol]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$listStyle($rtfeldman$elm_css$Css$none)
			]))
	]);
var $rtfeldman$elm_css$Css$bottom = $rtfeldman$elm_css$Css$prop1('bottom');
var $rtfeldman$elm_css$Css$Global$img = $rtfeldman$elm_css$Css$Global$typeSelector('img');
var $rtfeldman$elm_css$Css$Global$svg = $rtfeldman$elm_css$Css$Global$typeSelector('svg');
var $y047aka$elm_reset_css$Css$Reset$Destyle$replacedContent = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$svg,
				$rtfeldman$elm_css$Css$Global$img,
				$rtfeldman$elm_css$Css$Global$typeSelector('embed'),
				$rtfeldman$elm_css$Css$Global$typeSelector('object'),
				$rtfeldman$elm_css$Css$Global$typeSelector('iframe')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$bottom)
			]))
	]);
var $rtfeldman$elm_css$Css$borderStyle = $rtfeldman$elm_css$Css$prop1('border-style');
var $rtfeldman$elm_css$Css$borderWidth = $rtfeldman$elm_css$Css$prop1('border-width');
var $y047aka$elm_reset_css$Css$Reset$Destyle$resetBoxModelAndSetBorders = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$everything,
				$rtfeldman$elm_css$Css$Global$selector('::before'),
				$rtfeldman$elm_css$Css$Global$selector('::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$solid),
				$rtfeldman$elm_css$Css$borderWidth($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $rtfeldman$elm_css$Css$Global$main_ = $rtfeldman$elm_css$Css$Global$typeSelector('main');
var $y047aka$elm_reset_css$Css$Reset$Destyle$sections = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$body(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$main_(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			]))
	]);
var $rtfeldman$elm_css$Css$borderColor = function (c) {
	return A2($rtfeldman$elm_css$Css$property, 'border-color', c.value);
};
var $rtfeldman$elm_css$Css$Global$caption = $rtfeldman$elm_css$Css$Global$typeSelector('caption');
var $rtfeldman$elm_css$Css$left = $rtfeldman$elm_css$Css$prop1('left');
var $rtfeldman$elm_css$Css$Global$table = $rtfeldman$elm_css$Css$Global$typeSelector('table');
var $rtfeldman$elm_css$Css$Global$td = $rtfeldman$elm_css$Css$Global$typeSelector('td');
var $rtfeldman$elm_css$Css$textAlign = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'textAlign',
		'text-align',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $rtfeldman$elm_css$Css$Global$th = $rtfeldman$elm_css$Css$Global$typeSelector('th');
var $rtfeldman$elm_css$Css$top = $rtfeldman$elm_css$Css$prop1('top');
var $y047aka$elm_reset_css$Css$Reset$Destyle$table = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$table(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderColor($rtfeldman$elm_css$Css$inherit)
			])),
		$rtfeldman$elm_css$Css$Global$caption(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$left)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$td, $rtfeldman$elm_css$Css$Global$th]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$top),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$th(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textAlign($rtfeldman$elm_css$Css$left),
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
			]))
	]);
var $rtfeldman$elm_css$Css$Global$a = $rtfeldman$elm_css$Css$Global$typeSelector('a');
var $rtfeldman$elm_css$Css$bolder = {fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'bolder'};
var $rtfeldman$elm_css$Css$Global$code = $rtfeldman$elm_css$Css$Global$typeSelector('code');
var $rtfeldman$elm_css$Css$dotted = {borderStyle: $rtfeldman$elm_css$Css$Structure$Compatible, textDecorationStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'dotted'};
var $rtfeldman$elm_css$Css$EmUnits = {$: 'EmUnits'};
var $rtfeldman$elm_css$Css$em = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$EmUnits, 'em');
var $rtfeldman$elm_css$Css$relative = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'relative'};
var $rtfeldman$elm_css$Css$Global$small = $rtfeldman$elm_css$Css$Global$typeSelector('small');
var $rtfeldman$elm_css$Css$Global$strong = $rtfeldman$elm_css$Css$Global$typeSelector('strong');
var $rtfeldman$elm_css$Css$textDecoration = $rtfeldman$elm_css$Css$prop1('text-decoration');
var $rtfeldman$elm_css$Css$textDecoration2 = $rtfeldman$elm_css$Css$prop2('text-decoration');
var $rtfeldman$elm_css$Css$transparent = {color: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'transparent'};
var $rtfeldman$elm_css$Css$underline = {textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'underline'};
var $y047aka$elm_reset_css$Css$Reset$Destyle$textLevelSemantics = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$a(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent),
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$none),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'abbr[title]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$textDecoration2, $rtfeldman$elm_css$Css$underline, $rtfeldman$elm_css$Css$dotted)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('b'),
				$rtfeldman$elm_css$Css$Global$strong
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bolder)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$code,
				$rtfeldman$elm_css$Css$Global$typeSelector('kbd'),
				$rtfeldman$elm_css$Css$Global$typeSelector('samp')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize($rtfeldman$elm_css$Css$inherit)
			])),
		$rtfeldman$elm_css$Css$Global$small(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(80))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('sub'),
				$rtfeldman$elm_css$Css$Global$typeSelector('sup')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(75)),
				$rtfeldman$elm_css$Css$lineHeight($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sub',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$bottom(
				$rtfeldman$elm_css$Css$em(-0.25))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sup',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$top(
				$rtfeldman$elm_css$Css$em(-0.5))
			]))
	]);
var $rtfeldman$elm_css$Css$Global$blockquote = $rtfeldman$elm_css$Css$Global$typeSelector('blockquote');
var $rtfeldman$elm_css$Css$Global$dl = $rtfeldman$elm_css$Css$Global$typeSelector('dl');
var $rtfeldman$elm_css$Css$Global$form = $rtfeldman$elm_css$Css$Global$typeSelector('form');
var $rtfeldman$elm_css$Css$Global$p = $rtfeldman$elm_css$Css$Global$typeSelector('p');
var $y047aka$elm_reset_css$Css$Reset$Destyle$verticalRhythm = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$p,
				$rtfeldman$elm_css$Css$Global$table,
				$rtfeldman$elm_css$Css$Global$blockquote,
				$rtfeldman$elm_css$Css$Global$typeSelector('address'),
				$rtfeldman$elm_css$Css$Global$pre,
				$rtfeldman$elm_css$Css$Global$typeSelector('iframe'),
				$rtfeldman$elm_css$Css$Global$form,
				$rtfeldman$elm_css$Css$Global$typeSelector('figure'),
				$rtfeldman$elm_css$Css$Global$dl
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Destyle$snippets = $elm$core$List$concat(
	_List_fromArray(
		[$y047aka$elm_reset_css$Css$Reset$Destyle$resetBoxModelAndSetBorders, $y047aka$elm_reset_css$Css$Reset$Destyle$document, $y047aka$elm_reset_css$Css$Reset$Destyle$sections, $y047aka$elm_reset_css$Css$Reset$Destyle$verticalRhythm, $y047aka$elm_reset_css$Css$Reset$Destyle$headings, $y047aka$elm_reset_css$Css$Reset$Destyle$lists_enumeration, $y047aka$elm_reset_css$Css$Reset$Destyle$lists_definition, $y047aka$elm_reset_css$Css$Reset$Destyle$groupingContent, $y047aka$elm_reset_css$Css$Reset$Destyle$textLevelSemantics, $y047aka$elm_reset_css$Css$Reset$Destyle$replacedContent, $y047aka$elm_reset_css$Css$Reset$Destyle$forms, $y047aka$elm_reset_css$Css$Reset$Destyle$interactive, $y047aka$elm_reset_css$Css$Reset$Destyle$table]));
var $y047aka$elm_reset_css$Css$Reset$destyle = $y047aka$elm_reset_css$Css$Reset$Destyle$snippets;
var $rtfeldman$elm_css$Css$Global$article = $rtfeldman$elm_css$Css$Global$typeSelector('article');
var $rtfeldman$elm_css$Css$Global$aside = $rtfeldman$elm_css$Css$Global$typeSelector('aside');
var $rtfeldman$elm_css$Css$Global$audio = $rtfeldman$elm_css$Css$Global$typeSelector('audio');
var $rtfeldman$elm_css$Css$border = $rtfeldman$elm_css$Css$prop1('border');
var $rtfeldman$elm_css$Css$borderCollapse = $rtfeldman$elm_css$Css$prop1('border-collapse');
var $rtfeldman$elm_css$Css$borderSpacing = $rtfeldman$elm_css$Css$prop1('border-spacing');
var $rtfeldman$elm_css$Css$Global$canvas = $rtfeldman$elm_css$Css$Global$typeSelector('canvas');
var $rtfeldman$elm_css$Css$collapse = {borderCollapse: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'collapse', visibility: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$Global$em = $rtfeldman$elm_css$Css$Global$typeSelector('em');
var $rtfeldman$elm_css$Css$Global$footer = $rtfeldman$elm_css$Css$Global$typeSelector('footer');
var $rtfeldman$elm_css$Css$Global$header = $rtfeldman$elm_css$Css$Global$typeSelector('header');
var $rtfeldman$elm_css$Css$Global$i = $rtfeldman$elm_css$Css$Global$typeSelector('i');
var $rtfeldman$elm_css$Css$int = function (val) {
	return {
		fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible,
		intOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
		lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
		number: $rtfeldman$elm_css$Css$Structure$Compatible,
		numberOrInfinite: $rtfeldman$elm_css$Css$Structure$Compatible,
		numericValue: val,
		unitLabel: '',
		units: $rtfeldman$elm_css$Css$UnitlessInteger,
		value: $elm$core$String$fromInt(val)
	};
};
var $rtfeldman$elm_css$Css$Global$label = $rtfeldman$elm_css$Css$Global$typeSelector('label');
var $rtfeldman$elm_css$Css$Global$li = $rtfeldman$elm_css$Css$Global$typeSelector('li');
var $rtfeldman$elm_css$Css$Global$menu = $rtfeldman$elm_css$Css$Global$typeSelector('menu');
var $rtfeldman$elm_css$Css$Global$nav = $rtfeldman$elm_css$Css$Global$typeSelector('nav');
var $rtfeldman$elm_css$Css$Global$q = $rtfeldman$elm_css$Css$Global$typeSelector('q');
var $rtfeldman$elm_css$Css$Global$section = $rtfeldman$elm_css$Css$Global$typeSelector('section');
var $rtfeldman$elm_css$Css$Global$span = $rtfeldman$elm_css$Css$Global$typeSelector('span');
var $rtfeldman$elm_css$Css$Global$tbody = $rtfeldman$elm_css$Css$Global$typeSelector('tbody');
var $rtfeldman$elm_css$Css$Global$tfoot = $rtfeldman$elm_css$Css$Global$typeSelector('tfoot');
var $rtfeldman$elm_css$Css$Global$thead = $rtfeldman$elm_css$Css$Global$typeSelector('thead');
var $rtfeldman$elm_css$Css$Global$time = $rtfeldman$elm_css$Css$Global$typeSelector('time');
var $rtfeldman$elm_css$Css$Global$tr = $rtfeldman$elm_css$Css$Global$typeSelector('tr');
var $rtfeldman$elm_css$Css$Global$video = $rtfeldman$elm_css$Css$Global$typeSelector('video');
var $y047aka$elm_reset_css$Css$Reset$EricMeyer$snippets = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$html,
				$rtfeldman$elm_css$Css$Global$body,
				$rtfeldman$elm_css$Css$Global$div,
				$rtfeldman$elm_css$Css$Global$span,
				$rtfeldman$elm_css$Css$Global$typeSelector('applet'),
				$rtfeldman$elm_css$Css$Global$typeSelector('object'),
				$rtfeldman$elm_css$Css$Global$typeSelector('iframe'),
				$rtfeldman$elm_css$Css$Global$h1,
				$rtfeldman$elm_css$Css$Global$h2,
				$rtfeldman$elm_css$Css$Global$h3,
				$rtfeldman$elm_css$Css$Global$h4,
				$rtfeldman$elm_css$Css$Global$h5,
				$rtfeldman$elm_css$Css$Global$h6,
				$rtfeldman$elm_css$Css$Global$p,
				$rtfeldman$elm_css$Css$Global$blockquote,
				$rtfeldman$elm_css$Css$Global$pre,
				$rtfeldman$elm_css$Css$Global$a,
				$rtfeldman$elm_css$Css$Global$typeSelector('abbr'),
				$rtfeldman$elm_css$Css$Global$typeSelector('acronym'),
				$rtfeldman$elm_css$Css$Global$typeSelector('address'),
				$rtfeldman$elm_css$Css$Global$typeSelector('big'),
				$rtfeldman$elm_css$Css$Global$typeSelector('cite'),
				$rtfeldman$elm_css$Css$Global$code,
				$rtfeldman$elm_css$Css$Global$typeSelector('del'),
				$rtfeldman$elm_css$Css$Global$typeSelector('dfn'),
				$rtfeldman$elm_css$Css$Global$em,
				$rtfeldman$elm_css$Css$Global$img,
				$rtfeldman$elm_css$Css$Global$typeSelector('ins'),
				$rtfeldman$elm_css$Css$Global$typeSelector('kbd'),
				$rtfeldman$elm_css$Css$Global$q,
				$rtfeldman$elm_css$Css$Global$typeSelector('s'),
				$rtfeldman$elm_css$Css$Global$typeSelector('samp'),
				$rtfeldman$elm_css$Css$Global$small,
				$rtfeldman$elm_css$Css$Global$typeSelector('strike'),
				$rtfeldman$elm_css$Css$Global$strong,
				$rtfeldman$elm_css$Css$Global$typeSelector('sub'),
				$rtfeldman$elm_css$Css$Global$typeSelector('sup'),
				$rtfeldman$elm_css$Css$Global$typeSelector('tt'),
				$rtfeldman$elm_css$Css$Global$typeSelector('var'),
				$rtfeldman$elm_css$Css$Global$typeSelector('b'),
				$rtfeldman$elm_css$Css$Global$typeSelector('u'),
				$rtfeldman$elm_css$Css$Global$i,
				$rtfeldman$elm_css$Css$Global$typeSelector('center'),
				$rtfeldman$elm_css$Css$Global$dl,
				$rtfeldman$elm_css$Css$Global$dt,
				$rtfeldman$elm_css$Css$Global$dd,
				$rtfeldman$elm_css$Css$Global$ol,
				$rtfeldman$elm_css$Css$Global$ul,
				$rtfeldman$elm_css$Css$Global$li,
				$rtfeldman$elm_css$Css$Global$fieldset,
				$rtfeldman$elm_css$Css$Global$form,
				$rtfeldman$elm_css$Css$Global$label,
				$rtfeldman$elm_css$Css$Global$legend,
				$rtfeldman$elm_css$Css$Global$table,
				$rtfeldman$elm_css$Css$Global$caption,
				$rtfeldman$elm_css$Css$Global$tbody,
				$rtfeldman$elm_css$Css$Global$tfoot,
				$rtfeldman$elm_css$Css$Global$thead,
				$rtfeldman$elm_css$Css$Global$tr,
				$rtfeldman$elm_css$Css$Global$th,
				$rtfeldman$elm_css$Css$Global$td,
				$rtfeldman$elm_css$Css$Global$article,
				$rtfeldman$elm_css$Css$Global$aside,
				$rtfeldman$elm_css$Css$Global$canvas,
				$rtfeldman$elm_css$Css$Global$details,
				$rtfeldman$elm_css$Css$Global$typeSelector('embed'),
				$rtfeldman$elm_css$Css$Global$typeSelector('figure'),
				$rtfeldman$elm_css$Css$Global$typeSelector('figcaption'),
				$rtfeldman$elm_css$Css$Global$footer,
				$rtfeldman$elm_css$Css$Global$header,
				$rtfeldman$elm_css$Css$Global$typeSelector('hgroup'),
				$rtfeldman$elm_css$Css$Global$menu,
				$rtfeldman$elm_css$Css$Global$nav,
				$rtfeldman$elm_css$Css$Global$typeSelector('output'),
				$rtfeldman$elm_css$Css$Global$typeSelector('ruby'),
				$rtfeldman$elm_css$Css$Global$section,
				$rtfeldman$elm_css$Css$Global$summary,
				$rtfeldman$elm_css$Css$Global$time,
				$rtfeldman$elm_css$Css$Global$typeSelector('mark'),
				$rtfeldman$elm_css$Css$Global$audio,
				$rtfeldman$elm_css$Css$Global$video
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(100)),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit'),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$article,
				$rtfeldman$elm_css$Css$Global$aside,
				$rtfeldman$elm_css$Css$Global$details,
				$rtfeldman$elm_css$Css$Global$typeSelector('figcaption'),
				$rtfeldman$elm_css$Css$Global$typeSelector('figure'),
				$rtfeldman$elm_css$Css$Global$footer,
				$rtfeldman$elm_css$Css$Global$header,
				$rtfeldman$elm_css$Css$Global$typeSelector('hgroup'),
				$rtfeldman$elm_css$Css$Global$menu,
				$rtfeldman$elm_css$Css$Global$nav,
				$rtfeldman$elm_css$Css$Global$section
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$body(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$int(1))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$ol, $rtfeldman$elm_css$Css$Global$ul]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$listStyle($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$blockquote, $rtfeldman$elm_css$Css$Global$q]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'quotes', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('blockquote:before'),
				$rtfeldman$elm_css$Css$Global$selector('blockquote:after'),
				$rtfeldman$elm_css$Css$Global$selector('q:before'),
				$rtfeldman$elm_css$Css$Global$selector('q:after')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
				A2($rtfeldman$elm_css$Css$property, 'content', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'table',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse),
				$rtfeldman$elm_css$Css$borderSpacing($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$ericMeyer = $y047aka$elm_reset_css$Css$Reset$EricMeyer$snippets;
var $rtfeldman$elm_css$Css$borderBottom2 = $rtfeldman$elm_css$Css$prop2('border-bottom');
var $rtfeldman$elm_css$Css$borderTop3 = $rtfeldman$elm_css$Css$prop3('border-top');
var $rtfeldman$elm_css$Css$help = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'help'};
var $rtfeldman$elm_css$Css$italic = {fontStyle: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'italic'};
var $rtfeldman$elm_css$Css$lineThrough = {textDecorationLine: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'line-through'};
var $rtfeldman$elm_css$Css$margin2 = $rtfeldman$elm_css$Css$prop2('margin');
var $rtfeldman$elm_css$Css$outline = $rtfeldman$elm_css$Css$prop1('outline');
var $y047aka$elm_reset_css$Css$Reset$Html5Doctor$snippets = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$html,
				$rtfeldman$elm_css$Css$Global$body,
				$rtfeldman$elm_css$Css$Global$div,
				$rtfeldman$elm_css$Css$Global$span,
				$rtfeldman$elm_css$Css$Global$typeSelector('object'),
				$rtfeldman$elm_css$Css$Global$typeSelector('iframe'),
				$rtfeldman$elm_css$Css$Global$h1,
				$rtfeldman$elm_css$Css$Global$h2,
				$rtfeldman$elm_css$Css$Global$h3,
				$rtfeldman$elm_css$Css$Global$h4,
				$rtfeldman$elm_css$Css$Global$h5,
				$rtfeldman$elm_css$Css$Global$h6,
				$rtfeldman$elm_css$Css$Global$p,
				$rtfeldman$elm_css$Css$Global$blockquote,
				$rtfeldman$elm_css$Css$Global$pre,
				$rtfeldman$elm_css$Css$Global$typeSelector('abbr'),
				$rtfeldman$elm_css$Css$Global$typeSelector('address'),
				$rtfeldman$elm_css$Css$Global$typeSelector('cite'),
				$rtfeldman$elm_css$Css$Global$code,
				$rtfeldman$elm_css$Css$Global$typeSelector('del'),
				$rtfeldman$elm_css$Css$Global$typeSelector('dfn'),
				$rtfeldman$elm_css$Css$Global$em,
				$rtfeldman$elm_css$Css$Global$img,
				$rtfeldman$elm_css$Css$Global$typeSelector('ins'),
				$rtfeldman$elm_css$Css$Global$typeSelector('kbd'),
				$rtfeldman$elm_css$Css$Global$q,
				$rtfeldman$elm_css$Css$Global$typeSelector('samp'),
				$rtfeldman$elm_css$Css$Global$small,
				$rtfeldman$elm_css$Css$Global$strong,
				$rtfeldman$elm_css$Css$Global$typeSelector('sub'),
				$rtfeldman$elm_css$Css$Global$typeSelector('sup'),
				$rtfeldman$elm_css$Css$Global$typeSelector('var'),
				$rtfeldman$elm_css$Css$Global$typeSelector('b'),
				$rtfeldman$elm_css$Css$Global$i,
				$rtfeldman$elm_css$Css$Global$dl,
				$rtfeldman$elm_css$Css$Global$dt,
				$rtfeldman$elm_css$Css$Global$dd,
				$rtfeldman$elm_css$Css$Global$ol,
				$rtfeldman$elm_css$Css$Global$ul,
				$rtfeldman$elm_css$Css$Global$li,
				$rtfeldman$elm_css$Css$Global$fieldset,
				$rtfeldman$elm_css$Css$Global$form,
				$rtfeldman$elm_css$Css$Global$label,
				$rtfeldman$elm_css$Css$Global$legend,
				$rtfeldman$elm_css$Css$Global$table,
				$rtfeldman$elm_css$Css$Global$caption,
				$rtfeldman$elm_css$Css$Global$tbody,
				$rtfeldman$elm_css$Css$Global$tfoot,
				$rtfeldman$elm_css$Css$Global$thead,
				$rtfeldman$elm_css$Css$Global$tr,
				$rtfeldman$elm_css$Css$Global$th,
				$rtfeldman$elm_css$Css$Global$td,
				$rtfeldman$elm_css$Css$Global$article,
				$rtfeldman$elm_css$Css$Global$aside,
				$rtfeldman$elm_css$Css$Global$canvas,
				$rtfeldman$elm_css$Css$Global$details,
				$rtfeldman$elm_css$Css$Global$typeSelector('figcaption'),
				$rtfeldman$elm_css$Css$Global$typeSelector('figure'),
				$rtfeldman$elm_css$Css$Global$footer,
				$rtfeldman$elm_css$Css$Global$header,
				$rtfeldman$elm_css$Css$Global$typeSelector('hgroup'),
				$rtfeldman$elm_css$Css$Global$menu,
				$rtfeldman$elm_css$Css$Global$nav,
				$rtfeldman$elm_css$Css$Global$section,
				$rtfeldman$elm_css$Css$Global$summary,
				$rtfeldman$elm_css$Css$Global$time,
				$rtfeldman$elm_css$Css$Global$typeSelector('mark'),
				$rtfeldman$elm_css$Css$Global$audio,
				$rtfeldman$elm_css$Css$Global$video
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$outline($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(100)),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline),
				A2($rtfeldman$elm_css$Css$property, 'background', 'transparent')
			])),
		$rtfeldman$elm_css$Css$Global$body(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$int(1))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$article,
				$rtfeldman$elm_css$Css$Global$aside,
				$rtfeldman$elm_css$Css$Global$details,
				$rtfeldman$elm_css$Css$Global$typeSelector('figcaption'),
				$rtfeldman$elm_css$Css$Global$typeSelector('figure'),
				$rtfeldman$elm_css$Css$Global$footer,
				$rtfeldman$elm_css$Css$Global$header,
				$rtfeldman$elm_css$Css$Global$typeSelector('hgroup'),
				$rtfeldman$elm_css$Css$Global$menu,
				$rtfeldman$elm_css$Css$Global$nav,
				$rtfeldman$elm_css$Css$Global$section
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$nav(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$descendants(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$Global$ul(
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$listStyle($rtfeldman$elm_css$Css$none)
							]))
					]))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$blockquote, $rtfeldman$elm_css$Css$Global$q]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'quotes', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('blockquote:before'),
				$rtfeldman$elm_css$Css$Global$selector('blockquote:after'),
				$rtfeldman$elm_css$Css$Global$selector('q:before'),
				$rtfeldman$elm_css$Css$Global$selector('q:after')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
				A2($rtfeldman$elm_css$Css$property, 'content', 'none')
			])),
		$rtfeldman$elm_css$Css$Global$a(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(100)),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline),
				A2($rtfeldman$elm_css$Css$property, 'background', 'transparent')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'ins',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor(
				$rtfeldman$elm_css$Css$hex('#ff9')),
				$rtfeldman$elm_css$Css$color(
				$rtfeldman$elm_css$Css$hex('#000')),
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'mark',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor(
				$rtfeldman$elm_css$Css$hex('#ff9')),
				$rtfeldman$elm_css$Css$color(
				$rtfeldman$elm_css$Css$hex('#000')),
				$rtfeldman$elm_css$Css$fontStyle($rtfeldman$elm_css$Css$italic),
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'del',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$lineThrough)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('abbr[title]'),
				$rtfeldman$elm_css$Css$Global$selector('dfn[title]')
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Css$borderBottom2,
				$rtfeldman$elm_css$Css$px(1),
				$rtfeldman$elm_css$Css$dotted),
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$help)
			])),
		$rtfeldman$elm_css$Css$Global$table(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse),
				$rtfeldman$elm_css$Css$borderSpacing($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$hr(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block),
				$rtfeldman$elm_css$Css$height(
				$rtfeldman$elm_css$Css$px(1)),
				$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
				A3(
				$rtfeldman$elm_css$Css$borderTop3,
				$rtfeldman$elm_css$Css$px(1),
				$rtfeldman$elm_css$Css$solid,
				$rtfeldman$elm_css$Css$hex('#cccccc')),
				A2(
				$rtfeldman$elm_css$Css$margin2,
				$rtfeldman$elm_css$Css$em(1),
				$rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$input, $rtfeldman$elm_css$Css$Global$select]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$middle)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$html5Doctor = $y047aka$elm_reset_css$Css$Reset$Html5Doctor$snippets;
var $y047aka$elm_reset_css$Css$Reset$Normalize$document = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$html(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$num(1.15)),
				A2($rtfeldman$elm_css$Css$property, '-webkit-text-size-adjust', '100%')
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$embeddedContent = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$img(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none)
			]))
	]);
var $rtfeldman$elm_css$Css$fontFamily = $rtfeldman$elm_css$Css$prop1('font-family');
var $rtfeldman$elm_css$Css$maxWidth = $rtfeldman$elm_css$Css$prop1('max-width');
var $rtfeldman$elm_css$Css$normal = {featureTagValue: $rtfeldman$elm_css$Css$Structure$Compatible, fontStyle: $rtfeldman$elm_css$Css$Structure$Compatible, fontWeight: $rtfeldman$elm_css$Css$Structure$Compatible, overflowWrap: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'normal', whiteSpace: $rtfeldman$elm_css$Css$Structure$Compatible};
var $rtfeldman$elm_css$Css$padding3 = $rtfeldman$elm_css$Css$prop3('padding');
var $rtfeldman$elm_css$Css$table = {display: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'table'};
var $rtfeldman$elm_css$Css$whiteSpace = $rtfeldman$elm_css$Css$prop1('white-space');
var $y047aka$elm_reset_css$Css$Reset$Normalize$forms = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$input, $rtfeldman$elm_css$Css$Global$optgroup, $rtfeldman$elm_css$Css$Global$select, $rtfeldman$elm_css$Css$Global$textarea]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamily($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(100)),
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$num(1.15)),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$input]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$visible)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$select]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'text-transform', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$button,
				$rtfeldman$elm_css$Css$Global$selector('[type=\"button\"]'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"reset\"]'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"submit\"]')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('button::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"button\"]::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"reset\"]::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"submit\"]::-moz-focus-inner')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('button:-moz-focusring'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"button\"]:-moz-focusring'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"reset\"]:-moz-focusring'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"submit\"]:-moz-focusring')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'outline', '1px dotted ButtonText')
			])),
		$rtfeldman$elm_css$Css$Global$fieldset(
		_List_fromArray(
			[
				A3(
				$rtfeldman$elm_css$Css$padding3,
				$rtfeldman$elm_css$Css$em(0.35),
				$rtfeldman$elm_css$Css$em(0.75),
				$rtfeldman$elm_css$Css$em(0.625))
			])),
		$rtfeldman$elm_css$Css$Global$legend(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$table),
				$rtfeldman$elm_css$Css$maxWidth(
				$rtfeldman$elm_css$Css$pct(100)),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$normal)
			])),
		$rtfeldman$elm_css$Css$Global$progress(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		$rtfeldman$elm_css$Css$Global$textarea(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('[type=\"checkbox\"]'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"radio\"]')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('[type=\"number\"]::-webkit-inner-spin-button'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\"number\"]::-webkit-outer-spin-button')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type=\"search\"]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'textfield'),
				$rtfeldman$elm_css$Css$outlineOffset(
				$rtfeldman$elm_css$Css$px(-2))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type=\"search\"]::-webkit-search-decoration',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-file-upload-button',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button'),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit')
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$groupingContent = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$hr(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$contentBox),
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$visible)
			])),
		$rtfeldman$elm_css$Css$Global$pre(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1))
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$interactive = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$details(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$summary(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$listItem)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$misc = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'template',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[hidden]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$sections = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$body(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$main_(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$h1(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(2)),
				A2(
				$rtfeldman$elm_css$Css$margin2,
				$rtfeldman$elm_css$Css$em(0.67),
				$rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$textLevelSemantics = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$a(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'abbr[title]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'border-bottom', 'none'),
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$underline),
				A2($rtfeldman$elm_css$Css$textDecoration2, $rtfeldman$elm_css$Css$underline, $rtfeldman$elm_css$Css$dotted)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('b'),
				$rtfeldman$elm_css$Css$Global$strong
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bolder)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$code,
				$rtfeldman$elm_css$Css$Global$typeSelector('kbd'),
				$rtfeldman$elm_css$Css$Global$typeSelector('samp')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1))
			])),
		$rtfeldman$elm_css$Css$Global$small(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(80))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('sub'),
				$rtfeldman$elm_css$Css$Global$typeSelector('sup')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(75)),
				$rtfeldman$elm_css$Css$lineHeight($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sub',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$bottom(
				$rtfeldman$elm_css$Css$em(-0.25))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sup',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$top(
				$rtfeldman$elm_css$Css$em(-0.5))
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Normalize$snippets = $elm$core$List$concat(
	_List_fromArray(
		[$y047aka$elm_reset_css$Css$Reset$Normalize$document, $y047aka$elm_reset_css$Css$Reset$Normalize$sections, $y047aka$elm_reset_css$Css$Reset$Normalize$groupingContent, $y047aka$elm_reset_css$Css$Reset$Normalize$textLevelSemantics, $y047aka$elm_reset_css$Css$Reset$Normalize$embeddedContent, $y047aka$elm_reset_css$Css$Reset$Normalize$forms, $y047aka$elm_reset_css$Css$Reset$Normalize$interactive, $y047aka$elm_reset_css$Css$Reset$Normalize$misc]));
var $y047aka$elm_reset_css$Css$Reset$normalize = $y047aka$elm_reset_css$Css$Reset$Normalize$snippets;
var $rtfeldman$elm_css$Css$progress = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'progress'};
var $y047aka$elm_reset_css$Css$Reset$Ress$accessibility = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[aria-busy=\'true\']',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$progress)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[aria-controls]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[aria-disabled=\'true\']',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default)
			]))
	]);
var $rtfeldman$elm_css$Css$currentColor = {color: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'currentColor'};
var $rtfeldman$elm_css$Css$outlineWidth = $rtfeldman$elm_css$Css$prop1('outline-width');
var $rtfeldman$elm_css$Css$Structure$PseudoElement = function (a) {
	return {$: 'PseudoElement', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$WithPseudoElement = F2(
	function (a, b) {
		return {$: 'WithPseudoElement', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$pseudoElement = function (element) {
	return $rtfeldman$elm_css$Css$Preprocess$WithPseudoElement(
		$rtfeldman$elm_css$Css$Structure$PseudoElement(element));
};
var $rtfeldman$elm_css$Css$resize = $rtfeldman$elm_css$Css$prop1('resize');
var $rtfeldman$elm_css$Css$vertical = {resize: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'vertical'};
var $y047aka$elm_reset_css$Css$Reset$Ress$forms = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$input(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderRadius($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[disabled]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('[type=\'number\']::-webkit-inner-spin-button'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'number\']::-webkit-outer-spin-button')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[type=\'search\']',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'textfield'),
				$rtfeldman$elm_css$Css$outlineOffset(
				$rtfeldman$elm_css$Css$px(-2)),
				A2(
				$rtfeldman$elm_css$Css$pseudoElement,
				'-webkit-search-decoration',
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none')
					]))
			])),
		$rtfeldman$elm_css$Css$Global$textarea(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$auto),
				$rtfeldman$elm_css$Css$resize($rtfeldman$elm_css$Css$vertical)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$input, $rtfeldman$elm_css$Css$Global$optgroup, $rtfeldman$elm_css$Css$Global$select, $rtfeldman$elm_css$Css$Global$textarea]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit')
			])),
		$rtfeldman$elm_css$Css$Global$optgroup(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
			])),
		$rtfeldman$elm_css$Css$Global$button(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$visible)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$select]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textTransform($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$button,
				$rtfeldman$elm_css$Css$Global$selector('[type=\'button\']'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'reset\']'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'submit\']'),
				$rtfeldman$elm_css$Css$Global$selector('[role=\'button\']')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('button::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'button\']::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'reset\']::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'submit\']::-moz-focus-inner')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('button:-moz-focusring'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'button\']::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'reset\']::-moz-focus-inner'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'submit\']::-moz-focus-inner')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'outline', '1px dotted ButtonText')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$button,
				$rtfeldman$elm_css$Css$Global$selector('html [type=\'button\']'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'reset\']'),
				$rtfeldman$elm_css$Css$Global$selector('[type=\'submit\']')
			]),
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$button, $rtfeldman$elm_css$Css$Global$input, $rtfeldman$elm_css$Css$Global$select, $rtfeldman$elm_css$Css$Global$textarea]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent),
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('a:focus'),
				$rtfeldman$elm_css$Css$Global$selector('button:focus'),
				$rtfeldman$elm_css$Css$Global$selector('input:focus'),
				$rtfeldman$elm_css$Css$Global$selector('select:focus'),
				$rtfeldman$elm_css$Css$Global$selector('textarea:focus')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$outlineWidth($rtfeldman$elm_css$Css$zero)
			])),
		$rtfeldman$elm_css$Css$Global$select(
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-moz-appearance', 'none'),
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none'),
				A2(
				$rtfeldman$elm_css$Css$pseudoElement,
				'-ms-expand',
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
					])),
				A2(
				$rtfeldman$elm_css$Css$pseudoElement,
				'-ms-value',
				_List_fromArray(
					[
						$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$currentColor)
					]))
			])),
		$rtfeldman$elm_css$Css$Global$legend(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$border($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$table),
				$rtfeldman$elm_css$Css$maxWidth(
				$rtfeldman$elm_css$Css$pct(100)),
				$rtfeldman$elm_css$Css$whiteSpace($rtfeldman$elm_css$Css$normal),
				$rtfeldman$elm_css$Css$maxWidth(
				$rtfeldman$elm_css$Css$pct(100))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-file-upload-button',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button'),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit')
			]))
	]);
var $rtfeldman$elm_css$Css$textIndent = $rtfeldman$elm_css$Css$prop1('text-indent');
var $y047aka$elm_reset_css$Css$Reset$Ress$generalElements = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$hr(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$visible),
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$details, $rtfeldman$elm_css$Css$Global$main_]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$block)
			])),
		$rtfeldman$elm_css$Css$Global$summary(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$listItem)
			])),
		$rtfeldman$elm_css$Css$Global$small(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(80))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'[hidden]',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'abbr[title]',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'border-bottom', 'none'),
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$underline),
				A2($rtfeldman$elm_css$Css$textDecoration2, $rtfeldman$elm_css$Css$underline, $rtfeldman$elm_css$Css$dotted)
			])),
		$rtfeldman$elm_css$Css$Global$a(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundColor($rtfeldman$elm_css$Css$transparent)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('a:active'),
				$rtfeldman$elm_css$Css$Global$selector('a:hover')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$outlineWidth($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$code,
				$rtfeldman$elm_css$Css$Global$typeSelector('kbd'),
				$rtfeldman$elm_css$Css$Global$pre,
				$rtfeldman$elm_css$Css$Global$typeSelector('samp')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value]))
			])),
		$rtfeldman$elm_css$Css$Global$pre(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('b'),
				$rtfeldman$elm_css$Css$Global$strong
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bolder)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$typeSelector('sub'),
				$rtfeldman$elm_css$Css$Global$typeSelector('sup')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(75)),
				$rtfeldman$elm_css$Css$lineHeight($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$relative),
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sub',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$bottom(
				$rtfeldman$elm_css$Css$em(-0.25))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$typeSelector,
		'sup',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$top(
				$rtfeldman$elm_css$Css$em(-0.5))
			])),
		$rtfeldman$elm_css$Css$Global$table(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderColor($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$textIndent($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $rtfeldman$elm_css$Css$backgroundRepeat = $rtfeldman$elm_css$Css$prop1('background-repeat');
var $rtfeldman$elm_css$Css$noRepeat = {backgroundRepeat: $rtfeldman$elm_css$Css$Structure$Compatible, backgroundRepeatShorthand: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'no-repeat'};
var $y047aka$elm_reset_css$Css$Reset$Ress$grobalSelectors = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$html(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
				A2($rtfeldman$elm_css$Css$property, '-webkit-text-size-adjust', '100%'),
				A2($rtfeldman$elm_css$Css$property, 'word-break', 'normal'),
				A2($rtfeldman$elm_css$Css$property, '-moz-tab-size', '4'),
				A2($rtfeldman$elm_css$Css$property, 'tab-size', '4')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$everything,
				$rtfeldman$elm_css$Css$Global$selector('::before'),
				$rtfeldman$elm_css$Css$Global$selector('::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$backgroundRepeat($rtfeldman$elm_css$Css$noRepeat),
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$inherit)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('::before'),
				$rtfeldman$elm_css$Css$Global$selector('::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$inherit),
				A2($rtfeldman$elm_css$Css$property, 'vertical-align', 'inherit')
			])),
		$rtfeldman$elm_css$Css$Global$everything(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Ress$specifyMediaElementStyle = _List_fromArray(
	[
		$rtfeldman$elm_css$Css$Global$img(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none)
			])),
		$rtfeldman$elm_css$Css$Global$progress(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Ress$snippets = $elm$core$List$concat(
	_List_fromArray(
		[$y047aka$elm_reset_css$Css$Reset$Ress$grobalSelectors, $y047aka$elm_reset_css$Css$Reset$Ress$generalElements, $y047aka$elm_reset_css$Css$Reset$Ress$forms, $y047aka$elm_reset_css$Css$Reset$Ress$specifyMediaElementStyle, $y047aka$elm_reset_css$Css$Reset$Ress$accessibility]));
var $y047aka$elm_reset_css$Css$Reset$ress = $y047aka$elm_reset_css$Css$Reset$Ress$snippets;
var $rtfeldman$elm_css$Css$absolute = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'absolute'};
var $rtfeldman$elm_css$Css$notAllowed = {cursor: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'not-allowed'};
var $y047aka$elm_reset_css$Css$Reset$Sanitize$accessibility = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([aria-busy="true" i])',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$progress)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([aria-controls])',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$pointer)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([aria-disabled="true" i], [disabled])',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$notAllowed)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([aria-hidden="false" i][hidden])',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$initial)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([aria-hidden="false" i][hidden]:not(:focus))',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'clip', 'rect(0, 0, 0, 0)'),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$document = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('::before'),
				$rtfeldman$elm_css$Css$Global$selector('::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox),
				$rtfeldman$elm_css$Css$backgroundRepeat($rtfeldman$elm_css$Css$noRepeat)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('::before'),
				$rtfeldman$elm_css$Css$Global$selector('::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$inherit),
				A2($rtfeldman$elm_css$Css$property, 'vertical-align', 'inherit')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(:root)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$cursor($rtfeldman$elm_css$Css$default),
				$rtfeldman$elm_css$Css$lineHeight(
				$rtfeldman$elm_css$Css$num(1.5)),
				A2($rtfeldman$elm_css$Css$property, 'overflow-wrap', 'break-word'),
				A2($rtfeldman$elm_css$Css$property, '-moz-tab-size', '4'),
				A2($rtfeldman$elm_css$Css$property, 'tab-size', '4'),
				A2($rtfeldman$elm_css$Css$property, '-webkit-tap-highlight-color', 'transparent'),
				A2($rtfeldman$elm_css$Css$property, '-webkit-text-size-adjust', '100%')
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$embeddedContent = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(audio, canvas, iframe, img, svg, video)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$middle)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(iframe)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderStyle($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(svg:not([fill]))',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'fill', 'currentColor')
			]))
	]);
var $rtfeldman$elm_css$Css$border3 = $rtfeldman$elm_css$Css$prop3('border');
var $y047aka$elm_reset_css$Css$Reset$Sanitize$forms = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(button, input, select)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(button, [type="button" i], [type="reset" i], [type="submit" i])',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(fieldset)',
		_List_fromArray(
			[
				A3(
				$rtfeldman$elm_css$Css$border3,
				$rtfeldman$elm_css$Css$px(1),
				$rtfeldman$elm_css$Css$solid,
				$rtfeldman$elm_css$Css$hex('#a0a0a0'))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(progress)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$verticalAlign($rtfeldman$elm_css$Css$baseline)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(textarea)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$resize($rtfeldman$elm_css$Css$vertical)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where([type="search" i])',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'textfield'),
				$rtfeldman$elm_css$Css$outlineOffset(
				$rtfeldman$elm_css$Css$px(-2))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$selector('::-webkit-inner-spin-button'),
				$rtfeldman$elm_css$Css$Global$selector('::-webkit-outer-spin-button')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$auto)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-input-placeholder',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$opacity(
				$rtfeldman$elm_css$Css$num(0.54))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-search-decoration',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'none')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'::-webkit-file-upload-button',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, '-webkit-appearance', 'button'),
				A2($rtfeldman$elm_css$Css$property, 'font', 'inherit')
			]))
	]);
var $rtfeldman$elm_css$Css$float = function (fn) {
	return A3(
		$rtfeldman$elm_css$Css$Internal$getOverloadedProperty,
		'float',
		'float',
		fn($rtfeldman$elm_css$Css$Internal$lengthForOverloadedProperty));
};
var $y047aka$elm_reset_css$Css$Reset$Sanitize$groupingContent = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(dl, ol, ul) :where(dl, ol, ul)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(hr)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$color($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$height($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(nav) :where(ol, ul)',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'list-style-type', 'none'),
				$rtfeldman$elm_css$Css$padding($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(nav li)::before',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'content', '\\200B'),
				$rtfeldman$elm_css$Css$float($rtfeldman$elm_css$Css$left)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(pre)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1)),
				$rtfeldman$elm_css$Css$overflow($rtfeldman$elm_css$Css$auto)
			]))
	]);
var $rtfeldman$elm_css$Css$right = $rtfeldman$elm_css$Css$prop1('right');
var $y047aka$elm_reset_css$Css$Reset$Sanitize$interactive = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(dialog)',
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'background-color', 'white'),
				A2($rtfeldman$elm_css$Css$property, 'border', 'solid'),
				A2($rtfeldman$elm_css$Css$property, 'color', 'black'),
				A2($rtfeldman$elm_css$Css$property, 'height', '-moz-fit-content'),
				A2($rtfeldman$elm_css$Css$property, 'height', 'fit-content'),
				$rtfeldman$elm_css$Css$left($rtfeldman$elm_css$Css$zero),
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$auto),
				$rtfeldman$elm_css$Css$padding(
				$rtfeldman$elm_css$Css$em(1)),
				$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$absolute),
				$rtfeldman$elm_css$Css$right($rtfeldman$elm_css$Css$zero),
				A2($rtfeldman$elm_css$Css$property, 'width', '-moz-fit-content'),
				A2($rtfeldman$elm_css$Css$property, 'width', 'fit-content')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(dialog:not([open]))',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(details > summary:first-of-type)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$listItem)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$sections = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(body)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$margin($rtfeldman$elm_css$Css$zero)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(h1)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(2)),
				A2(
				$rtfeldman$elm_css$Css$margin2,
				$rtfeldman$elm_css$Css$em(0.67),
				$rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$tabularData = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(table)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse),
				$rtfeldman$elm_css$Css$borderColor($rtfeldman$elm_css$Css$inherit),
				$rtfeldman$elm_css$Css$textIndent($rtfeldman$elm_css$Css$zero)
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$textLevelSemantics = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(abbr[title])',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$textDecoration($rtfeldman$elm_css$Css$underline),
				A2($rtfeldman$elm_css$Css$textDecoration2, $rtfeldman$elm_css$Css$underline, $rtfeldman$elm_css$Css$dotted)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(b, strong)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bolder)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(code, kbd, samp)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontFamilies(
				_List_fromArray(
					[$rtfeldman$elm_css$Css$monospace.value, $rtfeldman$elm_css$Css$monospace.value])),
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$em(1))
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		':where(small)',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$fontSize(
				$rtfeldman$elm_css$Css$pct(80))
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$Sanitize$snippets = $elm$core$List$concat(
	_List_fromArray(
		[$y047aka$elm_reset_css$Css$Reset$Sanitize$document, $y047aka$elm_reset_css$Css$Reset$Sanitize$sections, $y047aka$elm_reset_css$Css$Reset$Sanitize$groupingContent, $y047aka$elm_reset_css$Css$Reset$Sanitize$textLevelSemantics, $y047aka$elm_reset_css$Css$Reset$Sanitize$embeddedContent, $y047aka$elm_reset_css$Css$Reset$Sanitize$tabularData, $y047aka$elm_reset_css$Css$Reset$Sanitize$forms, $y047aka$elm_reset_css$Css$Reset$Sanitize$interactive, $y047aka$elm_reset_css$Css$Reset$Sanitize$accessibility]));
var $y047aka$elm_reset_css$Css$Reset$sanitize = $y047aka$elm_reset_css$Css$Reset$Sanitize$snippets;
var $rtfeldman$elm_css$Css$all = $rtfeldman$elm_css$Css$prop1('all');
var $rtfeldman$elm_css$Css$unset = _Utils_update(
	$rtfeldman$elm_css$Css$initial,
	{value: 'unset'});
var $y047aka$elm_reset_css$Css$Reset$TheNewCssReset$snippets = _List_fromArray(
	[
		A2(
		$rtfeldman$elm_css$Css$Global$selector,
		'*:where(:not(iframe, canvas, img, svg, video):not(svg *))',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$all($rtfeldman$elm_css$Css$unset),
				A2($rtfeldman$elm_css$Css$property, 'display', 'revert')
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Global$everything,
				$rtfeldman$elm_css$Css$Global$selector('*::before'),
				$rtfeldman$elm_css$Css$Global$selector('*::after')
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$boxSizing($rtfeldman$elm_css$Css$borderBox)
			])),
		A2(
		$rtfeldman$elm_css$Css$Global$each,
		_List_fromArray(
			[$rtfeldman$elm_css$Css$Global$ol, $rtfeldman$elm_css$Css$Global$ul]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$listStyle($rtfeldman$elm_css$Css$none)
			])),
		$rtfeldman$elm_css$Css$Global$img(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$maxWidth(
				$rtfeldman$elm_css$Css$pct(100))
			])),
		$rtfeldman$elm_css$Css$Global$table(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$borderCollapse($rtfeldman$elm_css$Css$collapse)
			])),
		$rtfeldman$elm_css$Css$Global$textarea(
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$property, 'white-space', 'revert')
			]))
	]);
var $y047aka$elm_reset_css$Css$Reset$theNewCssReset = $y047aka$elm_reset_css$Css$Reset$TheNewCssReset$snippets;
var $author$project$Data$ResetCss$toSnippet = function (resetCss) {
	switch (resetCss.$) {
		case 'EricMeyer':
			return $y047aka$elm_reset_css$Css$Reset$ericMeyer;
		case 'Html5Doctor':
			return $y047aka$elm_reset_css$Css$Reset$html5Doctor;
		case 'Destyle':
			return $y047aka$elm_reset_css$Css$Reset$destyle;
		case 'Normalize':
			return $y047aka$elm_reset_css$Css$Reset$normalize;
		case 'Ress':
			return $y047aka$elm_reset_css$Css$Reset$ress;
		case 'Sanitize':
			return $y047aka$elm_reset_css$Css$Reset$sanitize;
		default:
			return $y047aka$elm_reset_css$Css$Reset$theNewCssReset;
	}
};
var $author$project$Data$Tag$toString = function (tag) {
	switch (tag.$) {
		case 'Headings':
			return 'Headings';
		case 'Paragraphs':
			return 'Paragraphs';
		case 'Blockquotes':
			return 'Blockquotes';
		case 'Address':
			return 'Address';
		case 'Lists':
			return 'Lists';
		case 'HorizontalRules':
			return 'HorizontalRules';
		case 'TabularData':
			return 'TabularData';
		case 'Code':
			return 'Code';
		case 'InlineElements':
			return 'InlineElements';
		case 'Images':
			return 'Images';
		case 'Audio':
			return 'Audio';
		case 'Video':
			return 'Video';
		case 'Meter':
			return 'Meter';
		case 'Progress':
			return 'Progress';
		case 'InlineSvg':
			return 'InlineSvg';
		case 'IFrames':
			return 'IFrames';
		case 'InputFields':
			return 'InputFields';
		case 'SelectMenus':
			return 'SelectMenus';
		case 'Checkboxes':
			return 'Checkboxes';
		case 'RadioButtons':
			return 'RadioButtons';
		case 'Textareas':
			return 'Textareas';
		case 'Html5Inputs':
			return 'Html5Inputs';
		default:
			return 'ActionButtons';
	}
};
var $rtfeldman$elm_css$Css$width = $rtfeldman$elm_css$Css$prop1('width');
var $rtfeldman$elm_css$Css$Preprocess$WithMedia = F2(
	function (a, b) {
		return {$: 'WithMedia', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Media$withMedia = $rtfeldman$elm_css$Css$Preprocess$WithMedia;
var $author$project$Main$preview = function (_v0) {
	var resetCss_1 = _v0.resetCss_1;
	var resetCss_2 = _v0.resetCss_2;
	var resetCss_3 = _v0.resetCss_3;
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		A2(
			$elm$core$List$map,
			function (tag) {
				return A2(
					$rtfeldman$elm_css$Html$Styled$details,
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$Attributes$attribute, 'open', ''),
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									A3(
									$rtfeldman$elm_css$Css$borderBottom3,
									$rtfeldman$elm_css$Css$px(1),
									$rtfeldman$elm_css$Css$solid,
									$rtfeldman$elm_css$Css$hex('#EEE'))
								]))
						]),
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$summary,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$padding(
											$rtfeldman$elm_css$Css$px(15)),
											$rtfeldman$elm_css$Css$fontSize(
											$rtfeldman$elm_css$Css$px(20)),
											$rtfeldman$elm_css$Css$fontWeight($rtfeldman$elm_css$Css$bold)
										]))
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(
									$author$project$Data$Tag$toString(tag))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$displayFlex,
											$rtfeldman$elm_css$Css$paddingBottom(
											$rtfeldman$elm_css$Css$px(20)),
											$rtfeldman$elm_css$Css$Global$children(
											_List_fromArray(
												[
													$rtfeldman$elm_css$Css$Global$div(
													_List_fromArray(
														[
															$rtfeldman$elm_css$Css$width(
															$rtfeldman$elm_css$Css$pct(33.333)),
															A2(
															$rtfeldman$elm_css$Css$Media$withMedia,
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Css$Media$only,
																	$rtfeldman$elm_css$Css$Media$screen,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$Media$maxWidth(
																			$rtfeldman$elm_css$Css$px(767))
																		]))
																]),
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Css$width(
																	$rtfeldman$elm_css$Css$pct(100)),
																	A2(
																	$rtfeldman$elm_css$Css$nthChild,
																	'n+2',
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
																		]))
																])),
															A2(
															$rtfeldman$elm_css$Css$Media$withMedia,
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Css$Media$only,
																	$rtfeldman$elm_css$Css$Media$screen,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$Media$minWidth(
																			$rtfeldman$elm_css$Css$px(768)),
																			$rtfeldman$elm_css$Css$Media$maxWidth(
																			$rtfeldman$elm_css$Css$px(1279))
																		]))
																]),
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Css$width(
																	$rtfeldman$elm_css$Css$pct(50)),
																	A2(
																	$rtfeldman$elm_css$Css$nthChild,
																	'n+3',
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
																		]))
																]))
														]))
												]))
										]))
								]),
							A2(
								$elm$core$List$map,
								function (resetCss) {
									return A2(
										$rtfeldman$elm_css$Html$Styled$div,
										_List_fromArray(
											[
												$rtfeldman$elm_css$Html$Styled$Attributes$css(
												_List_fromArray(
													[
														$rtfeldman$elm_css$Css$Global$descendants(
														A2(
															$elm$core$Maybe$withDefault,
															_List_Nil,
															A2($elm$core$Maybe$map, $author$project$Data$ResetCss$toSnippet, resetCss))),
														A2(
														$rtfeldman$elm_css$Css$padding2,
														$rtfeldman$elm_css$Css$zero,
														$rtfeldman$elm_css$Css$px(20)),
														A2(
														$rtfeldman$elm_css$Css$nthChild,
														'n+2',
														_List_fromArray(
															[
																A3(
																$rtfeldman$elm_css$Css$borderLeft3,
																$rtfeldman$elm_css$Css$px(1),
																$rtfeldman$elm_css$Css$solid,
																$rtfeldman$elm_css$Css$hex('#EEE'))
															]))
													]))
											]),
										_List_fromArray(
											[
												$author$project$Data$Tag$render(tag)
											]));
								},
								_List_fromArray(
									[resetCss_1, resetCss_2, resetCss_3])))
						]));
			},
			$author$project$Data$Tag$all));
};
var $author$project$Main$SetResetCss = F2(
	function (a, b) {
		return {$: 'SetResetCss', a: a, b: b};
	});
var $author$project$Data$ResetCss$all = _List_fromArray(
	[$author$project$Data$ResetCss$EricMeyer, $author$project$Data$ResetCss$Html5Doctor, $author$project$Data$ResetCss$Destyle, $author$project$Data$ResetCss$Normalize, $author$project$Data$ResetCss$Ress, $author$project$Data$ResetCss$Sanitize, $author$project$Data$ResetCss$TheNewCssReset]);
var $rtfeldman$elm_css$Html$Styled$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $rtfeldman$elm_css$Html$Styled$Events$onInput = function (tagger) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$rtfeldman$elm_css$Html$Styled$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $rtfeldman$elm_css$Html$Styled$Events$targetValue)));
};
var $author$project$Data$ResetCss$toLibrary = function (resetCss) {
	switch (resetCss.$) {
		case 'EricMeyer':
			return {author: 'Eric Meyer', license: 'none (public domain)', name: 'Eric Meyer’s Reset CSS', updatedAt: '2011-01-26', url: 'https://meyerweb.com/eric/tools/css/reset/', version: 'v2.0'};
		case 'Html5Doctor':
			return {author: 'Richard Clark', license: 'Free of charge under a CC0 Public Domain Dedication and MIT License', name: 'html5doctor.com Reset Stylesheet', updatedAt: '2010-09-17', url: 'https://github.com/richclark/HTML5resetCSS', version: 'v1.6.1'};
		case 'Destyle':
			return {author: 'Nicolas Cusan', license: 'MIT', name: 'destyle.css', updatedAt: '2021-09-06', url: 'https://github.com/nicolas-cusan/destyle.css', version: 'v3.0.0'};
		case 'Normalize':
			return {author: 'Nicolas Gallagher', license: 'MIT', name: 'Normalize.css', updatedAt: '2018-11-05', url: 'https://github.com/necolas/normalize.css/', version: 'v8.0.1'};
		case 'Ress':
			return {author: 'Filipe Linhares', license: 'MIT', name: 'ress', updatedAt: '2021-04-21', url: 'https://github.com/filipelinhares/ress', version: 'v4.0.0'};
		case 'Sanitize':
			return {author: 'CSS Tools', license: 'CC0 1.0 Universal', name: 'sanitize.css', updatedAt: '2021-09-14', url: 'https://github.com/csstools/sanitize.css', version: 'v13.0.0'};
		default:
			return {author: 'Elad Shechter', license: 'MIT', name: 'The New CSS Reset', updatedAt: '2021-07-23', url: 'https://github.com/elad2412/the-new-css-reset', version: 'v1.2.0'};
	}
};
var $author$project$Data$ResetCss$toString = function (resetCss) {
	switch (resetCss.$) {
		case 'EricMeyer':
			return 'EricMeyer';
		case 'Html5Doctor':
			return 'Html5Doctor';
		case 'Destyle':
			return 'Destyle';
		case 'Normalize':
			return 'Normalize';
		case 'Ress':
			return 'Ress';
		case 'Sanitize':
			return 'Sanitize';
		default:
			return 'TheNewCssReset';
	}
};
var $author$project$Main$resetCssSelector = function (slot) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$select,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onInput(
						$author$project$Main$SetResetCss(slot))
					]),
				A2(
					$elm$core$List$cons,
					A2(
						$rtfeldman$elm_css$Html$Styled$option,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Attributes$value('')
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Browser Default')
							])),
					A2(
						$elm$core$List$map,
						function (resetCss) {
							return A2(
								$rtfeldman$elm_css$Html$Styled$option,
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$Attributes$value(
										$author$project$Data$ResetCss$toString(resetCss))
									]),
								_List_fromArray(
									[
										$rtfeldman$elm_css$Html$Styled$text(
										$author$project$Data$ResetCss$toLibrary(resetCss).name)
									]));
						},
						$author$project$Data$ResetCss$all)))
			]));
};
var $rtfeldman$elm_css$Css$sticky = {position: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'sticky'};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var newStyles = _v0.b;
		var classname = _v0.c;
		return $elm$core$List$isEmpty(newStyles) ? styles : A3($elm$core$Dict$insert, classname, newStyles, styles);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_v0) {
	var val = _v0.a;
	return val;
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _v1 = properties.a;
				var styles = _v1.b;
				var classname = _v1.c;
				var rest = properties.b;
				if ($elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = $elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _v0 = A2($rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, $elm$core$Maybe$Nothing, properties);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var _v1 = _v0.a;
		var classname = _v1.a;
		var styles = _v1.b;
		return A2($elm$core$Dict$singleton, classname, styles);
	}
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_v0) {
	var classname = _v0.a;
	var styles = _v0.b;
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		$elm$core$List$singleton(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					$elm$core$List$map,
					$rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					$elm$core$Dict$toList(dict)))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		$elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		$elm$core$List$singleton(
			$elm$virtual_dom$VirtualDom$text(
				$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $author$project$Main$view = function (model) {
	return function (_v0) {
		var title = _v0.title;
		var body = _v0.body;
		return {
			body: A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Html$Styled$toUnstyled,
				A2($elm$core$List$cons, $author$project$Main$globalReset, body)),
			title: title
		};
	}(
		{
			body: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$main_,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$header,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											$rtfeldman$elm_css$Css$position($rtfeldman$elm_css$Css$sticky),
											$rtfeldman$elm_css$Css$top($rtfeldman$elm_css$Css$zero),
											$rtfeldman$elm_css$Css$displayFlex,
											A2(
											$rtfeldman$elm_css$Css$padding2,
											$rtfeldman$elm_css$Css$px(10),
											$rtfeldman$elm_css$Css$zero),
											$rtfeldman$elm_css$Css$backgroundColor(
											A4($rtfeldman$elm_css$Css$hsla, 0, 0, 0, 0.01)),
											A2($rtfeldman$elm_css$Css$property, '-webkit-backdrop-filter', 'blur(15px)'),
											A2($rtfeldman$elm_css$Css$property, 'backdrop-filter', 'blur(15px)'),
											$rtfeldman$elm_css$Css$Global$children(
											_List_fromArray(
												[
													$rtfeldman$elm_css$Css$Global$div(
													_List_fromArray(
														[
															$rtfeldman$elm_css$Css$width(
															$rtfeldman$elm_css$Css$pct(33.333)),
															$rtfeldman$elm_css$Css$paddingLeft(
															$rtfeldman$elm_css$Css$px(15)),
															A2(
															$rtfeldman$elm_css$Css$Media$withMedia,
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Css$Media$only,
																	$rtfeldman$elm_css$Css$Media$screen,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$Media$maxWidth(
																			$rtfeldman$elm_css$Css$px(960))
																		]))
																]),
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Css$width(
																	$rtfeldman$elm_css$Css$pct(100)),
																	A2(
																	$rtfeldman$elm_css$Css$nthChild,
																	'n+2',
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
																		]))
																])),
															A2(
															$rtfeldman$elm_css$Css$Media$withMedia,
															_List_fromArray(
																[
																	A2(
																	$rtfeldman$elm_css$Css$Media$only,
																	$rtfeldman$elm_css$Css$Media$screen,
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$Media$minWidth(
																			$rtfeldman$elm_css$Css$px(960)),
																			$rtfeldman$elm_css$Css$Media$maxWidth(
																			$rtfeldman$elm_css$Css$px(1279))
																		]))
																]),
															_List_fromArray(
																[
																	$rtfeldman$elm_css$Css$width(
																	$rtfeldman$elm_css$Css$pct(50)),
																	A2(
																	$rtfeldman$elm_css$Css$nthChild,
																	'n+3',
																	_List_fromArray(
																		[
																			$rtfeldman$elm_css$Css$display($rtfeldman$elm_css$Css$none)
																		]))
																]))
														]))
												]))
										]))
								]),
							A2(
								$elm$core$List$map,
								$author$project$Main$resetCssSelector,
								_List_fromArray(
									[$author$project$Main$Slot_1, $author$project$Main$Slot_2, $author$project$Main$Slot_3]))),
							$author$project$Main$preview(model)
						]))
				]),
			title: ''
		});
};
var $author$project$Main$main = $elm$browser$Browser$document(
	{
		init: $author$project$Main$init,
		subscriptions: function (_v0) {
			return $elm$core$Platform$Sub$none;
		},
		update: $author$project$Main$update,
		view: $author$project$Main$view
	});
_Platform_export({'Main':{'init':$author$project$Main$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))({"versions":{"elm":"0.19.1"},"types":{"message":"Main.Msg","aliases":{},"unions":{"Main.Msg":{"args":[],"tags":{"SetResetCss":["Main.Slot","String.String"]}},"Main.Slot":{"args":[],"tags":{"Slot_1":[],"Slot_2":[],"Slot_3":[]}},"String.String":{"args":[],"tags":{"String":[]}}}}})}});

//////////////////// HMR BEGIN ////////////////////

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Original Author: Flux Xu @fluxxu
*/

/*
    A note about the environment that this code runs in...

    assumed globals:
        - `module` (from Node.js module system and webpack)

    assumed in scope after injection into the Elm IIFE:
        - `scope` (has an 'Elm' property which contains the public Elm API)
        - various functions defined by Elm which we have to hook such as `_Platform_initialize` and `_Scheduler_binding`
 */

if (module.hot) {
    (function () {
        "use strict";

        //polyfill for IE: https://github.com/fluxxu/elm-hot-loader/issues/16
        if (typeof Object.assign != 'function') {
            Object.assign = function (target) {
                'use strict';
                if (target == null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                target = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source != null) {
                        for (var key in source) {
                            if (Object.prototype.hasOwnProperty.call(source, key)) {
                                target[key] = source[key];
                            }
                        }
                    }
                }
                return target;
            };
        }

        // Elm 0.19.1 introduced a '$' prefix at the beginning of the symbols it emits,
        // and we check for `Maybe.Just` because we expect it to be present in all Elm programs.
        var elmVersion;
        if (typeof elm$core$Maybe$Just !== 'undefined')
            elmVersion = '0.19.0';
        else if (typeof $elm$core$Maybe$Just !== 'undefined')
            elmVersion = '0.19.1';
        else
            throw new Error("Could not determine Elm version");

        function elmSymbol(symbol) {
            try {
                switch (elmVersion) {
                    case '0.19.0':
                        return eval(symbol);
                    case '0.19.1':
                        return eval('$' + symbol);
                    default:
                        throw new Error('Cannot resolve ' + symbol + '. Elm version unknown!')
                }
            } catch (e) {
                if (e instanceof ReferenceError) {
                    return undefined;
                } else {
                    throw e;
                }
            }
        }

        var instances = module.hot.data
            ? module.hot.data.instances || {}
            : {};
        var uid = module.hot.data
            ? module.hot.data.uid || 0
            : 0;

        if (Object.keys(instances).length === 0) {
            log("[elm-hot] Enabled");
        }

        var cancellers = [];

        // These 2 variables act as dynamically-scoped variables which are set only when the
        // Elm module's hooked init function is called.
        var initializingInstance = null;
        var swappingInstance = null;

        module.hot.accept();
        module.hot.dispose(function (data) {
            data.instances = instances;
            data.uid = uid;

            // Cleanup pending async tasks

            // First, make sure that no new tasks can be started until we finish replacing the code
            _Scheduler_binding = function () {
                return _Scheduler_fail(new Error('[elm-hot] Inactive Elm instance.'))
            };

            // Second, kill pending tasks belonging to the old instance
            if (cancellers.length) {
                log('[elm-hot] Killing ' + cancellers.length + ' running processes...');
                try {
                    cancellers.forEach(function (cancel) {
                        cancel();
                    });
                } catch (e) {
                    console.warn('[elm-hot] Kill process error: ' + e.message);
                }
            }
        });

        function log(message) {
            if (module.hot.verbose) {
                console.log(message)
            }
        }

        function getId() {
            return ++uid;
        }

        function findPublicModules(parent, path) {
            var modules = [];
            for (var key in parent) {
                var child = parent[key];
                var currentPath = path ? path + '.' + key : key;
                if ('init' in child) {
                    modules.push({
                        path: currentPath,
                        module: child
                    });
                } else {
                    modules = modules.concat(findPublicModules(child, currentPath));
                }
            }
            return modules;
        }

        function registerInstance(domNode, flags, path, portSubscribes, portSends) {
            var id = getId();

            var instance = {
                id: id,
                path: path,
                domNode: domNode,
                flags: flags,
                portSubscribes: portSubscribes,
                portSends: portSends,
                lastState: null // last Elm app state (root model)
            };

            return instances[id] = instance
        }

        function isFullscreenApp() {
            // Returns true if the Elm app will take over the entire DOM body.
            return typeof elmSymbol("elm$browser$Browser$application") !== 'undefined'
                || typeof elmSymbol("elm$browser$Browser$document") !== 'undefined';
        }

        function wrapDomNode(node) {
            // When embedding an Elm app into a specific DOM node, Elm will replace the provided
            // DOM node with the Elm app's content. When the Elm app is compiled normally, the
            // original DOM node is reused (its attributes and content changes, but the object
            // in memory remains the same). But when compiled using `--debug`, Elm will completely
            // destroy the original DOM node and instead replace it with 2 brand new nodes: one
            // for your Elm app's content and the other for the Elm debugger UI. In this case,
            // if you held a reference to the DOM node provided for embedding, it would be orphaned
            // after Elm module initialization.
            //
            // So in order to make both cases consistent and isolate us from changes in how Elm
            // does this, we will insert a dummy node to wrap the node for embedding and hold
            // a reference to the dummy node.
            //
            // We will also put a tag on the dummy node so that the Elm developer knows who went
            // behind their back and rudely put stuff in their DOM.
            var dummyNode = document.createElement("div");
            dummyNode.setAttribute("data-elm-hot", "true");
            dummyNode.style.height = "inherit";
            var parentNode = node.parentNode;
            parentNode.replaceChild(dummyNode, node);
            dummyNode.appendChild(node);
            return dummyNode;
        }

        function wrapPublicModule(path, module) {
            var originalInit = module.init;
            if (originalInit) {
                module.init = function (args) {
                    var elm;
                    var portSubscribes = {};
                    var portSends = {};
                    var domNode = null;
                    var flags = null;
                    if (typeof args !== 'undefined') {
                        // normal case
                        domNode = args['node'] && !isFullscreenApp()
                            ? wrapDomNode(args['node'])
                            : document.body;
                        flags = args['flags'];
                    } else {
                        // rare case: Elm allows init to be called without any arguments at all
                        domNode = document.body;
                        flags = undefined
                    }
                    initializingInstance = registerInstance(domNode, flags, path, portSubscribes, portSends);
                    elm = originalInit(args);
                    wrapPorts(elm, portSubscribes, portSends);
                    initializingInstance = null;
                    return elm;
                };
            } else {
                console.error("Could not find a public module to wrap at path " + path)
            }
        }

        function swap(Elm, instance) {
            log('[elm-hot] Hot-swapping module: ' + instance.path);

            swappingInstance = instance;

            // remove from the DOM everything that had been created by the old Elm app
            var containerNode = instance.domNode;
            while (containerNode.lastChild) {
                containerNode.removeChild(containerNode.lastChild);
            }

            var m = getAt(instance.path.split('.'), Elm);
            var elm;
            if (m) {
                // prepare to initialize the new Elm module
                var args = {flags: instance.flags};
                if (containerNode === document.body) {
                    // fullscreen case: no additional args needed
                } else {
                    // embed case: provide a new node for Elm to use
                    var nodeForEmbed = document.createElement("div");
                    containerNode.appendChild(nodeForEmbed);
                    args['node'] = nodeForEmbed;
                }

                elm = m.init(args);

                Object.keys(instance.portSubscribes).forEach(function (portName) {
                    if (portName in elm.ports && 'subscribe' in elm.ports[portName]) {
                        var handlers = instance.portSubscribes[portName];
                        if (!handlers.length) {
                            return;
                        }
                        log('[elm-hot] Reconnect ' + handlers.length + ' handler(s) to port \''
                            + portName + '\' (' + instance.path + ').');
                        handlers.forEach(function (handler) {
                            elm.ports[portName].subscribe(handler);
                        });
                    } else {
                        delete instance.portSubscribes[portName];
                        log('[elm-hot] Port was removed: ' + portName);
                    }
                });

                Object.keys(instance.portSends).forEach(function (portName) {
                    if (portName in elm.ports && 'send' in elm.ports[portName]) {
                        log('[elm-hot] Replace old port send with the new send');
                        instance.portSends[portName] = elm.ports[portName].send;
                    } else {
                        delete instance.portSends[portName];
                        log('[elm-hot] Port was removed: ' + portName);
                    }
                });
            } else {
                log('[elm-hot] Module was removed: ' + instance.path);
            }

            swappingInstance = null;
        }

        function wrapPorts(elm, portSubscribes, portSends) {
            var portNames = Object.keys(elm.ports || {});
            //hook ports
            if (portNames.length) {
                // hook outgoing ports
                portNames
                    .filter(function (name) {
                        return 'subscribe' in elm.ports[name];
                    })
                    .forEach(function (portName) {
                        var port = elm.ports[portName];
                        var subscribe = port.subscribe;
                        var unsubscribe = port.unsubscribe;
                        elm.ports[portName] = Object.assign(port, {
                            subscribe: function (handler) {
                                log('[elm-hot] ports.' + portName + '.subscribe called.');
                                if (!portSubscribes[portName]) {
                                    portSubscribes[portName] = [handler];
                                } else {
                                    //TODO handle subscribing to single handler more than once?
                                    portSubscribes[portName].push(handler);
                                }
                                return subscribe.call(port, handler);
                            },
                            unsubscribe: function (handler) {
                                log('[elm-hot] ports.' + portName + '.unsubscribe called.');
                                var list = portSubscribes[portName];
                                if (list && list.indexOf(handler) !== -1) {
                                    list.splice(list.lastIndexOf(handler), 1);
                                } else {
                                    console.warn('[elm-hot] ports.' + portName + '.unsubscribe: handler not subscribed');
                                }
                                return unsubscribe.call(port, handler);
                            }
                        });
                    });

                // hook incoming ports
                portNames
                    .filter(function (name) {
                        return 'send' in elm.ports[name];
                    })
                    .forEach(function (portName) {
                        var port = elm.ports[portName];
                        portSends[portName] = port.send;
                        elm.ports[portName] = Object.assign(port, {
                            send: function (val) {
                                return portSends[portName].call(port, val);
                            }
                        });
                    });
            }
            return portSubscribes;
        }

        /*
        Breadth-first search for a `Browser.Navigation.Key` in the user's app model.
        Returns the key and keypath or null if not found.
        */
        function findNavKey(rootModel) {
            var queue = [];
            if (isDebuggerModel(rootModel)) {
                /*
                 Extract the user's app model from the Elm Debugger's model. The Elm debugger
                 can hold multiple references to the user's model (e.g. in its "history"). So
                 we must be careful to only search within the "state" part of the Debugger.
                */
                queue.push({value: rootModel['state'], keypath: ['state']});
            } else {
                queue.push({value: rootModel, keypath: []});
            }

            while (queue.length !== 0) {
                var item = queue.shift();

                if (typeof item.value === "undefined" || item.value === null) {
                    continue;
                }

                // The nav key is identified by a runtime tag added by the elm-hot injector.
                if (item.value.hasOwnProperty("elm-hot-nav-key")) {
                    // found it!
                    return item;
                }

                if (typeof item.value !== "object") {
                    continue;
                }

                for (var propName in item.value) {
                    if (!item.value.hasOwnProperty(propName)) continue;
                    var newKeypath = item.keypath.slice();
                    newKeypath.push(propName);
                    queue.push({value: item.value[propName], keypath: newKeypath})
                }
            }

            return null;
        }


        function isDebuggerModel(model) {
            // Up until elm/browser 1.0.2, the Elm debugger could be identified by a
            // property named "expando". But in version 1.0.2 that was renamed to "expandoModel"
            return model
                && (model.hasOwnProperty("expando") || model.hasOwnProperty("expandoModel"))
                && model.hasOwnProperty("state");
        }

        function getAt(keyPath, obj) {
            return keyPath.reduce(function (xs, x) {
                return (xs && xs[x]) ? xs[x] : null
            }, obj)
        }

        function removeNavKeyListeners(navKey) {
            window.removeEventListener('popstate', navKey.value);
            window.navigator.userAgent.indexOf('Trident') < 0 || window.removeEventListener('hashchange', navKey.value);
        }

        // hook program creation
        var initialize = _Platform_initialize;
        _Platform_initialize = function (flagDecoder, args, init, update, subscriptions, stepperBuilder) {
            var instance = initializingInstance || swappingInstance;
            var tryFirstRender = !!swappingInstance;

            var hookedInit = function (args) {
                var initialStateTuple = init(args);
                if (swappingInstance) {
                    var oldModel = swappingInstance.lastState;
                    var newModel = initialStateTuple.a;

                    if (typeof elmSymbol("elm$browser$Browser$application") !== 'undefined') {
                        var oldKeyLoc = findNavKey(oldModel);

                        // attempt to find the Browser.Navigation.Key in the newly-constructed model
                        // and bring it along with the rest of the old data.
                        var newKeyLoc = findNavKey(newModel);
                        var error = null;
                        if (newKeyLoc === null) {
                            error = "could not find Browser.Navigation.Key in the new app model";
                        } else if (oldKeyLoc === null) {
                            error = "could not find Browser.Navigation.Key in the old app model.";
                        } else if (newKeyLoc.keypath.toString() !== oldKeyLoc.keypath.toString()) {
                            error = "the location of the Browser.Navigation.Key in the model has changed.";
                        } else {
                            // remove event listeners attached to the old nav key
                            removeNavKeyListeners(oldKeyLoc.value);

                            // insert the new nav key into the old model in the exact same location
                            var parentKeyPath = oldKeyLoc.keypath.slice(0, -1);
                            var lastSegment = oldKeyLoc.keypath.slice(-1)[0];
                            var oldParent = getAt(parentKeyPath, oldModel);
                            oldParent[lastSegment] = newKeyLoc.value;
                        }

                        if (error !== null) {
                            console.error("[elm-hot] Hot-swapping " + instance.path + " not possible: " + error);
                            oldModel = newModel;
                        }
                    }

                    // the heart of the app state hot-swap
                    initialStateTuple.a = oldModel;

                    // ignore any Cmds returned by the init during hot-swap
                    initialStateTuple.b = elmSymbol("elm$core$Platform$Cmd$none");
                } else {
                    // capture the initial state for later
                    initializingInstance.lastState = initialStateTuple.a;
                }

                return initialStateTuple
            };

            var hookedStepperBuilder = function (sendToApp, model) {
                var result;
                // first render may fail if shape of model changed too much
                if (tryFirstRender) {
                    tryFirstRender = false;
                    try {
                        result = stepperBuilder(sendToApp, model)
                    } catch (e) {
                        throw new Error('[elm-hot] Hot-swapping ' + instance.path +
                            ' is not possible, please reload page. Error: ' + e.message)
                    }
                } else {
                    result = stepperBuilder(sendToApp, model)
                }

                return function (nextModel, isSync) {
                    if (instance) {
                        // capture the state after every step so that later we can restore from it during a hot-swap
                        instance.lastState = nextModel
                    }
                    return result(nextModel, isSync)
                }
            };

            return initialize(flagDecoder, args, hookedInit, update, subscriptions, hookedStepperBuilder)
        };

        // hook process creation
        var originalBinding = _Scheduler_binding;
        _Scheduler_binding = function (originalCallback) {
            return originalBinding(function () {
                // start the scheduled process, which may return a cancellation function.
                var cancel = originalCallback.apply(this, arguments);
                if (cancel) {
                    cancellers.push(cancel);
                    return function () {
                        cancellers.splice(cancellers.indexOf(cancel), 1);
                        return cancel();
                    };
                }
                return cancel;
            });
        };

        scope['_elm_hot_loader_init'] = function (Elm) {
            // swap instances
            var removedInstances = [];
            for (var id in instances) {
                var instance = instances[id];
                if (instance.domNode.parentNode) {
                    swap(Elm, instance);
                } else {
                    removedInstances.push(id);
                }
            }

            removedInstances.forEach(function (id) {
                delete instance[id];
            });

            // wrap all public modules
            var publicModules = findPublicModules(Elm);
            publicModules.forEach(function (m) {
                wrapPublicModule(m.path, m.module);
            });
        }
    })();

    scope['_elm_hot_loader_init'](scope['Elm']);
}
//////////////////// HMR END ////////////////////


}(this));