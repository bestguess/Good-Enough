
export const convertTimeStamp = function(timestamp) {
	var monthObj = {
		'01': "January",
		'02': "February",
		'03': "March",
		'04': "April",
		'05': "May",
		'06': "June",
		'07': "July",
		'08': "August",
		'09': "September",
		'10': "October",
		'11': "November",
		'12': "December"
	};
	var dayObj = {
		'01': 'st',
		'02': 'nd',
		'03': 'rd',
		'21': 'st',
		'22': 'nd',
		'23': 'rd',
		'31': 'st'
	};
	var year = timestamp.substring(0, 4);
	var month = monthObj[timestamp.substring(5, 7)];
	var day = timestamp.substring(8, 10);
	var hour = timestamp.substring(11, 13);
	var minute = timestamp.substring(14, 16);
	var zone;
	if(dayObj[day]) {
		var end = dayObj[day]
		if(day < 10) day = day.slice(1)
		day = day + end;
	} else {
		if(day < 10) day = day.slice(1)
		day = day + 'th';
	}
	if (hour > 11 && hour !== 24) {
		hour -= 12
		zone = ' PM'
	} else {
		zone = ' AM'
	}
	var result = hour + ':' + minute + zone + ' - ' + month + ' ' + day + ', ' + year
	return result;
}