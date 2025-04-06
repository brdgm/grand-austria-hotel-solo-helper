import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Grand Austria Hotel Solo Helper')
  await page.getByRole('button', { name: 'Play Game' }).click()

  // setup game
  await page.getByTestId('setupBotButton').click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play a few rounds
  await page.getByRole('button', { name: 'Next' }).click()  // round start
  await page.getByRole('button', { name: 'Next' }).click()  // bot turn
  await page.getByRole('button', { name: 'Turn Executed' }).click()  // player turn
  await page.getByRole('button', { name: 'Turn Executed' }).click()  // player turn
  await page.getByRole('button', { name: 'Next' }).click()  // bot turn

  // finish game
  await page.getByRole('button', { name: 'Abort Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Abort Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Grand Austria Hotel Solo Helper')
})
