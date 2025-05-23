import { playwrightLauncher } from '@web/test-runner-playwright';

export const chromium = playwrightLauncher({
  product: 'chromium',
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    }),
});

/**
 * @todo Remove this configuration and its usage in the Coveralls CI workflow
 * once the Playwright version mismatch between @web/test-runner-playwright
 * and the installed Playwright version is resolved.
 */
export const coverallsChromium = playwrightLauncher({
  product: 'chromium',
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    }),
  launchOptions: {
    executablePath:
      '/home/runner/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',
    headless: true,
  },
});

export const chromiumWithMemoryTooling = playwrightLauncher({
  product: 'chromium',
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    }),
  launchOptions: {
    headless: false,
    args: [
      '--js-flags=--expose-gc',
      '--headless=new',
      /**
       * Cause `measureUserAgentSpecificMemory()` to GC immediately,
       * instead of up to 20s later:
       * https://web.dev/articles/monitor-total-page-memory-usage#local_testing
       **/
      '--enable-blink-features=ForceEagerMeasureMemory',
    ],
  },
});

export const chromiumWithMemoryToolingCI = playwrightLauncher({
  product: 'chromium',
  concurrency: 2,
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    }),
  launchOptions: {
    headless: false,
    args: [
      '--js-flags=--expose-gc',
      '--headless=new',
      /**
       * Cause `measureUserAgentSpecificMemory()` to GC immediately,
       * instead of up to 20s later:
       * https://web.dev/articles/monitor-total-page-memory-usage#local_testing
       **/
      '--enable-blink-features=ForceEagerMeasureMemory',
    ],
  },
});

export const chromiumWithFlags = playwrightLauncher({
  product: 'chromium',
  launchOptions: {
    args: ['--enable-experimental-web-platform-features'],
  },
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      permissions: ['clipboard-read', 'clipboard-write'],
    }),
});

export const firefox = playwrightLauncher({
  product: 'firefox',
  concurrency: 1,
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
      // FF doesn't support permissions
      // permissions: ['clipboard-read', 'clipboard-write'],
    }),
  launchOptions: {
    firefoxUserPrefs: {
      // TODO check
      'toolkit.telemetry.reportingpolicy.firstRun': false,
      'browser.shell.checkDefaultBrowser': false,
      'browser.bookmarks.restore_default_bookmarks': false,
      'dom.disable_open_during_load': false,
      'dom.max_script_run_time': 0,
      'dom.min_background_timeout_value': 10,
      'extensions.autoDisableScopes': 0,
      'extensions.enabledScopes': 15,
      'dom.events.asyncClipboard.readText': true,
      'dom.events.testing.asyncClipboard': true,
    },
  },
});

export const webkit = playwrightLauncher({
  product: 'webkit',
  concurrency: 4,
  createBrowserContext: ({ browser }) =>
    browser.newContext({
      ignoreHTTPSErrors: true,
    }),
});
