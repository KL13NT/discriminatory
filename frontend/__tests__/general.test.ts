import {
	createLogMessage,
	parseChannelMention,
	parseMemberMention,
	parseRoleMention,
	capitalise,
	countUniqueWords,
	transformObject,
	awaitMessages,
	hasRole,
	notify
} from '../src/general';

describe('transformObject test suites', () => {
	const obj1 = {
		key1: '',
		key2: '',
		key3: ''
	};

	const obj2 = {
		key1: '',
		key2: '',
		key4: '',
		key5: ''
	};

	test('should transform obj1 into obj2', () => {
		expect(transformObject(obj1, obj2)).toContainAllKeys(Object.keys(obj2));
		expect(transformObject(obj1, obj2)).not.toEqual(obj1);
	});
});

describe('countUniqueWords test suites', () => {
	const string1 = 'This has two two repeated words';
	const string2 = 'This has three three three repeated words words words twice';

	const unique1 = 5;
	const unique2 = 6;

	test('should return proper count', () => {
		expect(countUniqueWords(string1)).toEqual(unique1);
		expect(countUniqueWords(string2)).toEqual(unique2);
	});
});

describe('createLogMessage test suites', () => {
	const input = 'This is a test message';
	const out1 = '[info] This is a test message';
	const out2 = '[warn] This is a test message';
	const out3 = '[error] This is a test message';

	test('should return proper log message', () => {
		expect(createLogMessage(input, 'info')).toEqual(out1);
		expect(createLogMessage(input, 'warn')).toEqual(out2);
		expect(createLogMessage(input, 'error')).toEqual(out3);
	});
});

describe('parseChannelMention test suites', () => {
	const proper = '<#00000000000000>';
	const error1 = '<#>';
	const error2 = '<00000000000000>';
	const error3 = '#00000000000000';
	const error4 = '<#00000000000000';
	const error5 = '#00000000000000>';
	const outProper = '00000000000000';

	test('should return formatted id', () => {
		expect(parseChannelMention(error1)).toBeUndefined();
		expect(parseChannelMention(error2)).toBeUndefined();
		expect(parseChannelMention(error3)).toBeUndefined();
		expect(parseChannelMention(error4)).toBeUndefined();
		expect(parseChannelMention(error5)).toBeUndefined();
		expect(parseChannelMention(proper)).toEqual(outProper);
	});
});

describe('parseMemberMention test suites', () => {
	const proper = '<@00000000000000>';
	const error1 = '<@>';
	const error2 = '<00000000000000>';
	const error3 = '@00000000000000';
	const error4 = '<@00000000000000';
	const error5 = '@00000000000000>';
	const outProper = '00000000000000';

	test('should return formatted id', () => {
		expect(parseMemberMention(error1)).toBeUndefined();
		expect(parseMemberMention(error2)).toBeUndefined();
		expect(parseMemberMention(error3)).toBeUndefined();
		expect(parseMemberMention(error4)).toBeUndefined();
		expect(parseMemberMention(error5)).toBeUndefined();
		expect(parseMemberMention(proper)).toEqual(outProper);
	});
});

describe('parseRoleMention test suites', () => {
	const proper = '<@&00000000000000>';
	const error1 = '<@&>';
	const error2 = '<00000000000000>';
	const error3 = '@&00000000000000';
	const error4 = '<@&00000000000000';
	const error5 = '@&00000000000000>';
	const outProper = '00000000000000';

	test('should return formatted id', () => {
		expect(parseRoleMention(error1)).toBeUndefined();
		expect(parseRoleMention(error2)).toBeUndefined();
		expect(parseRoleMention(error3)).toBeUndefined();
		expect(parseRoleMention(error4)).toBeUndefined();
		expect(parseRoleMention(error5)).toBeUndefined();
		expect(parseRoleMention(proper)).toEqual(outProper);
	});
});

describe('capitalise test suites', () => {
	const input = 'how i manage my time as a student-developer.';
	const outProper = 'How I Manage My Time As A Student-developer.';

	const error1 = 'how i manage my time as a student-developer.';
	const error2 = 'How I Manage My Time As A student-developer.';

	test('should return formatted id', () => {
		expect(capitalise(input)).not.toEqual(error1);
		expect(capitalise(input)).not.toEqual(error2);
		expect(capitalise(input)).toEqual(outProper);
	});
});
