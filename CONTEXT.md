# Prosjektkontekst (Sanntidsstatus)

**Dato sist oppdatert:** 2026-02-27
**Nåværende fase:** Versjon 1 (MVP) Fullført

## Hva har vi bygget?
- En frontend i React og Tailwind CSS kalt "Helse Sør-Øst Nano-learning Portal".
- Applikasjonen leser læringsinnhold fra `src/data/mockData.json`.
- Forsiden har en Sanntids-søkefunksjon og lister alle moduler som oppgavekort med sveve-effekt ("Hva lærer du").
- Modulsiden har fulltekstinnhold og automatisk anbefaling av relaterte moduler basert på delte stikkord.

## Hvordan vi jobber fremover (Avtaler med Claude)
1.  **Ingen kode-brytende refaktoreringer** uten å ha diskutert det først.
2.  **Læringsdata ligger i JSON**, aldri hardkodet i `.jsx`-filene.
3.  **Hold det universelt utformet**: Legg til `aria-labels` på lenker og knapper, og hold god kontrast i CSS.

## Neste oppgaver (Refinement)
- Opprette nye faginnholdstekster hvis nødvendig.
- Finpusse UI ytterligere dersom designfeedback krever det.
- Implementere faktisk "loggføring" eller enkel sporing hvis nødvendig senere.
