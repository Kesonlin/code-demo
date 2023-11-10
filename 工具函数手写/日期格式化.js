function format(t = new Date(), form = "YYYY-MM-DD HH:mm:ss") {
  const o = {
    YYYY: t.getFullYear(),
    MM: t.getMonth() + 1,
    DD: t.getDate(),
    HH: t.getHours(),
    mm: t.getSeconds(),
    ss: t.getSeconds(),
  };
  console.log(o);

  for (const key of Object.keys(o)) {
    form = form.replace(key, o[key]);
  }
  console.log(form);
  return form;
}

format();

Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};
// var date1 = new Date().format("yyyy-MM-dd mm");
// console.log(date1);

const str = "kkabcda";

// const str1 = str.replace(/a/, "$$");  // $bcd
const str1 = str.replace(/a/g, "111");
console.log(str1);
jiexi