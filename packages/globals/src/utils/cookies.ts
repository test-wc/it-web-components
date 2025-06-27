/**
 * --------------------------------------------------------------------------
 * Bootstrap Italia (https://italia.github.io/bootstrap-italia/)
 * Authors: https://github.com/italia/bootstrap-italia/blob/main/AUTHORS
 * Licensed under BSD-3-Clause license (https://github.com/italia/bootstrap-italia/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const preferencesMap: Record<string, Record<string, boolean>> = { ck3: {} };

/*
  Possible choices:
  false => Accept once
  true => Accept always
*/
const rememberChoice = (service: string, remember: boolean) => {
  preferencesMap.ck3[service] = remember;
  localStorage.setItem('bs-ck3', JSON.stringify(preferencesMap.ck3));
};

const isChoiceRemembered = (service: string) => {
  preferencesMap.ck3 = JSON.parse(localStorage.getItem('bs-ck3') || '{}');
  return preferencesMap.ck3[service] || false;
};

const clearAllRememberedChoices = () => {
  localStorage.removeItem('bs-ck3');
};

const cookies = {
  rememberChoice,
  isChoiceRemembered,
  clearAllRememberedChoices,
};

export { cookies };
