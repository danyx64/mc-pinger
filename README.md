# server-bot

Bot Discord basato su `discord.js`, predisposto per **User Install** e con slash command eseguibili solo dall'account Discord configurato in `OWNER_USER_ID`.

## Configurazione Discord

Nel Discord Developer Portal apri la tua applicazione:

1. In **Installation**, abilita **User Install**. Puoi mantenere anche Guild Install se vuoi installare normalmente il bot in un server.
2. Per User Install aggiungi lo scope `applications.commands`.
3. Copia il token del bot e NON inserirlo mai nel repository.
4. Recupera il tuo Discord User ID attivando Developer Mode su Discord e usando **Copy User ID** sul tuo profilo.

## Avvio

Crea un file `.env` locale partendo da `.env.example`:

```env
DISCORD_TOKEN=...
OWNER_USER_ID=...
```

Poi:

```bash
npm install
npm start
```

## Sicurezza

Ogni interazione controlla `interaction.user.id === OWNER_USER_ID`. Gli utenti con un ID differente ricevono un rifiuto. Il token deve essere conservato esclusivamente come variabile d'ambiente/segreto del servizio di hosting.

## Comandi iniziali

- `/ping` - verifica che il bot sia online.
- `/server` - mostra nome e ID del server corrente, quando eseguito in un server.

Nota: una app installata sull'utente puo rendere disponibili i suoi comandi nei contesti supportati da Discord, ma questo non equivale ad aggiungere automaticamente un bot membro con permessi amministrativi/moderazione a ogni server.
