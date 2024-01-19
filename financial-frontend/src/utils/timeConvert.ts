export const tConvert = (time: any) => {
     if (!time)
          return "N/A"
     // Check correct time format and split into components
     time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

     if (time.length > 1) { // If time format correct
          time = time.slice(1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
     }
     return time.join(''); // return adjusted time or original string
}


export const getTime = () => {
     var now = new Date();
     var hour: any = now.getHours();
     var minute: any = now.getMinutes();
     var second: any = now.getSeconds();

     if (hour.toString().length == 1) {
          hour = '0' + hour;
     }
     if (minute.toString().length == 1) {
          minute = '0' + minute;
     }
     if (second.toString().length == 1) {
          second = '0' + second;
     }
     var dateTime = hour + ':' + minute + ':' + second;
     return dateTime;
}


export const formatTime = (date: string) => {
     if (date === null) {
          return '-'
     }
     const now: any = new Date()
     const late: any = new Date(date)
     const s = Math.abs(now - late) / 1000
     // Seconds
     if (s < 60) {
          return 'now'
     }
     // Minutes
     if (s < 60 * 60) {
          const m = Math.floor(s / 60)
          return `${m}m ago`
     }
     // Hours
     if (s < 60 * 60 * 24) {
          const h = Math.floor(s / (60 * 60))
          return `${h}h ago`
     }
     // Days
     if (s < 60 * 60 * 24 * 7) {
          const d = Math.floor(s / (60 * 60 * 24))
          return `${d}d ago`
     }
     // Weeks
     if (s < 60 * 60 * 24 * 7 * 4) {
          const w = Math.floor(s / (60 * 60 * 24 * 7))
          return `${w}w ago`
     }
     // Years
     const y = Math.floor(s / (60 * 60 * 24 * 365))
     return `${y}y ago`
}