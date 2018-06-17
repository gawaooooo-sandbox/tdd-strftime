Object.defineProperty(Date.prototype, "strftime", {
    value: function(format) {
        const date = this;

        function zeroPad(num) {
          return (+num < 10 ? "0" : "") + num;
        }

        // 本では`Date.formats` に入れている
        const formats = {
            d: date => {
                return zeroPad(date.getDate());
            },
            m: date => {
                return zeroPad(date.getMonth() + 1);
            },
            y: date => {
                return zeroPad(date.getYear() % 100);
            },
            Y: date => {
                return date.getFullYear();
            },

            F: '%Y-%m-%d',
            D: '%m/%d/%y'
        };

        return (format + '').replace(/%([a-zA-Z])/g, (m, f) => {
            const formatter = formats && formats[f];
            if (typeof formatter === 'function') {
                // return formatter.call(formats, date);
                return formatter(date);
            }

            if (typeof formatter === 'string') {
                return date.strftime(formatter);
            }

            return f;
        })

    }
});
