# PetStore MCP Demo

Mini-projet PetStore en Node.js utilisé pour illustrer un workflow de développement assisté par agent IA via MCP (Model Context Protocol).

Le projet contient plusieurs bugs intentionnels et une suite de tests pour les mettre en évidence.

## Installation

```bash
npm install
```

## Lancer les tests

```bash
npm test
```

## Lancer le serveur

```bash
npm start
```

Le serveur écoute par défaut sur le port `3000`.

## Bugs présents (à ne PAS corriger avant le cours)

- Validation incomplète pour `POST /pets`.
- Génération des identifiants basée sur la longueur du tableau.
- Filtre `tag` sensible à la casse.
- `DELETE /pets/:id` ne supprime pas réellement l'élément.

## Issues brutes

Le fichier `initial_issues.md` contient une série d'issues volontairement mal rédigées et redondantes.  
Les étudiants doivent les recréer dans GitHub avant la phase de triage assistée par l'agent.
