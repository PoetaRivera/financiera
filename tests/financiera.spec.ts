import { test, expect, Page } from '@playwright/test';

async function cerrarAlert(page: Page) {
  const btn = page.locator('.swal2-confirm');
  if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await btn.click();
    await page.waitForTimeout(300);
  }
}

async function seleccionarIncognita(page: Page, valor: string) {
  await page.locator(`section.incognita input[type="radio"][value="${valor}"]`).click();
  await page.waitForTimeout(200);
}

async function marcarDato(page: Page, nombre: string) {
  await page.locator(`section.datos input[type="checkbox"][name="${nombre}"]`).click();
  await page.waitForTimeout(200);
}

// ══════════════════════════════════════════════════════════════
// NAVEGACIÓN
// ══════════════════════════════════════════════════════════════
test.describe('Navegación', () => {
  test('carga la página de inicio con el logo', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('img.logo-inicio')).toBeVisible();
  });

  test('la navbar tiene todos los links', async ({ page }) => {
    await page.goto('/');
    for (const texto of ['Inicio', 'Interés', 'Anualidad', 'Tasas', 'Descuento', 'Acerca']) {
      await expect(page.locator(`nav a:has-text("${texto}")`)).toBeVisible();
    }
  });

  test('navegar entre módulos no muestra alertas inesperadas', async ({ page }) => {
    await page.goto('/');
    for (const ruta of ['/Interes', '/Anualidades', '/Tasas', '/Descuento', '/Acerca', '/']) {
      await page.goto(ruta);
      await page.waitForTimeout(400);
      await expect(page.locator('.swal2-popup')).not.toBeVisible();
    }
  });

  test('toggle claro/oscuro cambia el atributo data-theme', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const boton = page.locator('nav button');
    const antes = await html.getAttribute('data-theme');
    await boton.click();
    const despues = await html.getAttribute('data-theme');
    expect(antes).not.toBe(despues);
  });

  test('URL desconocida no rompe la app', async ({ page }) => {
    await page.goto('/pagina-que-no-existe');
    await expect(page.locator('body')).not.toBeEmpty();
  });
});

// ══════════════════════════════════════════════════════════════
// INTERÉS SIMPLE
// ══════════════════════════════════════════════════════════════
test.describe('Interés Simple', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Interes');
  });

  test('muestra título y botón de ayuda', async ({ page }) => {
    await expect(page.locator('h2.titulo')).toHaveText('Interés');
    await expect(page.locator('button:has-text("Ayuda")')).toBeVisible();
  });

  test('calcula I = Vf - Va (caso 1)', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('input[name="d1"]').fill('1200');
    await page.locator('input[name="d2"]').fill('1000');
    await page.locator('button:has-text("Calcular")').click();
    // I = 200
    await expect(page.locator('input[readonly]')).toHaveValue(/200\.000000/);
  });

  test('calcula I = Va*i*n (caso 2)', async ({ page }) => {
    await marcarDato(page, 'Va');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // I = 1000*0.1*2 = 200
    await expect(page.locator('input[readonly]')).toHaveValue(/200\.000000/);
  });

  test('calcula Vf = Va(1 + i*n) (caso 6)', async ({ page }) => {
    await seleccionarIncognita(page, 'Vf');
    await marcarDato(page, 'Va');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // Vf = 1000*(1+0.1*2) = 1200
    await expect(page.locator('input[readonly]')).toHaveValue(/1200\.000000/);
  });

  test('calcula Va = Vf/(1 + i*n) (caso 9)', async ({ page }) => {
    await seleccionarIncognita(page, 'Va');
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1200');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // Va = 1200/(1+0.2) = 1000
    await expect(page.locator('input[readonly]')).toHaveValue(/1000\.000000/);
  });

  test('calcula i con resultado en decimal y % (caso 10)', async ({ page }) => {
    await seleccionarIncognita(page, 'i');
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1200');
    await page.locator('input[name="d2"]').fill('1000');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // i = 0.1 = 10%
    await expect(page.locator('input[readonly]')).toHaveValue(/0\.100000/);
    await expect(page.locator('input[readonly]')).toHaveValue(/10\.0000%/);
  });

  test('muestra error si campo vacío', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('.swal2-popup')).toBeVisible();
    await cerrarAlert(page);
  });

  test('muestra error si valor negativo', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('input[name="d1"]').fill('-100');
    await page.locator('input[name="d2"]').fill('1000');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('.swal2-popup')).toBeVisible();
    await cerrarAlert(page);
  });

  test('Reiniciar vuelve al estado inicial', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('input[name="d1"]').fill('1200');
    await page.locator('input[name="d2"]').fill('1000');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toBeVisible();
    await page.locator('button:has-text("Reiniciar")').click();
    await expect(page.locator('input[readonly]')).not.toBeVisible();
    await expect(page.locator('input[name="d1"]')).not.toBeVisible();
  });

  test('Ayuda muestra el panel de definiciones', async ({ page }) => {
    await page.locator('button:has-text("Ayuda")').click();
    await expect(page.locator('.definicion')).toBeVisible();
    await expect(page.locator('.definicion').locator('text=Vf')).toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════
// INTERÉS COMPUESTO
// ══════════════════════════════════════════════════════════════
test.describe('Interés Compuesto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Interes');
    await page.locator('input[type="radio"][value="Compuesto"]').click();
    await page.waitForTimeout(200);
  });

  test('calcula Vf = Va(1+i)^n (caso 21)', async ({ page }) => {
    await seleccionarIncognita(page, 'Vf');
    await marcarDato(page, 'Va');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // Vf = 1000*(1.1)^2 = 1210
    await expect(page.locator('input[readonly]')).toHaveValue(/1210\.000000/);
  });

  test('calcula Va = Vf/(1+i)^n (caso 24)', async ({ page }) => {
    await seleccionarIncognita(page, 'Va');
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1210');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('2');
    await page.locator('button:has-text("Calcular")').click();
    // Va = 1210/(1.1)^2 = 1000
    await expect(page.locator('input[readonly]')).toHaveValue(/1000\.000000/);
  });
});

// ══════════════════════════════════════════════════════════════
// ANUALIDADES
// ══════════════════════════════════════════════════════════════
test.describe('Anualidades', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Anualidades');
    await page.waitForTimeout(400);
  });

  test('no muestra alerta al entrar', async ({ page }) => {
    await expect(page.locator('.swal2-popup')).not.toBeVisible();
  });

  test('muestra título correcto', async ({ page }) => {
    await expect(page.locator('h2.titulo')).toHaveText('Anualidades');
  });

  test('calcula Vf de anualidad vencida (caso 5: R, i, n)', async ({ page }) => {
    await seleccionarIncognita(page, 'Vf');
    await marcarDato(page, 'I'); // I = R en anualidades
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('100');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('3');
    await page.locator('button:has-text("Calcular")').click();
    // Vf = 100*((1.1^3-1)/0.1) = 331
    await expect(page.locator('input[readonly]')).toHaveValue(/331\.000000/);
  });

  test('calcula Va de anualidad vencida (caso 8: R, i, n)', async ({ page }) => {
    await seleccionarIncognita(page, 'Va');
    await marcarDato(page, 'I');
    await marcarDato(page, 'i');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('100');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('3');
    await page.locator('button:has-text("Calcular")').click();
    // Va ≈ 248.6851
    await expect(page.locator('input[readonly]')).toHaveValue(/248\.685/);
  });
});

// ══════════════════════════════════════════════════════════════
// TASAS
// ══════════════════════════════════════════════════════════════
test.describe('Tasas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Tasas');
  });

  test('muestra título correcto', async ({ page }) => {
    await expect(page.locator('h2.titulo')).toHaveText('Tasas');
  });

  test('calcula tasa efectiva i desde j, m, n (caso 1)', async ({ page }) => {
    // j=0.12, m=12, n=12 → i ≈ 0.126825 (12.6825%)
    await page.locator('input[placeholder*="nominal"]').fill('0.12');
    await page.locator('input[placeholder*="cap"]').fill('12');
    await page.locator('input[placeholder*="ríodo"]').fill('12');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toHaveValue(/12\.6825%/);
  });

  test('calcula tasa nominal j desde i, m, n (caso 2)', async ({ page }) => {
    await page.locator('input[name="tasas-tipo"][value="2"]').click();
    await page.waitForTimeout(200);
    // i=0.126825, m=12, n=12 → j ≈ 12%
    await page.locator('input[placeholder*="efectiva"]').fill('0.126825');
    await page.locator('input[placeholder*="cap"]').fill('12');
    await page.locator('input[placeholder*="ríodo"]').fill('12');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toHaveValue(/12\.0000%/);
  });

  test('calcula tasa de descuento d desde ir, n (caso 3)', async ({ page }) => {
    await page.locator('input[name="tasas-tipo"][value="3"]').click();
    await page.waitForTimeout(200);
    // ir=0.1, n=1 → d ≈ 9.0909%
    await page.locator('input[placeholder*="real"]').fill('0.1');
    await page.locator('input[placeholder*="ríodo"]').fill('1');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toHaveValue(/9\.0909%/);
  });

  test('calcula tasa real ir desde d, n (caso 4)', async ({ page }) => {
    await page.locator('input[name="tasas-tipo"][value="4"]').click();
    await page.waitForTimeout(200);
    // d=0.0909, n=1 → ir ≈ 10%
    await page.locator('input[placeholder*="desc"]').fill('0.0909');
    await page.locator('input[placeholder*="ríodo"]').fill('1');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toHaveValue(/%/);
  });

  test('muestra error si campo vacío', async ({ page }) => {
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('.swal2-popup')).toBeVisible();
    await cerrarAlert(page);
  });

  test('Reiniciar vuelve al tipo 1', async ({ page }) => {
    await page.locator('input[name="tasas-tipo"][value="3"]').click();
    await page.locator('button:has-text("Reiniciar")').click();
    await expect(page.locator('input[name="tasas-tipo"][value="1"]')).toBeChecked();
  });
});

// ══════════════════════════════════════════════════════════════
// DESCUENTO
// ══════════════════════════════════════════════════════════════
test.describe('Descuento', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/Descuento');
    await page.waitForTimeout(400);
  });

  test('no muestra alerta al entrar', async ({ page }) => {
    await expect(page.locator('.swal2-popup')).not.toBeVisible();
  });

  test('muestra título correcto', async ({ page }) => {
    await expect(page.locator('h2.titulo')).toHaveText('Descuento');
  });

  test('calcula D = Vf - Va (caso 1)', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('900');
    await page.locator('button:has-text("Calcular")').click();
    // D = 100
    await expect(page.locator('input[readonly]')).toHaveValue(/100\.000000/);
  });

  test('calcula D desde Va, d, n (caso 2)', async ({ page }) => {
    await marcarDato(page, 'Va');
    await marcarDato(page, 'd');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('900');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('1');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toBeVisible();
  });

  test('calcula Va = Vf(1 - d*n) (caso 9)', async ({ page }) => {
    await page.locator('section.incognita input[type="radio"][name="incognita-desc"][value="Va"]').click();
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'd');
    await marcarDato(page, 'n');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('0.1');
    await page.locator('input[name="d3"]').fill('1');
    await page.locator('button:has-text("Calcular")').click();
    // Va = 1000*(1-0.1) = 900
    await expect(page.locator('input[readonly]')).toHaveValue(/900\.000000/);
  });

  test('Reiniciar vuelve al estado inicial', async ({ page }) => {
    await marcarDato(page, 'Vf');
    await marcarDato(page, 'Va');
    await page.locator('input[name="d1"]').fill('1000');
    await page.locator('input[name="d2"]').fill('900');
    await page.locator('button:has-text("Calcular")').click();
    await expect(page.locator('input[readonly]')).toBeVisible();
    await page.locator('button:has-text("Reiniciar")').click();
    await expect(page.locator('input[readonly]')).not.toBeVisible();
  });
});

// ══════════════════════════════════════════════════════════════
// ACERCA
// ══════════════════════════════════════════════════════════════
test.describe('Acerca', () => {
  test('muestra la guía de usuario', async ({ page }) => {
    await page.goto('/Acerca');
    await expect(page.locator('text=Guía de usuario')).toBeVisible();
  });

  test('muestra el nombre del autor', async ({ page }) => {
    await page.goto('/Acerca');
    await expect(page.locator('text=Nelson Rivera')).toBeVisible();
  });

  test('muestra tabla de variables', async ({ page }) => {
    await page.goto('/Acerca');
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('table td:has-text("Valor futuro")')).toBeVisible();
  });
});
