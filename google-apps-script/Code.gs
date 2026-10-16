/**
 * Palavra do Céu — registro das autorizações de imagem.
 *
 * Como usar (passo a passo completo no README do projeto):
 * 1. Crie uma planilha no Google Planilhas.
 * 2. Menu Extensões → Apps Script, apague o conteúdo e cole este arquivo.
 * 3. Implantar → Nova implantação → tipo "App da Web",
 *    Executar como: "Eu", Quem pode acessar: "Qualquer pessoa".
 * 4. Copie a URL que termina em /exec para NUXT_PUBLIC_CONSENT_SHEET_URL.
 *
 * Cada envio vira uma linha na aba "Autorizações". Quem muda de ideia gera uma linha "Revogou":
 * vale sempre a linha mais recente de cada pessoa.
 */

const SHEET_NAME = 'Autorizações'
const HEADERS = ['Data/hora', 'Nome', 'Sobrenome', 'Situação', 'Idioma']

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}')

    // Campo invisível do formulário: só robôs preenchem. Responde "ok" e não grava.
    if (data.website) return json({ ok: true })

    const nome = clean(data.nome)
    const sobrenome = clean(data.sobrenome)
    if (nome.length < 2 || sobrenome.length < 2) return json({ ok: false, error: 'nome_invalido' })

    const situacao = data.status === 'revogou' ? 'Revogou' : 'Autorizou'
    getSheet().appendRow([new Date(), nome, sobrenome, situacao, clean(data.idioma)])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

/** Abrir a URL no navegador mostra {"ok":true}: serve para conferir se a implantação está no ar. */
function doGet() {
  return json({ ok: true })
}

/** Limita o tamanho e impede que um texto começando com = + - @ vire fórmula na planilha. */
function clean(value) {
  const v = String(value == null ? '' : value).trim().replace(/\s+/g, ' ').slice(0, 60)
  return /^[=+\-@]/.test(v) ? "'" + v : v
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
    sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm:ss')
  }
  return sheet
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
