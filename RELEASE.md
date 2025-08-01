# Processo di Rilascio con Changesets

Questo documento descrive come utilizzare Changesets per gestire i rilasci di tutti i pacchetti del monorepo.

## Panoramica

Il processo di rilascio utilizza [Changesets](https://github.com/changesets/changesets) per:

- Raccogliere le modifiche di ciascun pacchetto in changelog separati
- Mantenere versioni sincronizzate tra tutti i pacchetti
- Generare automaticamente un **changelog unificato** nella radice del repository
- Pubblicare automaticamente tutti i pacchetti su NPM
- Creare release GitHub con changelog aggregato

## Workflow di Rilascio

### 1. Aggiungere Changesets

Per ogni modifica ai pacchetti, aggiungi un changeset:

```bash
pnpm release:changeset
```

Questo comando ti guiderà attraverso:

- Selezione dei pacchetti modificati
- Tipo di cambiamento (major, minor, patch)
- Descrizione delle modifiche

### 2. Creare un Rilascio

Quando sei pronto per rilasciare, assicurati di essere sul branch `main` e che tutto sia committato:

```bash
pnpm release:create
```

Questo script:

1. ✅ Verifica che ci siano changesets pendenti
2. ✅ Controlla di essere sul branch 'main'
3. ✅ Controlla che non ci siano modifiche non committate
4. 📝 Aggiorna le versioni di tutti i pacchetti
5. 🔒 Aggiorna il lockfile
6. 🔨 Builda tutti i pacchetti
7. 🏷️ Aggiunge entry "version bump" ai pacchetti senza modifiche
8. 📝 Genera il changelog unificato (escludendo i version bump)
9. 💾 Committa le modifiche
10. 🏷️ Crea un tag Git basato sulla nuova versione
11. ⬆️ Effettua push delle modifiche e del tag

### 3. Pubblicazione Automatica

Il push del tag attiverà automaticamente il workflow GitHub Actions `.github/workflows/publish-release.yml` che:

1. 🔨 Builda tutti i pacchetti
2. 📦 Pubblica tutti i pacchetti su NPM con certificazione di provenance
3. 📄 Crea una release GitHub con changelog aggregato

## Changelog Unificato 📋

Oltre ai changelog individuali per ogni pacchetto, il sistema genera automaticamente un **changelog unificato** (`CHANGELOG.md`) nella radice del repository che raccoglie tutte le modifiche di tutti i pacchetti per ogni versione.

### Generazione Automatica

Il changelog unificato viene generato automaticamente durante il processo di rilascio (`pnpm release:create`), ma può essere generato manualmente con:

```bash
pnpm release:changelog
```

### Struttura del Changelog Unificato

```markdown
# Design Web Components Changelog

## 1.2.0

### button

- Fix button hover state styling
- Add support for custom icons

### icon

- Add new calendar icon
- Update icon sizing system

### video

- Fix video player controls on mobile

## 1.1.0

...
```

## Configurazione

### Pacchetti Sincronizzati

I seguenti pacchetti vengono rilasciati sempre con la stessa versione (configurato in `.changeset/config.json`):

- `@italia/button`
- `@italia/icon`
- `@italia/video`

### Pacchetti Ignorati

I seguenti pacchetti di configurazione sono esclusi dai rilasci:

- `@italia/test-config`
- `@italia/typescript-config`

### Changelog per Pacchetti Senza Modifiche

I pacchetti senza modifiche riceveranno automaticamente:

- **Nei changelog individuali**: Una voce "- Version bump only" per documentare il rilascio
- **Nel changelog unificato**: Vengono automaticamente **esclusi** per mantenere il changelog pulito e focalizzato solo sulle modifiche significative

## Comandi Disponibili

- `pnpm release:changeset` - Aggiungi un nuovo changeset
- `pnpm release:version` - Aggiorna solo le versioni (senza commit/tag)
- `pnpm release:create` - Processo completo di rilascio
- `pnpm release:changelog` - Genera solo il changelog unificato
- `pnpm release:version-bump` - Aggiungi entry "version bump" ai pacchetti senza modifiche
- `pnpm release:publish` - Pubblica i pacchetti localmente (solo per test)

## Esempi di Utilizzo

### Esempio 1: Modifica al Button Component

```bash
# 1. Dopo aver modificato il componente button
pnpm release:changeset
# Seleziona: @italia/button
# Tipo: patch
# Descrizione: "Fix button hover state styling"

# 2. Quando pronto per rilasciare
pnpm release:create
```

### Esempio 2: Nuova Feature per Multiple Components

```bash
# 1. Dopo aver aggiunto una feature che tocca button e icon
pnpm release:changeset
# Seleziona: @italia/button, @italia/icon
# Tipo: minor
# Descrizione: "Add support for custom icons in buttons"

# 2. Quando pronto per rilasciare
pnpm release:create
```

## Note Importanti

- ⚠️ **Non modificare manualmente i file CHANGELOG.md** - vengono generati automaticamente
- ⚠️ **Non modificare manualmente le versioni nei package.json** - vengono aggiornate automaticamente
- ✅ **Tutti i pacchetti avranno sempre la stessa versione** per semplicità di gestione
- ✅ **I changelog sono separati per pacchetto** per chiarezza nella documentazione
- ✅ **La pubblicazione su NPM include certificazione di provenance** per la sicurezza
