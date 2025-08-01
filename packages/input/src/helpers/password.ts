import { type Suggestion } from '../types.js';
/**
 * Checks for repetition of characters in
 * a string
 *
 * @param int rLen Repetition length.
 * @param string str The string to be checked.
 * @return string
 */
const checkRepetition = (rLen: number, str: string) => {
  let res = '';
  let repeated = false;
  for (let i: number = 0; i < str.length; i += 1) {
    repeated = true;
    for (let j: number = 0; j < rLen && j + i + rLen < str.length; j += 1) {
      repeated = repeated && str.charAt(j + i) === str.charAt(j + i + rLen);
    }
    if (repeated) {
      i += rLen - 1;
      repeated = false;
    } else {
      res += str.charAt(i);
    }
  }
  return res;
};

/**
 * Returns a value between -1 and 100 to score
 * the user's password.
 *
 * @param  string password The password to be checked.
 * @return int
 */
const calculateScore = (password: string, lmin: number) => {
  let score = 0;

  // empty password
  if (password.trim().length === 0) {
    return -2;
  }

  if (password.length < lmin) {
    return -1;
  }

  // password length
  score += password.length * 4;
  score += checkRepetition(1, password).length - password.length;
  score += checkRepetition(2, password).length - password.length;
  score += checkRepetition(3, password).length - password.length;
  score += checkRepetition(4, password).length - password.length;

  // password has 3 numbers
  if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
    score += 5;
  }

  // password has at least 2 symbols
  const symbols = /(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/;
  if (password.match(symbols)) {
    score += 5;
  }

  // password has Upper and Lower chars
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    score += 10;
  }

  // password has number and chars
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
    score += 15;
  }

  // password has number and symbol
  if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
    score += 15;
  }

  // password has char and symbol
  if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
    score += 15;
  }

  // password is just numbers or chars
  if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
    score -= 10;
  }

  if (score > 100) {
    score = 100;
  }

  if (score < 0) {
    score = 0;
  }

  return score;
};

const scoreColor = (score: number) => {
  if (score === -1 || score === -2 || score < 26) {
    return 'danger';
  }
  if (score < 51) {
    return 'warning';
  }
  if (score < 76) {
    return 'success';
  }
  return 'success';
};

const scoreText = (score: number, messages: any) => {
  if (score === -1) {
    return messages.shortPass;
  }
  if (score === -2) {
    return '';
  }
  if (score < 26) {
    return messages.badPass;
  }
  if (score < 51) {
    return messages.badPass;
  }
  if (score < 76) {
    return messages.goodPass;
  }
  return messages.strongPass;
};

const suggestionsConfig: Array<Suggestion> = [
  {
    key: 'length',
    text: (config) => config.suggestionLength.replace('{minLength}', config.minimumLength.toString()),
    test: (password, config) => password.length >= config.minimumLength,
  },
  {
    key: 'uppercase',
    text: (config) => config.suggestionUppercase,
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: 'lowercase',
    text: (config) => config.suggestionLowercase,
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: 'number',
    text: (config) => config.suggestionNumber,
    test: (password) => /[0-9]/.test(password),
  },
  {
    key: 'special',
    text: (config) => config.suggestionSpecial,
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
];

const calcCompletedSuggestions = (_suggestions: Array<Suggestion>, password: string, config: Record<string, any>) => {
  let completedCount = 0;
  const totalCount = _suggestions.length;
  _suggestions.forEach((sugg) => {
    if (sugg.test(password, config)) {
      completedCount += 1;
    }
  });
  return { completedCount, totalCount };
};
export { calculateScore, scoreColor, scoreText, suggestionsConfig, calcCompletedSuggestions };
