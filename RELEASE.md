# Processo di Rilascio con Changesets

Questo documento descrive come utilizzare Changesets per gestire i rilasci di tutti i pacchetti del monorepo.

## Panoramica

Il processo di rilascio utilizza [Changesets](https://github.com/changesets/changesets) per:

- Raccogliere le modifiche di ciascun pacchetto in changelog separati
- Mantenere versioni sincronizzate tra tutti i pacchetti
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
7. 💾 Committa le modifiche
8. 🏷️ Crea un tag Git basato sulla nuova versione
9. ⬆️ Effettua push delle modifiche e del tag

### 3. Pubblicazione Automatica

Il push del tag attiverà automaticamente il workflow GitHub Actions `.github/workflows/publish-release.yml` che:

1. 🔨 Builda tutti i pacchetti
2. 📦 Pubblica tutti i pacchetti su NPM con certificazione di provenance
3. 📄 Crea una release GitHub con changelog aggregato

## Configurazione

### Pacchetti Sincronizzati

I seguenti pacchetti vengono rilasciati sempre con la stessa versione (configurato in `.changeset/config.json`):

- `@italia/button`
- `@italia/dropdown`
- `@italia/globals`
- `@italia/icon`
- `@italia/popover`
- `@italia/tabs`
- `@italia/video`
- `design-web-components`

### Pacchetti Ignorati

I seguenti pacchetti di configurazione sono esclusi dai rilasci:

- `@italia/test-config`
- `@italia/typescript-config`

### Changelog per Pacchetti Senza Modifiche

Se un pacchetto non ha modifiche, riceverà automaticamente una voce di changelog che indica un "version bump" per mantenere la sincronizzazione delle versioni.

## Comandi Disponibili

- `pnpm release:changeset` - Aggiungi un nuovo changeset
- `pnpm release:version` - Aggiorna solo le versioni (senza commit/tag)
- `pnpm release:create` - Processo completo di rilascio
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
