# Issues brutes à encoder dans GitHub

---

## Issue 1 : "POST /pets un peu bizarre"

Quand on fait un POST sur /pets sans tout mettre, ça ne réagit pas comme prévu.

Exemple (je crois) :
- j'envoie un JSON sans tous les champs
- parfois ça passe, parfois pas

Je m'attendais plutôt à avoir une erreur systématique quand il manque des infos, mais ce n'est pas ce que je vois.

---

## Issue 2 : "IDs qui se mélangent après quelques opérations"

Après avoir joué un peu avec l'API (création / suppression de pets), on dirait que les IDs ne sont pas super cohérents.

À un moment j'ai l'impression que deux pets ont le même ID, ou que ça repart de 1 (je ne suis pas sûr).  
En tout cas, ce n'est pas très clair, et ça risque de poser problème côté client.

---

## Issue 3 : "Filtre par tag pas très fiable"

Le filtre par tag sur /pets ne marche pas tout le temps comme je pense.

Par exemple, je demande les "Dog" et je ne récupère pas la même chose que pour "dog".  
Je ne sais pas si c'est normal, mais ce n'est pas très pratique.

---

## Issue 4 : "Delete /pets ne marche pas ?"

Quand j'envoie un DELETE sur /pets/{id}, j'ai bien un 204.

Par contre, si je refais un GET sur /pets, j'ai l'impression que le truc est encore là.  
Du coup je ne sais pas si c'est vraiment supprimé ou pas.

---

## Issue 5 : "Encore un problème avec le delete"

Possiblement lié à l'issue 'Delete /pets ne marche pas ?' mais je ne suis pas sûr.

J'ai supprimé un pet et ensuite j'ai refait des tests, et il a l'air de revenir (ou un truc comme ça).  
Bref, comportement étrange après des deletes répétés.

---

## Issue 6 : "Incohérence générale sur les réponses"

Globalement, en combinant des POST / DELETE / GET, les résultats ne sont pas toujours ce que j'attends.

Ce serait bien de vérifier :
- que les IDs avancent comme il faut
- que les suppressions sont vraiment prises en compte
- que le filtre tag ne laisse rien passer de bizarre
