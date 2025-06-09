// const MainDescription = () => `
//   Pulsante con etichetta di testo o icona che al clic inizia un'azione o un evento.

//   <div>
//     <h2>Quando usarlo</h2>

//     I pulsanti comunicano che l’interazione dà il via a un’azione o a un evento. Non dovrebbero essere usati per
//     attivare la navigazione verso altre pagine o link esterni.
//   </div>

//   <div>
//     <h2>Come usarlo</h2>
//     <ul>
//       <li>Usa la variante "primary" per valorizzare l’azione principale.</li>
//       <li>Usa la variante "secondary" per valorizzare l’azione secondaria.</li>
//       <li>
//         Per comunicare senza ambiguità la gerarchia delle azioni generate dai pulsanti, usa le varianti di grandezza e
//         tipologia.
//       </li>
//       <li>
//         Usa un pulsante con icona per aggiungere un’informazione visiva all’interazione (es. pulsante di accesso ad area
//         riservata)
//       </li>
//     </ul>
//   </div>

//   <div>
//     <h2>Attenzione a</h2>
//     <ul>
//       <li>Usare pulsanti disabilitati con moderazione, assicurandoti che per l’utente sia chiaro come attivarli.</li>
//       <li>Non usare più di un pulsante "primary" nello stesso contesto di azione.</li>
//       <li>Non usare pulsanti "primary" per azioni di valore secondario.</li>
//       <li>Non usare i pulsanti all’interno di paragrafi di testo.</li>
//       <li>Usare la corretta semantica HTML < button > per l'implementazione di pulsanti di azione.</li>
//     </ul>
//   </div>

//   <div>
//     <h2>Buone pratiche sui contenuti</h2>
//     <ul>
//       <li>
//         Le etichette di testo devono comunicare in maniera immediata, chiara e senza ambiguità il significato
//         dell’azione.
//       </li>
//       <li>Non usare etichette di testo troppo lunghe.</li>
//       <li>Prediligi etichette di testo che fanno riferimento a una sola azione alla volta.</li>
//       <li>Usa la seconda persona singolare (es. "Aggiungi un servizio").</li>
//       <li>
//         Usa la prima persona singolare nel caso di accettazione di termini e condizioni o modali informative (es.
//         "Accetto" o "Ho capito").
//       </li>
//       <li>
//         I pulsanti con sola icona potrebbero generare ambiguità: se possibile, aggiungi sempre un’etichetta di testo.
//       </li>
//     </ul>
//   </div>
// `;

const MainDescription = () => `
  Pulsante con etichetta di testo o icona che al clic inizia un'azione o un evento.

  <div>
    <h2 id="come_usarlo">Come usarlo</h2>
    <p>
    Per aggiungere un bottone personalizzato, è sufficiente utilizzare il componente
    <code>&lt;it-button /&gt;</code>  ed i relativi attributi per applicarne le varianti di stile, dimensione, ecc.
    </p>
    <ul>
      <li>Usa la variante "primary" per valorizzare l’azione principale.</li>
      <li>Usa la variante "secondary" per valorizzare l’azione secondaria.</li>
      <li>
        Per comunicare senza ambiguità la gerarchia delle azioni generate dai pulsanti, usa le varianti di grandezza e
        tipologia.
      </li>
      <li>
        Usa un pulsante con icona per aggiungere un’informazione visiva all’interazione (es. pulsante di accesso ad area
        riservata)
      </li>
    </ul>
  </div>
`;
export default MainDescription;
