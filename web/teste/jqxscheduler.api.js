/*
 jQWidgets v3.9.0 (2015-Oct)
 Copyright (c) 2011-2015 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function(a){if (!a.jqx.scheduler){a.jqx.scheduler = {}}a.jqx.scheduler.utilities = {weekDays:{Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6}, guid:function(){function b(){return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)}return b() + b()}, areWeekDaysIncluded:function(d, c){var b = false; a.each(d, function(e, f){if (f === c){b = true; return false}}); return b}, getStartOfDay:function(c){var b = new a.jqx.date(c.year(), c.month(), c.day(), 0, 0, 0); b.timeZone = c.timeZone; return b}, getEndOfDay:function(c){var b = new a.jqx.date(c.year(), c.month(), c.day(), 23, 59, 59); b.timeZone = c.timeZone; return b}, getDaysCount:function(d, c){var b = 1; while (d < c){if (d.day() != c.day()){b++}d = d.addDays(1)}return b}, getStartOfWeek:function(e, g){var c = e.dayOfWeek(); var b = g.firstDay; if (c < b){c += 7}var d = c - b; var f = e.addDays( - d); return f.date()}, getEndOfWeek:function(d, e, c){var f = 7; var b = that.getStartOfWeek(d, dateTimeFormat, c); return b.addDays(f)}, getEndOfMonth:function(d, e){var c = d.daysInMonth(); var b = new a.jqx.date(d.year(), d.month(), c, 23, 59, 59); b.timeZone = d.timeZone; return b}, rangeIntersection:function(i, h, f, e){var g = i.valueOf(); var d = f.valueOf(); var c = h.valueOf(); var b = e.valueOf(); if (d >= g && d < c){return true}if (d < g && b > g){return true}if (g == d || c == b){return true}if (g < d){if (c > d && c < b){return true}if (c > b){return true}} else{if (b > g && b < c){return true}if (b > c){return true}}return false}, rangeContains:function(e, d, c, b){return(e <= c && b <= d)}, monthDays:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], msPerDay:1000 * 60 * 60 * 24, maxYear:9999, ORDINAL_BASE:new Date(1970, 0, 1), getYearDay:function(b){var c = new Date(b.getFullYear(), b.getMonth(), b.getDate()); return Math.ceil((c - new Date(b.getFullYear(), 0, 1)) / a.jqx.scheduler.utilities.msPerDay) + 1}, isLeapYear:function(b){if (b instanceof Date){b = b.getFullYear()}return((b % 4 === 0) && (b % 100 !== 0)) || (b % 400 === 0)}, tzOffset:function(b){return b.getTimezoneOffset() * 60 * 1000}, monthRange:function(c, d){var b = new Date(c, d, 1); return[a.jqx.scheduler.utilities.getWeekday(b), a.jqx.scheduler.utilities.getMonthDays(b)]}, getMonthDays:function(b){var c = b.getMonth(); return c == 1 && a.jqx.scheduler.utilities.isLeapYear(b)?29:a.jqx.scheduler.utilities.monthDays[c]}, getWeekday:function(b){var c = [6, 0, 1, 2, 3, 4, 5]; return c[b.getDay()]}, combine:function(b, c){c = c || b; return new Date(b.getFullYear(), b.getMonth(), b.getDate(), c.getHours(), c.getMinutes(), c.getSeconds())}, sort:function(b){b.sort(function(d, c){return d.getTime() - c.getTime()})}, timeToUntilString:function(e){var c = new Date(e); var b, f = [c.getUTCFullYear(), c.getUTCMonth() + 1, c.getUTCDate(), "T", c.getUTCHours(), c.getUTCMinutes(), c.getUTCSeconds(), "Z"]; for (var d = 0; d < f.length; d++){b = f[d]; if (!/[TZ]/.test(b) && b < 10){f[d] = "0" + String(b)}}return f.join("")}, untilStringToDate:function(d){var b = /^(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2})Z)?$/; var c = b.exec(d); if (!c){throw new Error("Invalid UNTIL value: " + d)}return new Date(Date.UTC(c[1], c[2] - 1, c[3], c[5] || 0, c[6] || 0, c[7] || 0))}, Time:function(b, d, c){this.hour = b; this.minute = d; this.second = c; this.that = this; this.getHours = function(){return that.hour}; this.getMinutes = function(){return that.minute}, this.getSeconds = function(){return that.second}, this.getTime = function(){return((that.hour * 60 * 60) + (that.minute * 60) + that.second) * 1000}}}; a.jqx.scheduler.appointment = function(){var c = this; c.from = new a.jqx.date(); c.to = new a.jqx.date().addHours(1); c.subject = ""; c.description = ""; c.location = ""; c.tooltip = ""; c.hidden = false; c.resourceId = null; c.id = ""; c.background = null; c.color = null; c.borderColor = null; c.status = "busy"; c.style = null; c.exceptions = new Array(); c.exceptionDates = new Array(); c.recurrencePattern = null; c.recurrenceException = new Array(); c.occurrenceEnumerator = null; c.rootAppointment = null; c.hiddenByResourceId = false; c.draggable = true; c.resizable = true; c.recurrentAppointment = false; c.allDay = false; c.readOnly = false; c.showStatus = true; c.timeZone = null; c.scheduler = null; c.elements = new Array(); c.duration = function(){var e = c.to - c.from; var f = e * 10000; return new a.jqx.timeSpan(f)}; c.range = function(){if (!c.allDay){return{from:c.from, to:c.to}} else{return{from:a.jqx.scheduler.utilities.getStartOfDay(c.from), to:a.jqx.scheduler.utilities.getEndOfDay(c.to)}}}; c.clearRecurrence = function(){if (c.recurrencePattern){c.exceptions = new Array(); c.exceptionDates = new Array(); c.recurrencePattern = null; c.recurrenceException = new Array(); c.hidden = false}}; c.isAllDayAppointment = function(){return this.duration().days() >= 1 || this.allDay}; c.cloneAppointmentAttributes = function(e){e.subject = c.subject; e.description = c.description; e.location = c.location; e.tooltip = c.tooltip; e.resourceId = c.resourceId; e.category = c.category; e.status = c.status; e.rootAppointment = c; e.color = c.color; e.borderColor = c.borderColor; e.background = c.background; e.hidden = c.hidden; e.timezone = c.timeZone; e.style = c.style; e.hiddenByResourceId = c.hiddenByResourceId}; c.createOccurrence = function(g){if (g == null){return null}var f = new a.jqx.scheduler.appointment(); f.allDay = c.allDay; var e = c.duration(); if (c.allDay){e = new a.jqx.timeSpan(10000 * (c.to - c.from))}f.from = g; f.to = g.add(e); f.occurrenceFrom = g.clone(); f.subject = c.subject; f.description = c.description; f.location = c.location; f.tooltip = c.tooltip; f.resourceId = c.resourceId; f.category = c.category; f.status = c.status; f.rootAppointment = c; f.color = c.color; f.borderColor = c.borderColor; f.background = c.background; f.recurrentAppointment = true; f.timeZone = c.timeZone; f.style = c.style; f.hiddenByResourceId = c.hiddenByResourceId; if (c.hiddenByResourceId){f.hidden = true}f.id = c.id + "." + a.jqx.scheduler.utilities.guid(); c.hidden = true; c.occurrenceIndex++; return f}; c.clone = function(){var e = new a.jqx.scheduler.appointment(); e.allDay = c.allDay; e.from = c.from.clone(); e.to = c.to.clone(); e.subject = c.subject; e.description = c.description; e.location = c.location; e.tooltip = c.tooltip; e.resourceId = c.resourceId; e.category = c.category; e.status = c.status; e.color = c.color; e.borderColor = c.borderColor; e.background = c.background; e.style = c.style; e.timeZone = c.timeZone; e.hiddenByResourceId = c.hiddenByResourceId; if (c.hiddenByResourceId){e.hidden = true}e.id = c.id + "." + a.jqx.scheduler.utilities.guid(); return e}; c.isRecurrentAppointment = function(){return c.recurrentAppointment || c.recurrencePattern != null}; c.anyExceptions = function(){return c.exceptions != null && c.exceptions.length > 0}; c.anyOccurrences = function(){return c.occurrenceEnumerator != null && c.occurrenceEnumerator.getNextAppointment()}; c.isException = function(){var g = c.rootAppointment || this; if (!g.recurrenceException){return false}for (var f = 0; f < g.recurrenceException.length; f++){var e = g.recurrenceException[f]; if (c.occurrenceFrom && e.equals(c.occurrenceFrom)){return true}}return false}; c.getOccurrences = function(h, g){c.occurrenceIndex = 0; var f = h !== null?h:c.from; var e = new a.jqx.scheduler.recurrentAppointmentsList(c, c.calendar, f, g, c.scheduler); c.occurrences = e.list; return e.list}; if (arguments.length === 1){if (a.type(arguments[0]) == "object"){for (var b in arguments[0]){var d = arguments[0][b]; if (this[b] !== undefined){this[b] = d}}} else{c.from = arguments[0]; c.to = new a.jqx.date(c.from).addHours(1)}} else{if (arguments.length === 2){c.from = arguments[0]; c.to = arguments[1]} else{if (arguments.length === 3){c.from = arguments[0]; c.to = arguments[1]; c.subject = arguments[2]} else{if (arguments.length === 3){c.from = arguments[0]; c.to = arguments[1]; c.subject = arguments[2]; c.description = arguments[3]}}}}if (c.recurrencePattern != null){c.recurrencePattern.setFrom(c.from)}}; a.jqx.scheduler.recurrentAppointmentsList = function(){var b = this; b.recurrentAppointment = null; b.currentTime = null; b.calendar = a.jqx.scheduler.calendar; b.from = new a.jqx.date(0); b.to = new a.jqx.date(9999, 12, 31); b.foundItems = 0; b.list = new Array(); b.scheduler = null; b.getOccurrences = function(c, e, d){if (c == undefined){return b.list}return new a.jqx.scheduler.recurrentAppointmentsList(c, b.calendar, e, d).list}; b.current = function(){return b.recurrentAppointment.createOccurrence(b.currentTime)}; b.fillList = function(){b.currentTime = null; b.foundItems = 0; b.list = new Array(); var c = b.recurrentAppointment.recurrencePattern; c.step = 0; c.current = 0; c.currentYearDay = 0; if (c == null){return false}while (b.getNextAppointment(c)){var d = b.current(); if (d){b.list.push(d)}}}; b.getNextAppointment = function(h){if (b.recurrentAppointment == null){return false}var d = 4294967295; var j = this.scheduler._views[this.scheduler._view].type; var l = this.scheduler._views[this.scheduler._view]; var f = 0; switch (h.freq){case"weekly":f = 7; break; case"monthly":f = 31; break; case"yearly":f = 365; break}for (var e = 0; e < d; e++){var k = h.getNewOccurenceDate(); h.currentTime = k; if ((h.to < k && h.to.addDays(f) >= k) || (b.to < k && b.to.addDays(f) >= k)){b.currentTime = null; return true}if (h.to.addDays(f) < k || b.to.addDays(f) < k){b.currentTime = null; return false}var g = true; g = b.getCanSetTime(h, k, g); if (h.canCreateNewOccurence(k, b.calendar)){var c = true; if (false === l.showWeekends){if (k.dayOfWeek() == 6 || k.dayOfWeek() == 0){c = false}}if (c){b.foundItems++}}if (!g){continue}b.currentTime = k; if (b.foundItems > h.count){return false}return true}return false}; b.getCanSetTime = function(c, e, d){if (!c.canCreateNewOccurence(e, b.calendar)){d = false}if (e < b.from && e.add(b.recurrentAppointment.duration()) <= b.from){d = false}if (b.to <= e){d = false}return d}; b.isException = function(f, c, g){var e = b.recurrentAppointment.exceptions; for (var d = 0; d < e.length; d++){if (g.isDateInExceptionAppointment(f, c, e[d])){if ( - 1 === g.newExceptions.indexOf(e[d])){return true}}}return false}; if (arguments && arguments.length > 0){b.recurrentAppointment = arguments[0]; if (arguments[1]){b.calendar = arguments[1]}if (arguments[2]){b.from = arguments[2]}if (arguments[3]){b.to = arguments[3]}if (arguments[4]){b.scheduler = arguments[4]}if (arguments[2] === undefined){b.from = new a.jqx.date(0); b.to = new a.jqx.date(9999, 12, 31)}b.fillList()}return b}; a.jqx.scheduler.recurrencePattern = function(){var c = this; var b = {from:new a.jqx.date(0), to:new a.jqx.date(9999, 12, 31), count:1000, interval:1, exceptions:new Array(), newExceptions:new Array(), month:1, day:1, current:0, currentYearDay:0, step:0, days:[], bynweekday:[], isEveryWeekDay:true, timeZone:null, weekDays:{Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6}, freq:"daily", bymonth:null, bymonthday:null, byyearday:null, byweekno:null, byweekday:null}; a.extend(true, c, b); c.getNewOccurenceDate = function(){var o = function(n, C){var k = 0, D = []; if (n instanceof Array){for (; k < C; k++){D[k] = [].concat(n)}} else{for (; k < C; k++){D[k] = n}}return D}; var d = function(k, i){var n = k % i; return(n * i < 0)?n + i:n}; var v = function(D, k){if (arguments.length === 1){k = D; D = 0}var n = []; for (var C = D; C < k; C++){n.push(C)}return n}; var u = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]; var l = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]; var t = c.from.year(); var j = [6, 0, 1, 2, 3, 4, 5]; var r = function(i){c.yearlen = i % 4 == 0 && (i % 100 != 0 || i % 400 == 0)?366:365; c.nextyearlen = (1 + i) % 4 == 0 && ((1 + i) % 100 != 0 || (1 + i) % 400 == 0)?366:365; var k = new Date(i, 0, 1); var C = j[new Date(i, 0, 1).getDay()]; var n = (function(){for (var D = [], E = 0; E < 55; E++){D = D.concat(v(7))}return D}()); if (c.yearlen == 365){c.wdaymask = n.slice(C); c.mrange = [].concat(l)} else{c.wdaymask = n.slice(C); c.mrange = [].concat(u)}}; r(t); switch (c.freq){case"daily":default:var g = c.from.add(new a.jqx.timeSpan(c.step * c.interval, 0, 0, 0)); c.step++; return g; case"weekly":if (c.byweekday){var g = new a.jqx.date(c.from, c.timeZone); g = g.addDays(7 * (c.step * c.interval)); if (c.step >= 1){g = g.addDays( - c.from.dayOfWeek()); var s = g.addDays(7)} else{var s = g.addDays(7 - c.from.dayOfWeek())}var e = g; for (var z = 0; z < 7; z++){if (j[e.dayOfWeek()] === c.byweekday[c.current]){break}if (e >= s){break}e = e.addDays(1)}g = e; c.current++; if (undefined == c.byweekday[c.current]){c.current = 0; c.step++}}return g; case"monthly":if (c.bynweekday.length > 0){var g = new a.jqx.date(c.from.year(), c.from.month(), 1, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addMonths(c.step * c.interval); var B = g.month(); var f = [c.mrange.slice(B - 1, B + 1)][0]; var h = f[0]; var m = f[1]; m -= 1; c.nwdaymask = o(0, c.yearlen); c.step++; for (var y = 0; y < c.bynweekday.length; y++){var q = c.bynweekday[y][0], x = c.bynweekday[y][1]; if (x < 0){z = m + (x + 1) * 7; z -= d(c.wdaymask[z] - q, 7)} else{z = h + (x - 1) * 7; z += d(7 - c.wdaymask[z] + q, 7)}if (h <= z && z <= m){c.nwdaymask[z] = 1}}var w = z + 1; var A = w - h; var g = new a.jqx.date(c.from.year(), c.from.month(), A, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addMonths((c.step - 1) * c.interval)} else{if (c.bymonthday.length > 0){var g = new a.jqx.date(c.from.year(), c.from.month(), c.bymonthday[c.current], c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addMonths(c.step * c.interval); c.current++; if (!c.bymonthday[c.current]){c.current = 0; c.step++}} else{var g = new a.jqx.date(c.from.year(), c.from.month(), c.day, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addMonths(c.step * c.interval); c.step++}}return g; case"yearly":if (c.bymonth && c.bymonth.length > 0){if (c.bynweekday.length > 0){var g = new a.jqx.date(c.from.year(), c.bymonth[c.current], 1, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addYears(c.step * c.interval); r(g.year()); var B = g.month(); var f = [c.mrange.slice(B - 1, B + 1)][0]; var h = f[0]; var m = f[1]; m -= 1; c.nwdaymask = o(0, c.yearlen); for (var y = 0; y < c.bynweekday.length; y++){var q = c.bynweekday[y][0], x = c.bynweekday[y][1]; if (x < 0){z = m + (x + 1) * 7; z -= d(c.wdaymask[z] - q, 7)} else{z = h + (x - 1) * 7; z += d(7 - c.wdaymask[z] + q, 7)}if (h <= z && z <= m){c.nwdaymask[z] = 1}}var w = z + 1; var A = w - h; g = new a.jqx.date(g.year(), c.bymonth[c.current], A, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; c.step++} else{if (c.byyearday.length > 0){var g = new a.jqx.date(c.from.year(), c.bymonth[c.current], c.byyearday[c.currentYearDay], c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addYears(c.step * c.interval); c.currentYearDay++; if (!c.byyearday[c.currentYearDay]){c.currentYearDay = 0; c.current++; if (!c.bymonth[c.current]){c.current = 0; c.step++}}} else{var g = new a.jqx.date(c.from.year(), c.bymonth[c.current], c.from.day(), c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addYears(c.step * c.interval); c.current++; if (!c.bymonth[c.current]){c.current = 0; c.step++}}}} else{if (c.byyearday && c.byyearday.length > 0){var g = new a.jqx.date(c.from.year(), c.from.month(), c.byyearday[c.current], c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addYears(c.step * c.interval); c.current++; if (!c.byyearday[c.current]){c.current = 0; c.step++}} else{if (c.byweekno != null){var p = function(n, k){var i = 1; var C = new a.jqx.date(k.year(), 1, 1, k.hour(), k.minute(), k.second()); C.timeZone = c.timeZone; while (i != n){C = C.addDays(7); i++; if (i > 53){break}}while (a.jqx.scheduler.utilities.getWeekday(C.toDate()) != c.wkst){C = C.addDays(1)}return C}; var g = c.from.addYears(c.step * c.interval); g = p(c.byweekno[c.current], g); if (c.byweekday){var e = g; for (var z = 0; z < 7; z++){if (j[e.dayOfWeek()] === c.byweekday[c.currentYearDay]){break}e = e.addDays(1)}g = e; c.currentYearDay++; if (!c.byweekday[c.currentYearDay]){c.currentYearDay = 0; c.current++; if (!c.byweekno[c.current]){c.current = 0; c.step++}}} else{c.current++; if (!c.byweekno[c.current]){c.current = 0; c.step++}}} else{var g = new a.jqx.date(c.from.year(), c.month, c.day, c.from.hour(), c.from.minute(), c.from.second()); g.timeZone = c.timeZone; g = g.addYears(c.step * c.interval); c.step++}}}return g}}; c.isDateInExceptionAppointment = function(d, e, f){switch (c.freq){case"daily":case"weekly":default:return d.year() == f.from.year() && d.dayOfYear() == f.from.dayOfYear()}}; c.createNewPattern = function(){if (c.ical){var d = new a.jqx.scheduler.recurrencePattern(c.ical); return d} else{var d = new a.jqx.scheduler.recurrencePattern(); d.from = c.from; d.to = c.to; d.count = c.count; d.interval = c.interval; d.exceptions = c.exceptions; d.newExceptions = c.newExceptions; d.weekDays = c.weekDays; d.isEveryWeekDay = c.isEveryWeekDay; d.month = c.month; d.day = c.day; d.current = c.current; d.currentYearDay = c.currentYearDay; d.step = c.step; d.days = c.days; d.bynweekday = c.bynweekday; d.bymonth = c.bymonth; d.bymonthday = c.bymonthday; d.byyearday = c.byyearday; d.byweekno = c.byweekno; d.byweekday = c.byweekday; d.freq = d.freq; d.timeZone = d.timeZone; return d}}; c.equals = function(e){var d = c.from == e.from && c.to == e.to && c.count === e.count && c.interval === e.interval && c.day === e.day && c.month === e.month; return d}; c.isDayOfWeekIncluded = function(e){var d = e.dayOfWeek(); return a.jqx.scheduler.utilities.areWeekDaysIncluded(c.weekDays, d)}; c.getWeekIndexFromDate = function(g, f){var e = f.firstDay; var h = a.jqx.scheduler.utilities.getStartOfWeek(c.from, f, e); var d = new a.jqx.timeSpan(g.subtract(h)); return parseInt(d.days() / 7)}; c.canCreateNewOccurence = function(e, g){var d = e.toDate(); switch (c.freq){case"daily":default:if (c.bymonth){if (c.bymonth.indexOf(e.month()) == - 1){return false}}if (c.isEveryWeekDay){if (!c.isDayOfWeekIncluded(e, g)){return false} else{return true}} else{return true}break; case"weekly":var f = c.getWeekIndexFromDate(e, g); if (c.bymonth){if (c.bymonth.indexOf(e.month()) == - 1){return false}}if ((f % c.interval) != 0){return false}if (c.weekDays == {}){if (c.from.dayOfWeek() != start.dayOfWeek()){return false}} else{if (!c.isDayOfWeekIncluded(e, g)){return false}}break; case"monthly":case"yearly":if (c.bymonth){if (c.bymonth.indexOf(e.month()) == - 1){return false}}if (e < c.from){return false}break}return true}; c.toString = function(){var d = {}; d.dtstart = this.from.toDate(); d.until = this.to?this.to.toDate():null; d.count = this.count; d.bymonth = this.bymonth?this.bymonth:new Array().push(this.month); var e = {}; e.YEARLY = 0; e.MONTHLY = 1; e.WEEKLY = 2; e.DAILY = 3; e.HOURLY = 4; e.MINUTELY = 5; e.SECONDLY = 6; d.freq = e[this.freq.toUpperCase()]; d.byweekday = new Array(); var g = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"]; a.each(this.weekDays, function(){d.byweekday.push(this)}); if (this.byyearday != undefined){d.byyearday = this.byyearday}if (this.byweekno != undefined){d.byweekno = this.byweekno}d.bymonthday = this.bymonthday; d.wkst = g[this.wkst]; d.interval = this.interval; var f = new a.jqx.ICalRule(d); return f.toString()}; c.init = function(j){var d = new a.jqx.ICalRule(c.ical, j); var f = d.options; c.from = f.dtstart?new a.jqx.date(f.dtstart, c.timeZone):c.from; c.count = f.count != undefined?f.count:c.count; c.freq = d.FREQUENCIES[f.freq].toLowerCase(); c.interval = f.interval != undefined?f.interval:c.interval; c.to = f.until?new a.jqx.date(f.until, c.timeZone):c.to; c.wkst = f.wkst; c.bymonth = f.bymonth; if (c.bymonth && c.bymonth.length > 0){c.month = c.bymonth[0]} else{c.month = c.from.month()}c.day = c.from.day(); if (f.byweekday != undefined){var h = {Sunday:0, Monday:1, Tuesday:2, Wednesday:3, Thursday:4, Friday:5, Saturday:6}; c.weekDays = {}; for (var g = 0; g < f.byweekday.length; g++){var e = f.byweekday[g]; switch (e){case 0:c.weekDays.Monday = 1; break; case 1:c.weekDays.Tuesday = 2; break; case 2:c.weekDays.Wednesday = 3; break; case 3:c.weekDays.Thursday = 4; break; case 4:c.weekDays.Friday = 5; break; case 5:c.weekDays.Saturday = 6; break; case 6:c.weekDays.Sunday = 0; break}}c.byweekday = f.byweekday}c.byweekno = f.byweekno; if (f.bynweekday){c.bynweekday = f.bynweekday}if (f.bymonthday != undefined){c.bymonthday = f.bymonthday.sort(); if (c.bymonthday[0]){c.day = c.bymonthday[0]}}if (f.byyearday != undefined){c.day = f.byyearday[0]; c.byyearday = f.byyearday.sort()}return f}; c.setFrom = function(d){c.from = d.clone(); if (c.ical){c.init(d)}}; if (arguments.length == 1){c.ical = arguments[0]; c.init()}return c}; a.jqx.scheduler.calendar = {"/":"/", ":":":", firstDay:0, days:{names:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], namesAbbr:["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], namesShort:["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]}, months:{names:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""], namesAbbr:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]}, AM:["AM", "am", "AM"], PM:["PM", "pm", "PM"], eras:[{name:"A.D.", start:null, offset:0}], twoDigitYearMax:2029, patterns:{d:"M/d/yyyy", D:"dddd, MMMM dd, yyyy", t:"h:mm tt", T:"h:mm:ss tt", f:"dddd, MMMM dd, yyyy h:mm tt", F:"dddd, MMMM dd, yyyy h:mm:ss tt", M:"MMMM dd", Y:"yyyy MMMM", S:"yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss", ISO:"yyyy-MM-dd hh:mm:ss", ISO2:"yyyy-MM-dd HH:mm:ss", d1:"dd.MM.yyyy", d2:"dd-MM-yyyy", zone1:"yyyy-MM-ddTHH:mm:ss-HH:mm", zone2:"yyyy-MM-ddTHH:mm:ss+HH:mm", custom:"yyyy-MM-ddTHH:mm:ss.fff", custom2:"yyyy-MM-dd HH:mm:ss.fff"}, percentsymbol:"%", currencysymbol:"$", currencysymbolposition:"before", decimalseparator:".", thousandsseparator:","}; a.jqx.ICalRule = function(u, n){var D = this; var m = function(R, j){if (arguments.length === 1){j = R; R = 0}var k = []; for (var v = R; v < j; v++){k.push(v)}return k}; var A = function(k, v){var j = 0, R = []; if (k instanceof Array){for (; j < v; j++){R[j] = [].concat(k)}} else{for (; j < v; j++){R[j] = k}}return R}; var C = function(i){return(i instanceof Array && i.length == 0)?false:Boolean(i)}; var B = function(i, j){return i.indexOf(j) != - 1}; var G = [].concat(A(1, 31), A(2, 28), A(3, 31), A(4, 30), A(5, 31), A(6, 30), A(7, 31), A(8, 31), A(9, 30), A(10, 31), A(11, 30), A(12, 31), A(1, 7)); var s = [].concat(A(1, 31), A(2, 29), A(3, 31), A(4, 30), A(5, 31), A(6, 30), A(7, 31), A(8, 31), A(9, 30), A(10, 31), A(11, 30), A(12, 31), A(1, 7)); var h = m(1, 29), g = m(1, 30), P = m(1, 31), O = m(1, 32); var J = [].concat(O, g, O, P, O, P, O, O, P, O, P, O, O.slice(0, 7)); var b = [].concat(O, h, O, P, O, P, O, O, P, O, P, O, O.slice(0, 7)); h = m( - 28, 0); g = m( - 29, 0); P = m( - 30, 0); O = m( - 31, 0); var K = [].concat(O, g, O, P, O, P, O, O, P, O, P, O, O.slice(0, 7)); var e = [].concat(O, h, O, P, O, P, O, O, P, O, P, O, O.slice(0, 7)); var c = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]; var z = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]; var q = (function(){for (var j = [], k = 0; k < 55; k++){j = j.concat(m(7))}return j}()); var f = function(j, k){var i = this; if (k === 0){throw new Error("Can't create weekday with n == 0")}this.weekday = j; this.n = k; this.nth = function(v){return i.n == v?i:new f(i.weekday, v)}; this.equals = function(v){return i.weekday == v.weekday && i.n == v.n}; this.toString = function(){var v = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"][i.weekday]; if (this.n){v = (i.n > 0?"+":"") + String(i.n) + v}return v}; this.getJsWeekday = function(){return i.weekday == 6?0:i.weekday + 1}}; this.FREQUENCIES = ["YEARLY", "MONTHLY", "WEEKLY", "DAILY", "HOURLY", "MINUTELY", "SECONDLY"]; this.YEARLY = 0; this.MONTHLY = 1; this.WEEKLY = 2; this.DAILY = 3; this.HOURLY = 4; this.MINUTELY = 5; this.SECONDLY = 6; this.MO = new f(0); this.TU = new f(1); this.WE = new f(2); this.TH = new f(3); this.FR = new f(4); this.SA = new f(5); this.SU = new f(6); var d = {freq:null, dtstart:null, interval:1, wkst:D.MO, count:null, until:null, bysetpos:null, bymonth:null, bymonthday:null, byyearday:null, byweekno:null, byweekday:null, byhour:null, byminute:null, bysecond:null, byeaster:null}; this._string = null; this.toString = function(){var aa = this.origOptions; var Y, Z, V, W, U, k = []; Z = Object.keys(aa); V = Object.keys(d); for (var R = 0; R < Z.length; R++){if (!B(V, Z[R])){continue}Y = Z[R].toUpperCase(); W = aa[Z[R]]; U = []; if (W === null || W instanceof Array && !W.length){continue}switch (Y){case"FREQ":W = D.FREQUENCIES[aa.freq]; break; case"WKST":W = W.toString(); break; case"BYWEEKDAY":Y = "BYDAY"; if (!(W instanceof Array)){W = [W]}for (var T, v = 0; v < W.length; v++){T = W[v]; if (T instanceof f){} else{if (T instanceof Array){T = new f(T[0], T[1])} else{T = new f(T)}}U[v] = T.toString()}W = U; break; case"DTSTART":case"UNTIL":W = a.jqx.scheduler.utilities.timeToUntilString(W); break; default:if (W instanceof Array){for (var v = 0; v < W.length; v++){U[v] = String(W[v])}W = U} else{W = String(W)}}k.push([Y, W])}var X = []; for (var R = 0; R < k.length; R++){var S = k[R]; X.push(S[0] + "=" + S[1].toString())}return X.join(";")}; this.parseString = function(v){v = v.replace(/^\s+|\s+$/, ""); if (!v.length){return null}var S, R, X, W, T, Y = v.split(";"), aa = {}; for (S = 0; S < Y.length; S++){T = Y[S].split("="); X = T[0]; W = T[1]; if (X == ""){continue}switch (X){case"COUNT":case"INTERVAL":case"BYSETPOS":case"BYMONTH":case"BYMONTHDAY":case"BYYEARDAY":case"BYWEEKNO":case"BYHOUR":case"BYMINUTE":case"BYSECOND":if (W.indexOf(",") != - 1){W = W.split(","); for (R = 0; R < W.length; R++){if (/^[+-]?\d+$/.test(W[R])){W[R] = Number(W[R])}}} else{if (/^[+-]?\d+$/.test(W)){W = Number(W)}}X = X.toLowerCase(); aa[X] = W; break; case"BYDAY":var k, U, V, Z = W.split(","); aa.byweekday = []; for (R = 0; R < Z.length; R++){V = Z[R]; if (V.length == 2){U = D[V]; aa.byweekday.push(U)} else{V = V.match(/^([+-]?\d)([A-Z]{2})$/); k = Number(V[1]); U = V[2]; U = D[U].weekday; aa.byweekday.push(new f(U, k))}}break; case"FREQ":aa.freq = D[W]; break; case"WKST":aa.wkst = D[W]; break; case"DTSTART":aa.dtstart = a.jqx.scheduler.utilities.untilStringToDate(W); break; case"UNTIL":aa.until = a.jqx.scheduler.utilities.untilStringToDate(W); break; case"BYEASTER":aa.byeaster = Number(W); break; default:throw new Error("Unknown ICalRule property '" + X + "'")}}D.options = aa; return aa}; if (a.type(u) === "string"){this.options = this.parseString(u)} else{this.options = u || {}}var u = this.options; if (!Array.prototype.forEach){Array.prototype.forEach = function(V, j){var R, v; if (this == null){throw new TypeError(" this is null or not defined")}var U = Object(this); var i = U.length >>> 0; if (typeof V !== "function"){throw new TypeError(V + " is not a function")}if (arguments.length > 1){R = j}v = 0; while (v < i){var S; if (v in U){S = U[v]; V.call(R, S, v, U)}v++}}}if (!Object.keys){Object.keys = (function(){var k = Object.prototype.hasOwnProperty, v = !({toString:null}).propertyIsEnumerable("toString"), j = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], i = j.length; return function(T){if (typeof T !== "object" && (typeof T !== "function" || T === null)){throw new TypeError("Object.keys called on non-object")}var R = [], U, S; for (U in T){if (k.call(T, U)){R.push(U)}}if (v){for (S = 0; S < i; S++){if (k.call(T, j[S])){R.push(j[S])}}}return R}}())}this.origOptions = {}; var E = [], w = Object.keys(this.options), p = Object.keys(d); w.forEach(function(i){this.origOptions[i] = this.options[i]; if (!B(p, i)){E.push(i)}}, this); if (E.length){throw new Error("Invalid options: " + E.join(", "))}if (!D.FREQUENCIES[this.options.freq] && u.byeaster === null){throw new Error("Invalid Frequency: " + String(u.freq))}p.forEach(function(i){if (!B(w, i)){u[i] = d[i]}}); var x = this.options; if (x.byeaster !== null){x.freq = this.YEARLY}if (!x.dtstart){x.dtstart = new Date(); x.dtstart.setMilliseconds(0)}if (n){x.dtstart = n.toDate()}if (x.wkst === null){x.wkst = this.MO.weekday} else{if (typeof x.wkst == "number"){} else{x.wkst = x.wkst.weekday}}if (x.bysetpos !== null){if (typeof x.bysetpos == "number"){x.bysetpos = [x.bysetpos]}for (var N = 0; N < x.bysetpos.length; N++){var H = x.bysetpos[N]; if (H == 0 || !( - 366 <= H && H <= 366)){throw new Error("bysetpos must be between 1 and 366, or between -366 and -1")}}}if (!(C(x.byweekno) || C(x.byyearday) || C(x.bymonthday) || x.byweekday !== null || x.byeaster !== null)){switch (x.freq){case this.YEARLY:if (!x.bymonth){x.bymonth = x.dtstart.getMonth() + 1}x.bymonthday = x.dtstart.getDate(); break; case this.MONTHLY:x.bymonthday = x.dtstart.getDate(); break; case this.WEEKLY:x.byweekday = a.jqx.scheduler.utilities.getWeekday(x.dtstart); break}}if (x.bymonth !== null && !(x.bymonth instanceof Array)){x.bymonth = [x.bymonth]}if (x.byyearday !== null && !(x.byyearday instanceof Array)){x.byyearday = [x.byyearday]}if (x.bymonthday === null){x.bymonthday = []; x.bynmonthday = []} else{if (x.bymonthday instanceof Array){var Q = [], I = []; for (N = 0; N < x.bymonthday.length; N++){var H = x.bymonthday[N]; if (H > 0){Q.push(H)} else{if (H < 0){I.push(H)}}}x.bymonthday = Q; x.bynmonthday = I} else{if (x.bymonthday < 0){x.bynmonthday = [x.bymonthday]; x.bymonthday = []} else{x.bynmonthday = []; x.bymonthday = [x.bymonthday]}}}if (x.byweekno !== null && !(x.byweekno instanceof Array)){x.byweekno = [x.byweekno]}if (x.byweekday === null){x.bynweekday = null} else{if (typeof x.byweekday == "number"){x.byweekday = [x.byweekday]; x.bynweekday = null} else{if (x.byweekday instanceof f){if (!x.byweekday.n || x.freq > this.MONTHLY){x.byweekday = [x.byweekday.weekday]; x.bynweekday = null} else{x.bynweekday = [[x.byweekday.weekday, x.byweekday.n]]; x.byweekday = null}} else{var r = [], F = []; for (N = 0; N < x.byweekday.length; N++){var o = x.byweekday[N]; if (typeof o == "number"){r.push(o)} else{if (!o.n || x.freq > this.MONTHLY){r.push(o.weekday)} else{F.push([o.weekday, o.n])}}}x.byweekday = C(r)?r:null; x.bynweekday = C(F)?F:null}}}if (x.byhour === null){x.byhour = (x.freq < this.HOURLY)?[x.dtstart.getHours()]:null} else{if (typeof x.byhour == "number"){x.byhour = [x.byhour]}}if (x.byminute === null){x.byminute = (x.freq < this.MINUTELY)?[x.dtstart.getMinutes()]:null} else{if (typeof x.byminute == "number"){x.byminute = [x.byminute]}}if (x.bysecond === null){x.bysecond = (x.freq < this.SECONDLY)?[x.dtstart.getSeconds()]:null} else{if (typeof x.bysecond == "number"){x.bysecond = [x.bysecond]}}if (x.freq >= this.HOURLY){this.timeset = null} else{this.timeset = []; if (x.byhour){for (N = 0; N < x.byhour.length; N++){var t = x.byhour[N]; for (var M = 0; M < x.byminute.length; M++){var l = x.byminute[M]; for (var L = 0; L < x.bysecond.length; L++){var y = x.bysecond[L]; this.timeset.push(new a.jqx.scheduler.utilities.Time(t, l, y))}}}}a.jqx.scheduler.utilities.sort(this.timeset)}return this}})(jqxBaseFramework);